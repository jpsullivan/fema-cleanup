"use strict";

var format = require('string-template');
var Marionette = require('backbone.marionette');

var NewLessonView = Marionette.ItemView.extend({
    template: JST["new-lesson"],

    ui: {
        lessonIdentifier: "#identifier",
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
        }
    },

    initialize: function () {
        this.output = null
    },

    generateLessonXml: function (e) {
        e.preventDefault();

        var output = format('<item identifier="{0}" identifierref="{1}"><title>{2}</title></item>', [
            this.ui.lessonIdentifier.val(),
            this.ui.lessonCode.val(),
            this.ui.lessonName.val()
        ]);
        this.output = output;
        this.render();

        $('pre code').each(function(i, block) {
            hljs.highlightBlock(block);
        });
    }
});

module.exports = NewLessonView;
