"use strict";

var _ = require('underscore');
var Marionette = require('backbone.marionette');

var MultipleChoiceView = Marionette.ItemView.extend({
    template: JST["pages/multiple-choice-opts"],

    ui: {
        answerType: "input[name='answerType']",
        description: "#description",
        instructions: "#instructions",
        triesAllowed: "#triesAllowed",
        feedback: "#feedback",
        choices: "#choices",
        addChoice: "#addChoice"
    },

    events: {
        "change @ui.answerType": "resetChoices",
        "click @ui.addChoice": "addChoice"
    },

    _getSelectedAnswerType: function () {
        return $('input[name="answerType"]:checked').val();
    },

    resetChoices: function () {
        this.ui.choices.html('');
    },

    addChoice: function () {
        var newChoice;
        if (this._getSelectedAnswerType() === "single") {
            newChoice = '<div class="radio choice pull-right"><label><input type="radio" name="singleChoices"><input type="text" class="form-control" placeholder="The choice value"></label></div>';
        } else {
            newChoice = '<div class="checkbox choice pull-right"><label><input type="checkbox"><input type="text" class="form-control" placeholder="The choice value"></label></div>';
        }

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
            isSingleChoice: this._getSelectedAnswerType() === "single",
            answerCode: this._buildCorrectAnswer()
        });
    },

    getChoices: function () {
        var choices = [];
        $('.choice').each(_.bind(function (index, el) {
            var active;
            if (this._getSelectedAnswerType() === "single") {
                active = $('input[type=radio]', el).is(":checked");
            } else {
                active = $('input[type=checkbox]', el).is(":checked");
            }

            choices.push({
                active: active,
                title: $('input[type=text]', el).val()
            });
        }, this));

        return choices;
    },

    _buildCorrectAnswer: function () {
        var answer = "";
        var choices = this.getChoices();

        // for single choice, only return the correct index number
        if (this._getSelectedAnswerType() === "single") {
            _.each(choices, function (choice, i) {
                if (choice.active) {
                    answer = i + 1;
                }
            });
        } else {
            _.each(choices, function (choice) {
                if (choice.active) {
                    answer += "1";
                } else {
                    answer += "0";
                }
            });
        }

        return answer;
    }
});

module.exports = MultipleChoiceView;
