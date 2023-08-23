import * as dayjs from 'dayjs';
import 'dayjs/locale/es';
import * as isLeapYear from 'dayjs/plugin/isLeapYear' ;

dayjs.extend(isLeapYear);
dayjs.locale('es');

const dateFormat = 'YYYY-MM-DD';
const clientDateFormat = 'DD/MM/YYYY';
const serverDateFormat = 'YYYY-MM-DDTHH:mm:ss';

/**
 * Utilidades para trabajar con fechas
 */
export const DateHelper = {
    toClientFormat(date?: Date | string): string {
        if (!date) {
            return dayjs().format(clientDateFormat);
        } else {
            return dayjs(date).format(clientDateFormat);
        }
    },
    current(): dayjs.Dayjs {
        return dayjs();
    },
    currentAsString(): string {
        return dayjs().format(dateFormat);
    },
    currentAsDayjs(): dayjs.Dayjs {
        return dayjs().set('hours', 0).set('minutes', 0).set('seconds', 0).set('milliseconds', 0);
    },
    toServerFormat(date: Date): string {
        return dayjs(date).format(serverDateFormat);
    },
    fromServerFormat(dateString: string): Date {
        return dayjs(dateString).toDate();
    },
    combineDateAndTime(date: string, time: string): string {
        const datePart = dayjs(date);

        return datePart.format('YYYY-MM-DD') + 'T' + time;
    },
    extractTime(dateTime: string | Date): string {
        return dayjs(dateTime).format('HH:mm');
    },
    currentTime(): string {
        return dayjs().format('HH:mm');
    },
    /**
     * Formatea un timestamp a una fecha corta legible
     * @param date La fecha a ser formateada
     * @returns La fecha formateada como Hoy|Ayer|dd/MM|yyyy hh:mm
     */
    shortDate(date: string | Date): string {
        let fechaString: string;

        // Transforma el timestamp en date
        const datePart = dayjs(date);
        const hoy = dayjs();
        const hora = datePart.format('HH:mm');

        // Verifica la diferencia
        const diasDiferencia = hoy.diff(date, 'days');

        // Si es el mismo dia
        if (diasDiferencia === 0) {
            fechaString = 'Hoy';
        }

        // Si es ayer
        if (diasDiferencia === 1) {
            fechaString = 'Ayer';
        }

        // Si es mañana
        if (diasDiferencia === -1) {
            fechaString = 'Mañana';
        }

        // Si es mayor
        if (diasDiferencia > 1 || diasDiferencia < -1) {
            // Si es del mismo año
            if (datePart.year() === hoy.year()) {
                // Pongo la fecha sin el año
                fechaString = datePart.format('DD MMM');
            } else {
                // Si no es el mismo año, pongo la fecha completa
                fechaString = datePart.format('DD MMM YYYY');
            }
        }

        // Adjunto la hora y retorno
        return fechaString + ' ' + hora;
    },
    /**
     * Formatea la fecha actual a un formato a ser utilizado en nombres de archivos (YYYYMMDD_HHmmSS)
     * @returns La fecha actual formateada.
     */
    fileFormat(): string {
        return dayjs().format('YYYYMMDD_HHmmss');
    },
    /**
     * Realiza una operación de adición a una fecha dada
     * @param date La fecha sobre la cual realizar la adición
     * @param value La cantidad a añadir
     * @param unit La unidad de fecha en la que se va a añadir la cantidad
     * @returns La nueva fecha
     */
    add(date: string | Date, value: number, unit: dayjs.ManipulateType): Date {
        return dayjs(date).add(value, unit).toDate();
    },
    /**
     * Convierte un string a Date
     * @param date El string a convertir en fecha
     * @returns Un objeto tipo Date
     */
    stringToDate(date: string | Date): Date {
        return dayjs(date).toDate();
    },
    /**
     * Calcula la edad según la fecha de nacimiento
     * @param date La fecha de nacimento
     */
    age(date: string | Date): number {
        if (!date)
            return 0;

        return dayjs(new Date()).diff(date, 'year');
    }
};
