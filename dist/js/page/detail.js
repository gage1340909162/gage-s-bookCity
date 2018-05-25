"use strict";
define(["jquery", "text!../../tql/detail.html", "template"], function(e, n, o) {
    var t = location.search;
    e.ajaxSettings.async = !1, e.getJSON("/book/detail" + t, function(t) { t.item.word_count = Math.round(t.item.word_count / 1e4), o(n, t, ".wrap"), e(".content").on("click", function() { e(this).toggleClass("active") }) }), e(".startRead").on("click", function() { e.ajax({ url: "/userLogin", dataType: "json", success: function(t) { "true" === t.result ? location.href = "/page/read.html" : location.href = "/page/login.html" } }) })
});