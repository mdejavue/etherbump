sap.ui.define([
    "de/javue/etherbump/controller/BaseController"
], function (BaseController) {
    "use strict";

    return BaseController.extend("de.javue.etherbump.controller.App", {
        onInit: function(oEvent) {
            this.byId("idApp").attachDetailNavigate(function(oEvent) {
                oEvent.getSource().hideMaster();
            });
        }
    });
});