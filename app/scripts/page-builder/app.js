"use strict";

var Backbone = require('backbone');
var Handlebars = require('handlebars');
var Marionette = require('backbone.marionette');

var Controller = require('./controller');
var RootLayout = require('./layouts/root-layout');
var PageBuilderRouter = require('./router');

var PageBuilderApp = Marionette.Application.extend({
    setRootLayout: function () {
        this.root = new RootLayout();
    }
});

var app = new PageBuilderApp({container: '#container'});

app.on('before:start', function () {
	app.setRootLayout();
});

app.on('start', function () {
    var controller = new Controller({ app: app });
    controller.router = new PageBuilderRouter({
        controller: controller
    });

    Backbone.history.start({ pushState: true });
});

app.start();

module.exports = PageBuilderApp;
