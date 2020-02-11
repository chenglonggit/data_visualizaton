<template>
    <div class="comp-color">
            <span v-if="text">{{text}}</span>
            <span class="color_picker_border"><colorPicker @change="headleChangeColor"  v-model="setObj[setAttr]" /></span>
            <el-slider
                @input="opacityChange"
                :min="0"
                :max="1"
                :step="0.01"
                :show-tooltip="false"
                v-model="opacity"
                show-input>
            </el-slider>
    </div>
</template>

<script>
    // import AttrBorder from "@/components/attr-border/AttrBorder";
    export default {
        name: "CompColor",
        data () {
            return {
                color: '#ff0000',
                // options: [{
                //     value: 'color1',
                //     label: '纯色'
                // }, {
                //     value: 'color2',
                //     label: '渐变'
                // }],
                // value: 'color1',
                opacity:1
            }
        },

        props:{
            setObj:{
                type:Object,
                default:()=>{
                    return {}
                }
            },
            setAttr:{
                type:String,
                default:()=>{
                    return ''
                }
            },
            text:{
                type:String,
                default:()=>{
                    return ""
                }
            }
        },
        mounted() {
            this.getRGBA();
        },
        methods:{
            opacityChange(opacity){
                this.$set(this.setObj,this.setAttr,this.getRGBA(opacity))
            },
            getRGBA(opacity){
                let bgColor=this.setObj[this.setAttr];
                // 16进制颜色值的正则
                var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
                // 把颜色值变成小写
                var color = bgColor.toLowerCase();
                if (reg.test(color)) {
                    // 如果只有三位的值，需变成六位，如：#fff => #ffffff
                    if (color.length === 4) {
                        let colorNew = "#";
                        for (let i = 1; i < 4; i += 1) {
                            colorNew += color.slice(i, i + 1).concat(color.slice(i, i + 1));
                        }
                        color = colorNew;
                    }
                    // 处理六位的颜色值，转为RGB
                    let colorChange = [];
                    for (let i = 1; i < 7; i += 2) {
                        colorChange.push(parseInt("0x" + color.slice(i, i + 2)));
                    }
                    colorChange.push(opacity);
                    return "RGBA(" + colorChange.join(",") + ")";
                }else if(bgColor==='transparent'){
                    this.opacity=0;
                    return "RGBA(255,255,255," +opacity+ ")";
                } else {
                    let rgb = color.split(',');
                    let r = parseInt(rgb[0].split('(')[1]);
                    let g = parseInt(rgb[1]);
                    let b;
                    let a;
                    if(rgb[2].indexOf(')')>0){
                        b= parseInt(rgb[2].split(')')[0]);
                    }else{
                        b= parseInt(rgb[2]);
                        a=parseFloat(rgb[3].split(')')[0]);
                        if(opacity!==0&&!opacity){
                          this.opacity=a;
                        }
                    }
                    return `RGBA(${r},${g},${b},${opacity===0?0:(opacity||a)})`;
                }
            },
            headleChangeColor(){
                this.$nextTick(()=>{
                    this.$set(this.setObj,this.setAttr,this.getRGBA(this.opacity))
                })
            }
        }

    }
</script>

<style scoped>
  .comp-color{
      width: 100%;
      height: 100%;
      box-sizing: border-box;
  }
    .comp-color /deep/ .m-colorPicker .box{
        position: fixed;
        z-index: 22;
    }
  .comp-color /deep/ .el-slider__input{
      width: 106px;
  }
  .comp-color /deep/ .el-slider{
      width: 186px;
      display: inline-block;
      margin-left: 12px;
      vertical-align: middle;
  }
  .comp-color /deep/  .el-slider__runway.show-input{
      width: 64px;
      margin-right: 0;
  }
    .color_picker_border{
        display:inline-block;
        border: 1px solid #ccc;
        line-height: 0;
        vertical-align: middle;
    }
</style>
