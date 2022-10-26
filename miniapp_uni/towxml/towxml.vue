<template>
    <view :class="'h2w h2w-' + nodes.theme">
        <view class="h2w__main">
            <decode :nodes="nodes" />
        </view>
    </view>
</template>

<script>
import decode from './decode';
export default {
    components: {
        decode
    },
    data() {
        return {
            someData: {}
        };
    },
    options: {
        styleIsolation: 'shared'
    },
    props: {
        nodes: {
            type: Object,
            default: () => ({})
        }
    }
};
</script>
<style>
@import './towxml.css';
</style>
