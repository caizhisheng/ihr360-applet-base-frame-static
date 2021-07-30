export default class Common {
    static getQueryString = (name) => {
        const reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        const r = decodeURI(window.location.href).split('?')[1] ?
            decodeURI(window.location.href).split('?')[1].match(reg) : null;
        if (r != null) {
            return decodeURI(r[2]);
        } else {
            return null;
        }
    }
    // 当前设备
    static get device() {
        return localStorage.getItem("device") || "h5";
    }
    // 请求名称
    static get appUrlName() {
        const deviceName = Common.device;
        if (deviceName === "dd") {
            return "dingtalk";
        } else if (deviceName === "qy") {
            return "qyweixin";
        } else if (deviceName === "h5") {
            return "dingtalk";
        } else {
            return "dingtalk"
        }
    }
    // 简易适配器 钉钉, 企业微信, 浏览器
    static Adapter(dd, qy, h5) {
        const deviceName = Common.device;
        if (deviceName === "dd" && dd instanceof Function) {
            dd();
        } else if (deviceName === "qy" && qy instanceof Function) {
            qy();
        } else if (deviceName === "h5" && h5 instanceof Function) {
            h5();
        }
    }
}