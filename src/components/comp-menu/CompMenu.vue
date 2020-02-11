<template>
    <div id="CompMenu">
    <el-tabs stretch tab-position="left" style="height: 100%;">
        <el-tab-pane v-for="(type,index) in menuList" :key=index>
            <div class="menu_label" slot="label" >
                {{type.typeName}}
            </div>
            <div class="menu_content">
                <div class="menu_content_item" draggable="true" @dragstart='drag($event ,component)' :key="index" v-for=" (component,index) in type.children">
                    <div class="menu_image_box">
                        <img width="45px" height="auto" :src="component.image" alt="">
                    </div>
                    <p class="menu_title_box">{{component.title}}</p>
                </div>

            </div>
        </el-tab-pane>

    </el-tabs>
    </div>
</template>

<script>
    import menu  from '@/assets/default-option/default-menu.js'
    export default {
        name: "CompMenu",
        data:()=>{
            return {
                menuList:menu.menuList
            }
        },

        methods:{
            drag(e,d){
                this.$emit('drag_start',e,d)
            }
        }
    }
</script>

<style lang="scss" scoped>
 @import "@/components/comp-menu/comp-menu.scss";
</style>
