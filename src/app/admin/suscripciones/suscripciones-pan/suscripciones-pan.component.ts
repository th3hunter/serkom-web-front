import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { SuscripcionesTrnComponent } from '../suscripciones-trn/suscripciones-trn.component';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { GridComponent } from 'src/app/core/components/grid/grid.component';
import { GridColumn, GridDataType } from 'src/app/core/interfaces/GridColumn';
import { GridFilters } from 'src/app/core/interfaces/GridFilters';
import { OperatorType } from 'src/app/core/interfaces/Parameter';

@Component({
  selector: 'app-suscripciones-pan',
  templateUrl: './suscripciones-pan.component.html',
  styleUrls: ['./suscripciones-pan.component.scss']
})
export class SuscripcionesPanComponent implements OnInit, OnDestroy {

    // Declara la variable que contendrá los filtros, con sus valores default
    filtros: GridFilters = new GridFilters([
        { name: 'fkUsuario.nombre', value: '', operator: OperatorType.LIKE },
    ]);

    // Declara la variable que contiene las columnas a mostrar en el grid
    columnas: GridColumn[] = [
        { id: 'suscripcionId', description: 'No.' },
        { id: 'fkUsuario.nombre', description: 'Titular' },
        { id: 'fechaProximoPago', description: 'Próximo pago', dataType: GridDataType.DATETIME },
        { id: 'valorProximoPago', description: 'Valor', dataType: GridDataType.DECIMAL, prefix: '$' },
        { id: 'estado', description: 'Estado' },
    ];

    subscriptions: Subscription = new Subscription();
    @ViewChild(GridComponent) grid: GridComponent;

    constructor(private dialog: MatDialog) {}

    ngOnInit(): void {}

    agregar(): void {
        const dialogRef = this.dialog.open(SuscripcionesTrnComponent, {
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

        const dialogRef = this.dialog.open(SuscripcionesTrnComponent, {
            width: '600px',
            data: {
                mode: 'upd',
                suscripcionId: this.grid.selectedRow.suscripcionId
            }
        });

        this.subscriptions.add(dialogRef.afterClosed()
            .subscribe(result => this.grid.refresh()));
    }

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
    }

}
