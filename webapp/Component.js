sap.ui.define([
	"sap/ui/core/UIComponent",
	"sap/ui/Device",
	"EHSM-PORTALEHSM-PORTAL/model/models"
], function(UIComponent, Device, models) {
	"use strict";

	return UIComponent.extend("EHSM-PORTALEHSM-PORTAL.Component", {

		metadata: {
			manifest: "json"
		},

		/**
		 * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
		 * @public
		 * @override
		 */
		init: function() {
			// call the base component's init function
			UIComponent.prototype.init.apply(this, arguments);

			// set the device model
			this.setModel(models.createDeviceModel(), "device");
			this.getRouter().initialize();
			this.getMyChatbot();
		},
			getMyChatbot:function()
		{
			if(!document.getElementById("murali"))
		{ var oNew = document.createElement("script"); oNew.setAttribute("id", "murali");
		oNew.setAttribute("src", "https://cdn.cai.tools.sap/webchat/webchat.js");document.body.appendChild(oNew);
		oNew.setAttribute("channelId", "3d093296-c1ee-41e3-bf9c-991023b8f372");
		oNew.setAttribute("token", "7470792354e22995ee1f4bea673aae96");
		} 
			
		}
	});
});