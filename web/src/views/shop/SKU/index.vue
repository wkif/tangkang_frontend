<template>
    <d2-container :class="{ 'page-compact': crud.pageOptions.compact }">
        <template slot="header">商品管理</template>
        <d2-crud-x ref="d2Crud" v-bind="_crudProps" v-on="_crudListeners" @viewCommit="viewCommit">
            <!-- 自动绑定参数与事件 -->
            <!-- 包含详细参数见：https://gitee.com/greper/d2-crud-plus/blob/master/packages/d2-crud-plus/src/lib/mixins/crud.js#L164-->
            <div slot="header">
                <crud-search ref="search" :options="crud.searchOptions" @submit="handleSearch" />
                <el-button-group>
                    <el-button size="small" type="primary" @click="addRow"><i class="el-icon-plus" /> 新增</el-button>
                </el-button-group>
                <crud-toolbar v-bind="_crudToolbarProps" v-on="_crudToolbarListeners" />
            </div>
        </d2-crud-x>
        <el-drawer :title="connitItem.name" size="50%" :visible.sync="drawer" :direction="direction"
            :before-close="handleClose">
            <div class="view">
                <!-- {{ connitItem }} -->
                <el-empty v-if="!hasCommit" description="无评论"></el-empty>
                <el-card v-else class="box-card" v-for="item in connitItem.comments">
                    <div slot="header" class="clearfix">
                        <el-avatar :src="item.user.avatar"></el-avatar>
                        <span>{{ item.user.username }}</span>
                        <el-button type="danger" style="float: right; padding: 3px 0" icon="el-icon-delete"
                            @click="deleteCommit(item)"></el-button>
                        <!-- <el-button  type="text">操作按钮</el-button> -->
                    </div>
                    <div class="text item">
                        {{ item.content }}
                    </div>
                    <div class="block">
                        <el-rate disabled v-model="item.score" score-template="{item.score}">
                        </el-rate>
                    </div>
                </el-card>


            </div>

            <!-- {{ connitItem }} -->
        </el-drawer>
    </d2-container>
</template>
<!-- announcementManage -->


<script>
import { request } from '@/api/service'
import { crudOptions } from './crud' //上文的crudOptions配置
import { d2CrudPlus } from 'd2-crud-plus'
import { createObj, GetList, UpdateObj, DelObj } from './api' //查询添加修改删除的http请求接口
export default {
    name: 'SKU',
    mixins: [d2CrudPlus.crud], // 最核心部分，继承d2CrudPlus.crud
    data() {
        return {
            connitItem: '',
            drawer: false,
            direction: 'rtl',
            hasCommit: false,
        }
    },
    methods: {
        viewCommit(e) {
            this.connitItem = e.data[e.index]
            if (this.connitItem.comments.length > 0) {
                this.hasCommit = true
            }
            this.drawer = true
        },
        handleClose(done) {
            this.$confirm('确认关闭？')
                .then(_ => {
                    this.hasCommit = false
                    done();
                })
                .catch(_ => { });
        },
        async deleteCommit(e) {
            console.log('e', e.id)
            this.$confirm('确认删除？')
                .then(_ => {
                    request({
                        url: '/api/shop/deleteCommitById/?id=' + e.id,
                        method: 'get'
                    }).then((res) => {
                        if (res.status == 200) {
                            this.$message.success('删除成功')
                            location.reload()
                        } else {
                            this.$message.error(res.msg)
                        }
                        // done();
                    })

                })
                .catch(_ => { });
        },
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
        updateRequest(row) {

            return UpdateObj(row)
        },
        delRequest(row) {
            return DelObj(row.id)
        },

        // ...// 还可以覆盖d2CrudPlus.crud中的方法来实现你的定制化需求
    }
}
</script>
<style lang="less" rel="stylesheet/less" scoped>
.view {
    padding-left: 10%;

    .el-card {
        width: 80%;
        margin-top: 20px;
        margin: 0 auto;
    }

    // padding-right: 20%;
    .block {
        margin-top: 10px;
        margin-bottom: 10px;
    }
}
</style>