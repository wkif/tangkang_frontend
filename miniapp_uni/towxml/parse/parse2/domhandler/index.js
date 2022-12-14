/*! Project:无, Create:FWS 2020.01.08 21:48, Update:FWS 2020.01.08 21:48 */
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: !0
});

var node_1 = require('./node');

(exports.Node = node_1.Node), (exports.Element = node_1.Element), (exports.DataNode = node_1.DataNode), (exports.NodeWithChildren = node_1.NodeWithChildren);

var reWhitespace = /\s+/g,
    defaultOpts = {
        normalizeWhitespace: !1,
        withStartIndices: !1,
        withEndIndices: !1
    },
    DomHandler = (function () {
        function t(t, e, o) {
            (this.dom = []),
                (this._done = !1),
                (this._tagStack = []),
                (this._lastNode = null),
                (this._parser = null),
                'function' == typeof e && ((o = e), (e = defaultOpts)),
                'object' == typeof t && ((e = t), (t = undefined)),
                (this._callback = t || null),
                (this._options = e || defaultOpts),
                (this._elementCB = o || null);
        }

        return (
            (t.prototype.onparserinit = function (t) {
                this._parser = t;
            }),
            (t.prototype.onreset = function () {
                (this.dom = []), (this._done = !1), (this._tagStack = []), (this._lastNode = null), (this._parser = this._parser || null);
            }),
            (t.prototype.onend = function () {
                this._done || ((this._done = !0), (this._parser = null), this.handleCallback(null));
            }),
            (t.prototype.onerror = function (t) {
                this.handleCallback(t);
            }),
            (t.prototype.onclosetag = function () {
                this._lastNode = null;

                var t = this._tagStack.pop();

                t && this._parser && (this._options.withEndIndices && (t.endIndex = this._parser.endIndex), this._elementCB && this._elementCB(t));
            }),
            (t.prototype.onopentag = function (t, e) {
                var o = new node_1.Element(t, e);
                this.addNode(o), this._tagStack.push(o);
            }),
            (t.prototype.ontext = function (t) {
                var e = this._options.normalizeWhitespace,
                    o = this._lastNode;
                if (o && 'text' === o.type) e ? (o.data = (o.data + t).replace(reWhitespace, ' ')) : (o.data += t);
                else {
                    e && (t = t.replace(reWhitespace, ' '));
                    var n = new node_1.DataNode('text', t);
                    this.addNode(n), (this._lastNode = n);
                }
            }),
            (t.prototype.oncomment = function (t) {
                if (this._lastNode && 'comment' === this._lastNode.type) return void (this._lastNode.data += t);
                var e = new node_1.DataNode('comment', t);
                this.addNode(e), (this._lastNode = e);
            }),
            (t.prototype.oncommentend = function () {
                this._lastNode = null;
            }),
            (t.prototype.oncdatastart = function () {
                var t = new node_1.DataNode('text', ''),
                    e = new node_1.NodeWithChildren('cdata', [t]);
                this.addNode(e), (t.parent = e), (this._lastNode = t);
            }),
            (t.prototype.oncdataend = function () {
                this._lastNode = null;
            }),
            (t.prototype.onprocessinginstruction = function (t, e) {
                var o = new node_1.ProcessingInstruction(t, e);
                this.addNode(o);
            }),
            (t.prototype.handleCallback = function (t) {
                if ('function' == typeof this._callback) this._callback(t, this.dom);
                else if (t) throw t;
            }),
            (t.prototype.addNode = function (t) {
                var e = this._tagStack[this._tagStack.length - 1],
                    o = e ? e.children : this.dom,
                    n = o[o.length - 1];
                this._parser && (this._options.withStartIndices && (t.startIndex = this._parser.startIndex), this._options.withEndIndices && (t.endIndex = this._parser.endIndex)),
                    o.push(t),
                    n && ((t.prev = n), (n.next = t)),
                    e && (t.parent = e),
                    (this._lastNode = null);
            }),
            (t.prototype.addDataNode = function (t) {
                this.addNode(t), (this._lastNode = t);
            }),
            t
        );
    })();

(exports.DomHandler = DomHandler), (exports['default'] = DomHandler);
