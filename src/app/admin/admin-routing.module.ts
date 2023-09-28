import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { OverviewComponent } from './overview/overview.component';
import { EmpresasPanComponent } from './empresas/empresas-pan/empresas-pan.component';
import { InstanciasPanComponent } from './instancias/instancias-pan/instancias-pan.component';
import { SuscripcionesPanComponent } from './suscripciones/suscripciones-pan/suscripciones-pan.component';
import { UsuariosPanComponent } from './usuarios/usuarios-pan/usuarios-pan.component';
import { ConfiguracionesPanComponent } from './configuraciones/configuraciones-pan/configuraciones-pan.component';
import { ImpuestosPanComponent } from './impuestos/impuestos-pan/impuestos-pan.component';
import { ProductosPanComponent } from './productos/productos-pan/productos-pan.component';
import { TiposConfiguracionPanComponent } from './tipos-configuracion/tipos-configuracion-pan/tipos-configuracion-pan.component';
import { TiposImpuestoPanComponent } from './tipos-impuesto/tipos-impuesto-pan/tipos-impuesto-pan.component';
import { TiposProductoPanComponent } from './tipos-producto/tipos-producto-pan/tipos-producto-pan.component';
import { FacturasPanComponent } from './facturas/facturas-pan/facturas-pan.component';
import { PagosPanComponent } from './pagos/pagos-pan/pagos-pan.component';

const routes: Routes = [
    {
        path: '',
        component: IndexComponent,
        data: { page: 'index' },
        children: [
            { path: '', component: OverviewComponent, data: { page: 'resumen' } },
            { path: 'empresas', component: EmpresasPanComponent, data: { page: 'empresas' } },
            { path: 'instancias', component: InstanciasPanComponent, data: { page: 'instancias' } },
            { path: 'facturas', component: FacturasPanComponent, data: { page: 'facturas' } },
            { path: 'pagos', component: PagosPanComponent, data: { page: 'pagos' } },
            { path: 'suscripciones', component: SuscripcionesPanComponent, data: { page: 'suscripciones' } },
            { path: 'usuarios', component: UsuariosPanComponent, data: { page: 'usuarios' } },
            { path: 'configuraciones', component: ConfiguracionesPanComponent, data: { page: 'configuraciones' } },
            { path: 'impuestos', component: ImpuestosPanComponent, data: { page: 'impuestos' } },
            { path: 'productos', component: ProductosPanComponent, data: { page: 'productos' } },
            { path: 'tipos-configuraciones', component: TiposConfiguracionPanComponent, data: { page: 'tipos-configuraciones' } },
            { path: 'tipos-impuestos', component: TiposImpuestoPanComponent, data: { page: 'tipos-impuestos' } },
            { path: 'tipos-productos', component: TiposProductoPanComponent, data: { page: 'tipos-productos' } },
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminRoutingModule { }
