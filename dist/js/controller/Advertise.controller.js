sap.ui.define([
    "de/javue/etherbump/controller/BaseController",
    "de/javue/etherbump/model/WalletViewModelProvider"
], function (BaseController, WalletViewModelProvider) {
    "use strict";

    return BaseController.extend("de.javue.etherbump.controller.Advertise", {
        onInit: function () {
            this.setModel(WalletViewModelProvider.getModel(), "wallet");
        }
    });
});