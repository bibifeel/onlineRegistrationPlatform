// 定义详情模块数据类型
export interface ResponseData {
    "code": number,
    "message": string,
    "ok": boolean,
};

// 医院详情
export interface HospitalDetail {
    "bookingRule": {
        "cycle": number,
        "releaseTime": string,
        "stopTime": string,
        "quitDay": number,
        "quitTime": string,
        "rule": string[]
    }
    "hospital": {
        "address": string,
        "bookingRule": null,
        "cityCode": string,
        "createTime": string,
        "districtCode": string,
        "hoscode": string,
        "hosname": string,
        "hostype": string,
        "id": string,
        "intro": string,
        "isDeleted": number,
        "logoData": string,
        "param": {
            "fullAddress": string,
            "hostypeString": string,
        },
        "provinceCode": string,
        "route": string,
        "status": number,
        "updateTime": string,
    }
}

// 医院详情接口返回的ts类型
export interface HospitalDetailMessage extends ResponseData {
    "data": HospitalDetail,
}

// 代表的是医院科室的数据
export interface Deparment {
    "depcode": string,
    "depname": string,
    "children"?: Deparment[],
}

// 代表存储科室数组类型
export type DeparmentArr = Deparment[];
// 获取科室接口返回的数据类型
export interface DeparmentResponseData extends ResponseData {
    data: DeparmentArr
}

export interface LoginData {
    phone: string,
    code: string,
}

export interface UserInfo {
    name: string,
    token: string
}

export interface UserLoginResponseData extends ResponseData {
    data: UserInfo
}


// 定义微信扫码登录返回的数据的ts类型
export interface WxLogin {
    "redirectUri": string,
    "appid": string,
    "scope": string,
    "state": string,
}

export interface WxLoginResponseData extends ResponseData {
    data: WxLogin,
}


export interface BaseMap {
    "workDateString": string,
    "releaseTime": string,
    "bigname": string,
    "stopTime": string,
    "depname": string,
    "hosname": string,
}

export interface WorkData {
    "workDate": string,
    "workDateMd": string,
    "dayOfWeek": string,
    "docCount": number,
    "reservedNumber": null,
    "availableNumber": number,
    "status": -1
}

export type BookingScheduleList = WorkData[]

export interface HospitalWorkData extends ResponseData {
    "data": {
        "total": number,
        "bookingScheduleList": BookingScheduleList,
        "baseMap": BaseMap
    }
}