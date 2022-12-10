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
                key: 'foodName',

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
                title: '类型',
                key: 'foodType',
                search: {
                    disabled: false
                },
                type: 'select',
                dict: {
                    data: vm.dictionary('foodtype')
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
                title: '图片',
                key: 'img',
                type: 'image-uploader',
            },
            {
                title: '单位',
                key: 'unit',

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
                        { required: true, message: '单位必填项' }
                    ],
                    component: {
                        props: {
                            clearable: true
                        },
                        placeholder: '请输入单位'
                    },
                    itemProps: {
                        class: { yxtInput: true }
                    }
                }
            },
           
            {
                title: '蛋白质',
                key: 'foodProtein',
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
                title: '脂肪',
                key: 'foodFat',
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
                title: '碳水化合物',
                key: 'foodCarbohydrate',
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
                title: '维生素A',
                key: 'foodVitaminA',
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
                title: '维生素C',
                key: 'foodVitaminC',
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
                title: '维生素E',
                key: 'foodVitaminE',
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
                title: '维生素D',
                key: 'foodVitaminD',
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


        ]
    }
}
