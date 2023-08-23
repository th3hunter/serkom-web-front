import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Productos } from "src/app/common/models/productos";

@Injectable({
    providedIn: 'root'
})
export class CarritoService {

    private _items$: Subject<Productos[]> = new Subject<Productos[]>();

    /**
     * La lista de productos añadidos al carrito
     */
    items: Productos[] = [];

    /**
     * El catálogo de Productos disponibles
     */
    public catalogo: Productos[];

    /**
     * Añade un producto al carrito
     */
    añadirItem(item: Productos): void {
        this.items.push(item);
        item.seleccionado = true;
        this._items$.next(this.items);
    }

    /**
     * Elimina un item del carrito
     */
    quitarItem(item: Productos): void {
        this.items.splice(this.items.indexOf(item), 1);
        item.seleccionado = false;
        this._items$.next(this.items);
    }

}
