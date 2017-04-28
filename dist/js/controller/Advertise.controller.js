sap.ui.define([
    "de/javue/etherbump/controller/BaseController",
    "sap/m/MessageToast",
    "de/javue/etherbump/model/WalletViewModelProvider",
    "de/javue/etherbump/model/ConfigurationViewModelProvider"
], function (BaseController, MessageToast, WalletViewModelProvider, ConfigurationViewModelProvider) {
    "use strict";

    return BaseController.extend("de.javue.etherbump.controller.Advertise", {
        onInit: function () {
            this.setModel(WalletViewModelProvider.getModel(), "wallet");
            this.setModel(ConfigurationViewModelProvider.getModel(), "configuration");
        },

        onSavePressed: function(oEvent) {
            var that = this,
                sFrom = this.getModel("wallet").getProperty("/MainAccount"),
                sJson = this.getView().byId("inpConfig").getValue();
            EtherBump.setMyConfiguration(sJson, {
                from: sFrom,
                value: 1000000000000000000,
                gasPrice: 20000000000,
                gas: 4712388
            }).then(function (value) {
                console.log(value);
                MessageToast.show(that.getModel("i18n").getProperty("TOAST_SAVED"));
            });
        },

        onRefreshPressed: function(oEvent) {
            ConfigurationViewModelProvider.refresh();
        }
    });
});