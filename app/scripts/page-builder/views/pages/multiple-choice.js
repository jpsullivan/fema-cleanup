"use strict";

var _ = require('underscore');
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
        var newChoice = '<div class="checkbox choice pull-right"><label><input type="checkbox"><input type="text" class="form-control" placeholder="The choice value"></label></div>';
        this.ui.choices.append(newChoice);
    },

    getOutput: function (title) {
        return JST["pages/multiple-choice"]({
            title: title,
            description: this.ui.description.val(),
            instructions: this.ui.instructions.val(),
            triesAllowed: this.ui.triesAllowed.val(),
            feedback: this.ui.feedback.val(),
            choices: this.getChoices(),
            answerCode: this._buildCorrectAnswer()
        });
    },

    getChoices: function () {
        var choices = [];
        $('.choice').each(function (index, el) {
            choices.push({
                active: $('input[type=checkbox]', el).is(":checked"),
                title: $('input[type=text]', el).val()
            });
        });

        return choices;
    },

    _buildCorrectAnswer: function () {
        var answer = "";
        var choices = this.getChoices();
        _.each(choices, function (choice) {
            if (choice.active) {
                answer += "1";
            } else {
                answer += "0";
            }
        });

        return answer;
    }
});

module.exports = MultipleChoiceView;
