import type { DeparmentResponseData, HospitalDetailMessage, UserInfo } from "@/api/hospital/type";
// 定义仓库内部存储数据state的ts类型
export interface DetailState {
    hospitalInfo: HospitalDetailMessage,
    departmentInfo: DeparmentResponseData,
}


export interface UserState {
    visiable: boolean,
    code: string,
    userInfo: UserInfo
}