import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Productos } from 'src/app/common/models/productos';
import { CarritoService } from 'src/app/core/services/carrito.service';
import { HttpService } from 'src/app/core/services/http.service';

@Component({
  selector: 'app-plans',
  templateUrl: './plans.component.html',
  styleUrls: ['./plans.component.scss']
})
export class PlansComponent implements OnInit {

    plans: Productos[] = [];

    subscriptions: Subscription = new Subscription();

    constructor(private httpService: HttpService,
                public carrito: CarritoService) {}

    ngOnInit(): void {
        this.subscriptions.add(this.httpService.get<Productos>('productos/listar-planes')
            .subscribe(res => {
                this.plans = res.items;
            }));
    }

    agregarPlan(plan: Productos) {
        this.carrito.añadirItem(plan);
    }

    quitarPlan(plan: Productos) {
        this.carrito.quitarItem(plan);
    }

}
