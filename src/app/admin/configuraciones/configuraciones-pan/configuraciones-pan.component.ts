import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ConfiguracionesTrnComponent } from '../configuraciones-trn/configuraciones-trn.component';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { GridComponent } from 'src/app/core/components/grid/grid.component';
import { GridColumn } from 'src/app/core/interfaces/GridColumn';
import { GridFilters } from 'src/app/core/interfaces/GridFilters';
import { OperatorType } from 'src/app/core/interfaces/Parameter';

@Component({
  selector: 'app-configuraciones-pan',
  templateUrl: './configuraciones-pan.component.html',
  styleUrls: ['./configuraciones-pan.component.scss']
})
export class ConfiguracionesPanComponent implements OnInit, OnDestroy {

    // Declara la variable que contendrá los filtros, con sus valores default
    filtros: GridFilters = new GridFilters([
        { name: 'tipoConfiguracionId', value: '', operator: OperatorType.LIKE },
        { name: 'configuracionId', value: '', operator: OperatorType.LIKE },
    ]);

    // Declara la variable que contiene las columnas a mostrar en el grid
    columnas: GridColumn[] = [
        { id: 'tipoConfiguracionId', description: 'Tipo' },
        { id: 'configuracionId', description: 'Configuracion' },
        { id: 'descripcion', description: 'Descripcion' },
        { id: 'valor', description: 'Valor' },
    ];

    subscriptions: Subscription = new Subscription();
    @ViewChild(GridComponent) grid: GridComponent;

    constructor(private dialog: MatDialog) {}

    ngOnInit(): void {}

    agregar(): void {
        const dialogRef = this.dialog.open(ConfiguracionesTrnComponent, {
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

        const dialogRef = this.dialog.open(ConfiguracionesTrnComponent, {
            width: '600px',
            data: {
                mode: 'upd',
                tipoConfiguracionId: this.grid.selectedRow.tipoConfiguracionId,
                configuracionId: this.grid.selectedRow.configuracionId
            }
        });

        this.subscriptions.add(dialogRef.afterClosed()
            .subscribe(result => this.grid.refresh()));
    }

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
    }

}
