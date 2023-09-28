import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { PagosTrnComponent } from '../pagos-trn/pagos-trn.component';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { GridComponent } from 'src/app/core/components/grid/grid.component';
import { GridColumn, GridDataType } from 'src/app/core/interfaces/GridColumn';
import { GridFilters } from 'src/app/core/interfaces/GridFilters';
import { OperatorType } from 'src/app/core/interfaces/Parameter';
import { DateHelper } from 'src/app/common/helpers/date';

@Component({
  selector: 'app-pagos-pan',
  templateUrl: './pagos-pan.component.html',
  styleUrls: ['./pagos-pan.component.scss']
})
export class PagosPanComponent implements OnInit, OnDestroy {

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
        { name: 'fkFactura.noDocumento', value: '', operator: OperatorType.LIKE },
    ]);

    // Declara la variable que contiene las columnas a mostrar en el grid
    columnas: GridColumn[] = [
        { id: 'fecha', description: 'Fecha' },
        { id: 'suscripcionId', description: 'No. suscripción' },
        { id: 'fkSuscripcion.fkUsuario.nombre', description: 'Nombre' },
        { id: 'noDocumento', description: 'No. documento' },
        { id: 'valor', description: 'Valor', dataType: GridDataType.DECIMAL, prefix: '$' },
    ];

    subscriptions: Subscription = new Subscription();
    @ViewChild(GridComponent) grid: GridComponent;

    constructor(private dialog: MatDialog) {}

    ngOnInit(): void {}

    agregar(): void {
        const dialogRef = this.dialog.open(PagosTrnComponent, {
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

        const dialogRef = this.dialog.open(PagosTrnComponent, {
            width: '600px',
            data: {
                mode: 'upd',
                pagoId: this.grid.selectedRow.pagoId
            }
        });

        this.subscriptions.add(dialogRef.afterClosed()
            .subscribe(result => this.grid.refresh()));
    }

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
    }

}
