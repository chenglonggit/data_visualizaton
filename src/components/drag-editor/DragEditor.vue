<template>
    <div class="drag_box" :class="enabled?'bordor':''" ref="drag_box" :style="outerStyle"  v-drag @contextmenu="contextmenu">
        <div class="point" v-show="enabled" :style="item.style" v-drag="item.dir" v-for="(item,index) in point" :key="item.dir+index"></div>
        <div class="drag_content" >
            <component :outerStyleUnit="customComponent.outerStyleUnit" :size="size" :unit="customComponent.unit" :option="customComponent.option" :customStyle="innerStyle" :is="loadComponent"></component>
        </div>
    </div>
</template>

<script>
    import {toLowerLine} from '@/utils/tool'
    export default {
        name: "DragEditor",
        data:()=>{
          return {
              point:[
                  {
                      dir:'left_top',
                      style:{
                          top:'-4px',
                          left:'-4px',
                          cursor:'nw-resize'
                      },
                      directivesName:''
                  },
                  {
                      dir:'top',
                      style:{
                          top:'-4px',
                          left:'50%',
                          'margin-left':'-4px',
                          cursor:'n-resize'
                      }
                  },
                  {
                      dir:'right_top',
                      style:{
                          top:'-4px',
                          right:'-4px',
                          cursor:'ne-resize'
                      }
                  },
                  {
                      dir:'left_center',
                      style:{
                          top:'50%',
                          "margin-top":'-4px',
                          left:'-4px',
                          cursor:'w-resize'
                      }
                  },
                  {
                      dir:'right_center',
                      style:{
                          top:'50%',
                          "margin-top":'-4px',
                          right:'-4px',
                          cursor:'e-resize'
                      }
                  },
                  {
                      dir:'left_bottom',
                      style:{
                          bottom:'-4px',
                          left:'-4px',
                          cursor:'sw-resize'
                      }
                  },
                  {
                      dir:'bottom',
                      style:{
                          bottom:'-4px',
                          left:'50%',
                          'margin-left':'-4px',
                          cursor:'s-resize'
                      }
                  },
                  {
                      dir:'right_bottom',
                      style:{
                          bottom:'-4px',
                          right:'-4px',
                          cursor:'se-resize'
                      }
                  }

              ],
              size:{},
              loadComponent:null
          }
        },
        // inheritAttrs: false,
        props:{
            canvasDom:{
                type:null,
                default:()=>{
                    return null
                },
                require
            },
            customComponent:{
                type:Object,
                default:()=>{
                    return {}
                }
            },
            canvasScale:{
                type:Number,
                default:()=>{
                    return  1
                }
            }
        },
        beforeMount() {
            let customComponentPath=toLowerLine(this.customComponent.name);
            this.loadComponent=() => import(`@/components/${customComponentPath}/${this.customComponent.name}`);
        },
        computed:{
            enabled(){
               return  this.customComponent.code===this.$store.state.activeComponent.code?true:false
            },
            outerStyle(){
                let createComponent=JSON.parse(JSON.stringify(this.customComponent));
                this.changeSize(this.customComponent.outerStyleUnit);
                let outerStyle={};
                if(createComponent.outerStyleUnit){
                    outerStyle=createComponent.outerStyleUnit;
                   Object.keys(createComponent.outerStyleUnit).forEach(function(key){
                            createComponent.outerStyleUnit[key]=createComponent.outerStyleUnit[key]+createComponent.unit
                    });
                }
                if(createComponent.outerStyle){
                    outerStyle=Object.assign({},outerStyle,createComponent.outerStyle)
                }
                outerStyle['z-index']=this.customComponent.code;
                return outerStyle
            },
            innerStyle(){
                let createComponent=JSON.parse(JSON.stringify(this.customComponent));
                let innerStyle={};
                if(createComponent.innerStyleUnit){
                    innerStyle=createComponent.innerStyleUnit;
                    Object.keys(createComponent.innerStyleUnit).forEach(function(key){
                        createComponent.innerStyleUnit[key]=createComponent.innerStyleUnit[key]+createComponent.unit
                    });
                }
                if(createComponent.innerStyle){
                    innerStyle=Object.assign({},innerStyle,createComponent.innerStyle)
                }
                return innerStyle
            }
        },
        directives: {
            drag: {
                inserted: function (el1, binding, vnode) {
                    //定义当前vue实例
                    let _this=vnode.context;
                    let el=_this.$refs['drag_box'];
                    el1.onmousedown = function (e) {
                        //获取画布对象
                        let elC=_this.canvasDom;
                        let scale=_this.canvasScale;
                        let customComponent=_this.customComponent;
                        let outerStyleUnit=customComponent.outerStyleUnit;
                        //选择当前激活组件
                        _this.$store.commit('changeActiveComponent',{
                            code:customComponent.code,
                            name:customComponent.name
                        });
                        //点击隐藏删除框
                        _this.$emit('setDeleteStyle',{
                            display:'none',
                        });
                       if( !vnode.context.enabled) return  false;
                        var   boundingC=elC.getBoundingClientRect(); //画布位置大小
                        var   bounding=el.getBoundingClientRect(); //画布位置大小
                        var dir = "";  //设置好方向
                        var firstX = e.clientX;  //获取第一次点击的横坐标
                        var firstY = e.clientY;   //获取第一次点击的纵坐标
                        var width = bounding.width;  //获取到元素的宽度
                        var height = bounding.height;  //获取到元素的高度
                        var Left = bounding.left-boundingC.left;   //获取到距离左边的距离
                        var Top = bounding.top-boundingC.top;   //获取到距离上边的距离
                        var disx = firstX - Left;
                        var disy = firstY-Top;
                        var diffBoundingTop=boundingC.top-firstY;
                        var diffBoundingBottom=boundingC.bottom-firstY;
                        var diffBoundingLeft=boundingC.left-firstX;
                        var diffBoundingRight=boundingC.right-firstX;
                        //下一步判断方向距离
                        dir=binding.value?binding.value:'';
                        document.onmousemove = function (e) {
                            /*判断缩放还是移动
                            * dir存在：缩放
                            * dir不存在：移动
                            * */
                            if(dir){
                                //边界判断
                                var diffY=e.clientY-firstY>diffBoundingBottom?diffBoundingBottom:(e.clientY-firstY<diffBoundingTop?diffBoundingTop:e.clientY-firstY);
                                var diffX=e.clientX-firstX>diffBoundingRight?diffBoundingRight:(e.clientX-firstX<diffBoundingLeft?diffBoundingLeft:e.clientX-firstX);


                                switch(dir)
                                {
                                    case "right_center":
                                        outerStyleUnit["width"] = (width+diffX)/scale;
                                        _this.changeSize(el.getBoundingClientRect());
                                        break;
                                    case "left_center":
                                        outerStyleUnit["width"] = (width-diffX)/scale;
                                        outerStyleUnit["left"] = (Left+diffX)/scale;
                                        _this.changeSize(el.getBoundingClientRect());
                                        break;
                                    case "top":
                                        outerStyleUnit["height"] = (height-diffY)/scale;
                                        outerStyleUnit["top"] = (Top+diffY)/scale;
                                        _this.changeSize(el.getBoundingClientRect());
                                        break;
                                    case "bottom":
                                        outerStyleUnit["height"] = (height+diffY)/scale;
                                        _this.changeSize(el.getBoundingClientRect());
                                        break;
                                    case "left_top":
                                        outerStyleUnit["height"] = (height-diffY)/scale;
                                        outerStyleUnit["top"] = (Top+diffY)/scale;
                                        outerStyleUnit["width"] = (width-diffX)/scale;
                                        outerStyleUnit["left"] = (Left+diffX)/scale;
                                        _this.changeSize(el.getBoundingClientRect());
                                        break;
                                    case "right_top":
                                        outerStyleUnit["width"] = (width+diffX)/scale;
                                        outerStyleUnit["height"] = (height-diffY)/scale;
                                        outerStyleUnit["top"] = (Top+diffY)/scale;
                                        _this.changeSize(el.getBoundingClientRect());
                                        break;
                                    case "left_bottom":
                                        outerStyleUnit["width"] = (width-diffX)/scale;
                                        outerStyleUnit["left"] = (Left+diffX)/scale;
                                        outerStyleUnit["height"] = (height+diffY)/scale;
                                        _this.changeSize(el.getBoundingClientRect());
                                        break;
                                    case "right_bottom":
                                        outerStyleUnit["width"] = (width+diffX)/scale;
                                        outerStyleUnit["height"] = (height+diffY)/scale;

                                        break;
                                }
                                return
                            }

                            let left = e.clientX - disx;
                            let top = e.clientY - disy;
                            if (left < 0) {
                                left = 0;
                            }
                            if (top < 0) {
                                top = 0;
                            }
                            if (left >boundingC.width - width) {
                                left = boundingC.width -width;
                            }
                            if (top > boundingC.height - height) {
                                top =boundingC.height - height;
                            }
                            // console.log(left, top);
                            outerStyleUnit.left = left/scale;
                            outerStyleUnit.top = top/scale;
                            _this.changeSize(el.getBoundingClientRect(),1);
                        };
                        document.onmouseup = function () {
                            document.onmousemove = document.onmouseup = null;
                            _this.changeSize(el.getBoundingClientRect());
                        };
                        window.event? window.event.cancelBubble = true : e.stopPropagation();
                        return false
                    }
                },
            }
        },
        methods:{
            contextmenu(e){
                this.$emit('setDeleteStyle',{
                    top:`${e.clientY}px!important`,
                    left:`${e.clientX}px!important`,
                    display:'block!important',
                    code:this.customComponent.code
                });

            },
            changeSize(size,flag){
                this.size={
                    width:flag?size.width:size.width/this.canvasScale,
                    height:flag?size.height:size.height/this.canvasScale,
                }

            }
        }
    }
</script>

<style lang="scss" scoped>
    .drag_box{
        position: absolute;
        box-sizing: border-box;
        border: none;
        /*border:1px dashed transparent;*/
        /*padding: 10px;*/
    }
    .bordor{
        border:1px dashed #ccc;
        cursor: move;
    }
    .point{
        position: absolute;
        width: 8px;
        height: 8px;
        border: 1px solid #00baff;
        box-sizing: border-box;
        background: #fff;
        z-index: 2;
    }
    .drag_content{
        width: 100%;
        height: 100%;
        position: relative;
        z-index: 1;
        overflow: hidden;
       &::after{
           position: absolute;
           top: 0;
           left: 0;
           display: block;
           width: 100%;
           height: 100%;
           content: '';
       }
    }
</style>
