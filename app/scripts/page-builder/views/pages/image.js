"use strict";

var Marionette = require('backbone.marionette');

var ImageView = Marionette.ItemView.extend({
    template: JST["pages/image-opts"],

    ui: {
        imagePosition: "input[name='imagePosition']",
        description: "#description",
        imagePath: "#imagePath",
        altText: "#altText"
    },

    _getSelectedImagePosition: function () {
        return $('input[name="imagePosition"]:checked').val();
    },

    getOutput: function (title) {
        return JST["pages/image"]({
            title: title,
            description: this.ui.description.val(),
            imagePath: this.ui.imagePath.val(),
            altText: this.ui.altText.val(),
            leftPosition: this._getSelectedImagePosition() === "left",
        });
    }
});

module.exports = ImageView;
