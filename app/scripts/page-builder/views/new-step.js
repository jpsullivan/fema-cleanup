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
        stepNumber: "#stepNumber",
        stepName: "#stepName",
        submit: "#create-lesson"
    },

    events: {
        "change @ui.pageType": "onChangePageType",
        "click @ui.submit": "generateOutput"
    },

    serializeData: function () {
        return {
            output: this.output
        };
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
        this.stepView = new stepView();
        this.app.root.showChildView('stepContent', this.stepView);
    },

    _getStepView: function (pageType) {
        switch (pageType) {
            case "MultipleChoice":
                return MultipleChoiceView;
            default:
                console.error("could not find a page type for '"+ pageType +"'");
        }
    },

    generateOutput: function (e) {
        e.preventDefault();

        var html = this.stepView.getOutput(this.ui.stepName.val());

        var manifestFileMarkup = format('<file href="{0}" title="{1}"/>', [
            this._getStepFileName(),
            this.ui.stepName.val()
        ]);

        this.output = {
            manifestFileMarkup: manifestFileMarkup,
            stepFileName: this._getStepFileName(),
            html: html
        };
        this.render();

        $('pre code').each(function(i, block) {
            hljs.highlightBlock(block);
        });
    },

    _getStepFileName: function () {
        return format('{0}{1}.htm', [
            this.ui.lessons.val(),
            ('0' + this.ui.stepNumber.val()).slice(-2)
        ]);
    }
});

module.exports = NewStepView;
