import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Material
import { MatDialogModule } from '@angular/material/dialog';

// Components
import { ConfirmComponent } from './components/confirm/confirm.component';
import { LoadingComponent } from './components/loading/loading.component';
import { ShowLoadingDirective } from './directives/show-loading.directive'

@NgModule({
    declarations: [
        ConfirmComponent,
        LoadingComponent,
        ShowLoadingDirective
    ],
    imports: [
        CommonModule,
        MatDialogModule,
    ],
    exports: [
        LoadingComponent,
        ShowLoadingDirective
    ]
})
export class CorePublicModule { }
