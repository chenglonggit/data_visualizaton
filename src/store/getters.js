/**
 * @createDate: 2019/12/11
 * @author: wen_dell
 * @email: wendell.chen@chinaentropy.com
 * **/
import Panel from '@/assets/default-option/default-panel'
const getters = {
    paneList:state=>{
        let paneList= state.activeComponent.name?Panel.panel[state.activeComponent.name]:Panel.panel['canvas'];
        return paneList;
    }
};
export default getters;
