/*! Project:无, Create:FWS 2020.01.08 21:48, Update:FWS 2020.01.08 21:48 */
'use strict';

function getInverseObj(e) {
    return Object.keys(e)
        .sort()
        .reduce(function (r, t) {
            return (r[e[t]] = '&' + t + ';'), r;
        }, {});
}

function getInverseReplacer(e) {
    var r = [],
        t = [];
    return (
        Object.keys(e).forEach(function (e) {
            return 1 === e.length ? r.push('\\' + e) : t.push(e);
        }),
        t.unshift('[' + r.join('') + ']'),
        new RegExp(t.join('|'), 'g')
    );
}

function singleCharReplacer(e) {
    return '&#x' + e.charCodeAt(0).toString(16).toUpperCase() + ';';
}

function astralReplacer(e, r) {
    return '&#x' + (1024 * (e.charCodeAt(0) - 55296) + e.charCodeAt(1) - 56320 + 65536).toString(16).toUpperCase() + ';';
}

function getInverse(e, r) {
    return function (t) {
        return t
            .replace(r, function (r) {
                return e[r];
            })
            .replace(reAstralSymbols, astralReplacer)
            .replace(reNonASCII, singleCharReplacer);
    };
}

function escape(e) {
    return e.replace(reXmlChars, singleCharReplacer).replace(reAstralSymbols, astralReplacer).replace(reNonASCII, singleCharReplacer);
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

var xml_json_1 = __importDefault(require('./maps/xml.json')),
    inverseXML = getInverseObj(xml_json_1['default']),
    xmlReplacer = getInverseReplacer(inverseXML);

exports.encodeXML = getInverse(inverseXML, xmlReplacer);

var entities_json_1 = __importDefault(require('./maps/entities.json')),
    inverseHTML = getInverseObj(entities_json_1['default']),
    htmlReplacer = getInverseReplacer(inverseHTML);

exports.encodeHTML = getInverse(inverseHTML, htmlReplacer);
var reNonASCII = /[^\0-\x7F]/g,
    reAstralSymbols = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g,
    reXmlChars = getInverseReplacer(inverseXML);
exports.escape = escape;
