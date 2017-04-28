sap.ui.define([
    "de/javue/etherbump/controller/BaseController"
], function (BaseController) {
    "use strict";

    return BaseController.extend("de.javue.etherbump.controller.Master", {
        menuNavTo: function(oEvent) {
            var sNavTarget = oEvent.getSource().data("navTarget");
            this.getRouter().navTo(sNavTarget);
        }
    });
});