<template>
    <div>
        <template>
            <el-card class="box-card">
                <!-- <div class="handle-box">
                    <el-input v-model="searchValue" placeholder="内容" class="handle-input mr10"></el-input>
                    <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
                </div> -->

                <el-table :data="tableData" border style="width: 100%" height="700">
                    <el-table-column fixed align="center" prop="username" label="用户名">
                    </el-table-column>
                    <el-table-column prop="name" label="姓名">
                    </el-table-column>

                    <el-table-column label="性别">
                        <template slot-scope="scope">
                            <el-tag v-if="scope.row.gender == 0">男</el-tag>
                            <el-tag v-else>女</el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column prop="birthday" label="生日">
                    </el-table-column>
                    <el-table-column prop="email" label="邮箱">
                    </el-table-column>
                    <el-table-column prop="mobile" label="电话">
                    </el-table-column>
                    <el-table-column prop="height" label="身高（单位：cm）">
                    </el-table-column>
                    <el-table-column prop="weight" label="体重（单位：kg）">
                    </el-table-column>
                    <el-table-column prop="waistline" label="腰围">
                    </el-table-column>
                    <el-table-column prop="bloodType" label="血型">
                    </el-table-column>
                    <el-table-column prop="userRegDate" label="注册时间">
                    </el-table-column>
                    <el-table-column label="实名认证">
                        <template slot-scope="scope">
                            <el-tag v-if="scope.row.realNameAuthentication">是</el-tag>
                            <el-tag v-else>否</el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column label="封禁">
                        <template slot-scope="scope">

                            <el-tag type="danger" v-if="!scope.row.is_active">已封禁</el-tag>
                            <el-tag type="success" v-else>未封禁</el-tag>

                        </template>
                    </el-table-column>
                    <el-table-column fixed="right" label="操作">
                        <template slot-scope="scope">
                            <!-- <el-row>
                                <el-button @click="handleClick(scope.row)" type="text" icon="el-icon-view">
                                </el-button>
                                <el-button type="text" icon="el-icon-edit"></el-button>
                                <el-button type="text" icon="el-icon-delete"></el-button>
                            </el-row> -->
                            <el-button-group>
                                <el-button icon="el-icon-view" @click="preview(scope.row)"></el-button>
                                <!-- <el-button type="primary" icon="el-icon-edit" @click="edit(scope.row)"></el-button> -->
                                <el-button type="danger" icon="el-icon-close" @click="Delete(scope.row)"></el-button>
                            </el-button-group>
                        </template>
                    </el-table-column>
                </el-table>
                <div class="pagination">

                    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                        :page-sizes="[10, 15, 20]" :page-size="pagesize"
                        layout="total, sizes, prev, pager, next, jumper" :total="total">
                    </el-pagination>
                </div>
            </el-card>
        </template>
        <el-dialog title="详细信息" :visible.sync="dialogTableVisible">
            <el-card class="box-card-user">
                <img :src="userDetail.avatar" alt="" class="image">
                <div style="padding: 14px;">
                    <span>用户名：{{ userDetail.username }}</span>
                    <br />
                    <span>姓名：{{ userDetail.name }}</span>
                    <br />
                    <span>性别:<el-tag type="success" v-if="userDetail.gender">男</el-tag>
                        <el-tag type="danger" v-else>女</el-tag>
                    </span>
                    <br />
                    <span>生日:{{ userDetail.birthday }}</span>
                    <br />
                    <span>手机号:{{ userDetail.mobile }}</span>
                    <br />
                    <span>Email：:{{ userDetail.email }}</span>
                    <br />
                    <div class="bottom clearfix">
                        <time class="time">注册日期：{{ userDetail.userRegDate }}</time>
                        <!-- <el-button type="text" class="button">操作按钮</el-button> -->
                    </div>
                </div>
            </el-card>
        </el-dialog>
    </div>
</template>

<script>
import { getDetal, GetList, UpdateObj } from './api' // 查询添加修改删除的http请求接口
export default {
    name: 'usermanage',
    props: {

    },
    components: {

    },
    data() {
        return {
            tableData: [],
            currentPage: 1,
            pagesize: 10,
            total: 0,
            searchValue: '',
            dialogTableVisible: false,
            userDetail: {},
        }
    },
    methods: {
        getCrudOptions() {
            return crudOptions(this)
        },
        pageRequest() {
            let query = {
                page: this.currentPage,
                limit: this.pagesize
            }
            return GetList(query)
        }, // 数据请求

        updateRequest(row) {
            return UpdateObj(row)
        }, // 修改请求
        getDetalRequest(row) {
            return getDetal(row)
        },// 删除请求

        handleSizeChange(val) {
            this.pagesize = val;
            this.getData()
        },
        handleCurrentChange(val) {
            this.currentPage = val;
            this.getData()
        },
        getData() {
            this.pageRequest().then(res => {
                this.tableData = res.data.data;
                this.total = res.data.total;
            })
        },
        preview(row) {
            console.log(row);
            this.getDetalRequest(row.id).then(res => {
                console.log(res);
                if (res.code == 2000) {
                    this.userDetail = res.data;
                    this.dialogTableVisible = true;
                }

            })
        },
        Delete(row) {
            console.log(row);
            this.$confirm(row.is_active ? '确认封禁该用户吗？' : '确认解禁该用户吗？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.updateRequest(row).then(res => {
                    this.$message({
                        type: 'success',
                        message: '操作成功!'
                    });
                    this.getData()
                })
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消封禁'
                });
            });
        },
        edit(row) {
            console.log(row);
        }

    },
    mounted() {

        this.getData()
    }
}
</script>

<style lang="less" rel="stylesheet/less" scoped>
.box-card-user {
    margin: 20%;
}

.time {
    font-size: 13px;
    color: #999;
}

.bottom {
    margin-top: 13px;
    line-height: 12px;
}

.button {
    padding: 0;
    float: right;
}

.image {
    width: 100px;
    display: block;
}

.clearfix:before,
.clearfix:after {
    display: table;
    content: "";
}

.clearfix:after {
    clear: both
}
</style>