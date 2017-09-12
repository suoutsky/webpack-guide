<template>
    <div class="container">
      <nav>
        <ul>
          <li><router-link to="/button">button</router-link></li>
          <li><router-link to="/vnode">vnode</router-link></li>
          <li><router-link to="/vtable">vtable</router-link></li>
          <li><router-link to="/modal">modal</router-link></li>
        </ul>
      </nav>
      <router-view></router-view>
    </div>
</template>
<script>
    module.exports = {
        data: function() {
            return {

            }
        },
        mounted: function() {

        },
        beforeDestroy: function() {

        },
        methods: {

        }
    }
</script>
<style lang="less">
  @import  "../src/styles/index.less";
</style>
<style lang="less">
  nav {
    ul {
      margin-bottom: 100px;
      li {
        border: 1px solid #eee;
        background-color: #e3e3e3;
      }
    }
  }
</style>