<!--
	/**
		 * @author: wen_dell
		 * @createDate: 2019/12/10
		 * @weChat: fourteen_clever
		 * **/
-->
<template>
    <div id="app">
        <Header></Header>
        <router-view></router-view>
    </div>
</template>

<script>
    import Header from './components/header/Header'
    export default {
        name: "App",
        data(){
            return {
                template: {
                    inputParam: []
                }
            }
        },
        components: {
            Header,
        },
        methods: {
            test(){
                this.template.inputParam({
                    xxx: 'xxx',
                    'dsfaf': 'ssdf'
                })
            }
        }
    }
</script>

<style lang="scss">
@import './assets/css/app.scss';
</style>
