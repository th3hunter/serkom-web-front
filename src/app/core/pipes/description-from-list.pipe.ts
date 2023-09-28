import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'descriptionFromList'
})
export class DescriptionFromListPipe implements PipeTransform {

    transform(listDescription: string, list: any[]): string {
        let description = '';

        // Si es un Id normal
        if (listDescription.indexOf('.') < 0) {
            description = list[listDescription];
        } else {
            // Separo los objetos por el punto
            const objects: string[] = listDescription.split('.');

            // Empiezo con el primer nivel
            let currentObject: any = list;

            // Voy navegando los elementos
            objects.forEach(o => {
                currentObject = currentObject ? currentObject[o] : undefined;
            });

            description = currentObject;
        }

        return description;
    }

}
