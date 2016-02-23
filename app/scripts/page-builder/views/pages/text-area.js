"use strict";

var Marionette = require('backbone.marionette');

var TextAreaView = Marionette.ItemView.extend({
    template: JST["pages/text-area-opts"],

    ui: {
        description: "#description",
        instructions: "#instructions",
        compareMessage: "#compareMessage",
        feedbackHeader: "#feedbackHeader",
        feedback: "#feedback"
    },

    getOutput: function (title) {
        return JST["pages/text-area"]({
            title: title,
            description: this.ui.description.val(),
            instructions: this.ui.instructions.val(),
            compareMessage: this.ui.compareMessage.val(),
            feedbackHeader: this.ui.feedbackHeader.val(),
            feedback: this.ui.feedback.val()
        });
    }
});

module.exports = TextAreaView;
