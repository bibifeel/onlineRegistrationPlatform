import { defineStore } from 'pinia';
// pinia仓库写法：组合式API、选择式API写法
import { reqHospitalDepartment, reqHospitalDetail } from '@/api/hospital';
import type { DeparmentResponseData, HospitalDetailMessage } from '@/api/hospital/type';
import type { DetailState } from './interface/index.ts';


const useDetailStore = defineStore('Detail', {
    state: (): DetailState => {
        return {
            // 医院详情的数据
            hospitalInfo: ({} as HospitalDetailMessage),
            departmentInfo: [] as unknown as DeparmentResponseData
        }
    },
    actions: {
        // 获取医院详情的方法
        async getHostail(hoscode: string) {
            let result: HospitalDetailMessage = await reqHospitalDetail(hoscode) as unknown as HospitalDetailMessage;
            if (result.code === 200) {
                this.hospitalInfo = result as unknown as HospitalDetailMessage;
            }
        },
        // 获取某一个医院科室的方法
        async getDeparment(hoscode: string) {
            let result: DeparmentResponseData = await reqHospitalDepartment(hoscode);
            if (result.code === 200) {
                this.departmentInfo = result;
            }
        },
    },
    getters: {

    }
});
// 获取仓库的方法对外暴露
export default useDetailStore;