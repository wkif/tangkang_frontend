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
                title: '名称',
                key: 'name',

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
                        { required: true, message: '名称必填项' }
                    ],
                    component: {
                        props: {
                            clearable: true
                        },
                        placeholder: '请输入名称'
                    },
                    itemProps: {
                        class: { yxtInput: true }
                    }
                }
            },

            {
                title: '默认图标',
                key: 'iconPath',
                search: {
                    disabled: true,
                    component: {
                        props: {
                            clearable: true
                        }
                    }
                },
                type: 'input',
                form: {
                    rules: [ // 表单校验规则
                        { required: true, message: '必填项' }
                    ],
                    component: {
                        props: {
                            clearable: true
                        },
                        placeholder: '请输入名称'
                    },
                    itemProps: {
                        class: { yxtInput: true }
                    }
                }
            },
            {
                title: '选中图标',
                key: 'selectedIconPath',
                search: {
                    disabled: true,
                    component: {
                        props: {
                            clearable: true
                        }
                    }
                },
                type: 'input',
                form: {
                    rules: [ // 表单校验规则
                        { required: true, message: '选中图标必填项' }
                    ],
                    component: {
                        props: {
                            clearable: true
                        },
                        placeholder: '请输入名称'
                    },
                    itemProps: {
                        class: { yxtInput: true }
                    }
                }
            },
            {
                title: '状态',
                key: 'is_active',
                search: {
                    disabled: false
                },
                width: 70,
                type: 'radio',
                dict: {
                    data: [
                        {
                            value: 1,
                            label: '展示'
                        },
                        {
                            value: 0,
                            label: '不展示'
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

        ]
    }
}
