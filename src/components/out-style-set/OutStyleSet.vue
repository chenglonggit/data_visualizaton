<template>
    <div id="out_style_set">
        <p>
            <span class="ac_text">名称</span>
            <el-input
                class="nameText"
            placeholder="请输入内容"
            v-model="attrSet.nameText"
            clearable>
        </el-input>
        </p>
        <span class="ac_text">X</span><el-input-number size="small" class="step" v-model="attrSet.outerStyleUnit.left" controls-position="right" @change="handleChange" :min="0" ></el-input-number>
        <span class="ac_text">Y</span><el-input-number size="small" class="step" v-model="attrSet.outerStyleUnit.top" controls-position="right" @change="handleChange" :min="0" ></el-input-number>
        <span class="ac_text">宽</span><el-input-number size="small" class="step" v-model="attrSet.outerStyleUnit.width" controls-position="right" @change="handleChange" :min="0" ></el-input-number>
        <span class="ac_text">高</span><el-input-number size="small" class="step" v-model="attrSet.outerStyleUnit.height" controls-position="right" @change="handleChange" :min="0" ></el-input-number>
    </div>
</template>

<script>
    export default {
        name: "OutStyleSet",
        props:{
           attrSet: {
                type:Object,
                 default:()=>{
                     return {
                         nameText:"",
                         outerStyleUnit:{}

                     }
                 }
           }
        },
        mounted() {

        },
        methods:{
            handleChange(){

            }
        }
    }
</script>

<style scoped>
    #out_style_set{
        font-size: 14px;
    }
    #out_style_set /deep/ .el-input-number--small{
        width: 100px;
    }
    .ac_text{
        padding: 0 8px;
        vertical-align: middle;
    }
    .nameText{
        width: 120px;
    }
</style>
