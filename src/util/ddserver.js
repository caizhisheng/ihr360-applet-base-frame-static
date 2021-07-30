import * as dd from "dingtalk-jsapi"
import { Toast } from "antd-mobile"
import Cookies from "js-cookie"
import $ from "jquery"
import FetchHttp from "../fetch"
import { Common } from "../util"

export default class DDServer {
  static agentId = "";
  static corpId = "";
  static init = () => {
    DDServer.corpId = Common.getQueryString("corpid");
  }
  static getVersion = () => {
    return dd.version;
  }
  static config = (jsapi = []) => {
    var cfg = DDServer.getConfig();
    dd.config({
      agentId: Common.getQueryString("agentid"),
      corpId: DDServer.corpId,
      timeStamp: cfg.timeStamp,
      nonceStr: cfg.nonce,
      signature: cfg.signature,
      jsApiList: [
        "runtime.info",
        "runtime.permission.requestAuthCode",
        "biz.contact.choose",
        "device.notification.confirm",
        "device.notification.alert",
        "device.notification.prompt",
        "biz.ding.post",
        "biz.util.openLink",
        "biz.contact.complexPicker",
        "device.base.getPhoneInfo",
        "device.accelerometer.watchShake",
        "biz.util.open",
        ...jsapi
      ]
    });
    dd.error(function (err) {
      alert("dderr" + JSON.stringify(err));
    });
  }
  static getToken = () => {
    var token;
    $.ajax({
      url: "http://shlanxiao.imwork.net:8707/api/Ding/GetToken",
      type: "get",
      async: false,
      success: function (data) {
        token = data;
      },
      error: function (err) {
        // console.log(err);
      }
    });
    return token;
  }
  static getConfig = () => {
    var durl = window.location.href;
    var cfg;
    $.ajax({
      url: "http://shlanxiao.imwork.net:8707/api/Ding/GetJsApiConfig?url=" + durl,
      type: "get",
      async: false,
      dataType: "json",
      success: function (data) {
        cfg = data;
      },
      error: function (err) {
        // console.log(err);
      }
    });
    return cfg;
  }
  static setAuth = (targetUrl,callback,failcb) => {
    dd.ready(function () {
      dd.runtime.permission.requestAuthCode({
        corpId: DDServer.corpId,
        onSuccess: function (result) {
          const suiteId =  Common.getQueryString("suiteId") || ''
          const from = Common.getQueryString('from') || "";
          let userLogin = FetchHttp.get("/gateway/" + Common.appUrlName + "/provider/thirdparty/api/staff/dingtalk/noauth/userInfo?corpId=" + DDServer.corpId + "&code=" + result.code +'&suiteId='+ suiteId + "&url="+ window.location.origin +"/api/ihr-h5/#/Login", null);
          userLogin.then(function (response) {
            if (response && response.data  && response.data.bizCode===1) {
              // Cookies.remove("dingSessionId");
              // Cookies.set("dingSessionId", response.data.bizSessionId);
              Cookies.remove("ihrStaffId");
              Cookies.set("ihrStaffId", response.data.staffId);
              let loginSuccess = FetchHttp.get(
                // `/gateway/dingtalk?mobile_no=18537313328&dingtalk_id=245512284823706293`,
                `/gateway/dingtalk?mobile_no=${response.data.mobileNo}&dingtalk_id=${response.data.dingId}&token=${response.data.freeLoginToken}`,
                //null, 
              );
              loginSuccess.then(function (results) {
                callback(results)
              },function (error){
                Toast.fail("认证失败", 0);
              })
            } else {
              if(suiteId && from !== 'pc' && response && response.data ){
                failcb(response.data.bizMessage)
              }else{
                Toast.fail(response.data.bizMessage, 0);
              }
            }
          }, function (error) {
            // alert("登录失败");
          });
        },
        onFail: function (err) {
          alert("ouatherr" + JSON.stringify(err));
        }
      });
    });
  }
  static getdd = () => {
    return dd;
  }
}
