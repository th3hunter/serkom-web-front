import { Component, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { GridComponent } from 'src/app/core/components/grid/grid.component';
import { GridColumn } from 'src/app/core/interfaces/GridColumn';
import { GridFilters } from 'src/app/core/interfaces/GridFilters';
import { OperatorType } from 'src/app/core/interfaces/Parameter';

@Component({
    selector: 'app-suscripciones-sel',
    templateUrl: './suscripciones-sel.component.html',
    styleUrls: ['./suscripciones-sel.component.scss']
})
export class SuscripcionesSelComponent implements OnInit, OnDestroy {

    // Declara la variable que contendrá los filtros, con sus valores default
    filtros: GridFilters = new GridFilters([
        { name: 'fkUsuario.nombre', value: '', operator: OperatorType.LIKE },
        { name: 'fkUsuario.email', value: '', operator: OperatorType.LIKE }
    ]);

    // Declara la variable que contiene las columnas a mostrar en el grid
    columnas: GridColumn[] = [
        { id: 'suscripcionId', description: 'No.', primaryKey: true, hidden: true },
        { id: 'fkUsuario.nombre', description: 'Titular' },
        { id: 'fkUsuario.email', description: 'Email' },
        { id: 'estado', description: 'Estado' },
    ];

    // Obtiene el elemento GRID de la vista
    @ViewChild(GridComponent) grid: GridComponent;

    subscriptions: Subscription = new Subscription();

    constructor(public dialogRef: MatDialogRef<SuscripcionesSelComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) {

        // Si vienen los filtros, los pongo
        if (data) {
            // this.filtros.combineValues(data);
        }
    }

    ngOnInit(): void { }

    seleccionar(): void {
        this.dialogRef.close(this.grid.selectedRow);
    }

    cancelar(): void {
        this.dialogRef.close();
    }

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
    }

}
