<template>

      <div :style="customStyle">你自己看才能健康咨询你</div>

</template>

<script>
    export default {
        name: "CompInput",
        data:()=>{
            return {
                input: ''
            }
        },
        props:{
            customStyle:{
                type:Object,
                default:()=>{
                    return {

                    }
                }
            }
        }
    }
</script>

<style scoped>

</style>
