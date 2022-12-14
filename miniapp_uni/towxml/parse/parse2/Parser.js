/*! Project:无, Create:FWS 2020.01.08 21:48, Update:FWS 2020.01.08 21:48 */
'use strict';

function Parser(t, e) {
    var s = this;
    return (
        (s._tagname = ''),
        (s._attribname = ''),
        (s._attribvalue = ''),
        (s._attribs = null),
        (s._stack = []),
        (s._foreignContext = []),
        (s.startIndex = 0),
        (s.endIndex = null),
        (s.parseChunk = Parser.prototype.write),
        (s.done = Parser.prototype.end),
        (s._options = e || {}),
        (s._cbs = t || {}),
        (s._tagname = ''),
        (s._attribname = ''),
        (s._attribvalue = ''),
        (s._attribs = null),
        (s._stack = []),
        (s._foreignContext = []),
        (s.startIndex = 0),
        (s.endIndex = null),
        (s._lowerCaseTagNames = 'lowerCaseTags' in s._options ? !!s._options.lowerCaseTags : !s._options.xmlMode),
        (s._lowerCaseAttributeNames = 'lowerCaseAttributeNames' in s._options ? !!s._options.lowerCaseAttributeNames : !s._options.xmlMode),
        (s._tokenizer = new (s._options.Tokenizer || Tokenizer_1['default'])(s._options, s)),
        s._cbs.onparserinit && s._cbs.onparserinit(s),
        s
    );
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

var Tokenizer_1 = __importDefault(require('./Tokenizer')),
    formTags = new Set(['input', 'option', 'optgroup', 'select', 'button', 'datalist', 'textarea']),
    pTag = new Set(['p']),
    openImpliesClose = {
        tr: new Set(['tr', 'th', 'td']),
        th: new Set(['th']),
        td: new Set(['thead', 'th', 'td']),
        body: new Set(['head', 'link', 'script']),
        li: new Set(['li']),
        p: pTag,
        h1: pTag,
        h2: pTag,
        h3: pTag,
        h4: pTag,
        h5: pTag,
        h6: pTag,
        select: formTags,
        input: formTags,
        output: formTags,
        button: formTags,
        datalist: formTags,
        textarea: formTags,
        option: new Set(['option']),
        optgroup: new Set(['optgroup', 'option']),
        dd: new Set(['dt', 'dd']),
        dt: new Set(['dt', 'dd']),
        address: pTag,
        article: pTag,
        aside: pTag,
        blockquote: pTag,
        details: pTag,
        div: pTag,
        dl: pTag,
        fieldset: pTag,
        figcaption: pTag,
        figure: pTag,
        footer: pTag,
        form: pTag,
        header: pTag,
        hr: pTag,
        main: pTag,
        nav: pTag,
        ol: pTag,
        pre: pTag,
        section: pTag,
        table: pTag,
        ul: pTag,
        rt: new Set(['rt', 'rp']),
        rp: new Set(['rt', 'rp']),
        tbody: new Set(['thead', 'tbody']),
        tfoot: new Set(['thead', 'tbody'])
    },
    voidElements = new Set([
        'area',
        'base',
        'basefont',
        'br',
        'col',
        'command',
        'embed',
        'frame',
        'hr',
        'img',
        'input',
        'isindex',
        'keygen',
        'link',
        'meta',
        'param',
        'source',
        'track',
        'wbr'
    ]),
    foreignContextElements = new Set(['math', 'svg']),
    htmlIntegrationElements = new Set(['mi', 'mo', 'mn', 'ms', 'mtext', 'annotation-xml', 'foreignObject', 'desc', 'title']),
    reNameEnd = /\s|\//;

(Parser.prototype._updatePosition = function (t) {
    null === this.endIndex
        ? this._tokenizer._sectionStart <= t
            ? (this.startIndex = 0)
            : (this.startIndex = this._tokenizer._sectionStart - t)
        : (this.startIndex = this.endIndex + 1),
        (this.endIndex = this._tokenizer.getAbsoluteIndex());
}),
    (Parser.prototype.ontext = function (t) {
        this._updatePosition(1), this.endIndex--, this._cbs.ontext && this._cbs.ontext(t);
    }),
    (Parser.prototype.onopentagname = function (t) {
        if ((this._lowerCaseTagNames && (t = t.toLowerCase()), (this._tagname = t), !this._options.xmlMode && t in openImpliesClose))
            for (var e = void 0; openImpliesClose[t].has((e = this._stack[this._stack.length - 1])); this.onclosetag(e));
        (!this._options.xmlMode && voidElements.has(t)) ||
            (this._stack.push(t), foreignContextElements.has(t) ? this._foreignContext.push(!0) : htmlIntegrationElements.has(t) && this._foreignContext.push(!1)),
            this._cbs.onopentagname && this._cbs.onopentagname(t),
            this._cbs.onopentag && (this._attribs = {});
    }),
    (Parser.prototype.onopentagend = function () {
        this._updatePosition(1),
            this._attribs && (this._cbs.onopentag && this._cbs.onopentag(this._tagname, this._attribs), (this._attribs = null)),
            !this._options.xmlMode && this._cbs.onclosetag && voidElements.has(this._tagname) && this._cbs.onclosetag(this._tagname),
            (this._tagname = '');
    }),
    (Parser.prototype.onclosetag = function (t) {
        if (
            (this._updatePosition(1),
            this._lowerCaseTagNames && (t = t.toLowerCase()),
            (foreignContextElements.has(t) || htmlIntegrationElements.has(t)) && this._foreignContext.pop(),
            !this._stack.length || (!this._options.xmlMode && voidElements.has(t)))
        )
            this._options.xmlMode || ('br' !== t && 'p' !== t) || (this.onopentagname(t), this._closeCurrentTag());
        else {
            var e = this._stack.lastIndexOf(t);

            if (-1 !== e) {
                if (this._cbs.onclosetag) for (e = this._stack.length - e; e--; ) this._cbs.onclosetag(this._stack.pop());
                else this._stack.length = e;
            } else 'p' !== t || this._options.xmlMode || (this.onopentagname(t), this._closeCurrentTag());
        }
    }),
    (Parser.prototype.onselfclosingtag = function () {
        this._options.xmlMode || this._options.recognizeSelfClosing || this._foreignContext[this._foreignContext.length - 1] ? this._closeCurrentTag() : this.onopentagend();
    }),
    (Parser.prototype._closeCurrentTag = function () {
        var t = this._tagname;
        this.onopentagend(), this._stack[this._stack.length - 1] === t && (this._cbs.onclosetag && this._cbs.onclosetag(t), this._stack.pop());
    }),
    (Parser.prototype.onattribname = function (t) {
        this._lowerCaseAttributeNames && (t = t.toLowerCase()), (this._attribname = t);
    }),
    (Parser.prototype.onattribdata = function (t) {
        this._attribvalue += t;
    }),
    (Parser.prototype.onattribend = function () {
        this._cbs.onattribute && this._cbs.onattribute(this._attribname, this._attribvalue),
            this._attribs && !Object.prototype.hasOwnProperty.call(this._attribs, this._attribname) && (this._attribs[this._attribname] = this._attribvalue),
            (this._attribname = ''),
            (this._attribvalue = '');
    }),
    (Parser.prototype._getInstructionName = function (t) {
        var e = t.search(reNameEnd),
            s = e < 0 ? t : t.substr(0, e);
        return this._lowerCaseTagNames && (s = s.toLowerCase()), s;
    }),
    (Parser.prototype.ondeclaration = function (t) {
        if (this._cbs.onprocessinginstruction) {
            var e = this._getInstructionName(t);

            this._cbs.onprocessinginstruction('!' + e, '!' + t);
        }
    }),
    (Parser.prototype.onprocessinginstruction = function (t) {
        if (this._cbs.onprocessinginstruction) {
            var e = this._getInstructionName(t);

            this._cbs.onprocessinginstruction('?' + e, '?' + t);
        }
    }),
    (Parser.prototype.oncomment = function (t) {
        this._updatePosition(4), this._cbs.oncomment && this._cbs.oncomment(t), this._cbs.oncommentend && this._cbs.oncommentend();
    }),
    (Parser.prototype.oncdata = function (t) {
        this._updatePosition(1),
            this._options.xmlMode || this._options.recognizeCDATA
                ? (this._cbs.oncdatastart && this._cbs.oncdatastart(), this._cbs.ontext && this._cbs.ontext(t), this._cbs.oncdataend && this._cbs.oncdataend())
                : this.oncomment('[CDATA[' + t + ']]');
    }),
    (Parser.prototype.onerror = function (t) {
        this._cbs.onerror && this._cbs.onerror(t);
    }),
    (Parser.prototype.onend = function () {
        if (this._cbs.onclosetag) for (var t = this._stack.length; t > 0; this._cbs.onclosetag(this._stack[--t]));
        this._cbs.onend && this._cbs.onend();
    }),
    (Parser.prototype.reset = function () {
        this._cbs.onreset && this._cbs.onreset(),
            this._tokenizer.reset(),
            (this._tagname = ''),
            (this._attribname = ''),
            (this._attribs = null),
            (this._stack = []),
            this._cbs.onparserinit && this._cbs.onparserinit(this);
    }),
    (Parser.prototype.parseComplete = function (t) {
        this.reset(), this.end(t);
    }),
    (Parser.prototype.write = function (t) {
        this._tokenizer.write(t);
    }),
    (Parser.prototype.end = function (t) {
        this._tokenizer.end(t);
    }),
    (Parser.prototype.pause = function () {
        this._tokenizer.pause();
    }),
    (Parser.prototype.resume = function () {
        this._tokenizer.resume();
    }),
    (exports.Parser = Parser);
