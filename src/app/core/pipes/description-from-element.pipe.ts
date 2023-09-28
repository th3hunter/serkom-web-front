import { Pipe, PipeTransform } from '@angular/core';
import { GridColumn, GridDataType } from '../interfaces/GridColumn';
import { DateHelper } from 'src/app/common/helpers/date';

@Pipe({
    name: 'descriptionFromElement'
})
export class DescriptionFromElementPipe implements PipeTransform {

    transform(column: GridColumn, element: any[]): unknown {
        let description = '';
        const id = column.id;

        // Si este elemento tiene una función para transformar su contenido, la ejecuto
        if (column.transform) {
            return column.transform(element);
        }

        // Si es un Id normal
        if (id.indexOf('.') < 0) {
            description = element[id]?.toString();
        } else {
            // Separo los objetos por el punto
            const objects: string[] = id.split('.');

            // Empiezo con el primer nivel
            let currentObject: any = element;

            // Voy navegando los elementos
            objects.forEach(o => {
                currentObject = currentObject ? currentObject[o] : undefined;
            });

            description = currentObject?.toString();
        }

        // Aplica el recorte de caracteres
        if (column.maxLenght) {
            if (description && description?.length > column.maxLenght) {
                description = description.substring(0, column.maxLenght) + '...';
            }
        }

        // Si es DECIMAL y no encontró nada, retorno CERO
        if (column.dataType === GridDataType.DECIMAL && !description) {
            description = "0.00";
        }

        // Formatea el string dependiendo del DataType
        if (column.dataType == GridDataType.DECIMAL)
            description = parseFloat(description).toFixed(2);
        if (column.dataType == GridDataType.DATE)
            description = DateHelper.toClientFormat(description);
        if (column.dataType == GridDataType.DATETIME)
            description = DateHelper.toClientTimeFormat(description);

        return description;
    }

}
