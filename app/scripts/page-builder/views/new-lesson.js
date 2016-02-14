"use strict";

var Marionette = require('backbone.marionette');

var NewLessonView = Marionette.ItemView.extend({
    template: JST["new-lesson"],

    ui: {
        submit: "#create-lesson"
    }
});

module.exports = NewLessonView;
