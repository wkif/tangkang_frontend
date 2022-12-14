/*! Project:无, Create:FWS 2020.01.08 21:48, Update:FWS 2020.01.08 21:48 */
'use strict';

var __extends =
    (this && this.__extends) ||
    (function () {
        var e = function (t, n) {
            return (e =
                Object.setPrototypeOf ||
                ({
                    __proto__: []
                } instanceof Array &&
                    function (e, t) {
                        e.__proto__ = t;
                    }) ||
                function (e, t) {
                    for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
                })(t, n);
        };

        return function (t, n) {
            function r() {
                this.constructor = t;
            }

            e(t, n), (t.prototype = null === n ? Object.create(n) : ((r.prototype = n.prototype), new r()));
        };
    })();

Object.defineProperty(exports, '__esModule', {
    value: !0
});

var nodeTypes = new Map([
        ['tag', 1],
        ['script', 1],
        ['style', 1],
        ['directive', 1],
        ['text', 3],
        ['cdata', 4],
        ['comment', 8]
    ]),
    Node = (function () {
        function e(e) {
            (this.type = e), (this.parent = null), (this.prev = null), (this.next = null), (this.startIndex = null), (this.endIndex = null);
        }

        return (
            Object.defineProperty(e.prototype, 'nodeType', {
                get: function () {
                    return nodeTypes.get(this.type) || 1;
                },
                enumerable: !0,
                configurable: !0
            }),
            Object.defineProperty(e.prototype, 'parentNode', {
                get: function () {
                    return this.parent || null;
                },
                set: function (e) {
                    this.parent = e;
                },
                enumerable: !0,
                configurable: !0
            }),
            Object.defineProperty(e.prototype, 'previousSibling', {
                get: function () {
                    return this.prev || null;
                },
                set: function (e) {
                    this.prev = e;
                },
                enumerable: !0,
                configurable: !0
            }),
            Object.defineProperty(e.prototype, 'nextSibling', {
                get: function () {
                    return this.next || null;
                },
                set: function (e) {
                    this.next = e;
                },
                enumerable: !0,
                configurable: !0
            }),
            e
        );
    })();

exports.Node = Node;

var DataNode = (function (e) {
    function t(t, n) {
        var r = e.call(this, t) || this;
        return (r.data = n), r;
    }

    return (
        __extends(t, e),
        Object.defineProperty(t.prototype, 'nodeValue', {
            get: function () {
                return this.data;
            },
            set: function (e) {
                this.data = e;
            },
            enumerable: !0,
            configurable: !0
        }),
        t
    );
})(Node);

exports.DataNode = DataNode;

var ProcessingInstruction = (function (e) {
    function t(t, n) {
        var r = e.call(this, 'directive', n) || this;
        return (r.name = t), r;
    }

    return __extends(t, e), t;
})(DataNode);

exports.ProcessingInstruction = ProcessingInstruction;

var NodeWithChildren = (function (e) {
    function t(t, n) {
        var r = e.call(this, t) || this;
        return (r.children = n), r;
    }

    return (
        __extends(t, e),
        Object.defineProperty(t.prototype, 'firstChild', {
            get: function () {
                return this.children[0] || null;
            },
            enumerable: !0,
            configurable: !0
        }),
        Object.defineProperty(t.prototype, 'lastChild', {
            get: function () {
                return this.children[this.children.length - 1] || null;
            },
            enumerable: !0,
            configurable: !0
        }),
        Object.defineProperty(t.prototype, 'childNodes', {
            get: function () {
                return this.children;
            },
            set: function (e) {
                this.children = e;
            },
            enumerable: !0,
            configurable: !0
        }),
        t
    );
})(Node);

exports.NodeWithChildren = NodeWithChildren;

var Element = (function (e) {
    function t(t, n) {
        var r = e.call(this, 'script' === t ? 'script' : 'style' === t ? 'style' : 'tag', []) || this;
        return (r.name = t), (r.attribs = n), (r.attribs = n), r;
    }

    return (
        __extends(t, e),
        Object.defineProperty(t.prototype, 'tagName', {
            get: function () {
                return this.name;
            },
            set: function (e) {
                this.name = e;
            },
            enumerable: !0,
            configurable: !0
        }),
        t
    );
})(NodeWithChildren);

exports.Element = Element;
