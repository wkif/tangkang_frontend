<template>
    <view :class="'h2w__audio ' + (tips.state || 'h2w__audio--loading')" @tap="playAndPause">
        <view class="h2w__audioIcon"></view>
        <view class="h2w__audioCover">
            <image class="h2w__audioLoading" src="/static/towxml/audio-player/loading.svg"></image>
            <image class="h2w__audioCoverImg" :src="data.attrs.poster"></image>
        </view>
        <view class="h2w__audioInfo">
            <view class="h2w__audioTips">{{ tips.text || 'Error' }}</view>
            <view class="h2w__audioSchedule" :style="'width:' + time.schedule + ';'"></view>
            <view class="h2w__audioTitle">{{ data.attrs.name }}</view>
            <view class="h2w__audioAuthor">{{ data.attrs.author }}</view>
            <view class="h2w__audioTime">{{ time.currentTime || '00:00:00' }} / {{ time.duration || '00:00:00' }}</view>
        </view>
    </view>
</template>

<script>
const Audio = require('./Audio');

export default {
    data() {
        return {
            tips: {
                state: '',
                text: '--'
            },
            time: {
                currentTime: '00:00:00',
                duration: '00:00:00',
                schedule: '0%'
            }
        };
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
    // 页面生命周期
    beforeMount: function () {
        const that = this;
        const audio = (that.audio = new Audio(this.data));
        audio.eventPlay = function () {
            that.setData({
                tips: {
                    state: 'h2w__audio--play',
                    text: 'Playing'
                }
            });
        };

        audio.eventCanplay = function () {
            that.setData({
                tips: {
                    state: 'h2w__audio--readyed',
                    text: 'Readyed'
                }
            });
        };

        audio.eventTimeUpdate = function (duration, currentTime) {
            that.setData({
                time: {
                    currentTime: currentTime,
                    duration: duration,
                    schedule: (Math.round(that.audio.currentTime) / Math.round(that.audio.duration)) * 100 + '%'
                }
            });
        };

        audio.eventPause = function () {
            that.setData({
                tips: {
                    state: 'h2w__audio--pause',
                    text: 'Pause'
                }
            });
        };

        audio.eventStop = function () {
            that.setData({
                tips: {
                    state: 'h2w__audio--end',
                    text: 'End'
                }
            });
        }; // // 更新播放状态
        // _ts.audio.onTimeUpdate = function(duration,currentTime){
        // 	_ts.setData({
        // 		playerData:{
        // 			state:'h2w__audio--play',
        // 			tips:'Playing',
        // 			currentTime:currentTime,
        // 			duration:duration,
        // 			schedule:_ts.audio.currentTime / _ts.audio.duration * 100 + '%'
        // 		}
        // 	});
        // };
        // _ts.audio.onPause = function(){
        // 	_ts.setData({playerData:{state:'h2w__audio--pause',tips:'Pause'}});
        // };
        // _ts.audio.onCanplay = function(){
        // 	_ts.setData({playerData:{state:'h2w__audio--readyed',tips:'Readyed'}});
        // };
        // _ts.audio.onError = function(){
        // 	_ts.setData({playerData:{state:'h2w__audio--error',tips:'Error'}});
        // };
        // _ts.audio.onEnded = ()=>{
        // 	_ts.setData({playerData:{state:'h2w__audio--end',tips:'End'}});
        // };
    },
    moved: function () {
        _ts.audio.destroy();
    },
    destroyed: () => {},
    methods: {
        playAndPause: function () {
            const that = this;
            const audio = that.audio; // console.log(audio);
            audio.isTouch = true;

            if (audio.status === 'update' || audio.status === 'play') {
                // console.log('pause');
                audio.pause();
            } else {
                // console.log('play');
                audio.play();
            }
        }
    }
};
</script>
<style>
@import './audio-player.css';
</style>
