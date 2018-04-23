<template>
    <div class="app-content">
      <c-header :menuList="menuList"></c-header>
      <section id="body-container" >
        <div class="content">
          <router-view ></router-view>
        </div>
      </section>
    </div>
</template>
<script>
    import header from '@/components/header/header'
    export default {
      data () {
        return {
          menuList: {
            appName: 'xxxx第一个系统',
            menu: [
              {
                menuName: 'xxxx第一',
                path: '/demo1/page1'
              },
              {
                menuName: 'xxxx第二',
                path: '/demo1/page2'
              }
            ]
          }
        }
      },
      components: {
        'c-header': header
      }
    }
</script>
<style type="less">
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
    .content{
        margin-top: 60px;
        left: 0;
        right: 0;
        bottom: 0;
        top: 60px;
        overflow: auto;
    }
</style>
