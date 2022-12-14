/*! Project:无, Create:FWS 2020.01.08 21:48, Update:FWS 2020.01.08 21:48 */
'use strict';

function whitespace(t) {
    return ' ' === t || '\n' === t || '\t' === t || '\f' === t || '\r' === t;
}

function ifElseState(t, e, s) {
    var i = t.toLowerCase();
    return t === i
        ? function (t, a) {
              a === i ? (t._state = e) : ((t._state = s), t._index--);
          }
        : function (a, _) {
              _ === i || _ === t ? (a._state = e) : ((a._state = s), a._index--);
          };
}

function consumeSpecialNameChar(t, e) {
    var s = t.toLowerCase();
    return function (i, a) {
        a === s || a === t ? (i._state = e) : ((i._state = 3), i._index--);
    };
}

var __importDefault =
    (this && this.__importDefault) ||
    function (t) {
        return t && t.__esModule
            ? t
            : {
                  default: t
              };
    };

Object.defineProperty(exports, '__esModule', {
    value: !0
});

var decode_codepoint_1 = __importDefault(require('./entities/decode_codepoint')),
    entities_json_1 = __importDefault(require('./entities/maps/entities')),
    legacy_json_1 = __importDefault(require('./entities/maps/legacy')),
    xml_json_1 = __importDefault(require('./entities/maps/xml')),
    stateBeforeCdata1 = ifElseState('C', 23, 16),
    stateBeforeCdata2 = ifElseState('D', 24, 16),
    stateBeforeCdata3 = ifElseState('A', 25, 16),
    stateBeforeCdata4 = ifElseState('T', 26, 16),
    stateBeforeCdata5 = ifElseState('A', 27, 16),
    stateBeforeScript1 = consumeSpecialNameChar('R', 34),
    stateBeforeScript2 = consumeSpecialNameChar('I', 35),
    stateBeforeScript3 = consumeSpecialNameChar('P', 36),
    stateBeforeScript4 = consumeSpecialNameChar('T', 37),
    stateAfterScript1 = ifElseState('R', 39, 1),
    stateAfterScript2 = ifElseState('I', 40, 1),
    stateAfterScript3 = ifElseState('P', 41, 1),
    stateAfterScript4 = ifElseState('T', 42, 1),
    stateBeforeStyle1 = consumeSpecialNameChar('Y', 44),
    stateBeforeStyle2 = consumeSpecialNameChar('L', 45),
    stateBeforeStyle3 = consumeSpecialNameChar('E', 46),
    stateAfterStyle1 = ifElseState('Y', 48, 1),
    stateAfterStyle2 = ifElseState('L', 49, 1),
    stateAfterStyle3 = ifElseState('E', 50, 1),
    stateBeforeEntity = ifElseState('#', 52, 53),
    stateBeforeNumericEntity = ifElseState('X', 55, 54),
    Tokenizer = (function () {
        function t(t, e) {
            (this._state = 1),
                (this._buffer = ''),
                (this._sectionStart = 0),
                (this._index = 0),
                (this._bufferOffset = 0),
                (this._baseState = 1),
                (this._special = 1),
                (this._running = !0),
                (this._ended = !1),
                (this._cbs = e),
                (this._xmlMode = !(!t || !t.xmlMode)),
                (this._decodeEntities = !(!t || !t.decodeEntities));
        }

        return (
            (t.prototype.reset = function () {
                (this._state = 1),
                    (this._buffer = ''),
                    (this._sectionStart = 0),
                    (this._index = 0),
                    (this._bufferOffset = 0),
                    (this._baseState = 1),
                    (this._special = 1),
                    (this._running = !0),
                    (this._ended = !1);
            }),
            (t.prototype._stateText = function (t) {
                '<' === t
                    ? (this._index > this._sectionStart && this._cbs.ontext(this._getSection()), (this._state = 2), (this._sectionStart = this._index))
                    : this._decodeEntities &&
                      1 === this._special &&
                      '&' === t &&
                      (this._index > this._sectionStart && this._cbs.ontext(this._getSection()), (this._baseState = 1), (this._state = 51), (this._sectionStart = this._index));
            }),
            (t.prototype._stateBeforeTagName = function (t) {
                '/' === t
                    ? (this._state = 5)
                    : '<' === t
                    ? (this._cbs.ontext(this._getSection()), (this._sectionStart = this._index))
                    : '>' === t || 1 !== this._special || whitespace(t)
                    ? (this._state = 1)
                    : '!' === t
                    ? ((this._state = 15), (this._sectionStart = this._index + 1))
                    : '?' === t
                    ? ((this._state = 17), (this._sectionStart = this._index + 1))
                    : ((this._state = this._xmlMode || ('s' !== t && 'S' !== t) ? 3 : 31), (this._sectionStart = this._index));
            }),
            (t.prototype._stateInTagName = function (t) {
                ('/' === t || '>' === t || whitespace(t)) && (this._emitToken('onopentagname'), (this._state = 8), this._index--);
            }),
            (t.prototype._stateBeforeCloseingTagName = function (t) {
                whitespace(t) ||
                    ('>' === t
                        ? (this._state = 1)
                        : 1 !== this._special
                        ? 's' === t || 'S' === t
                            ? (this._state = 32)
                            : ((this._state = 1), this._index--)
                        : ((this._state = 6), (this._sectionStart = this._index)));
            }),
            (t.prototype._stateInCloseingTagName = function (t) {
                ('>' === t || whitespace(t)) && (this._emitToken('onclosetag'), (this._state = 7), this._index--);
            }),
            (t.prototype._stateAfterCloseingTagName = function (t) {
                '>' === t && ((this._state = 1), (this._sectionStart = this._index + 1));
            }),
            (t.prototype._stateBeforeAttributeName = function (t) {
                '>' === t
                    ? (this._cbs.onopentagend(), (this._state = 1), (this._sectionStart = this._index + 1))
                    : '/' === t
                    ? (this._state = 4)
                    : whitespace(t) || ((this._state = 9), (this._sectionStart = this._index));
            }),
            (t.prototype._stateInSelfClosingTag = function (t) {
                '>' === t ? (this._cbs.onselfclosingtag(), (this._state = 1), (this._sectionStart = this._index + 1)) : whitespace(t) || ((this._state = 8), this._index--);
            }),
            (t.prototype._stateInAttributeName = function (t) {
                ('=' === t || '/' === t || '>' === t || whitespace(t)) &&
                    (this._cbs.onattribname(this._getSection()), (this._sectionStart = -1), (this._state = 10), this._index--);
            }),
            (t.prototype._stateAfterAttributeName = function (t) {
                '=' === t
                    ? (this._state = 11)
                    : '/' === t || '>' === t
                    ? (this._cbs.onattribend(), (this._state = 8), this._index--)
                    : whitespace(t) || (this._cbs.onattribend(), (this._state = 9), (this._sectionStart = this._index));
            }),
            (t.prototype._stateBeforeAttributeValue = function (t) {
                '"' === t
                    ? ((this._state = 12), (this._sectionStart = this._index + 1))
                    : "'" === t
                    ? ((this._state = 13), (this._sectionStart = this._index + 1))
                    : whitespace(t) || ((this._state = 14), (this._sectionStart = this._index), this._index--);
            }),
            (t.prototype._stateInAttributeValueDoubleQuotes = function (t) {
                '"' === t
                    ? (this._emitToken('onattribdata'), this._cbs.onattribend(), (this._state = 8))
                    : this._decodeEntities &&
                      '&' === t &&
                      (this._emitToken('onattribdata'), (this._baseState = this._state), (this._state = 51), (this._sectionStart = this._index));
            }),
            (t.prototype._stateInAttributeValueSingleQuotes = function (t) {
                "'" === t
                    ? (this._emitToken('onattribdata'), this._cbs.onattribend(), (this._state = 8))
                    : this._decodeEntities &&
                      '&' === t &&
                      (this._emitToken('onattribdata'), (this._baseState = this._state), (this._state = 51), (this._sectionStart = this._index));
            }),
            (t.prototype._stateInAttributeValueNoQuotes = function (t) {
                whitespace(t) || '>' === t
                    ? (this._emitToken('onattribdata'), this._cbs.onattribend(), (this._state = 8), this._index--)
                    : this._decodeEntities &&
                      '&' === t &&
                      (this._emitToken('onattribdata'), (this._baseState = this._state), (this._state = 51), (this._sectionStart = this._index));
            }),
            (t.prototype._stateBeforeDeclaration = function (t) {
                this._state = '[' === t ? 22 : '-' === t ? 18 : 16;
            }),
            (t.prototype._stateInDeclaration = function (t) {
                '>' === t && (this._cbs.ondeclaration(this._getSection()), (this._state = 1), (this._sectionStart = this._index + 1));
            }),
            (t.prototype._stateInProcessingInstruction = function (t) {
                '>' === t && (this._cbs.onprocessinginstruction(this._getSection()), (this._state = 1), (this._sectionStart = this._index + 1));
            }),
            (t.prototype._stateBeforeComment = function (t) {
                '-' === t ? ((this._state = 19), (this._sectionStart = this._index + 1)) : (this._state = 16);
            }),
            (t.prototype._stateInComment = function (t) {
                '-' === t && (this._state = 20);
            }),
            (t.prototype._stateAfterComment1 = function (t) {
                this._state = '-' === t ? 21 : 19;
            }),
            (t.prototype._stateAfterComment2 = function (t) {
                '>' === t
                    ? (this._cbs.oncomment(this._buffer.substring(this._sectionStart, this._index - 2)), (this._state = 1), (this._sectionStart = this._index + 1))
                    : '-' !== t && (this._state = 19);
            }),
            (t.prototype._stateBeforeCdata6 = function (t) {
                '[' === t ? ((this._state = 28), (this._sectionStart = this._index + 1)) : ((this._state = 16), this._index--);
            }),
            (t.prototype._stateInCdata = function (t) {
                ']' === t && (this._state = 29);
            }),
            (t.prototype._stateAfterCdata1 = function (t) {
                this._state = ']' === t ? 30 : 28;
            }),
            (t.prototype._stateAfterCdata2 = function (t) {
                '>' === t
                    ? (this._cbs.oncdata(this._buffer.substring(this._sectionStart, this._index - 2)), (this._state = 1), (this._sectionStart = this._index + 1))
                    : ']' !== t && (this._state = 28);
            }),
            (t.prototype._stateBeforeSpecial = function (t) {
                'c' === t || 'C' === t ? (this._state = 33) : 't' === t || 'T' === t ? (this._state = 43) : ((this._state = 3), this._index--);
            }),
            (t.prototype._stateBeforeSpecialEnd = function (t) {
                2 !== this._special || ('c' !== t && 'C' !== t) ? (3 !== this._special || ('t' !== t && 'T' !== t) ? (this._state = 1) : (this._state = 47)) : (this._state = 38);
            }),
            (t.prototype._stateBeforeScript5 = function (t) {
                ('/' === t || '>' === t || whitespace(t)) && (this._special = 2), (this._state = 3), this._index--;
            }),
            (t.prototype._stateAfterScript5 = function (t) {
                '>' === t || whitespace(t) ? ((this._special = 1), (this._state = 6), (this._sectionStart = this._index - 6), this._index--) : (this._state = 1);
            }),
            (t.prototype._stateBeforeStyle4 = function (t) {
                ('/' === t || '>' === t || whitespace(t)) && (this._special = 3), (this._state = 3), this._index--;
            }),
            (t.prototype._stateAfterStyle4 = function (t) {
                '>' === t || whitespace(t) ? ((this._special = 1), (this._state = 6), (this._sectionStart = this._index - 5), this._index--) : (this._state = 1);
            }),
            (t.prototype._parseNamedEntityStrict = function () {
                if (this._sectionStart + 1 < this._index) {
                    var t = this._buffer.substring(this._sectionStart + 1, this._index),
                        e = this._xmlMode ? xml_json_1['default'] : entities_json_1['default'];

                    Object.prototype.hasOwnProperty.call(e, t) && (this._emitPartial(e[t]), (this._sectionStart = this._index + 1));
                }
            }),
            (t.prototype._parseLegacyEntity = function () {
                var t = this._sectionStart + 1,
                    e = this._index - t;

                for (e > 6 && (e = 6); e >= 2; ) {
                    var s = this._buffer.substr(t, e);

                    if (Object.prototype.hasOwnProperty.call(legacy_json_1['default'], s))
                        return this._emitPartial(legacy_json_1['default'][s]), void (this._sectionStart += e + 1);
                    e--;
                }
            }),
            (t.prototype._stateInNamedEntity = function (t) {
                ';' === t
                    ? (this._parseNamedEntityStrict(), this._sectionStart + 1 < this._index && !this._xmlMode && this._parseLegacyEntity(), (this._state = this._baseState))
                    : (t < 'a' || t > 'z') &&
                      (t < 'A' || t > 'Z') &&
                      (t < '0' || t > '9') &&
                      (this._xmlMode || this._sectionStart + 1 === this._index || (1 !== this._baseState ? '=' !== t && this._parseNamedEntityStrict() : this._parseLegacyEntity()),
                      (this._state = this._baseState),
                      this._index--);
            }),
            (t.prototype._decodeNumericEntity = function (t, e) {
                var s = this._sectionStart + t;

                if (s !== this._index) {
                    var i = this._buffer.substring(s, this._index),
                        a = parseInt(i, e);

                    this._emitPartial(decode_codepoint_1['default'](a)), (this._sectionStart = this._index);
                } else this._sectionStart--;

                this._state = this._baseState;
            }),
            (t.prototype._stateInNumericEntity = function (t) {
                ';' === t
                    ? (this._decodeNumericEntity(2, 10), this._sectionStart++)
                    : (t < '0' || t > '9') && (this._xmlMode ? (this._state = this._baseState) : this._decodeNumericEntity(2, 10), this._index--);
            }),
            (t.prototype._stateInHexEntity = function (t) {
                ';' === t
                    ? (this._decodeNumericEntity(3, 16), this._sectionStart++)
                    : (t < 'a' || t > 'f') &&
                      (t < 'A' || t > 'F') &&
                      (t < '0' || t > '9') &&
                      (this._xmlMode ? (this._state = this._baseState) : this._decodeNumericEntity(3, 16), this._index--);
            }),
            (t.prototype._cleanup = function () {
                this._sectionStart < 0
                    ? ((this._buffer = ''), (this._bufferOffset += this._index), (this._index = 0))
                    : this._running &&
                      (1 === this._state
                          ? (this._sectionStart !== this._index && this._cbs.ontext(this._buffer.substr(this._sectionStart)),
                            (this._buffer = ''),
                            (this._bufferOffset += this._index),
                            (this._index = 0))
                          : this._sectionStart === this._index
                          ? ((this._buffer = ''), (this._bufferOffset += this._index), (this._index = 0))
                          : ((this._buffer = this._buffer.substr(this._sectionStart)), (this._index -= this._sectionStart), (this._bufferOffset += this._sectionStart)),
                      (this._sectionStart = 0));
            }),
            (t.prototype.write = function (t) {
                this._ended && this._cbs.onerror(Error('.write() after done!')), (this._buffer += t), this._parse();
            }),
            (t.prototype._parse = function () {
                for (; this._index < this._buffer.length && this._running; ) {
                    var t = this._buffer.charAt(this._index);

                    1 === this._state
                        ? this._stateText(t)
                        : 12 === this._state
                        ? this._stateInAttributeValueDoubleQuotes(t)
                        : 9 === this._state
                        ? this._stateInAttributeName(t)
                        : 19 === this._state
                        ? this._stateInComment(t)
                        : 8 === this._state
                        ? this._stateBeforeAttributeName(t)
                        : 3 === this._state
                        ? this._stateInTagName(t)
                        : 6 === this._state
                        ? this._stateInCloseingTagName(t)
                        : 2 === this._state
                        ? this._stateBeforeTagName(t)
                        : 10 === this._state
                        ? this._stateAfterAttributeName(t)
                        : 13 === this._state
                        ? this._stateInAttributeValueSingleQuotes(t)
                        : 11 === this._state
                        ? this._stateBeforeAttributeValue(t)
                        : 5 === this._state
                        ? this._stateBeforeCloseingTagName(t)
                        : 7 === this._state
                        ? this._stateAfterCloseingTagName(t)
                        : 31 === this._state
                        ? this._stateBeforeSpecial(t)
                        : 20 === this._state
                        ? this._stateAfterComment1(t)
                        : 14 === this._state
                        ? this._stateInAttributeValueNoQuotes(t)
                        : 4 === this._state
                        ? this._stateInSelfClosingTag(t)
                        : 16 === this._state
                        ? this._stateInDeclaration(t)
                        : 15 === this._state
                        ? this._stateBeforeDeclaration(t)
                        : 21 === this._state
                        ? this._stateAfterComment2(t)
                        : 18 === this._state
                        ? this._stateBeforeComment(t)
                        : 32 === this._state
                        ? this._stateBeforeSpecialEnd(t)
                        : 38 === this._state
                        ? stateAfterScript1(this, t)
                        : 39 === this._state
                        ? stateAfterScript2(this, t)
                        : 40 === this._state
                        ? stateAfterScript3(this, t)
                        : 33 === this._state
                        ? stateBeforeScript1(this, t)
                        : 34 === this._state
                        ? stateBeforeScript2(this, t)
                        : 35 === this._state
                        ? stateBeforeScript3(this, t)
                        : 36 === this._state
                        ? stateBeforeScript4(this, t)
                        : 37 === this._state
                        ? this._stateBeforeScript5(t)
                        : 41 === this._state
                        ? stateAfterScript4(this, t)
                        : 42 === this._state
                        ? this._stateAfterScript5(t)
                        : 43 === this._state
                        ? stateBeforeStyle1(this, t)
                        : 28 === this._state
                        ? this._stateInCdata(t)
                        : 44 === this._state
                        ? stateBeforeStyle2(this, t)
                        : 45 === this._state
                        ? stateBeforeStyle3(this, t)
                        : 46 === this._state
                        ? this._stateBeforeStyle4(t)
                        : 47 === this._state
                        ? stateAfterStyle1(this, t)
                        : 48 === this._state
                        ? stateAfterStyle2(this, t)
                        : 49 === this._state
                        ? stateAfterStyle3(this, t)
                        : 50 === this._state
                        ? this._stateAfterStyle4(t)
                        : 17 === this._state
                        ? this._stateInProcessingInstruction(t)
                        : 53 === this._state
                        ? this._stateInNamedEntity(t)
                        : 22 === this._state
                        ? stateBeforeCdata1(this, t)
                        : 51 === this._state
                        ? stateBeforeEntity(this, t)
                        : 23 === this._state
                        ? stateBeforeCdata2(this, t)
                        : 24 === this._state
                        ? stateBeforeCdata3(this, t)
                        : 29 === this._state
                        ? this._stateAfterCdata1(t)
                        : 30 === this._state
                        ? this._stateAfterCdata2(t)
                        : 25 === this._state
                        ? stateBeforeCdata4(this, t)
                        : 26 === this._state
                        ? stateBeforeCdata5(this, t)
                        : 27 === this._state
                        ? this._stateBeforeCdata6(t)
                        : 55 === this._state
                        ? this._stateInHexEntity(t)
                        : 54 === this._state
                        ? this._stateInNumericEntity(t)
                        : 52 === this._state
                        ? stateBeforeNumericEntity(this, t)
                        : this._cbs.onerror(Error('unknown _state'), this._state),
                        this._index++;
                }

                this._cleanup();
            }),
            (t.prototype.pause = function () {
                this._running = !1;
            }),
            (t.prototype.resume = function () {
                (this._running = !0), this._index < this._buffer.length && this._parse(), this._ended && this._finish();
            }),
            (t.prototype.end = function (t) {
                this._ended && this._cbs.onerror(Error('.end() after done!')), t && this.write(t), (this._ended = !0), this._running && this._finish();
            }),
            (t.prototype._finish = function () {
                this._sectionStart < this._index && this._handleTrailingData(), this._cbs.onend();
            }),
            (t.prototype._handleTrailingData = function () {
                var t = this._buffer.substr(this._sectionStart);

                28 === this._state || 29 === this._state || 30 === this._state
                    ? this._cbs.oncdata(t)
                    : 19 === this._state || 20 === this._state || 21 === this._state
                    ? this._cbs.oncomment(t)
                    : 53 !== this._state || this._xmlMode
                    ? 54 !== this._state || this._xmlMode
                        ? 55 !== this._state || this._xmlMode
                            ? 3 !== this._state &&
                              8 !== this._state &&
                              11 !== this._state &&
                              10 !== this._state &&
                              9 !== this._state &&
                              13 !== this._state &&
                              12 !== this._state &&
                              14 !== this._state &&
                              6 !== this._state &&
                              this._cbs.ontext(t)
                            : (this._decodeNumericEntity(3, 16), this._sectionStart < this._index && ((this._state = this._baseState), this._handleTrailingData()))
                        : (this._decodeNumericEntity(2, 10), this._sectionStart < this._index && ((this._state = this._baseState), this._handleTrailingData()))
                    : (this._parseLegacyEntity(), this._sectionStart < this._index && ((this._state = this._baseState), this._handleTrailingData()));
            }),
            (t.prototype.getAbsoluteIndex = function () {
                return this._bufferOffset + this._index;
            }),
            (t.prototype._getSection = function () {
                return this._buffer.substring(this._sectionStart, this._index);
            }),
            (t.prototype._emitToken = function (t) {
                this._cbs[t](this._getSection()), (this._sectionStart = -1);
            }),
            (t.prototype._emitPartial = function (t) {
                1 !== this._baseState ? this._cbs.onattribdata(t) : this._cbs.ontext(t);
            }),
            t
        );
    })();

exports['default'] = Tokenizer;
