<template>
    <d2-container :class="{ 'page-compact': crud.pageOptions.compact }">
        <template slot="header">订单管理</template>
        <d2-crud-x ref="d2Crud" v-bind="_crudProps" v-on="_crudListeners" @edit="edit">
            <!-- 自动绑定参数与事件 -->
            <!-- 包含详细参数见：https://gitee.com/greper/d2-crud-plus/blob/master/packages/d2-crud-plus/src/lib/mixins/crud.js#L164-->
            <div slot="header">
                <crud-search ref="search" :options="crud.searchOptions" @submit="handleSearch" />
                <!-- <el-button-group>
                    <el-button size="small" type="primary" @click="addRow"><i class="el-icon-plus" /> 新增</el-button>
                </el-button-group> -->
                <crud-toolbar v-bind="_crudToolbarProps" v-on="_crudToolbarListeners" />
            </div>
        </d2-crud-x>
        <el-dialog title="订单修改" :visible.sync="dialogTableVisible">
            <el-form ref="form" :model="form" label-width="80px">
                <el-form-item label="订单状态">
                    <el-select v-model="form.order_status" placeholder="请选择订单状态">
                        <el-option label="待支付" value="1"></el-option>
                        <el-option label="待发货" value="2"></el-option>
                        <el-option label="待收货" value="3"></el-option>
                        <el-option label="待评价" value="4"></el-option>
                        <el-option label="已完成" value="5"></el-option>
                        <el-option label="已取消" value="6"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="物流编号">
                    <el-input v-model="form.tracking_number"></el-input>
                </el-form-item>
                <el-form-item label="商品数量">
                    <el-input-number v-model="form.total_count" label="描述文字">
                    </el-input-number>
                </el-form-item>
                <el-form-item label="总价">
                    <el-input-number v-model="form.total_price" label="描述文字">
                    </el-input-number>
                </el-form-item>
                <el-form-item label="运费">
                    <el-input-number v-model="form.transit_price" label="描述文字">
                    </el-input-number>
                </el-form-item>

            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogTableVisible = false">取 消</el-button>
                <el-button type="primary" @click="submit">确 定</el-button>
            </div>
        </el-dialog>
    </d2-container>
</template>
<!-- announcementManage -->


<script>
import { crudOptions } from './crud' //上文的crudOptions配置
import { d2CrudPlus } from 'd2-crud-plus'
import { createObj, GetList, UpdateObj, DelObj } from './api' //查询添加修改删除的http请求接口
export default {
    name: 'OrderInfo',
    mixins: [d2CrudPlus.crud], // 最核心部分，继承d2CrudPlus.crud
    data() {
        return {
            orderItem: '',
            form: {
                id: '',
                order_id: '',
                user: '',
                address: '',
                good: '',
                trade_no: '',




                order_status: '',
                tracking_number: '',
                total_count: '',
                total_price: '',
                transit_price: ''
            },
            dialogTableVisible: false,
        }
    },
    methods: {
        getCrudOptions() {
            return crudOptions(this)
        },
        pageRequest(query) {

            return GetList(query)
        },
        addRequest(row) {
            console.log('row', row)
            return createObj(row)
        },
        updateRequest() {

            return UpdateObj(this.form)
        },
        edit(e) {

            this.orderItem = e.data[e.index]
            this.form.id = this.orderItem.id
            this.form.order_id = this.orderItem.order_id
            this.form.user = this.orderItem.user.id
            this.form.address = this.orderItem.address.id
            this.form.good = this.orderItem.good.id
            this.form.trade_no = this.orderItem.trade_no
            this.form.order_status = this.orderItem.order_status
            this.form.tracking_number = this.orderItem.tracking_number
            this.form.total_count = this.orderItem.total_count
            this.form.total_price = this.orderItem.total_price
            this.form.transit_price = this.orderItem.transit_price


            console.log('this.orderItem', this.orderItem)
            this.dialogTableVisible = true
        },
        async submit() {
            this.dialogTableVisible = false
            let res = await this.updateRequest()
            console.log('res', res)
            if (res.code == 2000) {
                //    提示
                this.$message({
                    message: '修改成功',
                    type: 'success'
                });
            } else {
                this.$message({
                    message: '修改失败',
                    type: 'error'
                });
            }
        },
        delRequest(row) {
            return DelObj(row.id)
        },
        // ...// 还可以覆盖d2CrudPlus.crud中的方法来实现你的定制化需求
    }
}
</script>
<style lang="less" rel="stylesheet/less" scoped>
</style>