import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, EMPTY } from 'rxjs';
import { map, catchError, delay } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { GridFilters } from '../interfaces/GridFilters';
import { environment } from '../../../environments/environment';
import { Worker } from '../classes/Worker';
import { Request } from '../interfaces/Request';
import { DataType, OperatorType, Parameter } from '../interfaces/Parameter';
import { Response } from '../interfaces/Response';
import * as fileSaver from 'file-saver';
import { ConfirmService } from './confirm.service';
import { DateHelper } from 'src/app/common/helpers/date';
import { isPlatformBrowser } from '@angular/common';

// Define la interfaz para establecer las opciones en las peticiones REST
interface HttpOptions {
    headers: any;
    observe: any;
    withCredentials: boolean;
    responseType: 'json';
    reportProgress?: boolean;
}

interface HttpOptionsBlob {
    headers: any;
    observe: any;
    withCredentials: boolean;
    responseType: 'blob';
}

/**
 * Realiza operaciones relacionadas a la API del sistema.
 */
@Injectable({
    providedIn: 'root'
})
export class HttpService {

    public API_URI = environment.apiUrl;

    constructor(private http: HttpClient,
                private confirm: ConfirmService,
                private toastr: ToastrService,
                private router: Router,
                @Inject(PLATFORM_ID) private platformId: any) { }

    private opcionesHttp(): HttpOptions {
        const httpOptions: HttpOptions = {
            // Añade a cada request el token en el header
            headers: {
                Authorization: localStorage.getItem('token') || '',
                EmpresaId: localStorage.getItem('empresaId') || '',
                SucursalId: localStorage.getItem('sucursalId') || '',
            },
            observe: 'response' as 'body',
            withCredentials: true,
            responseType: 'json'
        };

        return httpOptions;
    }

    private opcionesHttpBlob(): HttpOptionsBlob {
        const httpOptions: HttpOptionsBlob = {
            // Añade a cada request el token en el header
            headers: {
                Authorization: localStorage.getItem('token') || '',
                EmpresaId: localStorage.getItem('empresaId') || '',
                SucursalId: localStorage.getItem('sucursalId') || '',
            },
            observe: 'response' as 'body',
            withCredentials: true,
            responseType: 'blob'
        };

        return httpOptions;
    }

    // Antes de retornar la respuesta del servidor al objeto que invocó la función,
    // verifico si expiró la sesión
    private verificarTokenValido<T>(observable: Observable<any>, trabajando?: Worker): Observable<Response<T>> {
        if (trabajando) { trabajando.working = true; }

        return observable.pipe<Response<T>, Response<T>>(
            // Defino un retraso en cada petición para emular baja velocidad de conexión
            // delay(1000),
            // Si no hubo errores, retorno el body de la respuesta
            map((res: HttpResponse<any>) => {
                if (trabajando) { trabajando.working = false; }

                // Obtengo la respuesta del servidor
                const response: Response<T> = res.body;

                if (!environment.production) console.log(response);

                // Si hubo algún error
                if (response?.code >= 400) {
                    // Si la sesión ya expiró
                    if (response.code === 401) {
                        // Redirecciono al login
                        this.router.navigate(['/login']);
                        this.toastr.error(response.text);
                    } else {
                        // Para el resto de códigos, muestro un mensaje con el error
                        this.toastr.error(response.text);
                    }
                }

                // Igual retorno el response para que lo procese el llamador
                return response;
            }),
            // Si hubo errores, verifico qué tipo de error fue
            catchError((err: any, caught: Observable<any>) => {
                if (trabajando) { trabajando.working = false; }

                // Si no ha iniciado sesión o el token es inválido o expiró
                if (err.status === 403 || err.status === 401) {
                    // Redirecciono al login
                    this.router.navigate(['/401']);
                } else {
                    // Para el resto de errores, grabo el error en la consola
                    console.error(err);

                    // Añade el url al error
                    if (err.error) {
                        err.error.Url = err.url;
                    } else {
                        // Arma el error con los datos que se tengan
                        err.error = {
                            Code: err.status,
                            Url: err.url,
                            Content: [ { Message: err.message } ]
                        };
                    }

                    // Muestro un mensaje con el error devuelto por el servidor
                    this.toastr.error('Ocurrió un error grave. Da click aquí para más información.', '', {
                        tapToDismiss: false,
                    }).onTap.subscribe(() => {
                        const errorDetail = err.error.Content.pop();

                        // Arma el mensaje de error
                        const text = `Code:\n${err.status}\n\n` +
                            `Url:\n${err.url}\n\n` +
                            `Classname:\n${errorDetail.ClassName}\n\n` +
                            `Message:\n${errorDetail.Message}\n\n` +
                            `ParamName:\n${errorDetail.ParamName}\n\n` +
                            `Source:\n${errorDetail.Source}\n\n` +
                            `StackTraceString:\n${errorDetail.StackTraceString}`;

                        this.confirm.open(text);
                    });
                }

                return EMPTY;
            })
        );
    }

    convertirParametrosEnString(parameters: Parameter[]): void {
        // Convierte todos los valores a string
        if (parameters) {
            parameters.forEach(param => {
                if (param.value != undefined && param.value != null) {
                    param.value = param.value.toString();
                }

                // También verifica que se manden todos los atributos
                param.operator = param.operator || OperatorType.EQUAL;
                param.dataType = param.dataType || DataType.STRING;
            });
        }
    }

    /**
     * Obtiene un DataProvider para acoplarlo a un grid.
     * @param serviceURI URL del EndPoint.
     * @param filters Filtros a aplicar.
     * @returns Observable de tipo `Response`.
     */
    getDataProvider<T>(serviceURI: string, filters?: GridFilters): Observable<Response<T>> {
        // Arma la URL
        const URL = `${this.API_URI}${serviceURI}`;
        let parameters: Parameter[] = [];

        if (filters){
            // Copia los parametros a una nueva variable
            parameters = JSON.parse(JSON.stringify(filters.fields));

            // Añade el paginado
            if (filters.currentPage > 0) {
                parameters.push({ name: 'pageNumber', value: filters.currentPage });
            }
            if (filters.recordCount > 0) {
                parameters.push({ name: 'offset', value: filters.recordCount });
            }

            // Convierte todos los valores a string
            this.convertirParametrosEnString(parameters);
        }

        // Arma el body
        const request: Request = {
            parameters
        };

        if (!environment.production) console.log(URL, request);

        return this.verificarTokenValido<T>(
            this.http.post(URL, request, this.opcionesHttp())
        );
    }

    /**
     * Realiza una petición POST genérica.
     * @param serviceURI URL del EndPoint
     * @param parametros Array de parámetros
     * @param data Información para enviar en el POST
     * @returns Observable de tipo `Response`.
     */
    post<T>(serviceURI: string, parametros?: Parameter[], data?: any): Observable<Response<T>> {
        if (!isPlatformBrowser(this.platformId))
            return new Observable<Response<T>>();

        // Arma la URL y el querystring con el objeto params que recibo
        const URL = `${this.API_URI}${serviceURI}`;

        // Arma el request
        const request: Request = {
            parameters: parametros,
            data
        };

        // Convierte todos los valores a string
        this.convertirParametrosEnString(request.parameters);

        // Convierte la data en string
        request.data = JSON.stringify(request.data);

        if (!environment.production) console.log(URL, request);

        return this.verificarTokenValido(
            this.http.post(URL, request, this.opcionesHttp())
        );
    }

    /**
     * Realiza una petición GET genérica.
     * @param serviceURI URL del EndPoint
     * @returns Observable de tipo `Response`.
     */
    get<T>(serviceURI: string, data?: any): Observable<Response<T>> {
        if (!isPlatformBrowser(this.platformId))
            return new Observable<Response<T>>();

        // Arma la URL y el querystring con el objeto params que recibo
        const URL = `${this.API_URI}${serviceURI}`;

        if (!environment.production) console.log(URL);

        return this.http.get<Response<T>>(URL);
    }

    /**
     * Obtiene un listado de registros.
     * @param serviceURI URL del EndPoint
     * @param parametros Array de parámetros
     * @returns Observable de tipo `Response`.
     */
    list<T>(serviceURI: string, parameters?: Parameter[]): Observable<Response<T>> {
        // Arma la URL
        const URL = `${this.API_URI}${serviceURI}`;

        // Arma el request
        const request: Request = {
            parameters
        };

        // Convierte todos los valores a string
        this.convertirParametrosEnString(request.parameters);

        if (!environment.production) console.log(URL, request);

        return this.verificarTokenValido(
            this.http.post(URL, request, this.opcionesHttp())
        );
    }

    /**
     * Realiza un INSERT de datos.
     * @param serviceURI URL del EndPoint
     * @param data Información para enviar en el POST
     * @returns Observable de tipo `Response`.
     */
    create<T>(serviceURI: string, data: any): Observable<Response<T>> {
        // Arma la URL y el querystring con el objeto primaryKey que recibo
        const URL = `${this.API_URI}${serviceURI}`;

        // Arma el request
        const request: Request = {
            data
        };

        // Convierte todos los valores a string
        this.convertirParametrosEnString(request.parameters);

        if (!environment.production) console.log(URL, request);

        // Convierte la data en string
        request.data = JSON.stringify(request.data);

        return this.verificarTokenValido(
            this.http.post(URL, request, this.opcionesHttp())
        );
    }

    /**
     * Muestra un único registro.
     * @param serviceURI URL del EndPoint
     * @param primaryKey Array de parámetros
     * @returns Observable de tipo `Response`.
     */
    read<T>(serviceURI: string, primaryKey?: Parameter[]): Observable<Response<T>> {
        return this.list(serviceURI, primaryKey);
    }

    /**
     * Realiza un UPDATE de un registro.
     * @param serviceURI URL del EndPoint
     * @param data Información para enviar en el POST
     * @returns Observable de tipo `Response`.
     */
    update<T>(serviceURI: string, data: any): Observable<Response<T>> {
        return this.create(serviceURI, data);
    }

    /**
     * Elimina un registro.
     * @param serviceURI URL del EndPoint
     * @param primaryKey Array de parámetros
     * @returns Observable de tipo `Response`.
     */
    delete<T>(serviceURI: string, primaryKey: any[]): Observable<Response<T>> {
        return this.list(serviceURI, primaryKey);
    }

    /**
     * Realiza una petición para descargar un archivo.
     * @param serviceURI URL del EndPoint
     * @param parameters Array de parámetros
     * @param contentType Tipo de contenido
     * @param extension Extensión del archivo a descargar
     * @param filename Nombre del archivo a descargar
     * @returns Observable de tipo `any` que contiene el archivo a guardar.
     */
    download(serviceURI: string, parameters: Parameter[], contentType: string, extension: string, filename?: string): Observable<any> {
        // Arma la URL y el querystring con el objeto primaryKey que recibo
        const URL = `${this.API_URI}${serviceURI}`;

        // Arma el request
        const request: Request = {
            parameters
        };

        // Convierte todos los valores a string
        this.convertirParametrosEnString(request.parameters);

        if (!environment.production) console.log(URL, request);

        // Si no viene el nombre de archivo, lo genero
        if (!filename) {
            filename = `${DateHelper.fileFormat()}.${extension}`;
        } else {
            filename = `${filename}.${extension}`;
        }

        return this.http.post(URL, request, this.opcionesHttpBlob()).pipe(
            map((res: any) => {
                const blob: any = res.body;
                const url = window.URL.createObjectURL(blob);

                fileSaver.saveAs(url, filename);
            }),
            // Si hubo errores, verifico qué tipo de error fue
            catchError((err: HttpResponse<any>, caught) => {
                // Si no ha iniciado sesión o el token es inválido o expiró
                if (err.status === 403 || err.status === 401) {
                    // Redirecciono al login
                    this.router.navigate(['/403']);
                } else {
                    // Para el resto de errores, grabo el error en la consola
                    console.error(err);

                    // Muestro un mensaje con el error devuelto por el servidor
                    this.toastr.error(err.statusText);
                }

                return EMPTY;
            })

        );
    }

    /**
     * Envía uno o varios archivos al endpoint especificado
     * @param serviceURI URL del endpoint
     * @param formData La data del Form a enviar. Pueden enviarse varios archivos, o datos adicionales.
     * @returns Observable de tipo `Response`.
     */
    uploadFile<T>(serviceURI: string, formData: FormData): Observable<Response<T>> {
        // Arma la URL y el querystring con el objeto params que recibo
        const URL = `${this.API_URI}${serviceURI}`;

        if (!environment.production) console.log(URL);

        return this.verificarTokenValido(
            this.http.post(URL, formData, this.opcionesHttp())
        );
    }

    /**
     * Envía uno o varios archivos al endpoint especificado, reportanto el progreso de cada uno
     * @param serviceURI URL del endpoint
     * @param formData La data del Form a enviar. Pueden enviarse varios archivos, o datos adicionales.
     * @returns Observable de tipo `Response`.
     */
    uploadFilesWithProgress(serviceURI: string, formData: FormData): Observable<any> {
        // Arma la URL y el querystring con el objeto params que recibo
        const URL = `${this.API_URI}${serviceURI}`;

        if (!environment.production) console.log(URL);

        const opciones = this.opcionesHttp();
        opciones.observe = 'events';
        opciones.reportProgress = true;

        return this.http.post(URL, formData, opciones);
    }

    /**
     * Envía uno o varios archivos al endpoint especificado, y obtiene como respuesta otro archivo
     * @param serviceURI URL del endpoint
     * @param formData La data del Form a enviar. Pueden enviarse varios archivos, o datos adicionales.
     * @param contentType Tipo de contenido
     * @param extension Extensión del archivo a descargar
     * @param filename Nombre del archivo a descargar
     * @returns Observable de tipo `any` que contiene el archivo a guardar.
     */
    uploadDownloadFile(serviceURI: string, formData: FormData, contentType: string, extension: string, filename?: string): Observable<any> {
        // Arma la URL y el querystring con el objeto params que recibo
        const URL = `${this.API_URI}${serviceURI}`;

        if (!environment.production) console.log(URL);

        // Si no viene el nombre de archivo, lo genero
        if (!filename) {
            filename = `${DateHelper.fileFormat()}.${extension}`;
        } else {
            filename = `${filename}.${extension}`;
        }

        return this.http.post(URL, formData, this.opcionesHttpBlob()).pipe(
            map((res: any) => {
                const blob: any = res.body;
                const url = window.URL.createObjectURL(blob);

                fileSaver.saveAs(url, filename);
            }),
            // Si hubo errores, verifico qué tipo de error fue
            catchError((err: HttpResponse<any>, caught) => {
                // Si no ha iniciado sesión o el token es inválido o expiró
                if (err.status === 403 || err.status === 401) {
                    // Redirecciono al login
                    this.router.navigate(['/403']);
                } else {
                    // Para el resto de errores, grabo el error en la consola
                    console.error(err);

                    // Muestro un mensaje con el error devuelto por el servidor
                    this.toastr.error(err.statusText);
                }

                return EMPTY;
            })

        );
    }

    /**
     * Arma una URL para enviar una petición GET con las credenciales necesarias
     * @param url La URL a mandar la petición GET
     * @returns La URL con las credenciales
     */
     buildUrlWithCredentials(url: string): string {
        // Determina si ya se agregó el símbolo de separador de parámetros
        const simbolo = url.includes('?') ? '&' : '?';

        return this.API_URI + url + simbolo +'t=' + encodeURIComponent(localStorage.getItem('token')) +
            '&e=' + localStorage.getItem('empresaId') +
            '&s=' + localStorage.getItem('sucursalId');
    }
}
