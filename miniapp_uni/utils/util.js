const formatTime = (timestamp) => {
    timestamp = timestamp ? timestamp : null;
    let date = new Date(timestamp); //时间戳为10位需*1000，时间戳为13位的话不需乘1000

    let Y = date.getFullYear() + '-';
    let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    let D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' ';
    let h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
    let m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
    let s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
    return Y + M + D + h + m + s;
};

var plugin = requirePlugin('WechatSI');
let manager = plugin.getRecordRecognitionManager();
var bgam = uni.createInnerAudioContext();

const Text2Speech = function (text) {
    plugin.textToSpeech({
        lang: 'zh_CN',
        tts: true,
        content: text,
        success: function (res) {
            console.log('succ tts', res.filename);
            bgam.src = res.filename;
            bgam.play();
        },
        fail: function (res) {
            console.log('fail tts', res);
        }
    });
};

const toDecimal2 = (x) => {
    var f = parseFloat(x);

    if (isNaN(f)) {
        return false;
    }

    var f = Math.round(x * 100) / 100;
    var s = f.toString();
    var rs = s.indexOf('.');

    if (rs < 0) {
        rs = s.length;
        s += '.';
    }

    while (s.length <= rs + 2) {
        s += '0';
    }

    return s;
};

const regFenToYuan = (fen) => {
    var num = fen;
    num = fen * 0.01;
    num += '';
    var reg = num.indexOf('.') > -1 ? /(\d{1,3})(?=(?:\d{3})+\.)/g : /(\d{1,3})(?=(?:\d{3})+$)/g;
    num = num.replace(reg, '$1');
    num = toDecimal2(num);
    return num;
};

module.exports = {
    formatTime,
    Text2Speech,
    regFenToYuan
};
