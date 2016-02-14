"use strict";

var Marionette = require('backbone.marionette');
var NewLessonView = require('./views/new-lesson');

var PageBuilderController = Marionette.Object.extend({
    initialize: function (options) {
        this.app = options.app;
        this.manifest = this._initManifestData();
    },

    lessonBuilder: function () {
        var view = new NewLessonView();
        this.app.root.showChildView('main', view);
    },

    stepBuilder: function () {
        debugger;
    },

    _initManifestData: function () {
        var req = $.ajax({
            type: "GET",
            url: "../../imsmanifest.xml",
            dataType: "xml"
        });
        req.success = function (xml) {
            var dict = {
                lessons: {}
            };

            var res = $(xml).find('resources');
            res.find('resource').each(function() {
                dict.lessons[$(this).attr('identifier')+''] = $(this).attr('href')+'';
            });
            $(xml).find('item').each(function() {
                var id = $(this).attr('identifier')+'';
                var idRef = $(this).attr('identifierref')+'';
                var title = $(this).find('title').text();
                //$('<p><a href="javascript:LoadLesson(&quot;'+dict[idRef]+'&quot;)">'+title+'</a></p>').appendTo('#allLessons');
            });

            return dict;
        };
    }
});

module.exports = PageBuilderController;
