<template>
    <view class="custom-class van-card">
        <view :class="utils.bem('card__header', { center: centered })">
            <view class="van-card__thumb" @tap="onClickThumb">
                <image v-if="thumb" :src="thumb" :mode="thumbMode" :lazy-load="lazyLoad" class="van-card__img thumb-class" />
                <slot v-else name="thumb" />
                <van-tag v-if="tag" mark type="danger" custom-class="van-card__tag">
                    {{ tag }}
                </van-tag>
                <slot v-else name="tag" />
            </view>

            <view :class="'van-card__content ' + utils.bem('card__content', { center: centered })">
                <view>
                    <view v-if="title" class="van-card__title title-class">{{ title }}</view>
                    <slot v-else name="title" />

                    <view v-if="desc" class="van-card__desc desc-class">{{ desc }}</view>
                    <slot v-else name="desc" />

                    <slot name="tags" />
                </view>

                <view class="van-card__bottom">
                    <slot name="price-top" />
                    <view v-if="price || price === 0" class="van-card__price price-class">
                        <text>{{ currency }}</text>
                        <text class="van-card__price-integer">{{ integerStr }}</text>
                        <text class="van-card__price-decimal">{{ decimalStr }}</text>
                    </view>
                    <slot v-else name="price" />
                    <view v-if="originPrice || originPrice === 0" class="van-card__origin-price origin-price-class">{{ currency }} {{ originPrice }}</view>
                    <slot v-else name="origin-price" />
                    <view v-if="num" class="van-card__num num-class">x {{ num }}</view>
                    <slot v-else name="num" />
                    <slot name="bottom" />
                </view>
            </view>
        </view>

        <view class="van-card__footer">
            <slot name="footer" />
        </view>
    </view>
</template>
<script module="utils" lang="wxs" src="../wxs/utils.wxs"></script>
<script>
'use strict';
import vanTag from '../tag/index';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var link_1 = require('../mixins/link');

var component_1 = require('../common/component');

export default {
    data() {
        return {
            integerStr: '',
            decimalStr: ''
        };
    },
    components: {
        vanTag
    },
    classes: ['num-class', 'desc-class', 'thumb-class', 'title-class', 'price-class', 'origin-price-class'],
    mixins: [link_1.link],
    props: {
        tag: String,
        num: String,
        desc: String,
        thumb: String,
        title: String,
        price: {
            type: String
        },
        centered: Boolean,
        lazyLoad: Boolean,
        thumbLink: String,
        originPrice: String,
        thumbMode: {
            type: String,
            default: 'aspectFit'
        },
        currency: {
            type: String,
            default: '¥'
        }
    },
    methods: {
        updatePrice: function () {
            var price = this.price;
            var priceArr = price.toString().split('.');
            this.setData({
                integerStr: priceArr[0],
                decimalStr: priceArr[1] ? '.'.concat(priceArr[1]) : ''
            });
        },
        onClickThumb: function () {
            this.jumpLink('thumbLink');
        }
    },
    watch: {
        price: {
            handler: function () {
                var price = this.price;
                var priceArr = price.toString().split('.');
                this.setData({
                    integerStr: priceArr[0],
                    decimalStr: priceArr[1] ? '.'.concat(priceArr[1]) : ''
                });
            },

            immediate: true
        }
    }
};
</script>
<style>
@import './index.css';
</style>
