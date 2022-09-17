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
                show: false,
                text: '',
                disabled() {
                    return !vm.hasPermissions('Update')
                }
            },
            custom: [{
                show(index, row) {
                    return true
                },
                disabled() {
                    return !vm.hasPermissions('Update')
                },
                // text: '权限管理',
                icon: 'el-icon-edit',
                type: 'warning',
                size: 'small',
                emit: 'edit'
            }],

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
                title: '订单号',
                key: 'order_id',

                search: {
                    disabled: false,
                    component: {
                        props: {
                            clearable: true
                        }
                    }
                },
            },
            {
                title: '订单发起人用户名',
                key: 'user.username',
                disabled: false,

                search: {
                    disabled: false,
                    component: {
                        props: {
                            clearable: true
                        }
                    }
                },

            },
            {
                title: '收货人',
                key: 'address.name',
                disabled: false,
                search: {
                    disabled: false,
                    component: {
                        props: {
                            clearable: true
                        }
                    }
                },

            },
            {
                title: '收货人电话',
                key: 'address.phone',
                disabled: false,

                search: {
                    disabled: false,
                    component: {
                        props: {
                            clearable: true
                        }
                    }
                },

            },
            {
                title: '收货人地址',
                key: 'address.baseAddress',
                disabled: false,

                search: {
                    disabled: false,
                    component: {
                        props: {
                            clearable: true
                        }
                    }
                },

            },
            {
                title: '收货人详细地址',
                key: 'address.address',
                disabled: false,

                search: {
                    disabled: false,
                    component: {
                        props: {
                            clearable: true
                        }
                    }
                },

            },
            {
                title: '收货邮编',
                key: 'address.postalCode',
                disabled: false,

                search: {
                    disabled: false,
                    component: {
                        props: {
                            clearable: true
                        }
                    }
                },

            },
            {
                title: '商品名称',
                key: 'good.name',
                disabled: false,

                search: {
                    disabled: false,
                    component: {
                        props: {
                            clearable: true
                        }
                    }
                },

            },
            {
                title: '商品单价',
                key: 'good.price',
                disabled: false,



            },

            {
                title: '商品数量',
                key: 'total_count',
                disabled: false,
                type: 'number',
                form: {
                    value: 1,
                    component: {
                        placeholder: '请输入'
                    }
                }


            },

            {
                title: '总价',
                key: 'total_price',
                disabled: false,

                type: 'number',
                form: {
                    value: 1,
                    component: {
                        placeholder: '请输入'
                    }
                }
            },
            {
                title: '邮费',
                key: 'transit_price',
                disabled: false,

                type: 'number',
                form: {
                    value: 1,
                    component: {
                        placeholder: '请输入'
                    }
                }

            },
            {
                title: '支付编号',
                key: 'trade_no',
                disabled: false,
            },
            {
                title: '物流编号',
                key: 'tracking_number',
                disabled: false,
            },






            // {
            //     title: '创建用户',
            //     key: 'createUser',
            //     search: {
            //         disabled: true
            //     },
            //     minWidth: 130,
            //     type: 'select',
            //     dict: {
            //         cache: false,
            //         url: '/api/system/user/',
            //         value: 'id', // 数据字典中value字段的属性名
            //         label: 'username', // 数据字典中label字段的属性名
            //         getData: (url, dict, {
            //             form,
            //             component
            //         }) => {
            //             return request({
            //                 url: url,
            //                 params: {
            //                     page: 1,
            //                     limit: 10
            //                 }
            //             }).then(ret => {
            //                 component._elProps.page = ret.data.page
            //                 component._elProps.limit = ret.data.limit
            //                 component._elProps.total = ret.data.total
            //                 return ret.data.data
            //             })
            //         }
            //     },
            //     form: {
            //         show: false,
            //         value: 0,
            //         component: {
            //             span: 12
            //         }
            //     }
            // },
            {
                title: '状态',
                key: 'order_status',
                search: {
                    disabled: false
                },

            },
            {
                title: '创建日期',
                key: 'update_datetime',
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
