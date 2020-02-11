<template>
    <div class="attr-background">
        <p>
            <span>线型</span>
            <el-select v-model="attrSet['option']['tableBoxStyle']['border-style']" placeholder="请选择">
                <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                </el-option>
            </el-select>
        </p>
        <p v-if="attrSet['option']['tableBoxStyle']['border-style']!=='none'">
            <CompColor  text="线条" set-attr="border-color" :set-obj="attrSet['option']['tableBoxStyle']"></CompColor>
        </p>
        <p v-if="attrSet['option']['tableBoxStyle']['border-style']!=='none'">
            <span>线宽</span>
            <el-input-number v-model="attrSet['option']['tableBoxStyleUnit']['border-width']" controls-position="right"  :min="1" :max="20"></el-input-number>
        </p>
    </div>
</template>

<script>
    import CompColor from "@/components/comp-color/CompColor";
    export default {
        name: "AttrBackground",
        data () {
            return {
                options: [{
                    value: 'none',
                    label: '无'
                }, {
                    value: 'solid',
                    label: '实线'
                }, {
                    value: 'dashed',
                    label: '虚线'
                }, {
                    value: 'dotted',
                    label: '点线'
                }, {
                    value: 'double',
                    label: '双线边框'
                }],
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
            console.log(this.attrSet);
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
