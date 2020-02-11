<template>
    <div class="compBar" ref="compBar">
      <e-chart v-bind="$attrs" :id="id" :option="option"></e-chart>
    </div>
</template>

<script>
   import EChart from  '@/components/EChart/EChart'
    export default {
        name: "compBar",
        data(){
            return {
                id:'',
                option:{}
            }
        },
        components:{
            EChart
        },
        created() {

            this.id=new Date().getTime();

        },
        mounted() {
            this.option={
                xAxis: {
                    type: 'category',
                    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                },
                yAxis: {
                    type: 'value'
                },
                series: [{
                    data: [120, 200, 150, 80, 70, 110, 130],
                    type: 'bar'
                }]
            }

        }
    }
</script>

<style scoped>
  .compBar{
      width: 100%;
      height: 100%;
  }
</style>
