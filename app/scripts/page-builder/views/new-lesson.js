"use strict";

var format = require('string-template');
var Marionette = require('backbone.marionette');

var NewLessonView = Marionette.ItemView.extend({
    template: JST["new-lesson"],

    ui: {
        lessonNumber: "#lessonNumber",
        lessonCode: "#lessonCode",
        lessonName: "#lessonName",
        submit: "#create-lesson"
    },

    events: {
        "click @ui.submit": "generateLessonXml"
    },

    serializeData: function () {
        return {
            output: this.output
        };
    },

    initialize: function () {
        this.output = {};
    },

    generateLessonXml: function (e) {
        e.preventDefault();

        var itemOutput = format('<item identifier = "{0}" identifierref = "{1}"><title>{2}</title></item>', [
            "Lesson" + this.ui.lessonNumber.val(),
            this.ui.lessonCode.val(),
            this.ui.lessonName.val()
        ]);

        var resourceOutput = format('<resource identifier = "{0}" type = "webcontent" adlcp:scormtype = "sco" href = "SMPLIndex.htm?lesson={1}"></resource>', [
            this.ui.lessonCode.val(),
            this.ui.lessonNumber.val()
        ]);

        this.output.item = itemOutput;
        this.output.resource = resourceOutput;
        this.render();

        $('pre code').each(function(i, block) {
            hljs.highlightBlock(block);
        });
    }
});

module.exports = NewLessonView;
