<template>
    <div class="AttrPanel">
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane :label="pane.paneName" :name="pane.paneName" :key="pane.paneName" v-for="pane in  paneListC">
                <el-collapse v-model="pane.activeNames" >
                    <template style="height: 200px;" v-for="(comp,index) in pane.compList">
                        <el-collapse-item v-if="comp.collapse" :title="comp.title" :name="index+''" >
                            <component :key="attrSet.code+''+i" :attrSet="attrSet"  :is="listItem.name" v-for="(listItem,i) in comp.compList"></component>
                        </el-collapse-item>
                        <component :key="attrSet.code+''+i"  v-if="!comp.collapse" :attrSet="attrSet"  :is="listItem.name" v-for="(listItem,i) in comp.compList"></component>
                    </template>

                </el-collapse>

            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
    import {toLowerLine} from '@/utils/tool'
    export default {
        name: "AttrPanel",
        inheritAttrs: false,
        data(){
            return {
                activeName:'',
                paneListC:[],
            }
        },
        props:{
            paneList:{
                type:Array,
                default:()=>{
                    return [

                    ]
                }
            },
            attrSet:{
            }
        },
        mounted() {
            // console.log(this.$attrs);
        },
        created(){
            this.resetPane();

        },
        methods:{
            handleClick(){

            },
            resetPane(){
                let paneListCopy=  this.paneList.length?[...this.paneList].map((item,index)=>{
                    let itemCopy=Object.assign({},item);
                    let activeNames=[];
                    itemCopy.compList=itemCopy.compList.map((comp,index)=>{
                       activeNames.push(index+'');
                        let compList=comp.compList.map((item)=>{
                            let customComponentPath=toLowerLine(item);
                            let path = () => import(`@/components/${customComponentPath}/${item}`);
                            return {name:path}
                        });
                        // let customComponentPath=toLowerLine(compName);
                        // let path = () => import(`@/components/${customComponentPath}/${compName}`);
                        return {compList:compList,title:comp.title,collapse:comp.collapse}
                    });
                    itemCopy.activeNames=activeNames;
                    console.log(itemCopy);
                    return itemCopy
                }):[];
                this.paneListC=paneListCopy;
                this.activeName=this.paneListC.length?this.paneListC[0]['paneName']:'';
            }
        },
        watch:{
            paneList:{
                handler(newValue, oldValue) {
                   this.resetPane();
                },
                deep:true
            }
        }
    }
</script>

<style scoped>
  .AttrPanel{
      width: 100%;
      height: 100%;
  }
</style>
