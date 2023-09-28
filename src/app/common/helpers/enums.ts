import { StaticList } from "src/app/core/interfaces/GridColumn";

export const EnumHelper = {
    /**
     * Convierte un Enum a un arreglo iterable
     * @param enum El tipo de dato Enum
     * @param addEmptyItem Añadir un item vacío al principio de la lista
     * @returns Un arreglo string
     */
    toList(e: any, emptyItem?: string): StaticList[] {
        const list = [] as StaticList[];

        if (emptyItem) {
            list.push({
                id: '',
                description: emptyItem
            });
        }

        for (const item of Object.keys(e)) {
            list.push({
                id: item,
                description: e[item]
            });
        }

        return list;
    },
    /**
     * Retorna una lista genérica de estados Activo/Inactivo
     * @returns Un arreglo
     */
    toGenericStatusList(): StaticList[] {
        return [
            { id: '1', description: 'Activo' },
            { id: '0', description: 'Inactivo' },
        ];
    }
}
