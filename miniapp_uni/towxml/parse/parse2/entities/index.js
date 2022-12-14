/*! Project:无, Create:FWS 2020.01.08 21:48, Update:FWS 2020.01.08 21:48 */
'use strict';

function decode(e, d) {
    return (!d || d <= 0 ? decode_1.decodeXML : decode_1.decodeHTML)(e);
}

function decodeStrict(e, d) {
    return (!d || d <= 0 ? decode_1.decodeXML : decode_1.decodeHTMLStrict)(e);
}

function encode(e, d) {
    return (!d || d <= 0 ? encode_1.encodeXML : encode_1.encodeHTML)(e);
}

Object.defineProperty(exports, '__esModule', {
    value: !0
});

var decode_1 = require('./decode'),
    encode_1 = require('./encode');

(exports.decode = decode), (exports.decodeStrict = decodeStrict), (exports.encode = encode);

var encode_2 = require('./encode');

(exports.encodeXML = encode_2.encodeXML),
    (exports.encodeHTML = encode_2.encodeHTML),
    (exports.escape = encode_2.escape),
    (exports.encodeHTML4 = encode_2.encodeHTML),
    (exports.encodeHTML5 = encode_2.encodeHTML);

var decode_2 = require('./decode');

(exports.decodeXML = decode_2.decodeXML),
    (exports.decodeHTML = decode_2.decodeHTML),
    (exports.decodeHTMLStrict = decode_2.decodeHTMLStrict),
    (exports.decodeHTML4 = decode_2.decodeHTML),
    (exports.decodeHTML5 = decode_2.decodeHTML),
    (exports.decodeHTML4Strict = decode_2.decodeHTMLStrict),
    (exports.decodeHTML5Strict = decode_2.decodeHTMLStrict),
    (exports.decodeXMLStrict = decode_2.decodeXML);
