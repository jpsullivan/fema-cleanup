"use strict";

var _ = require('underscore');
var Marionette = require('backbone.marionette');

var YesNoView = Marionette.ItemView.extend({
    template: JST["pages/yes-no-opts"],

    ui: {
        description: "#description",
        instructions: "#instructions",
        triesAllowed: "#triesAllowed",
        feedback: "#feedback",
        tableHeading: "#tableHeading",
        choiceAHeading: "#choiceAHeading",
        choiceBHeading: "#choiceBHeading",
        choices: "#choices",
        addChoice: "#addChoice"
    },

    events: {
        "click @ui.addChoice": "addChoice"
    },

    resetChoices: function () {
        this.ui.choices.html('');
    },

    addChoice: function () {
        var uniqueRadioName = Math.random().toString(36).substring(7);
        var newChoice = '<div class="choice"><div class="col-sm-9 pull-right">';
        newChoice += '<input type="text" class="form-control rowText" placeholder="Your choice text">';
        newChoice += '<label class="radio-inline"><input type="radio" name="'+uniqueRadioName+'" value="1"> '+ this.ui.choiceAHeading.val() +'</label>';
        newChoice += '<label class="radio-inline"><input type="radio" name="'+uniqueRadioName+'" value="2"> '+ this.ui.choiceBHeading.val() +'</label>';
        newChoice += '</div></div>';

        this.ui.choices.append(newChoice);
    },

    getOutput: function (title) {
        return JST["pages/yes-no"]({
            title: title,
            description: this.ui.description.val(),
            instructions: this.ui.instructions.val(),
            triesAllowed: this.ui.triesAllowed.val(),
            feedback: this.ui.feedback.val(),
            tableHeading: this.ui.tableHeading.val(),
            choiceAHeading: this.ui.choiceAHeading.val(),
            choiceBHeading: this.ui.choiceBHeading.val(),
            choices: this.getChoices(),
            answerCode: this._buildCorrectAnswer()
        });
    },

    getChoices: function () {
        var choices = [];
        $('.choice').each(_.bind(function (index, el) {
            choices.push({
                correctChoice: $('input[type=radio]:checked', el).val(),
                title: $('input[type=text]', el).val()
            });
        }, this));

        return choices;
    },

    _buildCorrectAnswer: function () {
        var answer = "";
        var choices = this.getChoices();

        _.each(choices, function (choice) {
            answer += choice.correctChoice;
        });

        return answer;
    }
});

module.exports = YesNoView;
