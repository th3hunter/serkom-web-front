import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ProductosTrnComponent } from '../productos-trn/productos-trn.component';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { GridComponent } from 'src/app/core/components/grid/grid.component';
import { GridColumn, GridDataType } from 'src/app/core/interfaces/GridColumn';
import { GridFilters } from 'src/app/core/interfaces/GridFilters';
import { OperatorType } from 'src/app/core/interfaces/Parameter';

@Component({
  selector: 'app-productos-pan',
  templateUrl: './productos-pan.component.html',
  styleUrls: ['./productos-pan.component.scss']
})
export class ProductosPanComponent implements OnInit, OnDestroy {

    // Declara la variable que contendrá los filtros, con sus valores default
    filtros: GridFilters = new GridFilters([
        { name: 'nombre', value: '', operator: OperatorType.LIKE },
    ]);

    // Declara la variable que contiene las columnas a mostrar en el grid
    columnas: GridColumn[] = [
        { id: 'nombre', description: 'Nombre' },
        { id: 'codigo', description: 'Codigo' },
        { id: 'pvp', description: 'Pvp', dataType: GridDataType.DECIMAL, prefix: '$' },
        { id: 'estado', description: 'Estado' },
    ];

    subscriptions: Subscription = new Subscription();
    @ViewChild(GridComponent) grid: GridComponent;

    constructor(private dialog: MatDialog) {}

    ngOnInit(): void {}

    agregar(): void {
        const dialogRef = this.dialog.open(ProductosTrnComponent, {
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

        const dialogRef = this.dialog.open(ProductosTrnComponent, {
            width: '600px',
            data: {
                mode: 'upd',
                productoId: this.grid.selectedRow.productoId
            }
        });

        this.subscriptions.add(dialogRef.afterClosed()
            .subscribe(result => this.grid.refresh()));
    }

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
    }

}
