import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AdminRoutingModule } from './admin-routing.module';
import { CorePublicModule } from '../core/core.public.module';
import { CoreModule } from '../core/core.module';

import { IndexComponent } from './index/index.component';
import { OverviewComponent } from './overview/overview.component';
import { EmpresasPanComponent } from './empresas/empresas-pan/empresas-pan.component';
import { EmpresasTrnComponent } from './empresas/empresas-trn/empresas-trn.component';
import { SuscripcionesSelComponent } from './suscripciones/suscripciones-sel/suscripciones-sel.component';
import { InstanciasPanComponent } from './instancias/instancias-pan/instancias-pan.component';
import { InstanciasTrnComponent } from './instancias/instancias-trn/instancias-trn.component';
import { SuscripcionesPanComponent } from './suscripciones/suscripciones-pan/suscripciones-pan.component';
import { SuscripcionesTrnComponent } from './suscripciones/suscripciones-trn/suscripciones-trn.component';
import { UsuariosSelComponent } from './usuarios/usuarios-sel/usuarios-sel.component';
import { UsuariosPanComponent } from './usuarios/usuarios-pan/usuarios-pan.component';
import { UsuariosTrnComponent } from './usuarios/usuarios-trn/usuarios-trn.component';
import { ConfiguracionesPanComponent } from './configuraciones/configuraciones-pan/configuraciones-pan.component';
import { ConfiguracionesTrnComponent } from './configuraciones/configuraciones-trn/configuraciones-trn.component';
import { ImpuestosPanComponent } from './impuestos/impuestos-pan/impuestos-pan.component';
import { ImpuestosTrnComponent } from './impuestos/impuestos-trn/impuestos-trn.component';
import { ProductosPanComponent } from './productos/productos-pan/productos-pan.component';
import { ProductosTrnComponent } from './productos/productos-trn/productos-trn.component';
import { TiposConfiguracionPanComponent } from './tipos-configuracion/tipos-configuracion-pan/tipos-configuracion-pan.component';
import { TiposConfiguracionTrnComponent } from './tipos-configuracion/tipos-configuracion-trn/tipos-configuracion-trn.component';
import { TiposImpuestoPanComponent } from './tipos-impuesto/tipos-impuesto-pan/tipos-impuesto-pan.component';
import { TiposImpuestoTrnComponent } from './tipos-impuesto/tipos-impuesto-trn/tipos-impuesto-trn.component';
import { TiposProductoPanComponent } from './tipos-producto/tipos-producto-pan/tipos-producto-pan.component';
import { TiposProductoTrnComponent } from './tipos-producto/tipos-producto-trn/tipos-producto-trn.component';
import { FacturasPanComponent } from './facturas/facturas-pan/facturas-pan.component';
import { FacturasTrnComponent } from './facturas/facturas-trn/facturas-trn.component';
import { PagosPanComponent } from './pagos/pagos-pan/pagos-pan.component';
import { PagosTrnComponent } from './pagos/pagos-trn/pagos-trn.component';

@NgModule({
    declarations: [
        IndexComponent,
        OverviewComponent,
        EmpresasPanComponent,
        EmpresasTrnComponent,
        SuscripcionesSelComponent,
        InstanciasPanComponent,
        InstanciasTrnComponent,
        SuscripcionesPanComponent,
        SuscripcionesTrnComponent,
        UsuariosSelComponent,
        UsuariosPanComponent,
        UsuariosTrnComponent,
        ConfiguracionesPanComponent,
        ConfiguracionesTrnComponent,
        ImpuestosPanComponent,
        ImpuestosTrnComponent,
        ProductosPanComponent,
        ProductosTrnComponent,
        TiposConfiguracionPanComponent,
        TiposConfiguracionTrnComponent,
        TiposImpuestoPanComponent,
        TiposImpuestoTrnComponent,
        TiposProductoPanComponent,
        TiposProductoTrnComponent,
        FacturasPanComponent,
        FacturasTrnComponent,
        PagosPanComponent,
        PagosTrnComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        AdminRoutingModule,
        CorePublicModule,
        CoreModule
    ]
})
export class AdminModule { }
