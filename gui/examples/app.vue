<style lang="less">
  @import  "../src/styles/index.less"
</style>
<template>
    <div class="container">
      <nav>
        <ul>
          <li><router-link to="/button">button<router-link></li>
        </ul>
      </nav>
      <router-view></router-view>
    </div>
</template>
<script>
    module.exports = {
        
    }
</script>