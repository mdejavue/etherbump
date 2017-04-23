sap.ui.define([
    "de/javue/etherbump/controller/BaseController",
    "sap/ui/model/json/JSONModel"
], function (BaseController, JSONModel) {
    "use strict";

    return BaseController.extend("de.javue.etherbump.controller.Object", {
        onInit: function () {
            console.log(EtherBump);
            this._initContractModel();
        },

        _initContractModel: function () {
            var oModel = new JSONModel();
            this.getView().setModel(oModel, "contract");
            setInterval(function () {
                EtherBump.getActiveBidders().then(function (value) {
                    oModel.setProperty("/ActiveBidders", value);
                });
            }, 2000);
        },

        onBumpPressed: function (oEvent) {
            /*EtherBump.decay().then(function(value) {
                debugger;
            });*/

            
            var sAddress = this.getView().byId("inpAddress").getValue();
            var fAmount = this.getView().byId("inpAmount").getValue();
            EtherBump.bump("0xf6d18feb5064840b136afc14af20c54e7faf6dbd", {
                from: "0xf6d18feb5064840b136afc14af20c54e7faf6dbd",
                value: 1000000000000000000,
                gasPrice: 20000000000,
                gas: 4712388
            }).then(function (value) {
                console.log(value);
            });
        }
    });
});