<template>
    <view>
        <!-- table -->
        <block v-if="data.tag === 'table'">
            <view class="h2w__tableParent">
                <view :class="data.attrs.class" :width="data.attrs.width" :style="data.attrs.style">
                    <!-- thead、tbody、tfoot -->
                    <block v-if="data.children" v-for="(item, index) in data.children" :key="item.i">
                        <view v-if="item.tag" :class="item.attrs.class">
                            <!-- tr -->
                            <block v-if="item.children" v-for="(item, index1) in item.children" :key="item.i">
                                <view v-if="item.tag" :class="item.attrs.class">
                                    <!-- td -->
                                    <block v-if="item.children" v-for="(item, index2) in item.children" :key="item.i">
                                        <view v-if="item.tag" :class="item.attrs.class" :width="data.attrs.width" :style="data.attrs.style">
                                            <!-- content -->
                                            <decode v-if="item.children" :nodes="item" />
                                        </view>
                                    </block>
                                </view>
                            </block>
                        </view>
                    </block>
                </view>
            </view>
        </block>
    </view>
</template>

<script>
import decode from '../decode';
export default {
    data() {
        return {};
    },
    components: {
        decode
    },
    options: {
        styleIsolation: 'shared'
    },
    props: {
        data: {
            type: Object,
            default: () => ({})
        }
    }
};
</script>
<style>
@import './table.css';
</style>
