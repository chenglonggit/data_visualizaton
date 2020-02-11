/**
 * @createDate: 2019/12/11
 * @author: wen_dell
 * @email: wendell.chen@chinaentropy.com
 * **/
import {CHANGE_Active_Component} from './mutations-types'
const actions = {
    [CHANGE_Active_Component]({ commit }, obj){
        commit(CHANGE_Active_Component, obj);
    },
};

export default actions;
