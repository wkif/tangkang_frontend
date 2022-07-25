<template>
    <div class="app">
        <el-card class="md-card">
            <div class="app-container">

                <mavon-editor ref="md" @save="save" @imgAdd="imgAdd" @imgDel="imgDel"
                    v-model="markdownForm.contentMarkdown" :codeStyle="markdown.codeStyle" scrollStyle="true"
                    :toolbars="markdown.toolbars" />
                <br>
                <el-row>
                    <el-col :span="2">
                        <el-button @click="goback">返 回</el-button>
                    </el-col>
                    <el-col :span="2" :offset="20">
                        <el-button type="primary" style="float: right;" @click="save">保 存</el-button>
                    </el-col>

                </el-row>
            </div>
        </el-card>

    </div>
</template>

<script>
import { getDetal, UpdateObj } from './api'
export default {
    name: 'userAgreement',
    props: {

    },
    components: {

    },
    data() {
        return {
            markdown: {
                codeStyle: 'atom-one-dark-reasonable',
                toolbars: {
                    bold: true, // 粗体
                    italic: true, // 斜体
                    header: true, // 标题
                    underline: true, // 下划线
                    strikethrough: true, // 中划线
                    mark: true, // 标记
                    superscript: true, // 上角标
                    subscript: true, // 下角标
                    quote: true, // 引用
                    ol: true, // 有序列表
                    ul: true, // 无序列表
                    link: true, // 链接
                    // imagelink: true, // 图片链接
                    code: true, // code
                    table: true, // 表格
                    fullscreen: true, // 全屏编辑
                    readmodel: true, // 沉浸式阅读
                    htmlcode: true, // 展示html源码
                    help: true, // 帮助
                    /* 1.3.5 */
                    undo: true, // 上一步
                    redo: true, // 下一步
                    trash: true, // 清空
                    save: true, // 保存（触发events中的save事件）
                    /* 1.4.2 */
                    navigation: true, // 导航目录
                    /* 2.1.8 */
                    alignleft: true, // 左对齐
                    aligncenter: true, // 居中
                    alignright: true, // 右对齐
                    /* 2.2.1 */
                    subfield: true, // 单双栏模式
                    preview: false, // 预览
                }
            },
            markdownForm: {
                articleId: null,
                title: "",
                contentMarkdown: '',
                contentHtml: null,
                type: 0
            },
            rules: {

            },
            lastSaveTime: null,
            timer: null,
            id: ''
        }
    },
    methods: {
        async getArticle() {
            let res = await getDetal(1)
            // console.log('res', res)
            if (res.code == 2000) {
                this.markdownForm.contentMarkdown = res.data.content == null ? '' : res.data.content
                this.id = res.data.id
            }
        },
        async save() {  //保存文章内容
            let obj = {
                id: this.id,
                data: {
                    content: this.markdownForm.contentMarkdown,
                    update_datetime: new Date()

                }
            }
            let res = await UpdateObj(obj)
            console.log('res', res)
            if (res.code == 2000) {
                this.$message({
                    message: '保存成功',
                    type: 'success'
                })
            }
        },
        intervalSave() { //自动保存
            let now = new Date()
            if (now - this.lastSaveTime >= 2 * 60 * 1000) {
                this.save()
                this.lastSaveTime = now
            }
        },
        imgAdd(pos, file) { //添加图片，pos为位置
            let markdownImg = {}, $vm = this.$refs.md
            markdownImg.base64Data = file.miniurl  //获取图片base64内容
            markdownImg.type = file.type
            this.$message({
                message: '开发中。。。',
                type: 'error'
            })
            // uploadImg(markdownImg).then(r => {
            //     console.log(r)
            //     $vm.$img2Url(pos, process.env.VUE_APP_BASE_API + '/img/' + r.data)
            // }).catch(e => {
            //     console.log(e)
            // })
        },
        imgDel(pos, url) { //删除图片，并不是修改就会触发，仅支持工具栏操作
            console.log(pos)
            console.log(url)
        }
    },
    created() {
        this.getArticle()
    },
    mounted() {

        this.timer = setInterval(this.intervalSave, 2 * 60 * 1000);
    },
    beforeDestroy() {
        clearInterval(this.timer);
    },
}
</script>

<style lang="less" rel="stylesheet/less" scoped>
.app {
    .md-card {
        .v-note-panel.shadow {
            min-height: 440px; //设置编辑框最小高度
        }

        // overflow: hidden;
        // height: 820px;


    }

}
</style>