"use strict";

var _ = require('underscore');
var format = require('string-template');
var Marionette = require('backbone.marionette');

// page types
var MultipleChoiceView = require('./pages/multiple-choice');

var NewStepView = Marionette.ItemView.extend({
    template: JST["new-step"],

    ui: {
        lessons: "#selectedLesson",
        pageType: "#pageType",
        submit: "#create-lesson"
    },

    events: {
        "change @ui.pageType": "onChangePageType",
        "click @ui.submit": "generateLessonXml"
    },

    serializeData: function () {
        return {
            output: this.output
        }
    },

    initialize: function (options) {
        this.app = options.app;
        this.manifest = options.manifest;
        this.output = null
    },

    onRender: function () {
        this._buildLessonDropdown();
    },

    _buildLessonDropdown: function () {
        var output = '<option>Please select a lesson</option>';
        _.each(this.manifest.lessons, function (lesson) {
            output += '<option value="'+lesson+'">'+lesson+'</option>';
        });
        $(this.ui.lessons).html(output);
    },

    onChangePageType: function (e) {
        var pageType = $(e.currentTarget).val();
        var stepView = this._getStepView(pageType);
        var view = new stepView();
        this.app.root.showChildView('stepContent', view);
    },

    _getStepView: function (pageType) {
        switch (pageType) {
            case "MultipleChoice":
                return MultipleChoiceView;
            default:
                console.error("could not find a page type for '"+ pageType +"'");
        }
    },

    generateLessonXml: function (e) {
        e.preventDefault();

        var output = format('<file href="SMPL0101010.htm" title="Introduction"/>', [
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

module.exports = NewStepView;
