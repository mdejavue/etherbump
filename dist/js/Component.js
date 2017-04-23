sap.ui.define([
   "sap/ui/core/UIComponent",
   "sap/ui/model/json/JSONModel",
   "sap/ui/model/resource/ResourceModel"
], function (UIComponent, JSONModel, ResourceModel) {
    "use strict";
    return UIComponent.extend("de.javue.etherbump.Component", {
        metadata : {
            manifest: "json"
        },

        init: function() {
            // wait for embark to register contract
            UIComponent.prototype.init.apply(this, arguments);
            var that = this;
            var loadContract = setInterval(function() {
                if (window.EtherBump) {
                    clearInterval(loadContract);
                    that.getRouter().initialize();
                }
            },100);
        }
    });
});