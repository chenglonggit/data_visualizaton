<template>
    <div class="comp-table" :style="tableBoxStyle">
        <el-table
            :header-cell-style="tableHeaderStyle"
            :cell-style="cellStyle"
            :data="tableData"
            height="100%"
            border
            style="width: 100%">
            <el-table-column
                :prop="item.prop"
                :label="item.label"
                :width="`${cellWidth}${unit}`"
                v-for="(item,index) in colData" :key="index">
            </el-table-column>
        </el-table>
    </div>

</template>

<script>
    export default {
        name: "CompTable",
        data: () => {
            return {}
        },
        props: {
            unit: {
                type: String,
                default: () => {
                    return ''
                }
            },
            customStyle: {
                type: Object,
                default: () => {
                    return {}
                }
            },
            option: {
                type: Object,
                default: () => {
                    return {}
                }
            },
            size: {
                type: Object,
                default: () => {
                    return {}
                }
            },
            outerStyleUnit:{
                type: Object,
                default: () => {
                    return {}
                }
            }
        },
        mounted() {
            console.log(this.option);
            console.log(this.customStyle);
            console.log(this.$attrs);
        },
        computed: {
            colData: function () {
                let colData = [];
                if (this.option.colNum > this.option.col.length) {
                    colData = this.option.col;
                    for (let i = this.option.col.length; i < this.option.colNum; i++) {
                        colData.push({
                            prop: " ",
                            label: " "
                        })
                    }
                } else {
                    colData = this.option.col.slice(0, this.option.colNum)
                }
                return colData
            },
            colNum: function () {
                return this.option.colNum
            },
            rowNum: function () {
                return this.option.rowNum
            },
            cellWidth: function () {
                let width = Math.floor(this.outerStyleUnit.width / this.option.colNum);
                return width && width > 100 ? width : 100
            },
            tableData: function () {
                let tableData = this.option.tableData;
                let tableList = [];
                let rowNum = this.option.rowNum;
                for (let i = 0; i < rowNum; i++) {
                    if (i < 7) {
                        tableList = tableList.concat(tableData)
                    } else {
                        tableList.push({
                            date: ' ',
                            name: ' ',
                            number: ' '
                        })
                    }
                }
                return tableList
            },
            tableBoxStyle: function () {
                let createComponent = JSON.parse(JSON.stringify(this.option));
                let unit = this.unit;

                let tableBoxStyle = {};
                if (createComponent.tableBoxStyle) {
                    tableBoxStyle = createComponent.tableBoxStyleUnit;
                    Object.keys(createComponent.tableBoxStyleUnit).forEach(function (key) {
                        createComponent.tableBoxStyleUnit[key] = createComponent.tableBoxStyleUnit[key] + unit
                    });
                }
                if (createComponent.tableBoxStyle) {

                    tableBoxStyle = Object.assign({}, tableBoxStyle, createComponent.tableBoxStyle)
                }
                return tableBoxStyle

            },
            cellStyle: function () {
                let createComponent = JSON.parse(JSON.stringify(this.option));
                let unit = this.unit;

                let cellStyle = {};
                if (createComponent.cellStyleUnit) {
                    cellStyle = createComponent.cellStyleUnit;
                    Object.keys(createComponent.cellStyleUnit).forEach(function (key) {
                        createComponent.cellStyleUnit[key] = createComponent.cellStyleUnit[key] + unit
                    });
                }
                let height = Math.floor((this.outerStyleUnit.height-this.option.tableHeaderStyleUnit['height']) / this.option.rowNum);
                height= height && height <40 ? 40:Math.floor(height) ;
                let heightObj={
                    height:height+unit
                };
                if (createComponent.cellStyle) {

                    cellStyle = Object.assign({}, cellStyle, createComponent.cellStyle)
                }
                cellStyle = Object.assign({}, cellStyle, heightObj);
                return cellStyle

            },
            tableHeaderStyle: function () {
                let createComponent = JSON.parse(JSON.stringify(this.option));
                let unit = this.unit;
                let tableHeaderStyle = {};
                if (createComponent.tableHeaderStyleUnit) {
                    tableHeaderStyle = createComponent.tableHeaderStyleUnit;
                    Object.keys(createComponent.tableHeaderStyleUnit).forEach(function (key) {
                        createComponent.tableHeaderStyleUnit[key] = createComponent.tableHeaderStyleUnit[key] + unit
                    });
                }
                if (createComponent.tableHeaderStyle) {
                    tableHeaderStyle = Object.assign({}, tableHeaderStyle, createComponent.tableHeaderStyle)
                }
                return tableHeaderStyle
            }
        }
    }
</script>

<style lang="scss" scoped>
    .comp-table {
        width: 100%;
        height: 100%;
        box-sizing:border-box;
    }

    .comp-table /deep/ .el-table .cell {
        white-space: nowrap
    }

    .comp-table /deep/ .el-table__body-wrapper {
        overflow-x: hidden;
    }
    .comp-table /deep/ .el-table{
        background: transparent;
    }
    .comp-table /deep/ .el-table__expanded-cell{
        background:transparent;
    }
    .comp-table /deep/ .el-table th{
        background:transparent;
    }
    .comp-table /deep/ .el-table tr{
        background:transparent;
    }
    .comp-table /deep/ .el-table::before{
        background:transparent;
    }
</style>
