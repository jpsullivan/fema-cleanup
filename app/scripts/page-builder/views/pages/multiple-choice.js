"use strict";

var Marionette = require('backbone.marionette');

var MultipleChoiceView = Marionette.ItemView.extend({
    template: JST["pages/multiple-choice"]
});

module.exports = MultipleChoiceView;
