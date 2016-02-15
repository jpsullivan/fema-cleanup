"use strict";

var _ = require('underscore');
var Marionette = require('backbone.marionette');
var NewLessonView = require('./views/new-lesson');
var NewStepView = require('./views/new-step');

var PageBuilderController = Marionette.Object.extend({
    initialize: function (options) {
        this.app = options.app;
    },

    lessonBuilder: function () {
        var view = new NewLessonView();
        this.app.root.showChildView('main', view);
    },

    stepBuilder: function () {
        this._initManifestData().done(_.bind(function (xml) {
            var dict = {
                lessons: {}
            };

            var res = $(xml).find('resources');
            res.find('resource').each(function() {
                dict.lessons[$(this).attr('identifier')+''] = $(this).attr('identifier')+'';
            });
            $(xml).find('item').each(function() {
                var id = $(this).attr('identifier')+'';
                var idRef = $(this).attr('identifierref')+'';
                var title = $(this).find('title').text();
                //$('<p><a href="javascript:LoadLesson(&quot;'+dict[idRef]+'&quot;)">'+title+'</a></p>').appendTo('#allLessons');
            });

            var view = new NewStepView({ app: this.app, manifest: dict });
            this.app.root.showChildView('main', view);
        }, this));
    },

    _initManifestData: function () {
        return $.ajax({
            type: "GET",
            url: "../../imsmanifest.xml",
            dataType: "xml"
        });
    }
});

module.exports = PageBuilderController;
