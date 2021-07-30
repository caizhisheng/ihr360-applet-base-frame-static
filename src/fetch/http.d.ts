declare class fetchHttp {
    contentType: string;
    credentials: string;
    mode: string;
    constructor();
    handlerErr(): any;
    fetchData(url: string, method: string, options: any): Promise<any>;
    get(url: string, options: any): Promise<any>;
    post(url: string, options: any): Promise<any>;
    serializeParme(url: string, options: any): string;
}
export default fetchHttp;
