import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Material
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon'

// Components
import { ConfirmComponent } from './components/confirm/confirm.component';
import { LoadingComponent } from './components/loading/loading.component';

// Directives
import { ShowLoadingDirective } from './directives/show-loading.directive'
import { NumberDirective } from './directives/number.directive';

@NgModule({
    declarations: [
        ConfirmComponent,
        LoadingComponent,
        ShowLoadingDirective,
        NumberDirective
    ],
    imports: [
        CommonModule,
        MatDialogModule,
        MatIconModule,
    ],
    exports: [
        LoadingComponent,
        ShowLoadingDirective,
        MatDialogModule,
        MatIconModule,
        NumberDirective
    ]
})
export class CorePublicModule { }
