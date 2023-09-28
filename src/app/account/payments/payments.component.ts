import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { DateHelper } from 'src/app/common/helpers/date';
import { GridComponent } from 'src/app/core/components/grid/grid.component';
import { GridColumn, GridDataType } from 'src/app/core/interfaces/GridColumn';
import { GridFilters } from 'src/app/core/interfaces/GridFilters';
import { OperatorType } from 'src/app/core/interfaces/Parameter';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.scss']
})
export class PaymentsComponent implements OnInit, OnDestroy {

    // Declara la variable que contendrá los filtros, con sus valores default
    filtros: GridFilters = new GridFilters([
        {
            name: 'fecha',
            value:  DateHelper.currentAsDayjs().add(-30, 'days').toISOString(),
            valueTo: DateHelper.currentAsDayjs().toISOString(),
            operator: OperatorType.BETWEEN
        },
        { name: 'fkFactura.noDocumento', value: '', operator: OperatorType.LIKE },
    ]);

    // Declara la variable que contiene las columnas a mostrar en el grid
    columnas: GridColumn[] = [
        { id: 'fecha', description: 'Fecha' },
        { id: 'noDocumento', description: 'No. factura' },
        { id: 'valor', description: 'Valor', dataType: GridDataType.DECIMAL, prefix: '$' },
    ];

    subscriptions: Subscription = new Subscription();
    @ViewChild(GridComponent) grid: GridComponent;

    constructor(private dialog: MatDialog) {}

    ngOnInit(): void {}

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
    }

}
