import IrsFetchHttp from "../fetch/http";
import * as constants from '../constants/actionsTypes';

const fetch = new IrsFetchHttp();
const gatewayApi = '/gateway/api/';
export const salaryDetail = (param:any) => {
    const asyncPromiseData = fetch.get(gatewayApi+'salary/detail/v5',param);
    return {
        type: constants.GET_EASY_DATA,
        data: asyncPromiseData
    }
};
export const salaryConfirm = (payslipId:any) => {
    const asyncPromiseData = fetch.post(gatewayApi+'salary/confirm/v1',{"payslipId":payslipId});
    return {
        type: constants.GET_EASY_DATA,
        data: asyncPromiseData
    }
};
export const salaryFeedBack = (feedBackContent:any,payslipId:any) => {
    const asyncPromiseData = fetch.post(gatewayApi+'salary/feedBack/v1',{"feedBackContent":feedBackContent,"payslipId":payslipId});
    return {
        type: constants.GET_EASY_DATA,
        data: asyncPromiseData
    }
};
