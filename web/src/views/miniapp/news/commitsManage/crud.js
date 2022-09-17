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
                    return !vm.hasPermissions('Update')
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
                title: '文章标题',
                key: 'news.title',

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
                title: '用户名',
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
                title: '内容',
                key: 'content',
                // width: 170,
                disabled: false,
                search: {
                    disabled: true,
                    component: {
                        props: {
                            clearable: true
                        }
                    }
                },

            },

            {
                title: '状态',
                key: 'is_delete',
                search: {
                    disabled: false
                },
                width: 70,
                type: 'radio',
                dict: {
                    data: [
                        {
                            value: 1,
                            label: '已删除'
                        },
                        {
                            value: 0,
                            label: '未删除'
                        }
                    ]
                },
                form: {
                    value: true,
                    component: {
                        span: 12
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



        ]
    }
}
