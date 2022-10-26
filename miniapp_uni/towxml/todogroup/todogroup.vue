<template>
    <view>
        <checkbox-group v-if="data.tag === 'todogroup'" :class="data.attrs.class" @change="_change">
            <block v-if="data.children" v-for="(item, index) in data.children" :key="item.i">
                <label v-if="item.tag" :class="item.attrs.class">
                    <block v-if="item.children" v-for="(item, index1) in item.children" :key="item.i">
                        <!-- 解析选择框 -->

                        <checkbox
                            v-if="item.tag === 'checkbox'"
                            :class="item.attrs.class"
                            :value="item.attrs.value"
                            :data-_e="item"
                            :checked="item.attrs.checked"
                            :disabled="item.attrs.disabled"
                        />

                        <!-- 解析文字 -->

                        <decode v-if="item.children" :nodes="item" />
                    </block>
                </label>
            </block>
        </checkbox-group>
    </view>
</template>

<script>
import decode from '../decode';
export default {
    components: {
        decode
    },
    data() {
        return {};
    },
    options: {
        styleIsolation: 'shared'
    },
    props: {
        data: {
            type: Object,
            default: () => ({})
        }
    },
    methods: {
        _change: function (...arg) {
            if (global._events && typeof global._events.change === 'function') {
                global._events.change(...arg);
            }
        }
    }
};
</script>
<style>
@import './todogroup.css';
</style>
