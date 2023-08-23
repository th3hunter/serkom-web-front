export interface Response<T> {
    code: number;
    text: string;
    item?: T;
    items?: T[];
    recordCount: number;
    multiObject?: boolean;
}
