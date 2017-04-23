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
            var contractInterval = setInterval(function() {
                if (window.EtherBump) {
                    clearInterval(contractInterval);
                    that.getRouter().initialize();
                    that.createAccountModel();
                }
            },100);
        },

        createAccountModel: function() {
            var oModel = new JSONModel({
                "account" : null
            });
            this.setModel(oModel, "account");
            var accountInterval = setInterval(function() {
            if (web3.eth.accounts[0] !== oModel.getProperty("/account")) {
                oModel.setProperty("/account", web3.eth.accounts[0]);
            }
            }, 300);
        }
    });
});