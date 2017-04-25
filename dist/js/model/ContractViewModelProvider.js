sap.ui.define([
    "sap/ui/model/json/JSONModel"
], function (JSONModel) {
    var _oModel = null;
    var _initContractModel = function(){
        _oModel = new JSONModel({
            "ActiveBidders" : {},
        });
        var mEntries = {};
        EtherBump.getActiveBidders().then(function(aBidders) {
            let aPromises = [];
            for (let i=0, len=aBidders.length; i < len; i++) {
                aPromises.push(EtherBump.getBid(aBidders[i]));
            }
            Promise.all(aPromises).then(function(aBids) {
                for (let i=0, len=aBids.length; i < len; i++) {
                    mEntries[aBidders[i]] = {
                        "Address": aBidders[i],
                        "Bid": aBids[i].toNumber()
                    };
                }
                _oModel.setProperty("/ActiveBidders", mEntries);
            });
        });
        EtherBump.NewBid().then(function(event){
            _oModel.setProperty("/ActiveBidders/" + event.args._from, {
                "Address": event.args._from, 
                "Bid": event.args._bid.toNumber()
            });
        });
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