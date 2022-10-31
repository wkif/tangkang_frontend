

const app = getApp();

const formatTime = timestamp => {
  timestamp = timestamp ? timestamp : null;
  let date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
  let Y = date.getFullYear() + '-';
  let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
  let D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' ';
  let h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
  let m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
  let s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
  return Y + M + D + h + m + s;
}



var plugin = requirePlugin("WechatSI")
let manager = plugin.getRecordRecognitionManager()
var bgam = wx.createInnerAudioContext();

const Text2Speech = function (text, isDelay = false) {
  plugin.textToSpeech({
    lang: "zh_CN",
    tts: true,
    content: text,
    success: function (res) {
      bgam.src = res.filename
      bgam.play()
    },
    fail: function (res) {
      console.log("fail tts", res)
    }
  })
}
const stopbgam = function () {
  bgam.stop()
}
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
}
const regFenToYuan = (fen) => {
  var num = fen;
  num = fen * 0.01;
  num += '';
  var reg = num.indexOf('.') > -1 ? /(\d{1,3})(?=(?:\d{3})+\.)/g : /(\d{1,3})(?=(?:\d{3})+$)/g;
  num = num.replace(reg, '$1');
  num = toDecimal2(num)
  return num
};
const shallowEqual = function (object1, object2) {
  const keys1 = Object.keys(object1);
  const keys2 = Object.keys(object2);
  if (keys1.length !== keys2.length) {
    return false;
  }
  for (let index = 0; index < keys1.length; index++) {
    const val1 = object1[keys1[index]];
    const val2 = object2[keys2[index]];
    const areObjects = isObject(val1) && isObject(val2);
    if (areObjects && !shallowEqual(val1, val2) ||
      !areObjects && val1 !== val2) {
      return false;
    }
  }

  return true;
}
function isObject(object) {
  return object != null && typeof object === 'object';
}


const delHtmlTag = function (str) {
  str = trim(str)
  return str.replace(/<[^>]+>/g, "");
}

//去掉所有的空格
function trim(str) {
  return str.replace(/(^\s*)|(\s*$)/g, "");
}

function isPhone(phone) {
  var myreg=/^[1][3,4,5,6,7,8,9][0-9]{9}$/;
  if (!myreg.test(phone)) {
      return false;
  } else {
      return true;
  }
}


module.exports = {
  formatTime,
  Text2Speech,
  regFenToYuan,
  shallowEqual,
  delHtmlTag,
  stopbgam,
  isPhone
}
