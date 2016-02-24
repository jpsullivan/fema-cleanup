"use strict";

var Backbone = require('backbone');
var Marionette = require('backbone.marionette');

var PageBuilderRouter = Marionette.AppRouter.extend({
    appRoutes: {
        "page-builder(/)": "lessonBuilder",
        "page-builder/index.html": "lessonBuilder",
        "page-builder/new-step.html": "stepBuilder"
    },

    initRouter: function () {
        Backbone.history.start({
            pushState: true,
            root: window.applicationRoot
        });
    }
});

module.exports = PageBuilderRouter;
