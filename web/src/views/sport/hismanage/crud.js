import { request } from '@/api/service'
export const crudOptions = (vm) => {
    return {

        pageOptions: {
            compact: true
        },
        options: {
            tableType: 'vxe-table',
            rowKey: true, // 必须设置，true or false
            rowId: 'id',
            height: '100%', // 表格高度100%, 使用toolbar必须设置
            highlightCurrentRow: false,
            treeConfig: { // 树形数据配置
                children: 'children',
                hasChild: 'hasChildren',
                expandAll: true
            }
        },
        rowHandle: {
            width: 230,
            view: {
                thin: true,
                text: '',
                disabled() {
                    return !vm.hasPermissions('Retrieve')
                }
            },
            edit: {
                thin: true,
                text: '',
                disabled() {
                    return !vm.hasPermissions('Update')
                }
            },
            remove: {
                thin: true,
                text: '',
                disabled() {
                    return !vm.hasPermissions('Delete')
                }
            },

        },
        indexRow: { // 或者直接传true,不显示title，不居中
            title: '序号',
            align: 'center',
            width: 80
        },
        viewOptions: {
            componentType: 'form'
        },
        formOptions: {
            defaultSpan: 24, // 默认的表单 span
            width: '35%'
        },
        columns: [
            {
                title: '关键词',
                key: 'search',
                show: false,
                disabled: true,
                search: {
                    disabled: false
                },
                form: {
                    disabled: true,
                    component: {
                        props: {
                            clearable: true
                        },
                        placeholder: '请输入关键词'
                    }
                },
                view: { // 查看对话框组件的单独配置
                    disabled: true
                }
            },

            {
                title: '用户',
                key: 'user.username',

                search: {
                    disabled: false,
                    component: {
                        props: {
                            clearable: true
                        }
                    }
                },

                type: 'input',
                form: {
                    rules: [ // 表单校验规则
                        { required: true, message: '标题必填项' }
                    ],
                    component: {
                        props: {
                            clearable: true
                        },
                        placeholder: '请输入标题'
                    },
                    itemProps: {
                        class: { yxtInput: true }
                    }
                }
            },

            {
                title: '类型',
                key: 'sportstype.name',

                search: {
                    disabled: true,
                    component: {
                        props: {
                            clearable: true
                        }
                    }
                },

                type: 'select',
                dict: {
                    cache: false,
                    url: '/api/system/getsportsType/',
                    value: 'value', // 数据字典中value字段的属性名
                    label: 'label', // 数据字典中label字段的属性名
                    getData: (url, dict, {
                        form,
                        component
                    }) => {
                        return request({
                            url: url,

                        }).then(ret => {
                            const data = []
                            ret.data.forEach(item => {
                                data.push({
                                    value: item.id,
                                    label: item.name
                                })
                            })
                            return data
                        })
                    }
                },
                form: {
                    show: false,
                    value: 0,
                    component: {
                        span: 12
                    }
                }
            },

            {
                title: '热量',
                key: 'heat',
                sortable: true,
                search: {
                    disabled: true,
                    component: {
                        props: {
                            clearable: true
                        }
                    }
                },
                type: 'number',
                form: {
                    value: 1,
                    component: {
                        placeholder: '请输入'
                    }
                }
            },

            {
                title: '时间',
                key: 'time',
                sortable: true,
                type: 'date', //字段类型为时间选择器datepicker,根据类型可自动生成默认配置
                search: {//查询配置，默认启用查询
                    disabled: true //【可选】true禁止查询,默认为false
                },
                form: {//form表单的配置
                    disabled: true, //禁止添加输入与修改输入【可选】默认false
                }
            }
            ,

            {
                title: '开始时间',
                key: 'startTime',
                sortable: true,
                type: 'date', //字段类型为时间选择器datepicker,根据类型可自动生成默认配置
                search: {//查询配置，默认启用查询
                    disabled: true //【可选】true禁止查询,默认为false
                },
                form: {//form表单的配置
                    disabled: true, //禁止添加输入与修改输入【可选】默认false
                }
            }
            ,

            {
                title: '结束',
                key: 'endTime',
                sortable: true,
                type: 'date', //字段类型为时间选择器datepicker,根据类型可自动生成默认配置
                search: {//查询配置，默认启用查询
                    disabled: true //【可选】true禁止查询,默认为false
                },
                form: {//form表单的配置
                    disabled: true, //禁止添加输入与修改输入【可选】默认false
                }
            }

        ]
    }
}
