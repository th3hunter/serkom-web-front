import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ImpuestosTrnComponent } from '../impuestos-trn/impuestos-trn.component';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { GridComponent } from 'src/app/core/components/grid/grid.component';
import { GridColumn, GridDataType } from 'src/app/core/interfaces/GridColumn';
import { GridFilters } from 'src/app/core/interfaces/GridFilters';
import { OperatorType } from 'src/app/core/interfaces/Parameter';

@Component({
  selector: 'app-impuestos-pan',
  templateUrl: './impuestos-pan.component.html',
  styleUrls: ['./impuestos-pan.component.scss']
})
export class ImpuestosPanComponent implements OnInit, OnDestroy {

    // Declara la variable que contendrá los filtros, con sus valores default
    filtros: GridFilters = new GridFilters([
        { name: 'nombre', value: '', operator: OperatorType.LIKE },
    ]);

    // Declara la variable que contiene las columnas a mostrar en el grid
    columnas: GridColumn[] = [
        { id: 'nombre', description: 'Nombre' },
        { id: 'codigo', description: 'Código' },
        { id: 'porcentaje', description: 'Porcentaje', dataType: GridDataType.DECIMAL, suffix: '%' },
        { id: 'estado', description: 'Estado' },
    ];

    subscriptions: Subscription = new Subscription();
    @ViewChild(GridComponent) grid: GridComponent;

    constructor(private dialog: MatDialog) {}

    ngOnInit(): void {}

    agregar(): void {
        const dialogRef = this.dialog.open(ImpuestosTrnComponent, {
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

        const dialogRef = this.dialog.open(ImpuestosTrnComponent, {
            width: '600px',
            data: {
                mode: 'upd',
                impuestoId: this.grid.selectedRow.impuestoId
            }
        });

        this.subscriptions.add(dialogRef.afterClosed()
            .subscribe(result => this.grid.refresh()));
    }

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
    }

}
