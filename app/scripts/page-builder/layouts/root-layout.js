"use strict";

var Marionette = require('backbone.marionette');

var RootLayout = Marionette.LayoutView.extend({
    el: 'body',

    regions: {
        nav: ".navbar",
        main: "#main",
        stepContent: "#stepContent"
    }
});

module.exports = RootLayout;
