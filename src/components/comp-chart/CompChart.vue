<template>
    <div class="compChart" >
      <e-chart v-bind="$attrs" :id="id" :option="option"></e-chart>
    </div>
</template>

<script>
   import EChart from  '@/components/EChart/EChart'
    export default {
        name: "compChart",
        data(){
            return {
                id:'',

            }
        },
        props:{
            option:{
                type:Object,
                default:()=>{
                    return {}
                }
            }
        },
        components:{
            EChart
        },
        created() {

            this.id=new Date().getTime();

        },
        mounted() {


        }
    }
</script>

<style scoped>
  .compChart{
      width: 100%;
      height: 100%;
  }
</style>
