import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { GridFilters } from '../interfaces/GridFilters';
import { Sort } from '@angular/material/sort';
import { GridColumn } from '../interfaces/GridColumn';
import { HttpService } from '../services/http.service';
import { isPlatformBrowser } from '@angular/common';
import { Inject, PLATFORM_ID } from '@angular/core';

export class GenericDataSource implements DataSource<any> {

    private subject = new BehaviorSubject<any[]>([]);
    private loadingSubject = new BehaviorSubject<boolean>(false);

    public loading = this.loadingSubject.asObservable();
    public recordCount = 0;
    public rows = [];

    private subscriptions: Subscription = new Subscription();

    constructor(private httpService: HttpService,
                @Inject(PLATFORM_ID) private platformId: any) {}

    connect(collectionViewer: CollectionViewer): Observable<any[]> {
        return this.subject.asObservable();
    }

    disconnect(collectionViewer: CollectionViewer): void {
        this.subject.complete();
    }

    /**
     * Carga el datasource de un REST service
     * */
    load(serviceURI: string, filters: GridFilters): void {
        if (!isPlatformBrowser(this.platformId))
            return;

        // Notifica al loading que se está cargando la información
        this.loadingSubject.next(true);

        this.subscriptions.add(this.httpService.getDataProvider<any>(serviceURI, filters)
            .subscribe(res => {
                // Si vino respuesta
                if (res) {
                    this.recordCount = res.recordCount || 0;
                    this.rows = res.items;

                    this.subject.next(res.items);
                    this.loadingSubject.next(false);
                } else {
                    this.recordCount = 0;
                    this.subject.next([]);

                    // Notifica al loading que se terminó de cargar la información
                    this.loadingSubject.next(false);
                }
            })
        );
    }

    /**
     * Carga el datasource de una lista en memoria
     * */
    loadList(list: any[]): void {
        this.loadingSubject.next(true);
        this.recordCount = list ? list.length : 0;
        this.subject.next(list);
        this.loadingSubject.next(false);
    }

    /**
     * Ordena el arreglo actual que contiene el subject
     * @param sort El evento Sort emitido por el componente MatTable
     */
    sort(sort: Sort): void {
        let sortedData = [];

        if (!sort.active || sort.direction === '') {
            sortedData = this.subject.value;;
            return;
        }

        const isAsc = sort.direction === 'asc';

        sortedData = this.subject.value.sort((a, b) => {
            let firstValue = a[sort.active];
            let secondValue = b[sort.active];

            // Si NO es un Id normal
            if (sort.active.indexOf('.') >= 0) {
                // Separo los objetos por el punto
                const objects: string[] = sort.active.split('.');

                // Empiezo con el primer nivel
                let currentFirstObject = a;
                let currentSecondObject = b;

                // Voy navegando los elementos
                objects.forEach(o => {
                    currentFirstObject = currentFirstObject[o];
                    currentSecondObject = currentSecondObject[o];
                });

                firstValue = currentFirstObject?.toString();
                secondValue = currentSecondObject?.toString();
            }
            return this.compare(firstValue, secondValue, isAsc);
        });

        this.subject.next(sortedData);
    }

    private compare(a: number | string, b: number | string, isAsc: boolean): number {
        return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
    }

    /**
     * Crea una lista falsa de items para renderizar en el grid, mientras se están cargandno los datos de la API
     * @param columns La definición de las columnas que se van a mostrar en el grid
     */
    showLoadingPlaceholders(columns: GridColumn[]): void {
        const fakeList = [];

        for (let index = 0; index < 1; index++) {
            const element: any = {};

            // Inicializa cada propiedad, para evitar errores
            for (const column of columns) {
                element[column.id] = undefined;
            }

            fakeList.push(element);
        }

        this.subject.next(fakeList);
    }

    destroy(): void {
        this.subscriptions.unsubscribe();
    }
}
