/**
 * @createDate: 2019/12/11
 * @author: wen_dell
 * @email: wendell.chen@chinaentropy.com
 * **/
import {CHANGE_Active_Component} from './mutations-types'
const mutations = {
    [CHANGE_Active_Component](state, obj){
        state.activeComponent = obj;
    }
};
export default mutations;
