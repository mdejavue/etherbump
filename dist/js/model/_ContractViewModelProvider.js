sap.ui.define([
    "sap/ui/model/json/JSONModel"
], function (JSONModel) {
    var _oModel = null;
    var _initContractModel = function(){
        _oModel = new JSONModel({
            "ActiveBidders" : {},
        }).setDefaultBindingMode("OneWay");
        EtherBump.getActiveBidders().then(function(aBidders) {
            let aPromises = [];
            var aEntries = [];
            for (let i=0, len=aBidders.length; i < len; i++) {
                aPromises.push(EtherBump.getBid(aBidders[i]));
            }
            Promise.all(aPromises).then(function(aBids) {
                for (let i=0, len=aBids.length; i < len; i++) {
                    aEntries.push({
                        "Address": aBidders[i],
                        "Bid": aBids[i].toNumber()
                    });
                }                
                _oModel.setProperty("/ActiveBidders", aEntries);
            });
        });
        /*EtherBump.NewBid().then(function(event){
            var aEntries = _oModel.getProperty("/ActiveBidders");
            var oUpdatedEntry = {
                "Address": event.args._address, 
                "Bid": event.args._bid.toNumber()
            };
            for (let i=0, len=aEntries.length; i < len; i++) {
                if (aEntries[i]["Address"] === oUpdatedEntry["Address"]) {
                    _oModel.setProperty("/ActiveBidders/" + i, oUpdatedEntry);
                } else {
                    aEntries.push(oUpdatedEntry);
                    _oModel.firePropertyChange({ path: "/ActiveBidders", reason: "Change" });
                }
                break;
            }
        });*/
    };

    return {
        getModel: function() {
            if (!_oModel) {
                _initContractModel();
            }
            return _oModel;
        }
    };
},true);