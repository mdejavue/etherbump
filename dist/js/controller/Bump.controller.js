sap.ui.define([
    "de/javue/etherbump/controller/BaseController",
    "de/javue/etherbump/model/WalletViewModelProvider",
    "de/javue/etherbump/model/ContractViewModelProvider"
], function (BaseController, WalletViewModelProvider, ContractViewModelProvider) {
    "use strict";

    return BaseController.extend("de.javue.etherbump.controller.Bump", {
        onInit: function () {
            this.setModel(WalletViewModelProvider.getModel(), "wallet");
            this.setModel(ContractViewModelProvider.getModel(), "contract");
        },

        onBumpPressed: function (oEvent) {
            var sFrom = this.getModel("wallet").getProperty("/MainAccount"),
                sBumpAddress = this.getView().byId("inpAddress").getValue(),
                iAmount = this.getView().byId("inpAmount").getValue();
            EtherBump.bump(sBumpAddress, {
                from: sFrom,
                value: iAmount,
                gasPrice: 20000000000,
                gas: 4712388
            }).then(function (value) {
                console.log(value);
            });
        }
    });
});