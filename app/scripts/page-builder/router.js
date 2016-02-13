"use strict";

var Marionette = require('backbone.marionette');

var PageBuilderRouter = Marionette.AppRouter.extend({
    "page-builder(/)": "lessonBuilder",
    "page-builder/new-step.html": "stepBuilder"
});

module.exports = PageBuilderRouter;
