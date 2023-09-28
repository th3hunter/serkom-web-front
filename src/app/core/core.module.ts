import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// MATERIAL
import { MatCheckboxModule } from '@angular/material/checkbox'
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatRippleModule } from '@angular/material/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';

// PIPES
import { DescriptionFromElementPipe } from './pipes/description-from-element.pipe';
import { DescriptionFromListPipe } from './pipes/description-from-list.pipe';
import { DescriptionFromStaticListPipe } from './pipes/description-from-static-list.pipe';

// COMPONENTS
import { DialogComponent } from './components/dialog/dialog.component';
import { CorePublicModule } from './core.public.module';
import { GridComponent } from './components/grid/grid.component';
import { PaginatorIntl } from './classes/paginator';
import { AppDateAdapter, AppDateFormats } from './constants/date-formats';

@NgModule({
    declarations: [
        // COMPONENTS
        DialogComponent,
        GridComponent,

        // PIPES
        DescriptionFromListPipe,
        DescriptionFromElementPipe,
        DescriptionFromStaticListPipe,
    ],
    imports: [
        CommonModule,
        CorePublicModule,

        // MATERIAL
        MatCheckboxModule,
        MatTooltipModule,
        MatTableModule,
        MatPaginatorModule,
        MatMenuModule,
        MatButtonModule,
        MatDatepickerModule,
    ],
    exports: [
        // COMPONENTS
        DialogComponent,
        GridComponent,

        // MATERIAL
        MatCheckboxModule,
        MatRippleModule,
        MatTooltipModule,
        MatMenuModule,
        MatButtonModule,
        MatDatepickerModule,

        // PIPES
        DescriptionFromListPipe,
        DescriptionFromElementPipe,
        DescriptionFromStaticListPipe,
    ],
    providers: [
        { provide: MAT_DATE_LOCALE, useValue: 'es-MX' },
        { provide: DateAdapter, useClass: AppDateAdapter, deps: [ MAT_DATE_LOCALE ] },
        { provide: MAT_DATE_FORMATS, useValue: AppDateFormats },
        { provide: MatPaginatorIntl, useClass: PaginatorIntl},
    ]
})
export class CoreModule { }
