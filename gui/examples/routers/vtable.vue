<template>
    <div>
        <v-table :columns="columns" :data="data"></v-table>
        <Button @click.native="handleAddData">添加</Button>
    </div>
</template>
<script>
    import vTable from './components/table.js';
    export default {
        components: { vTable },
        data () {
            return {
              columns: [
                  {
                      title: '姓名',
                      key: 'name'
                  },
                  {
                      title: '年龄',
                      key: 'age',
                      sortable: true
                  },
                  {
                      title: '出生日期',
                      key: 'birthday',
                      sortable: true
                  },
                  {
                      title: '地址',
                      key: 'address'
                  }
              ],
              data: [
                  {
                      name: '王小',
                      age: 18,
                      birthday: '1991-10-10',
                      address: 'hangzhou'
                  },
                  {
                      name: '张小',
                      age: 17,
                      birthday: '1992-10-10',
                      address: 'shaoxin'
                  },
                  {
                      name: '苏小',
                      age: 16,
                      birthday: '1993-10-10',
                      address: 'xihu'
                  },
                  {
                      name: '朱小',
                      age: 15,
                      birthday: '1994-10-10',
                      address: 'jianggan'
                  }
              ]
            }
        },
        methods: {
            handleAddData() {
                console.log(1);
                this.data.push({
                    name: '楚风',
                    age: 19,
                    birthday: '1995-10-10',
                    address: 'diqiu'
                });
                console.log(this.data);
            }
        }
    }
</script>
<style lang="less">
    
</style>