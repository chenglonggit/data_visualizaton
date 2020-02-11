<template>
    <div class="attr-background">
        <p>
            <span>背景</span>
<!--            <el-select v-model="value" placeholder="请选择">-->
<!--                <el-option-->
<!--                    v-for="item in options"-->
<!--                    :key="item.value"-->
<!--                    :label="item.label"-->
<!--                    :value="item.value">-->
<!--                </el-option>-->
<!--            </el-select>-->
        </p>
        <p>
            <CompColor text="纯色" set-attr="background-color" :set-obj="attrSet['outerStyle']"></CompColor>
        </p>
    </div>
</template>

<script>
    import CompColor from "@/components/comp-color/CompColor";
    export default {
        name: "AttrBackground",
        data () {
            return {
                color: '#ff0000',
                options: [{
                    value: 'color1',
                    label: '纯色'
                }, {
                    value: 'color2',
                    label: '渐变'
                }],
                value: 'color1',
                opacity:1
            }
        },
        components:{
            CompColor
        },
        props:{
            attrSet:{
                type:Object,
                default:()=>{
                    return {}
                }
            }
        },
        mounted() {
           // this.getRGBA();
        },
        methods:{

        }

    }
</script>

<style scoped>
  .attr-background{
      width: 100%;
      height: 100%;
      padding: 0 10px;
      box-sizing: border-box;
  }
    .attr-background /deep/ .m-colorPicker .box{
        position: fixed;
        z-index: 22;
    }
  .attr-background /deep/ .el-slider__input{
      width: 106px;
  }
  .attr-background /deep/ .el-slider{
      width: 186px;
      display: inline-block;
      margin-left: 12px;
      vertical-align: middle;
  }
  .attr-background /deep/  .el-slider__runway.show-input{
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
