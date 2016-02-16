"use strict";

var Marionette = require('backbone.marionette');

var MultipleChoiceView = Marionette.ItemView.extend({
    template: JST["pages/multiple-choice-opts"],

    ui: {
        description: "#description",
        instructions: "#instructions",
        triesAllowed: "#triesAllowed",
        feedback: "#feedback",
        choices: "#choices",
        addChoice: "#addChoice"
    },

    events: {
        "click @ui.addChoice": "addChoice"
    },

    addChoice: function () {
        var newChoice = '<div class="checkbox choice pull-right"><label><input type="checkbox"><input type="text" class="form-control" id="stepName" placeholder="The choice value"></label></div>';
        this.ui.choices.append(newChoice);
    },

    getOutput: function () {
        var output = JST["pages/multiple-choice"]();
        debugger;
    }
});

module.exports = MultipleChoiceView;
