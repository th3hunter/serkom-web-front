import { Parameter } from './Parameter';

export class GridFilters {
    currentPage?: number;
    recordCount?: number;
    fields: Parameter[];

    constructor(fields: Parameter[], currentPage?: number, recordCount?: number) {
        this.fields = fields;
        this.currentPage = currentPage;
        this.recordCount = recordCount;
    }

    /**Obtiene un parámetro de la lista */
    getField(name: string): Parameter {
        return this.fields.find(p => p.name === name);
    }

    /**Actualiza el valor de un parámetro */
    updateField(name: string, value: any): void {
        // Busca este parámetro en el filtro actual
        const param = this.fields.find(p => p.name === name);
        
        // Si lo encontró, lo actualiza
        if (param) {
            param.value = value;
        }
    }

    /**Combina los valores de cada parámetro con los de otro filtro */
    combineValues(filter: GridFilters) {
        // Recorre los parámetros del 2do filtro
        for (const param2 of filter.fields) {
            // Busca este parámetro en el filtro actual
            const param1 = this.fields.find(p => p.name === param2.name);

            // Si lo encontró, actualiza su valor
            if (param1) {
                param1.value = param2.value;
                param1.valueTo = param2.valueTo;
                param1.includeInAutomaticFilter = param2.includeInAutomaticFilter;
            } else {
                // Si no lo encontró, lo añade
                this.fields.push(param2);
            }
        }
    }
}
