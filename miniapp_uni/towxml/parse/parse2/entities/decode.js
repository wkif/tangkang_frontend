/*! Project:无, Create:FWS 2020.01.08 21:48, Update:FWS 2020.01.08 21:48 */
'use strict';

function getStrictDecoder(e) {
    var t = Object.keys(e).join('|'),
        r = getReplacer(e);
    t += '|#[xX][\\da-fA-F]+|#\\d+';
    var o = new RegExp('&(?:' + t + ');', 'g');
    return function (e) {
        return String(e).replace(o, r);
    };
}

function getReplacer(e) {
    return function (t) {
        return '#' === t.charAt(1)
            ? 'X' === t.charAt(2) || 'x' === t.charAt(2)
                ? decode_codepoint_1['default'](parseInt(t.substr(3), 16))
                : decode_codepoint_1['default'](parseInt(t.substr(2), 10))
            : e[t.slice(1, -1)];
    };
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

var entities_json_1 = __importDefault(require('./maps/entities.json')),
    legacy_json_1 = __importDefault(require('./maps/legacy.json')),
    xml_json_1 = __importDefault(require('./maps/xml.json')),
    decode_codepoint_1 = __importDefault(require('./decode_codepoint'));

(exports.decodeXML = getStrictDecoder(xml_json_1['default'])), (exports.decodeHTMLStrict = getStrictDecoder(entities_json_1['default']));

var sorter = function (e, t) {
    return e < t ? 1 : -1;
};

exports.decodeHTML = (function () {
    function e(e) {
        return ';' !== e.substr(-1) && (e += ';'), s(e);
    }

    for (var t = Object.keys(legacy_json_1['default']).sort(sorter), r = Object.keys(entities_json_1['default']).sort(sorter), o = 0, n = 0; o < r.length; o++)
        t[n] === r[o] ? ((r[o] += ';?'), n++) : (r[o] += ';');

    var i = new RegExp('&(?:' + r.join('|') + '|#[xX][\\da-fA-F]+;?|#\\d+;?)', 'g'),
        s = getReplacer(entities_json_1['default']);
    return function (t) {
        return String(t).replace(i, e);
    };
})();
