import { Pipe, PipeTransform } from '@angular/core';
import { GridColumn } from '../interfaces/GridColumn';

@Pipe({
    name: 'descriptionFromStaticList'
})
export class DescriptionFromStaticListPipe implements PipeTransform {

    transform(column: GridColumn, element: any): unknown {
        let description = '';
        let id = column.id;
        
        // Si es un Id normal
        if (id.indexOf('.') < 0)
            description = column.comboBox.staticList.find(e => e.id === element[id])?.description;
        else {
            // Separo los objetos por el punto
            const objects: string[] = id.split('.');

            // Empiezo con el primer nivel
            let currentObject: any = element;

            // Voy navegando los elementos
            objects.forEach(o => {
                currentObject = currentObject ? currentObject[o] : undefined;
            });

            description = column.comboBox.staticList.find(e => e.id === currentObject?.toString())?.description;
        }

        return description;
    }

}
