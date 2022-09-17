<template>
    <d2-container>
        <el-row>
            <el-col :span="12">
                <v-chart class="chart" :option="option1" />
            </el-col>
            <el-col :span="12">
                <v-chart class="chart" :option="option2" />
            </el-col>
        </el-row>

    </d2-container>
</template>

<script>
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { PieChart } from 'echarts/charts'
import {
    TitleComponent,
    TooltipComponent,
    LegendComponent
} from 'echarts/components'
import VChart, { THEME_KEY } from 'vue-echarts';

import { request } from '@/api/service' //改成这个请求真实后端
export const urlPrefix1 = '/api/system/commodityDlassificationData/'
export const urlPrefix2 = '/api/system/getBrandData/'
use([
    CanvasRenderer,
    PieChart,
    TitleComponent,
    TooltipComponent,
    LegendComponent
])
export default {
    name: 'shopData',
    components: {
        VChart,
    },
    data() {
        return {
            option1: {},
            option2: {}
        }

    },
    methods: {
        async getData() {

            let res = await request({
                url: urlPrefix1,
                method: 'get'
            })
            console.log('res', res.data)
            let option1 = {
                tooltip: {
                    trigger: 'item'
                },
                legend: {
                    top: '5%',
                    left: 'center'
                },
                series: [
                    {
                        name: '商品分类数据',
                        type: 'pie',
                        radius: ['40%', '70%'],
                        avoidLabelOverlap: false,
                        itemStyle: {
                            borderRadius: 10,
                            borderColor: '#fff',
                            borderWidth: 2
                        },
                        label: {
                            show: false,
                            position: 'center'
                        },
                        emphasis: {
                            label: {
                                show: true,
                                fontSize: '40',
                                fontWeight: 'bold'
                            }
                        },
                        labelLine: {
                            show: false
                        },
                        data: res.data
                    }
                ]
            }
            this.option1 = option1


            let res2 = await request({
                url: urlPrefix2,
                method: 'get'
            })
            console.log('res', res.data)
            let option2 = {
                tooltip: {
                    trigger: 'item'
                },
                legend: {
                    top: '5%',
                    left: 'center'
                },
                series: [
                    {
                        name: '商品品牌数据',
                        type: 'pie',
                        radius: ['40%', '70%'],
                        avoidLabelOverlap: false,
                        itemStyle: {
                            borderRadius: 10,
                            borderColor: '#fff',
                            borderWidth: 2
                        },
                        label: {
                            show: false,
                            position: 'center'
                        },
                        emphasis: {
                            label: {
                                show: true,
                                fontSize: '40',
                                fontWeight: 'bold'
                            }
                        },
                        labelLine: {
                            show: false
                        },
                        data: res2.data
                    }
                ]
            }
            this.option2 = option2
        }
    },
    created() {
        this.getData()
    }
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
