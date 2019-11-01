sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/ValueColor"
], function (Controller, ValueColor) {
	"use strict";

	return Controller.extend("ui5codejam.icehouse.controller.SensorStatus", {
		onInit: function () {
			this._oRouter = this.getOwnerComponent().getRouter();
			this._oRouter.getRoute("RouteSensorStatus").attachMatched(this.onRouteMatched, this);

			this._oSensorModel = this.getOwnerComponent().getModel("sensors");
			this._oSensorModel.dataLoaded().then(function () {
				this._oThreshold = this._oSensorModel.getProperty("/threshold");
			}.bind(this));
		},
		onRouteMatched: function (oEvent) {
			this.getView().bindElement({
				path: "/sensors/" + oEvent.getParameter("arguments").index,
				model: "sensors"
			});
		},
		navToSensors: function () {
			this.getOwnerComponent().getRouter().navTo("RouteSensors");
		},

		formatValueColor: function (iTemperature) {
			if (iTemperature < this._oThreshold.warning) {
				return ValueColor.Neutral;
			} else if (iTemperature >= this._oThreshold.warning && iTemperature < this._oThreshold.error) {
				return ValueColor.Critical;
			} else {
				return ValueColor.Error;
			}
		}
	});
});