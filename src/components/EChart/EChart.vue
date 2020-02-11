<!--
	/**
		 * @author: wendell_chen
		 * @createDate: 2019/5/31
		 * @weChat: fourteen_clever
		 * **/
-->
<template>
	<div class="chartsWrap" :id="`eChart${id}`"></div>
</template>

<script>
	export default {
		name: "EChart",
		props: {
            option:{
              type:Object,
              default:()=>{
                  return {}
              }
            },
			id: {
				type: [Number, String]
			}
		},
		data() {
			return {
				eChart: null
			}
		},
		created() {
		},
		mounted() {
                   this.initChart();

		},
		watch: {
			option: {
				handler(newValue, oldValue) {
                    this.initChart();
				},
				deep: true
			},
            $attrs:{
                handler(newValue, oldValue) {
                    if(this.eChart){
                        this.eChart.resize();
                    }

                },
                deep: true
            }
		},
		methods: {
			initChart() {
			    let _this=this;
				if (this.eChart) {
					this.eChart.dispose();
					this.eChart = null;
				}
                setTimeout(()=>{
                    _this.eChart = _this.$echarts.init(document.getElementById(`eChart${_this.id}`));
                    _this.eChart.setOption(_this.option,true);
                })
			}
		},
		beforeDestroy() {
			this.eChart.dispose();
			this.eChart = null;
		}
	}
</script>

<style lang="scss">
	@import "EChart";
</style>
