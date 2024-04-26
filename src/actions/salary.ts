import IrsFetchHttp  from '../fetch/http';
const FetchHttp = new IrsFetchHttp();

const gatewayPayrollApi = process.env.REACT_APP_GATEWAY;

/* 接口前缀 */
const prefix = () => {
    return `/gateway/api`;
}

/* 密码设置 */

export const passwordInfo = () => {
    return FetchHttp.post(`${prefix()}/salary/password/info/v2`, null);
}

/* 密码设置*/
export const setPassword = (newSalaryPassword: any) => {
    return FetchHttp.post(`${prefix()}/salary/password/update/v2`, {newSalaryPassword});
}

/* 密码重置*/
export const resetPassword = (dynamicCode: any, newSalaryPassword: any) => {
    return FetchHttp.post(`${prefix()}/salary/password/reset/v3`, {dynamicCode, newSalaryPassword});
}

/* 获取短信动态验证码*/
export const dynamicSmsCode = () => {
    return FetchHttp.post(`${prefix()}/salary/password/dynamic-code/v3`, null);
}

/* 密码验证*/
export const passwordCheck = (salaryPassword: any) => {
   return FetchHttp.post(`${prefix()}/salary/password/check/v2`, {salaryPassword})
}

/* 工资单有效性验证*/
export const salaryCheck = (payslipId: any) => {
    return FetchHttp.post(`${prefix()}/salary/getPayslipStatus/v1`, {payslipId})
 }

/* 工资单列表
 *
 * responseCode === '58' 密码过期
 */
export const salaryList = (param: any) => {
    return FetchHttp.post(`${prefix()}/salary/list/v3`, param);
}

/* 工资单详情
 *
 * responseCode === '58' 密码过期
 */
export const salaryDetail = (payslipId: any) => {
    return FetchHttp.post(`${prefix()}/salary/detail/v4`, {payslipId});
}

/* 工资单确认 */
export const salaryConfirm = (payslipId: any) => {
    return FetchHttp.post(`${prefix()}/salary/confirm/v1`, {payslipId});
}

/* 提交反馈内容*/

export const salaryFeedBack = (feedBackContent: any,payslipId: any) => {
    return FetchHttp.post(`${prefix()}/salary/feedBack/v1`, {feedBackContent,payslipId});
}

/* 小红点*/
export const salaryUnread = () => {
    return FetchHttp.get(`${prefix()}/message/unread/v7`, null);
}

/* 开始使用工资单年 */
export const getStartYear = () => {
    return FetchHttp.get(`${prefix()}/salary/getEarliestYear/v1`, null);
}

//获取反馈详情
export const getFeedBackDetail = (param: any) => {
    return FetchHttp.get(`${gatewayPayrollApi}/v1/payslipResults/queryFeedBackDetail`, param);
}