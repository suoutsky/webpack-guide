<template>
    <div>
      <Button-group>
         <Button @click="showModal = true">显示Modal</Button>
      </Button-group>
      <Modal v-model="showModal" title="弹窗">
         
      </Modal>
    </div>
</template>
<script>
    export default {
        data() {
            return { 
                showModal: false
            }    
        },
        methods: {
            ok() {
                alert('点了Ok!');
            },
            cancel() {
                alert('点了取消');
            }
        }
    }
</script>