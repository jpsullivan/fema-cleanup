"use strict";

var Marionette = require('backbone.marionette');

var PageBuilderRouter = Marionette.AppRouter.extend({
    appRoutes: {
        "page-builder(/)": "lessonBuilder",
        "page-builder/index.html": "lessonBuilder",
        "page-builder/new-step.html": "stepBuilder"
    }
});

module.exports = PageBuilderRouter;
