import { Component, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { Empresas } from 'src/app/common/models/empresas';
import { HttpService } from 'src/app/core/services/http.service';
import { CompanyInfoComponent } from '../company-info/company-info.component';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmService } from 'src/app/core/services/confirm.service';
import { NgForm } from '@angular/forms';
import { AddModulesComponent } from '../add-modules/add-modules.component';

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.scss']
})
export class CompaniesComponent implements OnInit, OnDestroy {

    @Output()
    modulesChanged = new EventEmitter<null>();

    loading: boolean;
    loadingGuardar: boolean;
    empresas = [] as Empresas[];
    empresa = {} as Empresas;
    emmpresaId: number;

    subscriptions = new Subscription();

    @ViewChild(NgForm) form: NgForm;

    constructor(private httpService: HttpService,
                private toastr: ToastrService,
                private dialog: MatDialog,
                private confirm: ConfirmService) {}

    ngOnInit(): void {
        this.cargarEmpresas();
    }

    cargarEmpresas(empresaId?: number): void {
        this.emmpresaId = empresaId;

        if (!this.emmpresaId)
            this.loading = true;

        this.subscriptions.add(this.httpService.read<Empresas>('empresas/listar-registradas')
            .subscribe(res => {
                if (!this.emmpresaId)
                    this.loading = false;

                // Si hay que cargar todas las empresas
                if (!this.emmpresaId)
                    this.empresas = res.items;
                else {
                    // Sólo carga la que me dice
                    const currentIndex = this.empresas.findIndex(p => p.empresaId == this.emmpresaId);
                    const newIndex = res.items.findIndex(p => p.empresaId == this.emmpresaId);
                    this.empresas[currentIndex] = res.items[newIndex];
                }

                // Inicializa los módulos para que no vayan en null
                this.empresas.map(p => {
                    if (!p.fkProductos)
                        p.fkProductos = [];
                    return p;
                });
            }
        ));
    }

    agregarEmpresa(): void {
        const dialogRef = this.dialog.open(CompanyInfoComponent, {
            width: '800px',
            data: {
                mode: 'ins',
                title: 'Agregar nueva Empresa',
                okText: 'Agregar Empresa'
            }
        });

        this.subscriptions.add(dialogRef.afterClosed()
            .subscribe((result: number) => {
                // Si se agregó un módulo, recargo la data
                if (result) {
                    this.toastr.success('Se creó la nueva empresa');

                    // Si hay que cobrar una diferencia
                    if (result > 0)
                        this.toastr.warning('Hay que cobrar una diferencia de $ ' + result);

                    this.cargarEmpresas();
                }
            }
        ));
    }

    modificarEmpresa(empresa: Empresas): void {
        const dialogRef = this.dialog.open(CompanyInfoComponent, {
            width: '800',
            data: {
                mode: 'upd',
                empresaId: empresa.empresaId,
                title: 'Actualizar datos de Empresa',
                okText: 'Actualizar datos'
            }
        });

        this.subscriptions.add(dialogRef.afterClosed()
            .subscribe((result: boolean) => {
                // Si se agregó un módulo, recargo la data
                if (result) {
                    this.toastr.success('Se actualizó la información de la empresa seleccionada');
                    this.cargarEmpresas(empresa.empresaId);
                }
            }
        ));
    }

    eliminarEmpresa(empresa: Empresas): void {
        this.subscriptions.add(
            this.confirm.open('¿Está seguro de eliminar esta empresa?\nEsta operación no se puede deshacer.')
                .subscribe(result => {
                    if (!result)
                        return;

                    this.subscriptions.add(this.httpService.delete('empresas/anular', [
                        { name: 'empresaId', value: empresa.empresaId }
                    ]).subscribe(() => {
                        this.toastr.success('Se eliminó la empresa seleccionada');
                        this.cargarEmpresas();
                    }));
                })
        );
    }

    agregarModulos(empresaId: number): void {
        const dialogRef = this.dialog.open(AddModulesComponent, {
            width: '800',
            data: {
                mode: 'ins',
                empresaId
            }
        });

        this.subscriptions.add(dialogRef.afterClosed()
            .subscribe((result: boolean) => {
                // Si se agregó un módulo, recargo la info
                if (result) {
                    this.toastr.success('Se agregaron los módulos seleccionados');
                    this.cargarEmpresas(empresaId);
                    this.modulesChanged.emit(null);
                }
            }
        ));
    }

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
    }
}
