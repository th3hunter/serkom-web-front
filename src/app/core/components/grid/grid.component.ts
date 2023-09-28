import { Component, OnInit, ViewChild, Input, Output, EventEmitter, HostListener, AfterViewInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { MatPaginator, PageEvent} from '@angular/material/paginator';
import { MatTable } from '@angular/material/table';
import { MatMenu } from '@angular/material/menu';
import { Sort } from '@angular/material/sort';
import { GridFilters } from '../../interfaces/GridFilters';
import { GridColumn } from '../../interfaces/GridColumn';
import { GenericDataSource } from '../../classes/GenericDatasource';
import { HttpService } from '../../services/http.service';

@Component({
    selector: 'app-grid',
    templateUrl: './grid.component.html',
    styleUrls: ['./grid.component.scss']
})
export class GridComponent implements OnInit, AfterViewInit, OnDestroy {

    @Input() restURL: string;
    @Input() list: any[];
    @Input() filters: GridFilters = new GridFilters([], 1, 20);
    @Input() columns: GridColumn[] = [];
    @Input() hidePaginator: string;
    @Input() menu: MatMenu;
    @Input() allowMultipleRowSelection: boolean = false;
    @Input() pageSizeOptions = [5, 10, 20, 50];

    @Output() onlineActivate = new EventEmitter<any>();
    @Output() doubleClick = new EventEmitter<any>();
    @Output() imageClick = new EventEmitter<any>();
    @Output() afterRefresh = new EventEmitter<void>();

    dataSource: GenericDataSource;
    displayedColumns: string[] = [];
    selectedRow: any;
    selectedRows = [];
    selectedIndex: number;
    selectedIndexes: number[] = [];
    lastSelectedIndex: number;
    pageEvent: PageEvent;
    loading: boolean = false;

    @ViewChild(MatTable, { static: false }) table: MatTable<any>;
    @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

    // Escucha los eventos de teclado para hacer REFRESH con F5
    @HostListener('window:keydown', ['$event'])
    keyEvent(event: KeyboardEvent): boolean {
        // Si se presionó la tecla F5
        if (event.key === 'F5') {
            // Recarga el grid
            this.refresh();

            return false;
        }

        return true;
    }

    constructor(private httpService: HttpService,
                @Inject(PLATFORM_ID) private platformId: any) {
        // Inicializa el datasource
        this.dataSource = new GenericDataSource(this.httpService, platformId);
    }

    ngOnInit(): void {
        // Me suscribo al observable loading
        this.dataSource.loading.subscribe(value => {
            this.loading = value;

            // Si ya no está cargando, emito el evento
            if (!value)
                this.afterRefresh.emit();
        });

        // Emite un nuevo valor con 15 líneas vacías, para que se muestren los placeholders
        this.dataSource.showLoadingPlaceholders(this.columns);
    // }

    // ngAfterViewInit(): void {
        // Chequea errores de declaración de este componente
        let error: boolean;

        // Valida que se hayan especificado todos los parámetros necesarios
        if (this.restURL === '' && !this.list) {
            console.error('No se ha especificado ni la propiedad "restURL" ni la propiedad "list" del grid');
            error = true;
        }
        if (!this.filters && this.restURL === '') {
            console.error('No se ha especificado la propiedad "filters" del grid');
            error = true;
        }
        if (!this.columns) {
            console.error('No se ha especificado la propiedad "columns" del grid');
            error = true;
        }

        // Si hubo error
        if (error) {
            console.error(this);
            return;
        }

        // Carga las columnas a mostrar
        this.columns.forEach(column => {
            // Sólo carga las que son visibles
            if (!column.hidden) {
                this.displayedColumns.push(column.id);
            }
        });

        // Carga los datos con el refresh
        this.refresh(null, true);
    }

    ngAfterViewInit(): void {}

    refresh(pageEvent?: PageEvent, dontShowPlaceholders?: boolean): void {
        // Actualiza el paginado actual
        if (this.hidePaginator === undefined && this.paginator) {
            this.filters.currentPage = this.paginator.pageIndex + 1;
            this.filters.recordCount = this.paginator.pageSize || 20;
        }

        // Vuelve a pedir los datos al servidor
        if (this.restURL) {
            this.dataSource.load(this.restURL, this.filters);
        } else {
            this.dataSource.loadList(this.list);
        }

        // Limpia la línea actual seleccionada si viene del paginado
        if (pageEvent) {
            this.selectedRow = undefined;
            this.selectedRows = [];

            this.selectedIndex = undefined;
        }
        this.selectedIndexes = [];

        // También limpia la selecciona si es selección múltiple
        if (this.allowMultipleRowSelection) {
            this.selectedRows = [];
        }

        // Emite un nuevo valor con 15 líneas vacías, para que se muestren los placeholders
        if (!dontShowPlaceholders)
            this.dataSource.showLoadingPlaceholders(this.columns);
    }

    sortData(sortEvent: any): void {
        this.dataSource.sort(sortEvent);
    }

    selectRow(row: any, index: number, event: any): void {
        // Si sólo hay que seleccionar 1 línea
        if(!this.allowMultipleRowSelection) {
            // Graba la línea seleccionada
            this.selectedRow = row;
            this.selectedIndex = index;

            // Invoca el evento en el componente padre
            if (this.onlineActivate !== null) {
                this.onlineActivate.emit();
            }

            return;
        }

        // Si hay que seleccionar múltiples líneas
        // Si se presionó Shift
        if (event.shiftKey) {
            this.selectMultipleRowsWithShift(row, index);
        } else if (event.ctrlKey) {
            // Si se presionó Control
            this.selectMultipleRowsWithControl(row, index);
        } else {
            // Elimina el listado previo y agrega el actual
            this.selectedRows = [row];
            this.selectedIndexes = [index];

            // Graba el último índice seleccionado
            this.lastSelectedIndex = index;
        }

        // Invoca el evento en el componente padre
        if (this.onlineActivate !== null) {
            this.onlineActivate.emit();
        }
    }

    private selectMultipleRowsWithShift(row: any, index: number): void {
        // Si no hay elementos seleccionados, tomo desde el 1er item hasta donde tenga seleccionado
        if (this.selectedIndexes.length === 0) {
            // Limpio la selección actual
            this.selectedRows = [];
            this.selectedIndexes = [];

            for(let i = 0; i <= index; i++) {
                this.selectedRows.push(this.dataSource.rows[i]);
                this.selectedIndexes.push(i);
            }
            return;
        }

        // Limpio la selección actual
        this.selectedRows = [];
        this.selectedIndexes = [];

        // Sí hay elementos seleccionados
        // Determina si el índice elegido ahorita es antes del último que se seleccionó
        if (index < this.lastSelectedIndex) {
            // Si es antes, recorro todos los  items desde el último seleccionado hasta el que se seleccionó ahorita
            // (recorro hacia arriba)
            for(let i = this.lastSelectedIndex; i >= index; i--) {
                this.selectedRows.push(this.dataSource.rows[i]);
                this.selectedIndexes.push(i);
            }
        }

        // Determina si el índice elegido ahorita es después del último que se seleccionó
        if (this.lastSelectedIndex < index) {
            // Si es después, recorro todos los  items desde el último seleccionado hasta el que se seleccionó ahorita
            // (recorro hacia abajo)
            for(let i = this.lastSelectedIndex; i <= index; i++) {
                this.selectedRows.push(this.dataSource.rows[i]);
                this.selectedIndexes.push(i);
            }
        }

    }

    private selectMultipleRowsWithControl(row: any, index: number): void {
        // Verifico si el índice ya está agregado
        const agregado = this.selectedIndexes.includes(index);

        // Si no está agregado, añade la línea seleccionada al listado
        if (!agregado) {
            this.selectedRows.push(row);
            this.selectedIndexes.push(index);

            // Graba el último índice seleccionado
            this.lastSelectedIndex = index;
        } else {
            // Si ya está agregado, lo elimina
            this.selectedIndexes.splice(this.selectedIndexes.indexOf(index), 1);

            // Ecuentra el índice de la línea seleccionada
            const rowIndex = this.selectedRows.findIndex(p => JSON.stringify(p) === JSON.stringify(row));
            if (rowIndex >= 0)
                this.selectedRows.splice(rowIndex, 1);
        }
    }

    doDoubleClick(row: any): void {
        // Graba la línea seleccionada
        this.selectedRow = row;

        // Invoca al evento en el componente padre
        if (this.onlineActivate !== null && this.doubleClick) {
            // Quita la selección de texto
            window.getSelection()?.removeAllRanges();
            this.doubleClick.emit();
        }
    }

    compareRows(row: any, index: number): boolean {
        // Si sólo permite seleccionar 1 línea
        if (!this.allowMultipleRowSelection)
            return index === this.selectedIndex;
        else {
            // Si permite seleccionar múltiples líneas
            // Verifico si el índice clickeado está en el arreglo de índices seleccionado
            return this.selectedIndexes.includes(index);
        }
    }

    imageClicked(element: any, column: GridColumn): void {
        this.imageClick.emit({
            image: column.id,
            element
        });
    }

    openMenu(element: any, column: GridColumn): void {
    }

    ngOnDestroy(): void {
        this.dataSource.destroy();
    }

}
