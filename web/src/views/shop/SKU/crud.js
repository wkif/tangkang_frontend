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
            custom: [
                {
                    icon: 'el-icon-s-comment',
                    disabled() {
                        return !vm.hasPermissions('Retrieve')
                    },
                    emit: 'viewCommit'

                },
            ]
            // lineEdit: {
            //     show: true,
            // }


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
            // {
            //     title: '关键词',
            //     key: 'search',
            //     show: false,
            //     disabled: true,
            //     search: {
            //         disabled: false
            //     },
            //     form: {
            //         disabled: true,
            //         component: {
            //             props: {
            //                 clearable: true
            //             },
            //             placeholder: '请输入关键词'
            //         }
            //     },
            //     view: { // 查看对话框组件的单独配置
            //         disabled: true
            //     }
            // },

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
                title: '副标题',
                key: 'caption',

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
                        { required: true, message: '副标题必填项' }
                    ],
                    component: {
                        props: {
                            clearable: true
                        },
                        placeholder: '请输入副标题'
                    },
                    itemProps: {
                        class: { yxtInput: true }
                    }
                }
            },

            {
                title: '类型',
                key: 'category',
                search: {
                    disabled: false
                },
                type: 'select',
                dict: {
                    cache: false,
                    url: '/api/shop/getSKUcategory/',
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
                                    value: item.value,
                                    label: item.label
                                })
                            })
                            return data
                        })
                    }
                },
                form: {
                    show: false,
                    // value: 0,
                    component: {
                        span: 12
                    }
                }
            },
            {
                title: '品牌',
                key: 'brand',
                search: {
                    disabled: false
                },
                type: 'select',
                dict: {
                    cache: false,
                    url: '/api/shop/getSKUBrand/',
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
                                    value: item.value,
                                    label: item.label
                                })
                            })
                            return data
                        })
                    }
                },
                form: {
                    show: false,
                    // value: 0,
                    component: {
                        span: 12
                    }
                }
            },

            {
                title: '价格',
                key: 'price',
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
                title: '详情',
                key: 'detail',

                type: 'textarea',
                form: {
                    component: {
                        placeholder: '请输入'
                    }
                }
            },
            {
                title: '图片',
                key: 'image',
                type: 'image-uploader',

            },
            {
                title: '详细图片',
                key: 'imgList',
                type: 'image-uploader',
                disabled: true,

            },
            {
                title: '库存',
                key: 'stock',
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
                title: '销量',
                key: 'sales',
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
                title: '状态',
                key: 'status',
                sortable: true,
                search: {
                    disabled: false,
                    component: {
                        props: {
                            clearable: true
                        }
                    }
                },
                type: 'radio',
                dict: {
                    data: [
                        {
                            value: 1,
                            label: '上架'
                        },
                        {
                            value: 0,

                            label: '下架'
                        }
                    ]
                },
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
