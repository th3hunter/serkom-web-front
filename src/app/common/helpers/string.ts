export const StringHelper = {
    /**
     *
     * @returns Genera un GUID
     */
    guid(): string {
        return (1e7 + -1e3 + -4e3 + -8e3 + -1e11).toString().replace(/[018]/g, c =>
            (parseFloat(c) ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> parseFloat(c) / 4).toString(16)
        );
    },
    /**
     * Convierte un objeto a string en formato QueryString
     * @param object El objeto a convertir
     */
    objectToQueryString(object: any): string {
        let queryString: string;
        let keys: string[] = Object.keys(object);
        let queryElements: string[] = [];

        for(let i = 0; i < keys.length; i++) {
            queryElements.push(keys[i] + '=' + object[keys[i]]);
        }

        queryString = queryElements.join('&');

        return queryString;
    },
}
