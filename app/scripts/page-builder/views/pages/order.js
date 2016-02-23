"use strict";

var _ = require('underscore');
var Marionette = require('backbone.marionette');

var OrderView = Marionette.ItemView.extend({
    template: JST["pages/order-opts"],

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
        var newChoice = '<div class="choice">';
        newChoice += '<div class="col-sm-8 pull-right"><input type="text" class="form-control orderText" placeholder="Your choice text"></div>';
        newChoice += '<div class="col-sm-2 pull-right" style="padding-bottom:7px;"><input type="text" class="form-control orderNum" placeholder="#" title="The order number"></div>';
        newChoice += '</div>';
        this.ui.choices.append(newChoice);
    },

    getOutput: function (title) {
        return JST["pages/order"]({
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
        $('.choice').each(_.bind(function (index, el) {
            choices.push({
                orderNum: $('.orderNum', el).val(),
                title: $('.orderText', el).val()
            });
        }, this));

        return choices;
    },

    _buildCorrectAnswer: function () {
        var answer = "";
        var choices = this.getChoices();

        _.each(choices, function (choice) {
            answer += choice.orderNum;
        });

        return answer;
    }
});

module.exports = OrderView;
