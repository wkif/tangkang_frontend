<template>
  <d2-container>
    <div class="page-header">

      <el-avatar src="https://q1.qlogo.cn/g?b=qq&amp;nk=190848757&amp;s=640" class="user-avatar">

      </el-avatar>
      <div class="title">
        <h1>{{ timeState }}</h1>
        <span> 今日晴，20℃ - 32℃！ </span>
      </div>
    </div>

    <el-row :gutter="20">
      <el-col :span="12">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>友情链接</span>

            <el-button style="float: right; padding: 3px 0" type="text">
              <el-link href="https://www.kifroom.icu" target="_blank" type="primary">更多</el-link>
            </el-button>
          </div>
          <el-row>
            <el-col :span="8" v-for="({ name, imageUrl, slogan, link }, index) in projects" :key="index">
              <el-card shadow="hover" style="padding: 0">
                <div class="project-detail">
                  <div>
                    <a :href="link" target="_blank">
                      <img :src="imageUrl" alt="">
                      <span v-text="name" class="name"></span>
                    </a>
                  </div>
                  <div v-text="slogan" class="slogan" :title="slogan"></div>
                </div>

              </el-card>
            </el-col>
          </el-row>
        </el-card>

      </el-col>


      <el-col :span="12">
        <div class="grid-content bg-purple">

          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>快捷导航</span>
            </div>
            <el-row>
              <el-col :span="8" v-for="({ name, icon, route, color }, index) of navigators" :key="index"
                style="padding: 0">
                <el-card shadow="hover">
                  <div style="display: flex;align-items: center;flex-direction: column;cursor: pointer"
                    @click="() => { gotoRoute(route) }">
                    <d2-icon-svg :name="icon" style="width: 25px;height: 25px;" :style="{ fill: color }" />
                    <div style="text-align: center;font-size: 12px;margin-top: 20px" v-text="name"></div>
                  </div>
                </el-card>
              </el-col>
            </el-row>
          </el-card>

          <el-card class="box-card" style="margin-top: 25px">
            <div class="work">
              <d2-icon-svg name="work" style="margin-left: 50%;transform: translateX(-50%);height: 216px" />
            </div>
          </el-card>
        </div>
      </el-col>
    </el-row>
    <!-- <v-chart class="chart" :option="option" /> -->
  </d2-container>
</template>

<script>
// import { request } from '@/api/service' //改成这个请求真实后端
// export const urlPrefix1 = '/api/system/getDailyOrder/'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { PieChart, LineChart } from 'echarts/charts'
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent

} from 'echarts/components'
import VChart, { THEME_KEY } from 'vue-echarts';
use([
  CanvasRenderer,
  PieChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
  LineChart
])
export default {
  name: 'workbench',
  components: {
    VChart,
  },
  data() {
    return {
      projects: [
        {
          name: '阿里云',
          imageUrl: 'https://img.alicdn.com/tfs/TB13DzOjXP7gK0jSZFjXXc5aXXa-212-48.png',
          slogan: '服务器租用，域名解析',
          link: 'https://cn.aliyun.com/'
        },
        {
          name: '七牛云',
          imageUrl: '/image/django-vue-admin.png',
          slogan: '七牛云图片存储',
          link: 'https://www.qiniu.com/'
        },
        {
          name: '宝塔面板',
          imageUrl: 'https://www.bt.cn/Public/new/images/logo.svg',
          slogan: '服务器管理',
          link: 'http://121.40.213.208:8888/'
        },

        {
          name: '官方论坛',
          imageUrl: '/image/django-vue-admin.png',
          slogan: 'Django-Vue-Admin 官方论坛',
          link: 'http://bbs.django-vue-admin.com'
        },
        {
          name: 'Web分析',
          imageUrl: '/image/django.png',
          slogan: '小程序数据分析',
          link: 'https://wedata.weixin.qq.com/mp2/basic-data/core-data'
        },
        {
          name: 'Django',
          imageUrl: '/image/django.png',
          slogan: '有期限的完美主义者的网络框架。',
          link: 'https://github.com/django/django'
        }
      ],
      navigators: [
        {
          name: '控制台',
          icon: 'home',
          route: {
            name: 'index'
          },
          color: 'rgb(31, 218, 202);'
        },
        {
          name: '部门管理',
          icon: 'department',
          route: {
            name: 'dept'
          },
          color: 'rgb(225, 133, 37);'
        },
        {
          name: '角色管理',
          icon: 'role',
          route: {
            name: 'role'
          },
          color: 'rgb(191, 12, 44);'
        },
        {
          name: '菜单管理',
          icon: 'menu',
          route: {
            name: 'menu'
          },
          color: 'rgb(63, 178, 127);'
        },
        {
          name: '用户管理',
          icon: 'user',
          route: {
            name: 'user'
          },
          color: 'rgb(191, 12, 44);'
        },
        {
          name: '日志管理',
          icon: 'log',
          route: {
            name: 'operationLog'
          },
          color: 'rgb(0, 216, 255);'
        }
      ],
      // chartData: {
      //   columns: ['日期', '销售额'],
      //   rows: [
      //     { 日期: '1月1日', 销售额: 123 },
      //     { 日期: '1月2日', 销售额: 1223 },
      //     { 日期: '1月3日', 销售额: 2123 },
      //     { 日期: '1月4日', 销售额: 4123 },
      //     { 日期: '1月5日', 销售额: 3123 },
      //     { 日期: '1月6日', 销售额: 7123 }
      //   ]
      // },
      timeState: '',
      user: '',
      option: {}
    }

  },
  methods: {
    gotoRoute(route) {
      this.$router.push(route)
    },
    getTimeState() {
      // 获取当前时间
      let timeNow = new Date();
      // 获取当前小时
      let hours = timeNow.getHours();
      // 设置默认文字
      let text = ``;
      // 判断当前时间段
      if (hours >= 0 && hours <= 10) {
        text = `早上好`;
      } else if (hours > 10 && hours <= 14) {
        text = `中午好`;
      } else if (hours > 14 && hours <= 18) {
        text = `下午好`;
      } else if (hours > 18 && hours <= 24) {
        text = `晚上好`;
      }
      console.log(`hours >>>>>`, hours);
      console.log(`text >>>>`, text);
      // 返回当前时间段对应的状态
      return text;
    },
    // async getData() {

    //   let res = await request({
    //     url: urlPrefix1,
    //     method: 'get'
    //   })
    //   console.log('res', res.data)
    //   let option = {
    //     title: {
    //       text: '日订单统计',
    //       show: true,

    //     },
    //     grid: {
    //       show: true,
    //     },
    //     xAxis: {
    //       type: 'category',
    //       data: res.data.xAxis,
    //       name: '日期',
    //     },
    //     yAxis: {
    //       type: 'value',
    //       name: '订单数量',
    //     },
    //     series: [
    //       {
    //         data: res.data.series,
    //         type: 'line'
    //       }
    //     ],
    //     tooltip: {
    //       trigger: 'axis',
    //       show: true,
    //     },
    //     toolbox: {
    //       show: true,
    //       feature: {
    //         dataZoom: {
    //           yAxisIndex: 'none'
    //         },
    //         dataView: { readOnly: false },
    //         magicType: { type: ['line', 'bar'] },
    //         restore: {},
    //         saveAsImage: {}
    //       }
    //     } 
    //   };
    //   this.option = option;
    // }
  },
  created() {
    this.timeState = this.getTimeState();
    // this.getData()
  },

}
</script>

<style scoped lang="scss">
$userAvatarLength: 72px;

.page-header {
  box-sizing: border-box;
  padding: 16px;

  .user-avatar {
    width: $userAvatarLength;
    height: $userAvatarLength;
    line-height: $userAvatarLength;
    display: inline-block;
  }

  .title {
    display: inline-block;
    padding: 0 0 0 15px;
    position: relative;
    top: -5px;

    h1 {
      font-size: 1.125rem;
      font-weight: 500;
      line-height: 1.75rem;
    }

    span {
      font-size: 14px;
      color: rgba(0, 0, 0, .45);
    }
  }

}

.project-detail {
  color: rgba(0, 0, 0, .45);
  height: 65px;

  img {
    width: 25px;
    height: 25px;
  }

  .name {
    margin-left: 1rem;
    font-size: 1rem;
    line-height: 2rem;
    height: 2rem;
    display: inline-block;
    color: rgba(0, 0, 0, .85);
    position: relative;
    top: -5px;
  }

  .slogan {
    font-size: 12px;
    padding: 5px 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .team {
    font-size: 14px;
  }
}

.activity {
  padding: 0;

  .activity-avatar {
    width: 40px;
    height: 40px;
    line-height: 40px;
  }

  .activity-detail {
    padding: 10px;
    line-height: 15px;
    font-size: 14px;
    color: rgba(0, 0, 0, .85);
  }
}

.chart {
  height: 408px;
}

.el-divider--horizontal {
  margin: 4px 0;
  background: 0 0;
  border-top: 1px solid #e8eaec;

}

.el-card,
.el-message {
  border-radius: 0;
}
</style>
