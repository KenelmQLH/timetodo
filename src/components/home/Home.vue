<template>
    <el-container class="home-container">
        <el-header height="50px">
            <div class="iconfont icon-classnavicon toggle-button bigger-iconfont" @click="toggleCollpase"></div>
            <div>TodoList</div>
            <div>
                <el-button class="btn btnLogout" type="danger" @click="logout">登录</el-button>
                <el-button class="btn btnLogout" type="danger" @click="logout">退出</el-button>
            </div>
        </el-header>
        <el-container class="home-body">
            <!-- 侧边栏导航-pc端 -->
            <el-aside v-show="!ifMobile" :width="isCollapse ? '80px' : '200px'">
                <el-menu default-active="/today" class="el-menu-vertical-demo" background-color="#EDEDED" :router="true" :collapse="isCollapse" :collapse-transition="false" @open="handleOpen" @close="handleClose" >
                    <el-menu-item index="/today">
                        <i class="iconfont icon-classtodaylist bigger-iconfont"></i>
                        <span slot="title">每日清单</span>
                    </el-menu-item>
                    <el-menu-item index="/history">
                        <i class="iconfont icon-classhistory bigger-iconfont"></i>
                        <span slot="title">历史清单</span>
                    </el-menu-item>
                </el-menu>
            </el-aside>
            <!-- 移动端-遮罩 -->
            <div :hidden="!ifMobile || isCollapse" id="cover"></div>
            <!-- 侧边栏-移动端 -->
            <transition name="toggle-cart">
                <div :hidden="!ifMobile || isCollapse" class="MobileNav">
                    <el-menu default-active="/today" class="el-menu-vertical-demo" background-color="#f5f3f3" :router="true" :collapse="false">
                        <el-menu-item index="/today" @click="changeNav">
                            <i class="iconfont icon-classtodaylist bigger-iconfont"></i>
                            <span slot="title">每日清单</span>
                        </el-menu-item>
                        <el-menu-item index="/history" @click="changeNav">
                            <i class="iconfont icon-classhistory bigger-iconfont"></i>
                            <span slot="title">历史清单</span>
                        </el-menu-item>
                    </el-menu>
                </div>
            </transition>

            <!-- 项目主面板 -->
            <el-main>
                <!-- 路由占位符-->
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>

<style scoped>
    .home-container{
        height: 100%;
    }
    /* .home-container > el-container,.home-container > ele-header {
        height:100%;
    } */
    .el-menu-vertical-demo:not(.el-menu--collapse) {
        width: 200px;
    }
    .home-body{
        position: relative;
    }
    .el-header{
        background-color: #DB4C3F;
        display: flex;
        justify-content: space-between;
        align-items: center;
        color: #ffffff;
        font-size:20px;
    }
    .el-header > .iconfont{
        align-self: left;
        /* height:50px;
        line-height: 50px; */

    }
    .el-header > .el-button{
        align-self: right;
    }
    
    .el-aside{
        background-color: #EDEDED;
        /* 略浅：F1F3F4 */
    }
    .el-aside > .el-menu{
        width:100%;
    }
    .el-aside::-webkit-scrollbar {
        display: none; /* Chrome Safari */
    }
    .el-main{
        padding:0px;
        background-color:#F7F7F7;
        /* 
        display: flex;
        align-items: center;
        justify-content: center;
        flex-grow:1; */
    }
    
    /* .btn:hover {
        color: #ffffff;
        border-color: #f5776c;
        background-color: #f5776c;
    }
    .btn:active {
        color: #ffffff;
        border-color: #f5776c;
        background-color: #f5776c;
    } */

    /*--------------------------------------------*/
    .el-menu{
        border-right: none;
    }
    .el-menu-item > .iconfont{
        
        padding-right:10px;
    }
    .bigger-iconfont{
        font-size:20px !important;  
    }
    .toggle-button {
        font-size: 10px;
        text-align: center;
        line-height: 24px;
        color: #fff;
        letter-spacing: 0.2em;
        cursor: pointer;
    }
    .MobileNav{
        position: absolute;
        left:0px;
        top:0px;
        height:100%;
        z-index: 999;
        /* background-color: aqua; */
        background-color: #f5f3f3;
    }

    .toggle-cart-enter-active {
		transition: all 0.4s linear;
	}

	.toggle-cart-leave-active {
		transition: all 0.4s linear;
	}
 
	.toggle-cart-enter {
		transform: translateX(-200%);
	}
 
	.toggle-cart-leave-active {
		transform: translateX(-200%);
	}
    #cover{ 
        position:absolute;
        left:0px;
        top:0px;
        background:rgba(0, 0, 0, 0.7);
        width:100%;  /*宽度设置为100%，这样才能使隐藏背景层覆盖原页面*/
        height:100%;
        filter:alpha(opacity=30);  /*设置透明度为30%*/
        opacity:0.3;  /*非IE浏览器下设置透明度为30%*/
        z-index:666;
    }
    /* li .el-menu-item .is-active{
        color: #DB4C3F !important;
    } */
</style>

<script>
  export default {
    data() {
        return {
            isCollapse: true,
            ifMobile: false
        };
    },
    mounted(){
        console.log('mount !?????');
        // 监听屏幕变化
        window.onresize = () => {
            console.log('window is resized !');
            this.page_width();
        };
        this.page_width();
    },
    methods: {
        page_width(){ // 获取屏幕宽度
            var screenWidth = window.screen.width;
            if (screenWidth <= 600) { // 1024
                this.ifMobile = true;
            } else {
                this.ifMobile = false;
            }
            console.log(screenWidth);
        },
        toggleCollpase(){
            console.log('click -> toggleCollpase !')
            this.isCollapse = !this.isCollapse
        },
        handleOpen(key, keyPath) {
            console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
            console.log(key, keyPath);
        },
        logout(e){
            console.log(e);
        },
        changeNav(e){
            console.log(e);
            this.isCollapse = true;
        }
    }
  }
</script>
