<!--
	/**
		 * @author: wen_dell
		 * @createDate: 2019/12/19
		 * @weChat: fourteen_clever
		 * **/
-->
<template>
    <div id="header">
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" router>
            <el-menu-item index='editor'>编辑</el-menu-item>
            <el-menu-item index='data'>数据</el-menu-item>
            <el-menu-item index='release'>发布</el-menu-item>
            <el-dropdown placement="top">
                <span class="el-dropdown-link">
                    <el-avatar size="medium" src=""></el-avatar>
                    <i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>退出登录</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </el-menu>
    </div>
</template>

<script>
    export default {
        name: "Header",
        data() {
            return {
                activeIndex: 'editor'
            }
        }
    }
</script>

<style lang="scss">
@import './header.scss'
</style>
