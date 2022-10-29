<template>
    <d2-container :class="{ 'page-compact': crud.pageOptions.compact }">
        <template slot="header">积分历史管理</template>
        <d2-crud-x ref="d2Crud" v-bind="_crudProps" v-on="_crudListeners">
            <!-- 自动绑定参数与事件 -->
            <!-- 包含详细参数见：https://gitee.com/greper/d2-crud-plus/blob/master/packages/d2-crud-plus/src/lib/mixins/crud.js#L164-->
            <div slot="header">
                <!-- <crud-search ref="search" :options="crud.searchOptions" @submit="handleSearch" />
                <el-button-group>
                    <el-button size="small" type="primary" @click="addRow"><i class="el-icon-plus" /> 新增</el-button>
                </el-button-group>
                <crud-toolbar v-bind="_crudToolbarProps" v-on="_crudToolbarListeners" /> -->
            </div>
        </d2-crud-x>
    </d2-container>
</template>
<!-- announcementManage -->


<script>
import { crudOptions } from './crud' //上文的crudOptions配置
import { d2CrudPlus } from 'd2-crud-plus'
import { createObj, GetList, UpdateObj, DelObj } from './api' //查询添加修改删除的http请求接口
export default {
    name: 'integralHistory',
    mixins: [d2CrudPlus.crud], // 最核心部分，继承d2CrudPlus.crud
    methods: {
        getCrudOptions() {
            return crudOptions(this)
        },
        pageRequest(query) {
            return GetList(query)
        },
       
        updateRequest(row) {
        
            return UpdateObj(row)
        },
      
        // ...// 还可以覆盖d2CrudPlus.crud中的方法来实现你的定制化需求
    }
}
</script>
<style lang="less" rel="stylesheet/less" scoped>
</style>