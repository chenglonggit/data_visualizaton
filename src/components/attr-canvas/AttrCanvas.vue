<template>
    <div id="attr_canvas">
        <span class="ac_text">宽</span><el-input-number size="small" class="step" v-model="attrSet.width" controls-position="right" @change="handleChange" :min="1" ></el-input-number>
        <span class="ac_text">高</span><el-input-number size="small" class="step" v-model="attrSet.height" controls-position="right" @change="handleChange" :min="1" ></el-input-number>
    </div>
</template>

<script>
    export default {
        name: "AttrCanvas",
        props:{
           attrSet: {
                type:Object,
                 default:()=>{
                     return {
                         width:'',
                         height:'',
                     }
                 }
           }
        },
        mounted() {
            console.log(this.attrSet);
        },
        methods:{
            handleChange(){

            }
        }
    }
</script>

<style scoped>
    #attr_canvas /deep/ .el-input-number--small{
        width: 100px;
    }
    .ac_text{
        padding: 0 8px;
        vertical-align: middle;
    }
</style>
