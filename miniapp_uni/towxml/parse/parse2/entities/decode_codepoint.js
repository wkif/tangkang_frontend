/*! Project:无, Create:FWS 2020.01.08 21:48, Update:FWS 2020.01.08 21:48 */
'use strict';

function decodeCodePoint(e) {
    if ((e >= 55296 && e <= 57343) || e > 1114111) return '�';
    e in decode_json_1['default'] && (e = decode_json_1['default'][e]);
    var o = '';
    return e > 65535 && ((e -= 65536), (o += String.fromCharCode(((e >>> 10) & 1023) | 55296)), (e = 56320 | (1023 & e))), (o += String.fromCharCode(e));
}

var __importDefault =
    (this && this.__importDefault) ||
    function (e) {
        return e && e.__esModule
            ? e
            : {
                  default: e
              };
    };

Object.defineProperty(exports, '__esModule', {
    value: !0
});

var decode_json_1 = __importDefault(require('./maps/decode'));

exports['default'] = decodeCodePoint;
