<template>
    <div>
    <div class="main-header">
        <a class="logo">{{appMenu.appName}}</a>
    </div>
    <!-- 左侧菜单 -->
    <div class="main-left double-dis">
        <div  class="fl h100 menu">
            <ul class="header-menu-list">
                <li class="open">
                    <router-link  v-for="item in appMenu.menu" :to="{ path: item.path }" class="menu-list-second">{{item.menuName}}</router-link>
                </li>
            </ul>
        </div>
    </div>
    </div>
</template>
<script>
  export default {
    props: ['menuList'],
    data () {
      return {
        appMenu: this.menuList
      }
    },
    watch: {
      menuList () {
        this.appMenu = this.menuList
      }
    }
  }
</script>
<style type="less">
    /*header*/
    *{
        margin: 0;
        padding: 0;
    }
    .main-header .logo {
        height: 60px;
        float: left;
        text-decoration: none;
        text-align: center;
        line-height: 60px;
        font-size: 16px;
        color: #fff;
        padding-left: 20px;
        background-size: 24px 24px;
        display: inline-block;
    }
    .main-header {
        position: fixed;
        height: 60px;
        z-index: 999;
        top: 0;
        left: 0;
        width: 100%;
        background: #4778c7;
        font-family: "微软雅黑";
        /*border-bottom: 1px solid #c7cddb;*/
    }
    .main-header * {
        box-sizing: border-box;
    }

    /*左侧菜单*/
    .main-left {
        position: fixed;
        top: 0;
        bottom: 0;
        font-size: 14px;
        /*width: 135px;*/
        font-family: "微软雅黑";
    }
    .main-left.double-dis {
        /*width: 240px;*/
        background: #ecf0f1;
        margin-top: 60px;
    }
    .main-left ul li {list-style: none;}
    .main-left ul li.open{
        /*background: #e1e6f0;*/
    }
    .main-left ul{
        margin-top: 0;
        padding-left: 0;
        width: 160px;
        float: left;
    }
    .main-left .fl {
        float: left;
        overflow-x: hidden;
        overflow-y: auto;
        background: #b5ccf1;
        position: relative;
        transition: all .5s;
    }
    .main-left .fl.project {
        z-index: 10;
    }
    .main-left .fl.menu {
        min-width: 152px;
        width: 160px;
        -webkit-transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
        transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
    }
    .main-left .fl.transform-dismiss {
        min-width: 0!important;
        width: 0!important;
    }


    .main-left ul.header-menu-list {
        background: #b5ccf1;
        margin-bottom: 70px;
        width: 160px;
    }
    .main-left .header-title {
        width: 152px;
        padding: 20px 0 0 30px;
        font-size: 14px;
        color: #000;
    }

    .header-menu-list li a {
        font-size: 14px;
        display: block;
        height: 50px;
        line-height: 50px;
        border: none !important;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    .header-menu-list li a.menu-list {
        padding-left: 10px;
        color: #333 !important;
        font-size: 14px;
    }

    .header-menu-list li a {
        text-decoration: none;
    }
    .header-menu-list li a.menu-list-second:hover,
    .header-menu-list li a.menu-list-second.router-link-active{
        background: #f1f1f1;
        color: #333;
        padding-right: 10px;
    }
    .header-menu-list li a.menu-list-second {
        color: #666;
        padding-left: 20px;
        width: auto;
        height: 40px;
        line-height: 40px;
        font-size: 14px;
    }
    .dashboard-page {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: #ecf0f1;
        color: #666;
        transition: all .2s ease-in-out;
    }
    #body-container {
        background: #fff;
        margin-left: 160px;
        height: 100%;
        margin-top: 0;
        z-index: 998;
        transition: all .3s ease-in-out;
        -ms-transition: all .3s ease-in-out;
        -moz-transition: all .3s ease-in-out;
        -webkit-transition: all .3s ease-in-out;
        -o-transition: all .3s ease-in-out;}
    .secondMenuDisplay{
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        top: 60px;
        overflow: auto;
    }
</style>
