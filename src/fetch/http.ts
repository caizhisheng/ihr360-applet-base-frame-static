/**
 * @component constants
 * @description Http 服务
 * @time 2018/05/09
 * @author Mike.Cai
 */
const getCookie = (name: any) => {
    const arrs = document.cookie.split('; ');
    for (const arr of arrs) {
        const arr2 = arr.split('=');
        if (arr2[0] === name) {
            return arr2[1];
        }
    }
    return '';
}

export class IrsFetchHttp {
    [x: string]: any;
    contentType: string;
    credentials: string;
    mode: string;
    headers: any;
    data: any;
    xsrfToken: string;

    constructor() {
        this.contentType = "application/json;charset=UTF-8";
        this.credentials = "include";
        this.mode = "cors";
        this.xsrfToken = "";
    }

    handlerErr(e: any, url: any): any {
        // console.log("捕获handlerErr中的异常信息弹框提示处理");
        //IrsMessage.messageFun('error', '服务异常，请稍后重试！');
        return Promise.reject("网络异常，请稍后重试！" + url);
    }

    async fetchData(url: string, reqtype: string, options?: any, file?: any, payload?: any) { //默认'json'，文本传值‘text’
        // 本地调试阶段开启cookie
        if (process.env.NODE_ENV === 'development') {
            document.cookie = process.env.REACT_APP_COOKIE as any;
        }
        this.xsrfToken = getCookie('XSRF-TOKEN');
        if (payload === 'json') {
            this.headers = {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': (!file ? 'application/json' : 'multipart/form-data'),
                'X-Requested-With': 'XMLHttpRequest',
                'X-XSRF-TOKEN': this.xsrfToken,
                'h5-agent': 'H5_APP_AGENT'
            }
        } else {
            this.headers = !file ? {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': (!file ? 'application/json' : 'multipart/form-data'),
                'authorization': 'authorization-text',
                'X-Requested-With': 'XMLHttpRequest',
                'X-XSRF-TOKEN': this.xsrfToken,
                'h5-agent': 'H5_APP_AGENT',
            } : {
                authorization: "authorization-text",
                Accept: "application/json",
                'X-XSRF-TOKEN': this.xsrfToken,
                'h5-agent': 'H5_APP_AGENT',
            }
        }

        if (reqtype === 'get') {
            this.data = {
                method: reqtype,
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json',
                    'X-Requested-With': 'XMLHttpRequest',
                    'X-XSRF-TOKEN': this.xsrfToken,
                    'h5-agent': 'H5_APP_AGENT',
                },
                credentials: this.credentials as any
            }
        } else {
            this.data = {
                method: reqtype,
                headers: this.headers,
                credentials: this.credentials as any,
                // 接口不规范，body结构不为json，做特殊处理
                // body: (reqtype === "post" ? JSON.stringify(options) : null as any)
                // body: (reqtype === "get" ? "" : (url === '/web/flexible/codeValue/list.do' || payload === 'text' ? JSON.stringify(options) : options))
                body: (reqtype === "get" ? "" : (payload === 'text' ? options : JSON.stringify(options)))
            }
        }

        try {
            const response = await fetch(url, this.data).catch(e => this.handlerErr(e, url));
            if (!response.ok) {
                if (response.status === 401 || response.status === 403) {
                    //跳转至登录页
                } else if (response.status === 500 && (url.includes('validateMobileNoVerifyCode') || url.includes('sendMobileNoVerifyCode'))) {
                    return response;
                } else {
                    //抛出异常
                    return Promise.reject({
                        result:false,
                        errorMessage:localStorage.getItem('language')==='en_US'?'Server error,please try again':'网络异常，请稍后重试！'
                    })
                }
            }
            return response;
        } catch (error) {
            //IrsMessage.messageFun('error', '服务异常，请稍后重试！');
        }

    }


    get(url: string, options: any) {
        const fetchUrl = this.serializeParme(url, options);
        return this.fetchData(fetchUrl, 'get', {}).then(d => d.json()).catch(e => console.log(e));
    }

    post(url: string, options: any, file = false, payload = 'json') {
        return this.fetchData(url, 'post', options, file, payload).then(d => d.json()).catch(e => console.log(e));
    }

    put(url: string, options: any, file = false, payload = 'json') {
        return this.fetchData(url, 'put', options, file, payload).then(d => d.json()).catch(e => console.log(e));
    }

    delete(url: string, options: any) {
        return this.fetchData(url, 'delete', options).then(d => d.json()).catch(e => console.log(e));
    }


    serializeParme(url: string, options: any) {
        let urlPath: string = url;
        if (options) {
            const paramsArray: any = [];
            //拼接参数
            Object.keys(options).forEach(key => paramsArray.push(key + '=' + options[key]))
            if (url.search(/\?/) === -1) {
                urlPath += '?' + paramsArray.join('&')
            } else {
                urlPath += '&' + paramsArray.join('&')
            }
        }
        return urlPath;
    }
}

export default IrsFetchHttp;
