import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { GridComponent } from 'src/app/core/components/grid/grid.component';
import { GridColumn, GridControlType, GridDataType } from 'src/app/core/interfaces/GridColumn';
import { GridFilters } from 'src/app/core/interfaces/GridFilters';
import { OperatorType } from 'src/app/core/interfaces/Parameter';
import { FacturasTrnComponent } from '../facturas-trn/facturas-trn.component';
import { DateHelper } from 'src/app/common/helpers/date';

@Component({
  selector: 'app-facturas-pan',
  templateUrl: './facturas-pan.component.html',
  styleUrls: ['./facturas-pan.component.scss']
})
export class FacturasPanComponent implements OnInit, OnDestroy {

    // Declara la variable que contendrá los filtros, con sus valores default
    filtros: GridFilters = new GridFilters([
        {
            name: 'fecha',
            value:  DateHelper.currentAsDayjs().add(-30, 'days').toISOString(),
            valueTo: DateHelper.currentAsDayjs().toISOString(),
            operator: OperatorType.BETWEEN
        },
        { name: 'suscripcionId', value: '', operator: OperatorType.EQUAL },
        { name: 'fkSuscripcion.fkUsuario.nombre', value: '', operator: OperatorType.LIKE },
        { name: 'noDocumento', value: '', operator: OperatorType.LIKE },
    ]);

    // Declara la variable que contiene las columnas a mostrar en el grid
    columnas: GridColumn[] = [
        { id: 'fecha', description: 'Fecha' },
        { id: 'noDocumento', description: 'No. Documento' },
        { id: 'suscripcionId', description: 'No. Suscripción' },
        { id: 'fkSuscripcion.fkUsuario.nombre', description: 'Titular' },
        { id: 'total', description: 'Valor', dataType: GridDataType.DECIMAL, prefix: '$' },
        { id: 'pagada', description: 'Pagada', controlType: GridControlType.CHECKBOX },
    ];

    subscriptions: Subscription = new Subscription();
    @ViewChild(GridComponent) grid: GridComponent;

    constructor(private dialog: MatDialog) {}

    ngOnInit(): void {}

    agregar(): void {
        const dialogRef = this.dialog.open(FacturasTrnComponent, {
            width: '600px',
            data: {
                mode: 'ins'
            }
        });

        this.subscriptions.add(dialogRef.afterClosed()
            .subscribe(result => this.grid.refresh()));
    }

    modificar(): void {
        if (!this.grid.selectedRow)
            return;

        const dialogRef = this.dialog.open(FacturasTrnComponent, {
            width: '600px',
            data: {
                mode: 'upd',
                facturaId: this.grid.selectedRow.facturaId
            }
        });

        this.subscriptions.add(dialogRef.afterClosed()
            .subscribe(result => this.grid.refresh()));
    }

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
    }

}
