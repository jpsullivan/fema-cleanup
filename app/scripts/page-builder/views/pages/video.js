"use strict";

var Marionette = require('backbone.marionette');

var VideoView = Marionette.ItemView.extend({
    template: JST["pages/video-opts"],

    ui: {
        description: "#description",
        posterImagePath: "#posterImagePath",
        videoPath: "#videoPath",
        instructions: "#instructions",
        triesAllowed: "#triesAllowed",
        feedback: "#feedback",
        choices: "#choices",
        addChoice: "#addChoice"
    },

    getOutput: function (title) {
        return JST["pages/video"]({
            title: title,
            description: this.ui.description.val(),
            posterImagePath: this.ui.posterImagePath.val(),
            videoPath: this.ui.videoPath.val()
        });
    }
});

module.exports = VideoView;
