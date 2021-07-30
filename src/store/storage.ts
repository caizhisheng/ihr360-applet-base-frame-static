export default class StorageFn {
  ls: any;
  ss: any;
  constructor() {
    this.ls = window.localStorage;
    this.ss = window.sessionStorage;
  }
  /*-----------------cookie---------------------*/
  /*设置cookie*/
  setCookie(name: any, value: any, day: any) {
    const setting = arguments[0];
    if (Object.prototype.toString.call(setting).slice(8, -1) === 'Object') {
      for (const i of Object.keys(setting)) {
        const oDate = new Date();
        oDate.setDate(oDate.getDate() + day);
        document.cookie = i + '=' + setting[i] + ';expires=' + oDate;
      }
    } else {
      const oDate = new Date();
      oDate.setDate(oDate.getDate() + day);
      document.cookie = name + '=' + value + ';expires=' + oDate;
    }

  }

  /*获取cookie*/
  getCookie(name: any) {
    const arrs = document.cookie.split('; ');
    for (const arr of arrs) {
      const arr2 = arr.split('=');
      if (arr2[0] === name ||arr2[0].replace(' ', '') === name) {
        return arr2[1];
      }
    }
    return '';
  }

  /*删除cookie*/
  removeCookie(name: any) {
    this.setCookie(name, 1, -1);
  }

  /*-----------------localStorage---------------------*/
  /*设置localStorage*/
  setLocal(key: any, val: any) {
    const setting = arguments[0];
    if (Object.prototype.toString.call(setting).slice(8, -1) === 'Object') {
      for (const i of Object.keys(setting)) {
        this.ls.setItem(i, JSON.stringify(setting[i]))
      }
    } else {
      this.ls.setItem(key, JSON.stringify(val))
    }
  }

  /*获取localStorage*/
  getLocal(key: any) {
    if (key) { return JSON.parse(this.ls.getItem(key)) }
    return null;

  }

  /*移除localStorage*/
  removeLocal(key: any) {
    this.ls.removeItem(key)
  }

  /*移除所有localStorage*/
  clearLocal() {
    this.ls.clear()
  }

  /*-----------------sessionStorage---------------------*/
  /*设置sessionStorage*/
  setSession(key: any, val: any) {
    const setting = arguments[0];
    if (Object.prototype.toString.call(setting).slice(8, -1) === 'Object') {
      for (const i of Object.keys(setting)) {
        this.ss.setItem(i, JSON.stringify(setting[i]))
      }
    } else {
      this.ss.setItem(key, JSON.stringify(val))
    }

  }

  /*获取sessionStorage*/
  getSession(key: any) {
    if (key) { return JSON.parse(this.ss.getItem(key)) }
    return null;

  }

  /*移除sessionStorage*/
  removeSession(key: any) {
    this.ss.removeItem(key)
  }

  /*移除所有sessionStorage*/
  clearSession() {
    this.ss.clear()
  }


}