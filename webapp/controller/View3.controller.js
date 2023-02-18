sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/Dialog",
	"sap/m/Button",
	"sap/ui/core/IconPool",
	"sap/ui/model/json/JSONModel"

], function(Controller, Dialog, IconPool, Button, JSONModel, BindingMode) {
	"use strict";
	var sUrl;
	var oModel;
	var sysid;
	var Json;
	var data;
    
	return Controller.extend("EHSM-PORTALEHSM-PORTAL.controller.View3", {
		
		onInit:function()
		{
			    
		this.getView().byId('spinner').setVisible(false);
		
		},

		OnSubmit: function() {
			sUrl = "/sap/opu/odata/sap/Z_EHSM_ODATA_MURALI_SRV";
			oModel = new sap.ui.model.odata.ODataModel(sUrl, true);
			var recnum = this.getView().byId('recnum').getValue();
			if (recnum === "") {
				this.getView().byId('recnum').setValueState('Error');
				sap.m.MessageToast.show('Please fill Record Number');
				return;
			} else {
				this.getView().byId('recnum').setValueState();
				this.getView().byId('spinner').setVisible(true);
			}
		
			var fil = this.getView().byId('fil').getValue();
            
			oModel.read("/ZODATA_EHSM_RISK_MDSet?$filter=IRecordNumber eq '" + recnum + "'&$format=json", {
				context: null,
				urlParameters: null,
				async: false,
				success: function(oData, oResponse) {
					if(oData)
					{
							this.getView().byId('spinner').setVisible(false);
					}
					sysid = oData.Sysid;
					var filtered = {
						"results": []
					};
					this.data = oData;
					if (fil) {
						for (var i in this.data["results"]) {
							if (this.data["results"][i]["Evdat"]) {
								if ((this.data["results"][i]["Evdat"].toString()).includes(fil.toString())) {
									filtered["results"].push(this.data["results"][i]);
								}
							}
						}

						var JModel = new JSONModel(filtered);
						this.getView().setModel(JModel, "risk");
					} else {
						JModel = new JSONModel(oData);
						this.getView().setModel(JModel, "risk");
					}

				}.bind(this),
				error: function(oData, oResponse) {
					sap.m.MessageToast.show("ERROR OCCURED!Please try again");
				}

			});
		},



		Onpopup: function() {

			var oDialog = new sap.m.Dialog({
				title: "Search Help",
				content: new sap.m.Text({
					text: "This is Field to Filter data by Month or Year wise.Please Enter Filter Accordingly!"
				}),
				beginButton: new sap.m.Button({
					text: "Close",
					press: function() {
						oDialog.close();
					}
				})
			});
			oDialog.open();
		}
	});
});