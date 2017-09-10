<template>
   <div>
    <smartitem :data="data"></smartitem>
    <Button-group>
      <Button @click.native="changeType('img')">切换为图片组件</Button>
      <Button @click.native="changeType('video')">切换为视频组件</Button>
      <Button @click.native="changeType('text')">切换为文字组件</Button>
    </Button-group>
  </div>  
</template>
<script>
    import smartitem from './components/smartitem.js';
    export default {
      components: {
        smartitem
      },
      data() {
          return {
              data: {}
          };
      },
      methods: {
        changeType(type) {
          if (type === 'img') {
             this.data = {
                type: 'img',
                url: 'http://originoo-1.b0.upaiyun.com//6/2017/05/15/p_ch4cexfx8zo0pn7a8qy77xtrprglqomt.jpg!originoo1024/watermark/text/UDAwMDAyMzk5OTggICDojqvmnJfop4bop4k=/align/southwest/size/22/color/fffffe/font/simhei/margin/15x210'
             }
          } 
          if (type === 'video') {
             this.data = {
                type: 'video',
                url: 'http://v.youku.com/v_show/id_XMzAxMjc4ODMwNA==.html'
             }
          } 
          if (type === 'text'){
            this.data = {
                type: 'text',
                content: '不负夏日'
            }   
          }
        }
      }
    }
</script>