export default {
    props: {
        columns: {
            type: Array,
            default () {
                return [];
            }
        },
        data: {
            type: Array,
            defult () {
                return [];
            }
        }
    },
    data() {
       return {
           currentColumns: [],
           currentData: []
       }
    },
    methods: {
        makeColumns() {
            this.currentColumns = this.columns.map((col, index) => {
                col._sortType = 'normal';
                col._index = index;
                return col;
            });
        },
        makeData() {
            this.currentData = this.data.map((row, index) => {
                row._index = index;
                return row;
            })
        },
        handleSortByAsc(index) {
            const key = this.currentColumns[index].key;
            this.currentColumns.forEach((col) => {
                col._sortType = 'normal';
            });
            this.currentColumns[index]._sortType = 'asc';
            this.currentData.sort((a, b) => {
                return a[key] > b[key] ? 1 : -1;
            })
        },
        handleSortByDesc(index) {
            const key = this.currentColumns[index].key;
            this.currentColumns.forEach((col) => {
                col._sortType = 'normal';
            });
            this.currentColumns[index]._sortType = 'asc';
            this.currentData.sort((a, b) => {
                return a[key] < b[key] ? 1 : -1;
            });
        }
    },
    mounted() {
        this.makeColumns();
        this.makeData();
    },
    render (h) {
        const ths = [];
        const trs = [];
        this.currentColumns.forEach((col, index) => {
            if (col.sortable) {
                ths.push(h('th',[
                  h('span', col.title),
                  h('a', {
                    class: {
                        on: col._sortType === 'asc'
                    },
                    on: {
                        click: () => {
                            this.handleSortByAsc(index)
                        }
                    }
                  }, '↑'),
                  h('a', {
                    class: {
                        on: col._sortType === 'desc'
                    },
                    on: {
                        click: () => {
                            this.handleSortByDesc(index)
                        }
                    }
                  }, '↓'),
                ]));
            } else {
                ths.push(h('th', col.title));
            }
        });
        this.currentData.forEach((row) => {
           const tds = [];
           this.currentColumns.forEach((cell) => {
               tds.push(h('td', row[cell.key]))
           });
           trs.push(h('tr', tds));
        });

        return h('table', [
            h('thead', [
                h('tr', ths)
            ]),
            h('tbody', trs)
        ])
    },
    watch: {
        data() {
            this.makeData();
            const sortedColumn = this.currentColumns.filter((col) => {
                return col._sortType !== 'nomal';
            });
            console.log(sortedColumn);
            if (sortedColumn[0]._sortType === 'asc') {
                this.handleSortByAsc(sortedColumn[0]._index);
            }
        }
    }
}