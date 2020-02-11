<!--
	/**
		 * @author: wen_dell
		 * @createDate: 2019/12/11
		 * @weChat: fourteen_clever
		 * **/
-->
<template>
    <div id="editor">
        <div class="left_menu_box" :class="menuActive?'':'collapse'">
            <div class="active_btn active_btn_left" @click="menuActive=!menuActive">
                <i class="el-icon-arrow-left"></i>
            </div>
            <div class="left_menu_content" :class="menuActive?'':'animate_left'">
                <comp-menu @drag_start="drag"></comp-menu>
            </div>
        </div>
        <div class="center_edit_box">
            <div class="canvas_wrap">
                <div class="canvas_content" ref="canvas_content">
                    <div class="custom_canvas" :style="{width:canvasSize.width+'px',height:canvasSize.height+'px',transform:`${transform}`}" ref="custom_canvas" @drop='drop($event)' @dragover='allowDrop($event)'
                         @mousedown="cancelActiveComponent">
                        <drag-editor :canvasScale="canvasScale" @setDeleteStyle="setDeleteStyle" :canvasDom="$refs['custom_canvas']" :custom-component.sync="item"
                                    :key="item.code"    v-for="item in componentArr"></drag-editor>
                    </div>
                </div>
            </div>
        </div>
        <div class="right_set_box" :class="setActive?'':'collapse'">
            <div class="active_btn active_btn_right" @click="setActive=!setActive">
                <i class="el-icon-arrow-right"></i>
            </div>
            <div class="right_set_content" :class="setActive?'':'animate_right'">
                <attr-panel :pane-list="paneList" :attrSet.sync="attrSet"></attr-panel>
            </div>
        </div>
        <div class="deleteStyle" :style="deleteStyle">
            <el-button @click="deleteComponent(deleteStyle.code)" icon="el-icon-delete">删除</el-button>
        </div>
    </div>
</template>

<script>
    import CompMenu from "@/components/comp-menu/CompMenu";
    import DragEditor from "@/components/drag-editor/DragEditor";
   import defaultComponent from '@/assets/default-option/default-component'
   import AttrPanel from '@/components/attr-panel/AttrPanel'

    export default {
        name: "Editor",
        components: {
            DragEditor,
            CompMenu,
            AttrPanel
        },
        data: () => {
            return {
                menuActive: true,
                setActive: true,
                componentArr: [],
                customStyle: {},
                deleteStyle:{},
                canvasSize:{
                    width: 800,
                    height: 600,
                },
                transform:'',
                canvasScale:1

            }
        },

        mounted() {
          window.addEventListener('resize',()=>{
              this.canvasResize()
          })
        },
        computed:{
            paneList(){
                return  this.$store.getters.paneList
            },
            attrSet(){
                return this.componentArr.find((value, index, array) =>{
                    return value.code===this.$store.state.activeComponent.code})?this.componentArr.find((value, index, array) =>value.code===this.$store.state.activeComponent.code):this.canvasSize;
            }

        },
        methods: {
            setDeleteStyle(deleteStyle){
                this.deleteStyle=deleteStyle
            },
            deleteComponent(code){
                this.componentArr=this.componentArr.filter(item=>{
                    return item.code===code?false:true
                });
                this.deleteStyle={display:'none'};
                this.$store.commit('changeActiveComponent',{
                    code:"",
                    name:""
                });
            },
            cancelActiveComponent() {
                this.$store.commit('changeActiveComponent', {
                    code: null,
                    name:''
                });
                this.deleteStyle={display:'none'}
            },
            drag(e, d) {
                e.dataTransfer.setDragImage(e.target, 0, 0);
                e.dataTransfer.dropEffect = "copy";
                let componentNameType={};
                if(d.componentName){
                    componentNameType['componentName']=d.componentName
                }
                if(d.componentType){
                    componentNameType['componentType']=d.componentType
                }
                e.dataTransfer.setData("componentNameType", JSON.stringify(componentNameType));
                // e.preventDefault();
            },
            allowDrop(e) {
                e.preventDefault();
            },
            drop(e) {

                let componentNameType = JSON.parse(e.dataTransfer.getData("componentNameType"));

                let createComponent=JSON.parse(JSON.stringify(defaultComponent.component[componentNameType['componentName']]));

                if(createComponent.type&&componentNameType['componentType']){
                    delete createComponent.type;
                    let chartTypeConfig=defaultComponent.component[componentNameType['componentName']].type[componentNameType['componentType']];
                    createComponent.option=chartTypeConfig['defaultOption'];
                    createComponent.nameText=chartTypeConfig['nameText'];
                }
                if(createComponent.outerStyleUnit){
                    Object.keys(createComponent.outerStyleUnit).forEach(function(key){
                        if(key==='top'){
                            createComponent.outerStyleUnit[key]=e.offsetY
                        }else if(key==='left'){
                            createComponent.outerStyleUnit[key]=e.offsetX
                        }
                    });
                }


                let code = new Date().getTime();
                createComponent.code=code;

                this.componentArr.push(createComponent);
                this.$store.commit('changeActiveComponent', {
                    code,
                    name:createComponent.name
                });
                e.preventDefault();
                e.stopPropagation();
                console.log(this.componentArr);
            },
            canvasResize(newValue){
                if(!this.$refs['canvas_content']){
                    return false
                }
                let transform='';
                let canvasWrap=this.$refs['canvas_content'].getBoundingClientRect();
                let canvasSize=newValue||this.canvasSize;
                let diffWidth=canvasSize.width-canvasWrap.width;
                let diffHeight=canvasSize.height-canvasWrap.height;
                let absWidth=Math.abs(diffWidth);
                let absHeight=Math.abs(diffHeight);
                let canvasScale=1;
                if(diffWidth>0){
                    transform+=`translateX(-${absWidth/2}px)`
                }else  if(diffHeight>0){
                    transform+=` translateY(-${absHeight/2}px)`
                }else {
                    this.canvasScale=canvasScale;
                    this.transform=transform;
                    return  false
                }
                if(absWidth<=absHeight){
                    canvasScale=canvasWrap.height/canvasSize.height
                }else if(absWidth>absHeight){
                    canvasScale=canvasWrap.width/canvasSize.width
                }else{
                    canvasScale=1
                }
                this.canvasScale=canvasScale;
                transform+=` scale(${canvasScale})`;

                this.transform=transform
            }

        },
        watch:{
            canvasSize:{
                handler(newValue, oldValue) {
                    this.canvasResize(newValue)
                },
                deep:true
            }
        }
    }
</script>

<style lang="scss">
    @import "../../assets/css/editor/editor.scss"
</style>
