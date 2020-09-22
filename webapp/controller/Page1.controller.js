var ci_attach1, base64_marker, baseval = [],
	ci_obj1, ci_att1 = [];

var sRow, tabellen;

sap.ui.define(["sap/ui/core/mvc/Controller",
		"sap/ui/model/odata/ODataModel",
		"sap/ui/model/json/JSONModel",
		"sap/m/UploadCollectionParameter",
		"sap/m/MessageBox",
		"sap/m/MessageToast",
		"./Dialog1",
		"./utilities",
		"sap/ui/core/routing/History"
	], function (BaseController, ODataModel, JSONModel, UploadCollectionParameter, MessageBox, MessageToast, Dialog1, Utilities, History) {
		"use strict";

		return BaseController.extend("com.sap.build.ba293bd41-us_1.grGrunt.controller.Page1", {
			handleRouteMatched: function (oEvent) {
				/*handle*/
					var designation = window.location.origin;
			if(designation === "https://flpnwc-ba293bd41.dispatcher.us1.hana.ondemand.com"){
				this.getView().byId("Dashboard").setVisible(true);
			}
			else{
				this.getView().byId("Dashboard").setVisible(false);
			}
				
				this.ci_att1 = [];

				this.itemNo = 10;
				this.dataModel = new JSONModel({
					"itemtable": [{
						"Empty1": this.itemNo,
						"Empty2": "",
						"Empty3": "",
						"Empty4": "",
						"Empty5": "",
						"Empty6": "",
						"Empty7": ""

					}]
				});
				this.getView().setModel(this.dataModel, "dataModel");

				this.movementTypeF4();
			},
			onBack: function () {
				window.location.replace(
					"https://dashboarddesigngrunt-ba293bd41.dispatcher.us1.hana.ondemand.com/index.html?hc_reset#/PM"
				);

			},
			
			itemAddRow3: function () {
				var tableother = this.getView().getModel("dataModel").getProperty("/itemtable");
				var tableid = this.getView().byId("tab3");
				var rowlen = tableid.getItems().length;

				for (var i = 0; i < rowlen; i++) {
					this.itemadtab = tableid.getItems()[i];
					this.itemadr = this.itemadtab.getCells()[0].getValue();

					this.incre = parseInt(this.itemadr) + parseInt(this.itemNo);

				}

				var row = {
					"Empty1": this.incre,
					"Empty2": "",
					"Empty3": "",
					"Empty4": "",
					"Empty5": "",
					"Empty6": "",
					"Empty7": ""
				};
				tableother.push(row);
				this.dataModel.refresh();
			},
			deleteTab: function (oEvent) {
				var index = oEvent.getSource().getParent().getBindingContext("dataModel").sPath.split("/")[2];
				var table = this.getView().getModel("dataModel").getProperty("/itemtable");
				table.splice(index, 1);
				this.dataModel.refresh();
			},
			movementTypeF4: function () {
				var that = this;
				var sPath = "/MovementTypeF4HelpSet";
				var oModel = new ODataModel('/sap/opu/odata/sap/ZMM_GOODS_ISSUE_SRV', true);
				oModel.read(sPath, {
					success: function (oData, oResponse) {
						var count = oData.results.length;
						var oModelj = new sap.ui.model.json.JSONModel();
						oModelj.setSizeLimit(340);
						oModelj.setData(oData);
						var plantf4 = that.getView().byId("movTyp");
						plantf4.setModel(oModelj);
						var oItems = new sap.ui.core.ListItem({
							key: "{MovType}",
							text: "{MovType}-{MovText}"
						});
						plantf4.bindAggregation("items", {
							path: "/results",
							template: oItems
						});
					}
				});
			},

			plantF4Set: function () {
				var that = this;
				var sPath = "/PlantF4Set";
				var oModel = new ODataModel('/sap/opu/odata/sap/ZPRJ_PO_MIGO_SRV', true);
				oModel.read(sPath, {
					success: function (oData, oResponse) {
						var count = oData.results.length;
						var oModelj = new sap.ui.model.json.JSONModel();
						oModelj.setSizeLimit(300);
						oModelj.setData(oData);
						var plantf4 = sap.ui.core.Fragment.byId("ValueHelpfragment", "main");
						plantf4.setModel(oModelj);
						var oItems = new sap.ui.core.ListItem({
							key: "{Werks}",
							text: "{Werks}-{Name1}"
						});
						plantf4.bindAggregation("items", {
							path: "/results",
							template: oItems
						});
					}
				});
			},
			plantF4Set1: function () {
				var that = this;
				var sPath = "/PlantF4Set";
				var oModel = new ODataModel('/sap/opu/odata/sap/ZPRJ_PO_MIGO_SRV', true);
				oModel.read(sPath, {
					success: function (oData, oResponse) {
						var count = oData.results.length;
						var oModelj = new sap.ui.model.json.JSONModel();
						oModelj.setSizeLimit(300);
						oModelj.setData(oData);
						var plantf4 = sap.ui.core.Fragment.byId("valuefragment", "plantFrag");
						plantf4.setModel(oModelj);
						var oItems = new sap.ui.core.ListItem({
							key: "{Werks}",
							text: "{Werks}-{Name1}"
						});
						plantf4.bindAggregation("items", {
							path: "/results",
							template: oItems
						});
					}
				});
			},
			costcenterF4: function () {
				
				var that = this;
				var sPath = "/CostCenterF4HelpSet";
				var oModel = new ODataModel('/sap/opu/odata/sap/ZMM_GOODS_ISSUE_SRV', true);
				oModel.read(sPath, {
					success: function (oData, oResponse) {
						
						var oModelj = new sap.ui.model.json.JSONModel();
						oModelj.setSizeLimit(1000);
						oModelj.setData(oData);
						var costf4 = that.getView().byId("costtocenter");
						costf4.setModel(oModelj);
						var oItems = new sap.ui.core.ListItem({
							key: "{CostCenter}",
							text: "{CostCenter}-{CostCenterDesc}"
						});
						costf4.bindAggregation("items", {
							path: "/results",
							template: oItems
						});
					}
				});
			},
			cellclick: function (oEvent) {

				var that = this;
				var oBindingContext = oEvent.getParameter("listItem").getBindingContext();

				var ind = oBindingContext.getPath();
				var valueind = ind.split("/");
				var index = valueind[2];

				var pressTable = that.getView().byId("tab1");
				var pressTableLength = pressTable.getItems().length;
				that.indexRow = Number(index);

				for (var indi = 0; indi < pressTableLength; indi++) {

					if (indi === that.indexRow) {
						that.rowItem = pressTable.getItems()[indi].getCells()[1].getValue();

						that.getView().byId("matNum").setValue(that.rowItem);
						that.rowmatdes = pressTable.getItems()[indi].getCells()[2].getValue();
						that.getView().byId("desc").setValue(that.rowmatdes);

					} else {

					}
				}

			},
			cellclick1: function (oEvent) {

				var that = this;
				var oBindingContext = oEvent.getParameter("listItem").getBindingContext();

				var ind = oBindingContext.getPath();
				var valueind = ind.split("/");
				var index = valueind[2];

				var pressTable = that.getView().byId("tab2");
				var pressTableLength = pressTable.getItems().length;

				that.indexRow = Number(index);

				for (var indi = 0; indi < pressTableLength; indi++) {

					if (indi === that.indexRow) {
						that.rowItem = pressTable.getItems()[indi].getCells()[1].getValue();
						that.rowItems = pressTable.getItems()[indi].getCells()[5].getValue();
						that.rowItemse = pressTable.getItems()[indi].getCells()[6].getValue();
						that.rowItemsm = pressTable.getItems()[indi].getCells()[7].getValue();
						that.rowItemsi = pressTable.getItems()[indi].getCells()[8].getValue();
						that.rowItemsk = pressTable.getItems()[indi].getCells()[9].getValue();

						that.getView().byId("matNum").setValue(that.rowItem);
						that.getView().byId("desc").setValue(that.rowItems);
						that.getView().byId("matGrp1").setValue(that.rowItemse);
						that.getView().byId("plte").setValue(that.rowItemsm);
						that.getView().byId("order").setValue(that.rowItemsi);
						that.getView().byId("area").setValue(that.rowItemsk);

					} else {

					}
				}

			},
			checking: function () {
				var storemp = this.getView().byId("storLoc").getValue();
				var table1 = this.getView().byId("tab1");
				var rowlen = table1.getItems().length;
				for (var i = 0; i < rowlen; i++) {
					this.valid = table1.getItems()[i].getCells()[7].getSelected();
					this.require = table1.getItems()[i].getCells()[5].getValue();
				}
				if (this.valid === false) {
					sap.m.MessageBox.error("You have not flagged any items as OK", {
						icon: sap.m.MessageBox.Icon.ERROR,
						title: "Error",
						actions: [sap.m.MessageBox.Action.OK],

						onClose: function (oAction) {

							if (oAction == "OK") {

							}
						}.bind(this)
					});

				}else if (this.recqty === undefined || this.recqty === null || this.recqty === "") {
					
					jQuery.sap.require("sap.m.MessageBox");
					sap.m.MessageBox.alert("Enter Received Quantity", {
						icon: sap.m.MessageBox.Icon.ERROR,
						title: "Error",
						onClose: null
					});
				}
				else {
					this.itemcheck();
				}

			},

			itemcheck: function (oEvent) {

				var that = this;

				that.arrayOfPOItems = [];

				var valuestrom = oEvent.getSource().getParent().getBindingContext().getPath();
				var valueind = valuestrom.split("/");
				var indexz = valueind[2];

				console.log(indexz);

				var table2 = that.getView().byId("tab1");
				var count1 = table2.getItems().length;

				/*	this.opsz1 = table2.getItems()[i].getCells()[0].getValue();
					this.opsz2 = table2.getItems()[i].getCells()[1].getValue();
					this.opsz3 = table2.getItems()[i].getCells()[2].getValue();
					var opsz4 = table2.getItems()[i].getCells()[3].getValue();
					var opsz5 = table2.getItems()[i].getCells()[4].getValue();
					var opsz6 = table2.getItems()[i].getCells()[5].getValue();
					var opsz7 = table2.getItems()[i].getCells()[6].getValue();

					var grobj = {
						Item: this.opsz1,
						Material: this.opsz2,
						matdesc: this.opsz3,
						uom: opsz4,
						ordQty: opsz5,
						RecQty: opsz6,
						opeQty: opsz7

					};

					that.arrayOfPOItems.push(grobj);
					console.log("checkclick", that.arrayOfPOItems);
*/

				//debugger;

			},

			checkother: function () {
				var cost = this.getView().byId("costtocenter").getValue();
				if (cost === undefined || cost === null || cost === "") {
					sap.m.MessageBox.error("Select Cost Center", {
						icon: sap.m.MessageBox.Icon.ERROR,
						title: "Error",
						actions: [sap.m.MessageBox.Action.OK],

						onClose: function (oAction) {

							if (oAction == "OK") {

							}
						}.bind(this)
					});
				} else {
					sap.m.MessageBox.confirm("Document is OK", {
						icon: sap.m.MessageBox.Icon.SUCCESS,
						title: "Successs",
						actions: [sap.m.MessageBox.Action.OK],

						onClose: function (oAction) {

							if (oAction == "OK") {

							}
						}.bind(this)
					});
				}
			},
			checkreservation: function () {
				var strolo = this.getView().byId("strfloc").getValue();
				if (strolo === undefined || strolo === null || strolo === "") {
					sap.m.MessageBox.error("Select Storage Location", {
						icon: sap.m.MessageBox.Icon.ERROR,
						title: "Error",
						actions: [sap.m.MessageBox.Action.OK],

						onClose: function (oAction) {

							if (oAction == "OK") {

							}
						}.bind(this)
					});
				} else {
					sap.m.MessageBox.confirm("Document is OK", {
						icon: sap.m.MessageBox.Icon.SUCCESS,
						title: "Successs",
						actions: [sap.m.MessageBox.Action.OK],

						onClose: function (oAction) {

							if (oAction == "OK") {

							}
						}.bind(this)
					});
				}
			},

			plant: function () {
				this.getView().getModel("oGlobalModel").setProperty("/setBusy",true);
				var array = [];
				var that = this;
				var planttable = sap.ui.core.Fragment.byId("ValueHelpfragment", "technical_detail");
				planttable.setVisible(true);
				var plantdesc = sap.ui.core.Fragment.byId("ValueHelpfragment", "main").getValue();

				var description = plantdesc.split("-");
				that.plandescrip = description[1];

				that.plantchange = sap.ui.core.Fragment.byId("ValueHelpfragment", "main").getSelectedKey();
				var sPath = "/PONumberSet?$filter=ImWerks eq '" + that.plantchange + "' and ImLgort eq ' '";
				var oModel = new ODataModel('/sap/opu/odata/sap/ZPRJ_PO_MIGO_SRV', true);

				oModel.read(sPath, {
					success: function (oData, oResponse) {
						that.getView().getModel("oGlobalModel").setProperty("/setBusy",false);
						var count = oData.results.length;
						for (var i = 0; i < count; i++) {
							var ponumber = oData.results[i].Ebeln;
							var plant = oData.results[i].Werks;

							var obj = {
								Ponumber: ponumber,
								Plant: plant
							};
							array.push(obj);
							var oModelccd = new sap.ui.model.json.JSONModel({
								listdata: array
							});
							planttable.setModel(oModelccd);
						}
						var titems1 = new sap.m.ColumnListItem({
							cells: [new sap.m.Text({
									text: "{Ponumber}" //"{itemkey}"
								}),
								new sap.m.Text({
									text: "{Plant}",
									visible: false //"{itemkey}"
								})

							]
						});

						planttable.bindItems("/listdata", titems1);

					}
				});

			},
			plantSelChangeFrag: function () {

				var arrayofPlant = [];
				var that = this;
				//that.busydia();
				var planttable = sap.ui.core.Fragment.byId("valuefragment", "fragTable");
				planttable.setVisible(true);

				that.plantchanging = sap.ui.core.Fragment.byId("valuefragment", "plantFrag").getSelectedKey();
				var sPath = "/MaterialF4Set?$filter=Plant eq '" + that.plantchanging + "'";
				var oModel = new ODataModel('/sap/opu/odata/sap/ZPM_WORKORDER_SRV_01', true);

				oModel.read(sPath, {
					success: function (oData, oResponse) {
						var count = oData.results.length;
						for (var i = 0; i < count; i++) {
							var material = oData.results[i].Material;
							var descrip = oData.results[i].Description;
							var uom = oData.results[i].UoM;
							var plant = oData.results[i].Plant;

							var obj = {
								Material: material,
								Descrip: descrip,
								Uom: uom,
								Plant: plant
							};
							arrayofPlant.push(obj);
							var oModelccd = new sap.ui.model.json.JSONModel({
								listdata: arrayofPlant
							});
							planttable.setModel(oModelccd);
						}
						var titems1 = new sap.m.ColumnListItem({
							cells: [new sap.m.Text({
									text: "{Material}" //"{itemkey}"
								}),
								new sap.m.Text({
									text: "{Descrip}" //"{itemkey}"
								}),
								new sap.m.Text({
									text: "{Uom}" //"{itemkey}"
								}),
								new sap.m.Text({
									text: "{Plant}",
									visible: false //"{itemkey}"
								})

							]
						});

						planttable.bindItems("/listdata", titems1);

					}
				});

			},
			materialTypChange: function () {

				//	this.getView().getModel("dataSource").setProperty("/delay", true);

				var array1 = [];
				var vendortable = sap.ui.core.Fragment.byId("valuefragment", "fragTable");
				vendortable.setVisible(true);
				var venchange = sap.ui.core.Fragment.byId("valuefragment", "typefrag")._getSelectedItemText();
				var vend = venchange.split("-");
				var vendin = vend[0];
				var sPath = "/MaterialSet?$filter=MaterialType eq '" + vendin + "'";
				var oModel = new ODataModel('/sap/opu/odata/sap/ZPM_F4_SRV', true);

				oModel.read(sPath, {
					success: function (oData, oResponse) {

						//	this.getView().getModel("dataSource").setProperty("/delay", false);
						var count = oData.results.length;
						for (var i = 0; i < count; i++) {
							var ponumber = oData.results[i].MaterialNumber;
							var plant = oData.results[i].MaterialNumberDes;
							var uom = oData.results[i].UOM;
							var plt = oData.results[i].Plant;

							var plt = oData.results[i].Plant;

							var obj = {
								Ponumber: ponumber,
								Plant: plant,
								Uom: uom,
								Plt: plt,

							};
							array1.push(obj);
							var oModelccd = new sap.ui.model.json.JSONModel({
								listdata: array1
							});
							vendortable.setModel(oModelccd);
						}
						var titems1 = new sap.m.ColumnListItem({
							cells: [new sap.m.Text({
									text: "{Ponumber}" //"{itemkey}"
								}),
								new sap.m.Text({
									text: "{Plant}" //"{itemkey}"
								}),

								new sap.m.Text({
									text: "{Uom}" //"{itemkey}"
								}),
								new sap.m.Text({
									text: "{Plt}" //"{itemkey}"
								}),

							]
						});

						vendortable.bindItems("/listdata", titems1);

					}.bind(this)
				});

			},
				descChange: function (oEvent) {

				var t1 = sap.ui.core.Fragment.byId("valuefragment", "fragTable");
				t1.setVisible(true);

			//	this.getView().getModel("dataSource").setProperty("/delay", true);

				var array2 = [];
				var vendortable2 = sap.ui.core.Fragment.byId("valuefragment", "fragTable");
				var venchange2 = sap.ui.core.Fragment.byId("valuefragment", "descfrag")._getSelectedItemText();
				var vend2 = venchange2.split("-");
				var vendin2 = vend2[0];
				var sPath = "/MaterialSet?$filter=MaterialNumber eq '" + vendin2 + "'";
				var oModel = new ODataModel('/sap/opu/odata/sap/ZPM_F4_SRV', true);

				oModel.read(sPath, {
					success: function (oData, oResponse) {

						this.getView().getModel("dataSource").setProperty("/delay", false);
						var count = oData.results.length;
						for (var i = 0; i < count; i++) {
							var ponumber = oData.results[i].MaterialNumber;
							var plant = oData.results[i].MaterialNumberDes;
							var uom = oData.results[i].UOM;
							var plt = oData.results[i].Plant;
							

							var obj = {
								Ponumber: ponumber,
								Plant: plant,
								Uom: uom,
								Plt: plt
								
							};
							array2.push(obj);
							var oModelccd = new sap.ui.model.json.JSONModel({
								listdata: array2
							});
							vendortable2.setModel(oModelccd);
						}
						var titems1 = new sap.m.ColumnListItem({
							cells: [new sap.m.Text({
									text: "{Ponumber}" //"{itemkey}"
								}),
								new sap.m.Text({
									text: "{Plant}" //"{itemkey}"
								}),
								new sap.m.Text({
									text: "{Uom}" //"{itemkey}"
								}),
								new sap.m.Text({
									text: "{Plt}" //"{itemkey}"
								})

							]
						});

						vendortable2.bindItems("/listdata", titems1);

					}.bind(this)
				});

			},
			onClearFilter: function (oEvent) {
				sap.ui.core.Fragment.byId("valuefragment", "plantFrag").setValue("");
				sap.ui.core.Fragment.byId("valuefragment", "fragTable").destroyItems();
				this.plantF4Set1();

			},
			onCancelButton: function (oEvent) {
				sap.ui.core.Fragment.byId("valuefragment", "plantFrag").setValue("");
				sap.ui.core.Fragment.byId("valuefragment", "fragTable").destroyItems();
				this.value.close();
			},

			// itemSeries: function () {

			// 	var that = this;
			// 	var itemCombo = that.getView().byId("itemplus");
			// 	var itemTab1 = that.getView().byId("tab3");
			// 	var rowlen = itemTab1.getItems().length;
			// 	var itemNo;

			// 	if (rowlen === 0) {
			// 		itemNo = rowlen + 10;
			// 		itemNo = "" + itemNo + "";
			// 		itemNo = itemNo.padStart(4, '0');

			// 		itemCombo.setValue(itemNo);

			// 	} else {
			// 		var rowlength = rowlen + "0";
			// 		var rowMinus = rowlen - 1;

			// 		var itArr = [];
			// 		// for (var i = 0; i < rowlen; i++) {
			// 		var itemFragNum = itemTab1.getItems()[rowMinus].getCells()[0].getValue();
			// 		var operation11 = Number(itemFragNum);
			// 		that.itemFrag = operation11 + 10;
			// 		that.itemFragNum = "" + that.itemFrag + "";
			// 		itemNo = that.itemFragNum.padStart(4, '0');

			// 		itemCombo.setValue(itemNo);

			// 	}

			// },

			tech_change: function () {
				this.getView().getModel("oGlobalModel").setProperty("/setBusy",true);
				var array1 = [];
				var purorgtable = sap.ui.core.Fragment.byId("ValueHelpfragment", "technical_detail");
				purorgtable.setVisible(true);
				var purorgchange = sap.ui.core.Fragment.byId("ValueHelpfragment", "functech").getSelectedKey();
				var sPath = "/POListbyPorgSet?$filter=ImEkorg eq '" + purorgchange + "'";
				var oModel = new ODataModel('/sap/opu/odata/sap/ZPRJ_PO_MIGO_SRV', true);
				

				oModel.read(sPath, {
					success: function (oData, oResponse) {
						this.getView().getModel("oGlobalModel").setProperty("/setBusy",false);
						var count = oData.results.length;
						for (var i = 0; i < count; i++) {
							var ponumber = oData.results[i].Ebeln;
							var plant = oData.results[i].Werks;

							var obj = {
								Ponumber: ponumber,
								Plant: plant
							};
							array1.push(obj);
							var oModelccd = new sap.ui.model.json.JSONModel({
								listdata: array1
							});
							purorgtable.setModel(oModelccd);
						}
						var titems1 = new sap.m.ColumnListItem({
							cells: [new sap.m.Text({
									text: "{Ponumber}" //"{itemkey}"
								}),
								new sap.m.Text({
									text: "{Plant}",
									visible: false //"{itemkey}"
								})

							]
						});

						purorgtable.bindItems("/listdata", titems1);

					}.bind(this)
				});
			},
			equichange: function () {
				this.getView().getModel("oGlobalModel").setProperty("/setBusy",true);
				var array1 = [];
				var vendortable = sap.ui.core.Fragment.byId("ValueHelpfragment", "technical_detail");
				vendortable.setVisible(true);
				var venchange = sap.ui.core.Fragment.byId("ValueHelpfragment", "vendor").getSelectedKey();
				var sPath = "/POListbyVendorSet?$filter=ImLifnr eq '" + venchange + "'";
				var oModel = new ODataModel('/sap/opu/odata/sap/ZPRJ_PO_MIGO_SRV', true);

				oModel.read(sPath, {
					success: function (oData, oResponse) {
						this.getView().getModel("oGlobalModel").setProperty("/setBusy",false);
						var count = oData.results.length;
						for (var i = 0; i < count; i++) {
							var ponumber = oData.results[i].Ebeln;
							var plant = oData.results[i].Werks;

							var obj = {
								Ponumber: ponumber,
								Plant: plant
							};
							array1.push(obj);
							var oModelccd = new sap.ui.model.json.JSONModel({
								listdata: array1
							});
							vendortable.setModel(oModelccd);
						}
						var titems1 = new sap.m.ColumnListItem({
							cells: [new sap.m.Text({
									text: "{Ponumber}" //"{itemkey}"
								}),
								new sap.m.Text({
									text: "{Plant}",
									visible: false //"{itemkey}"
								})

							]
						});

						vendortable.bindItems("/listdata", titems1);

					}.bind(this)
				});
			},
			purOrgF4Set: function () {
				var that = this;
				var sPath = "/PurchasingOrgF4Set";
				var oModel = new ODataModel('/sap/opu/odata/sap/ZPRJ_PO_MIGO_SRV', true);
				oModel.read(sPath, {
					success: function (oData, oResponse) {
						var count = oData.results.length;
						var oModelj = new sap.ui.model.json.JSONModel();
						oModelj.setSizeLimit(150);
						oModelj.setData(oData);
						var purorgf4 = sap.ui.core.Fragment.byId("ValueHelpfragment", "functech");
						purorgf4.setModel(oModelj);
						var oItems = new sap.ui.core.ListItem({
							key: "{Ekorg}",
							text: "{Ekorg}-{Ekotx}"
						});
						purorgf4.bindAggregation("items", {
							path: "/results",
							template: oItems
						});
					}
				});
			},
			vendorF4Set: function () {
				var that = this;
				var sPath = "/VendorF4Set";
				var oModel = new ODataModel('/sap/opu/odata/sap/ZPRJ_PO_MIGO_SRV', true);
				oModel.read(sPath, {
					success: function (oData, oResponse) {
						var count = oData.results.length;
						var oModelj = new sap.ui.model.json.JSONModel();
						oModelj.setSizeLimit(2450);
						oModelj.setData(oData);
						var purorgf4 = sap.ui.core.Fragment.byId("ValueHelpfragment", "vendor");
						purorgf4.setModel(oModelj);
						var oItems = new sap.ui.core.ListItem({
							key: "{Lifnr}",
							text: "{Lifnr}-{Name1}"
						});
						purorgf4.bindAggregation("items", {
							path: "/results",
							template: oItems
						});
					}
				});
			},
			planSelect: function () {

				var change = this.getView().byId("idSelectPlan").getSelectedKey();
				if (change === "Goods Receipt") {
					this.getView().byId("idselecCategory").setSelectedKey("Purchase Order");

					this.getView().byId("inp").setValue("");
					this.getView().byId("inp").setVisible(true);
					this.getView().byId("inp1").setVisible(false);
					this.getView().byId("goodsissueCat").setVisible(false);
					this.getView().byId("idselecCategory").setVisible(true);
					this.getView().byId("movTyp").setValue("101-GR goods receipt");
					this.getView().byId("form2").setVisible(false);
					this.getView().byId("form1").setVisible(true);
					this.getView().byId("form3").setVisible(true);
					this.getView().byId("form4").setVisible(false);
					this.getView().byId("form5").setVisible(true);
					this.getView().byId("form6").setVisible(true);
					this.getView().byId("tab2").setVisible(false);
					this.getView().byId("tab1").setVisible(true);
					this.getView().byId("tab3").setVisible(false);
					this.getView().byId("ordno").setVisible(false);
					this.getView().byId("busarea").setVisible(false);
					this.getView().byId("matno").setVisible(true);
					this.getView().byId("matgrp").setVisible(true);
					this.getView().byId("strloc").setVisible(true);
					this.getView().byId("descr").setVisible(true);
					this.getView().byId("stktyp").setVisible(true);
					this.getView().byId("glacc").setVisible(false);
					this.getView().byId("costcenter").setVisible(false);
					this.getView().byId("plt").setVisible(false);
					this.getView().byId("str2").setVisible(false);
					this.getView().byId("objp").setObjectTitle("GR");
					this.getView().byId("ci_fileUploader1").setEnabled(true);
					this.getView().byId("btn").setVisible(true);
					this.getView().byId("btn1").setVisible(false);
					this.getView().byId("btn2").setVisible(false);
					var table1 = this.getView().byId("tab1");
					table1.destroyItems();
					this.getView().byId("venInp").setValue("");
					this.getView().byId("pltInp").setValue("");
					this.getView().byId("matNum").setValue("");
					this.getView().byId("matGrp1").setValue("");
					this.getView().byId("storLoc").setValue("");
					this.getView().byId("desc").setValue("");
					this.getView().byId("stockType").setValue("");
					this.getView().byId("docdate").setValue("");
					this.getView().byId("checkgr").setVisible(true);
					this.getView().byId("chkotr").setVisible(false);
					this.getView().byId("chkres").setVisible(false);

				} else if (change === "Goods Issue") {

					this.getView().byId("goodsissueCat").setSelectedKey("Other");
					this.getView().byId("descr").setVisible(false);
					this.getView().byId("stktyp").setVisible(false);
					this.getView().byId("busarea").setVisible(true);
					this.getView().byId("glacc").setVisible(true);
					this.getView().byId("costcenter").setVisible(true);
					this.getView().byId("matno").setVisible(false);
					this.getView().byId("matgrp").setVisible(false);
					this.getView().byId("strloc").setVisible(false);
					this.getView().byId("ordno").setVisible(false);
					this.getView().byId("plt").setVisible(false);
					this.getView().byId("str2").setVisible(false);

					this.getView().byId("inp").setValue("");
					this.getView().byId("inp").setVisible(false);
					this.getView().byId("goodsissueCat").setVisible(true);
					this.getView().byId("idselecCategory").setVisible(false);
					this.getView().byId("movTyp").setValue("201-GI for cost center");
					this.getView().byId("form2").setVisible(true);
					this.getView().byId("form1").setVisible(false);
					this.getView().byId("form3").setVisible(false);
					this.getView().byId("form4").setVisible(true);
					this.getView().byId("form5").setVisible(false);
					this.getView().byId("form6").setVisible(false);
					this.getView().byId("tab3").setVisible(true);
					this.getView().byId("tab2").setVisible(false);
					this.getView().byId("tab1").setVisible(false);
					this.getView().byId("objp").setObjectTitle("GI");
					this.getView().byId("ci_fileUploader1").setEnabled(true);
					this.getView().byId("btn").setVisible(false);
					this.getView().byId("btn1").setVisible(true);
					this.getView().byId("btn2").setVisible(false);
					this.getView().byId("matNum").setValue("");
					this.getView().byId("matGrp1").setValue("");
					this.getView().byId("storLoc").setValue("");
					this.getView().byId("desc").setValue("");
					
					this.costcenterF4();

				}
			},
			getDetail: function () {
				var that = this;
				that.input = that.getView().byId("inp").getValue();
				var sPath = "/PoHeaderDetailsGoodsSet?$filter=Purchaseorder eq '" + that.input + "'";
				var oModel = new ODataModel('/sap/opu/odata/sap/ZPRJ_PO_MIGO_SRV', true);
				oModel.read(sPath, {
					success: function (oData, oResponse) {
						var count = oData.results.length;
						that.getView().byId("venInp").setValue(oData.results[0].Vendor + " " + oData.results[0].Vendor_name);
						that.getView().byId("pltInp").setValue(oData.results[0].Plant + " " + oData.results[0].Plant_Desc);
						that.getView().byId("matNum").setValue(oData.results[0].Material);
						that.getView().byId("matGrp1").setValue(oData.results[0].MatGrp);
						that.getView().byId("storLoc").setValue(oData.results[0].StoreLoc + "-" + oData.results[0].sldec);
						that.getView().byId("desc").setValue(oData.results[0].ShortText);
						that.getView().byId("docdate").getValue(oData.results[0].DocumentDate);
						var date1 = new Date(oData.results[0].DocumentDate);
						var deStartDate1 = date1.toISOString().slice(0, 10);
						var year1 = deStartDate1.slice(0, 4);
						var month1 = deStartDate1.slice(5, 7);
						var dat1 = deStartDate1.slice(8, 10);
						var Desendate = dat1 + '.' + month1 + '.' + year1;
						that.getView().byId("docdate").setValue(Desendate);

					}

				});

			},

			storloc: function () {

				var that = this;
				var sPath = "/StorageLocF4Set?$filter=ImWerks eq '" + that.plant + "'";
				var oModel = new ODataModel('/sap/opu/odata/sap/ZPRJ_SD_APPS_SRV', true);
				oModel.read(sPath, {
					success: function (oData, oResponse) {
						var count = oData.results.length;
						console.log("storage", oData);
						var oModelj = new sap.ui.model.json.JSONModel();
						oModelj.setSizeLimit(100);
						oModelj.setData(oData);
						var plantf4 = that.getView().byId("storLoc");
						plantf4.setModel(oModelj);
						var oItems = new sap.ui.core.ListItem({
							key: "{Lgort}",
							text: "{Lgort}-{Lgobe}"
						});
						plantf4.bindAggregation("items", {
							path: "/results",
							template: oItems
						});
					}
				});

			},
			storloc1: function () {
				//	debugger;
				var that = this;
				var sPath = "/StorageLocF4Set?$filter=ImWerks eq '" + that.plantR + "'";
				var oModel = new ODataModel('/sap/opu/odata/sap/ZPRJ_SD_APPS_SRV', true);
				oModel.read(sPath, {
					success: function (oData, oResponse) {
						var count = oData.results.length;
						console.log("storage", oData);
						var oModelj = new sap.ui.model.json.JSONModel();
						oModelj.setSizeLimit(100);
						oModelj.setData(oData);
						var plantf4 = that.getView().byId("strfloc");
						plantf4.setModel(oModelj);
						var oItems = new sap.ui.core.ListItem({
							key: "{Lgort}",
							text: "{Lgort}-{Lgobe}"
						});
						plantf4.bindAggregation("items", {
							path: "/results",
							template: oItems
						});
					}
				});

			},

			getItem: function () {
				var arrayofItems = [];
				var that = this;
				var table1 = that.getView().byId("tab1");
				var sPath = "/POItemsDisplaySet?$filter=ImPurchaseorder eq '" + that.input + "'";
				var oModel = new ODataModel('/sap/opu/odata/sap/ZPRJ_PO_MIGO_SRV', true);
				oModel.read(sPath, {
					success: function (oData, oResponse) {
						var count = oData.results.length;

						var oModel = new sap.ui.model.json.JSONModel();
						oModel.setData(oData);
						sap.ui.getCore().setModel(oModel);

						var oTable = that.getView().byId("tab1");
						oTable.setModel(oModel);
						/*for (var i = 0; i < count; i++) {
						var poitems = oData.results[i].PoItem;
						var materials = oData.results[i].Material;
						var quant = oData.results[i].Quantity;
						var openqua = oData.results[i].OpenQty;
						var units = oData.results[i].Unit;
						var descri = oData.results[i].ShortText;

						var itemObj = {
							Poitem: poitems,
							Mater: materials,
							quantity: quant,
							Openqua: openqua,
							uom: units,
							Descri: descri
						};
						arrayofItems.push(itemObj);
						var oModelccd = new sap.ui.model.json.JSONModel({
							listdata1: arrayofItems
						});
						table1.setModel(oModelccd);
					}
					var titems1 = new sap.m.ColumnListItem({
						type: "Active",
						cells: [new sap.m.Input({
								value: "{Poitem}",
								editable: false,
								width: "55%" //"{itemkey}"
							}),
							new sap.m.Input({
								value: "{Mater}",
								editable: false,
								width: "65%" //"{itemkey}"
							}),
							new sap.m.Input({
								value: "{Descri}",
								editable: false,
								width: "111%" //"{itemkey}"
							}),

							new sap.m.Input({
								value: "{uom}",
								editable: false,
								width: "60%" //"{itemkey}"
							}),

							new sap.m.Input({
								value: "{quantity}",
								editable: false,
								width: "65%" //"{itemkey}"
							}),
							new sap.m.Input({
								value: "",
								width: "45%" //"{itemkey}"
							}),
							new sap.m.Input({
								value: "{Openqua}",
								width: "55%", //"{itemkey}"
								editable: false
							}),

							new sap.m.CheckBox({

								id: "chckbox",
								select: "itemcheck",
								editable: true,
								width: "60%" //"{itemkey}"
								

							})

						]
					});

					table1.bindItems("/listdata1", titems1);*/
					}

				});

			},

			// onSelChange: function (oEvent) {

			// 	var index = oEvent.getSource().getParent().getBindingContext().sPath.split("/")[2];

			// 	var selectedObject =  oEvent.getParameters().listItem.getBindingContext().getObject();

			// var tableModel = this.getView().getModel("oGlobalModel").getProperty("/listpress");

			// tableModel[index].Material = selectedObject.Material;
			// tableModel[index].Material = selectedObject.Material;

			// },

			onOkButton: function () {

				var arrofmat = [];
				var tableofother = this.getView().byId("tab3");
				var tabledet = sap.ui.core.Fragment.byId("valuefragment", "fragTable");
				var select = tabledet.getSelectedItem();
				var tablelength = tabledet.getSelectedItems().length;
				console.log("TableLenth :", tablelength);
				for (var i = 0; i < tablelength; i++) {
					var rows = tabledet.getSelectedItems()[i];
					var items = rows.getCells()[0].getText();
					var descr = rows.getCells()[1].getText();
					var umo = rows.getCells()[2].getText();
					this.plnte = rows.getCells()[3].getText();

					var table = this.dataModel.getProperty("/itemtable");
					table[this.valueHelpIndex].Empty2 = items;
					table[this.valueHelpIndex].Empty3 = descr;
					table[this.valueHelpIndex].Empty5 = umo;
					table[this.valueHelpIndex].Empty6 = this.plnte;

					table[this.valueHelpIndex].Empty7 = this.str;

					this.dataModel.refresh();

				}
				this.value.close();
				this.storloc2();

			},
			storloc2: function () {
				//	debugger;
				var arrayofstore = [];
				var that = this;
				var sPath = "/StorageLocF4Set?$filter=ImWerks eq '" + that.plnte + "'";
				var oModel = new ODataModel('/sap/opu/odata/sap/ZPRJ_SD_APPS_SRV', true);
				oModel.read(sPath, {
					success: function (oData, oResponse) {
						/*console.log("store",oData);
						var count = oData.results.length;
						alert(count);
						for (var i = 0; i < count; i++) {
							var past = {
								keys: oData.results[i].Lgort,
								texts: oData.results[i].Lgobe
							};
							arrayofstore.push(past);
						}
						console.log("msg", arrayofstore);*/
						that.getView().getModel("dataModel").setProperty("/arrayofstroe", oData.results);

					}
				});
				var cc_aDat = arrayofstore;
				console.log("fateo", cc_aDat);
				var cc_oTable = that.getView().byId("str");
				var oModelccd = new sap.ui.model.json.JSONModel();
				oModelccd.setData({

					seamandata2: cc_aDat
				});

				cc_oTable.setModel(oModelccd);

			},

			techok: function () {

				var tabledet = sap.ui.core.Fragment.byId("ValueHelpfragment", "technical_detail");
				var select = tabledet.getSelectedItem();
				var tablelength = tabledet.getSelectedItems().length;
				console.log("TableLenth :", tablelength);
				for (var i = 0; i < tablelength; i++) {
					var rows = tabledet.getSelectedItems()[i];
					this.items = rows.getCells()[0].getText();
					this.getView().byId("inp").setValue(this.items);
					this.plant = rows.getCells()[1].getText();

				}

				this.valueHelp.close();
				this.getDetail();
				this.getItem();
				this.storloc();
				this.getView().byId("stockType").setValue("Unrestricted use");
				this.getView().byId("postdate1").setValue("");
				//			this.getView().byId("chckbox").setSelected(false);
				sap.ui.core.Fragment.byId("ValueHelpfragment", "main").setValue("");
				sap.ui.core.Fragment.byId("ValueHelpfragment", "functech").setValue("");
				sap.ui.core.Fragment.byId("ValueHelpfragment", "vendor").setValue("");

			},
			techokR: function () {
				var tableres = sap.ui.core.Fragment.byId("reservationfragment", "technical_detailR");
				var select = tableres.getSelectedItem();
				var tablelength = tableres.getSelectedItems().length;
				console.log("TableLenth :", tablelength);
				for (var i = 0; i < tablelength; i++) {
					var rows = tableres.getSelectedItems()[i];
					this.itemsR = rows.getCells()[0].getText();
					this.getView().byId("inp1").setValue(this.itemsR);
					this.plantR = rows.getCells()[1].getText();

				}
				this.reser.close();
				this.storloc1();
				sap.ui.core.Fragment.byId("reservationfragment", "mainR").setValue("");
				tableres.destroyItems();
				this.getresDetails();
				this.getView().byId("strfloc").setEditable(true);
			},
			clearfilterR: function () {
				sap.ui.core.Fragment.byId("reservationfragment", "mainR").setValue("");
				sap.ui.core.Fragment.byId("reservationfragment", "technical_detailR").destroyItems();
			},
			cancelHelpR: function () {
				sap.ui.core.Fragment.byId("reservationfragment", "mainR").setValue("");
				sap.ui.core.Fragment.byId("reservationfragment", "technical_detailR").destroyItems();
				this.reser.close();
			},
			getresDetails: function () {
				debugger;
				var that = this;
				that.arrayofreservation = [];
				var resinp = that.getView().byId("inp1").getValue();
				var sPath = "/GIReservationGetDetailSet?$filter=ResNo eq '" + resinp + "'";
				var oModel = new ODataModel('/sap/opu/odata/sap/ZMM_GOODS_ISSUE_SRV', true);
				oModel.read(sPath, {
					success: function (oData, oResponse) {

						var datereq = oData.results[0].ReqDate;
						var year = datereq.slice(0, 4);
						var month = datereq.slice(4, 6);
						var day = datereq.slice(6, 8);
						var fulldate = day + "." + month + "." + year;
						that.getView().byId("docdate1").setValue(fulldate);
						var mat = oData.results[0].Material;
						that.getView().byId("matNum").setValue(mat);
						var short = oData.results[0].ShortText;
						that.getView().byId("desc").setValue(short);
						var mategrp = oData.results[0].MatGrp;
						that.getView().byId("matGrp1").setValue(mategrp);
						var plnte = oData.results[0].Plant;
						that.getView().byId("plte").setValue(plnte);
						var ordno = oData.results[0].OrderNo;
						that.getView().byId("order").setValue(ordno);
						var busarea = oData.results[0].BusArea;
						that.getView().byId("area").setValue(busarea);
						var storge = oData.results[0].StoreLoc;
						that.getView().byId("strfloc").setValue(storge);

						var tabletwo = that.getView().byId("tab2");
						var length = oData.results.length;
						for (var i = 0; i < length; i++) {
							var itemre = oData.results[i].ResItem;
							var Materialre = oData.results[i].Material;
							var reqre = oData.results[i].ReqQuan;
							var requnit = oData.results[i].ReqUnit;

							var Description = oData.results[i].ShortText;
							var Materialgrp = oData.results[i].MatGrp;
							var plants = oData.results[i].Plant;
							var orderno = oData.results[i].OrderNo;
							var Businessarea = oData.results[i].BusArea;

							var objre = {
								Itemre: itemre,
								materialre: Materialre,
								Reqre: reqre,
								Requnit: requnit,
								descriptio: Description,
								materialgr: Materialgrp,
								plants: plants,
								OrderNo: orderno,
								business: Businessarea
							};
							that.arrayofreservation.push(objre);

						}

						var oModelres = new sap.ui.model.json.JSONModel();
						oModelres.setData({
							reservationdata: that.arrayofreservation
						});

						tabletwo.setModel(oModelres);

					}
				});
			},

			deleteItem: function (oArg) {
				var that = this;
				var value = oArg.getSource().getParent().getBindingContext().getPath();
				var valueind = value.split("/");
				that.index = valueind[2];
				var list_ID = sap.ui.getCore().byId(oArg.getSource().sId);

				var Data = list_ID.getModel();

				var d = Data.getData();
				var delItem = d.addNewItemArray1[that.index].Item;
				d.addNewItemArray1.splice(that.index, 1);
				Data.setData(d);
				that.index = Number(that.index);

			},

			refer: function () {

				var referdoc = this.getView().byId("goodsissueCat").getSelectedKey();
				if (referdoc === "Other") {
					
					this.getView().byId("form2").setVisible(true);
					this.getView().byId("form1").setVisible(false);
					this.getView().byId("form3").setVisible(false);
					this.getView().byId("form4").setVisible(true);
					this.getView().byId("form5").setVisible(false);
					this.getView().byId("form6").setVisible(false);
					this.getView().byId("tab3").setVisible(true);
					this.getView().byId("tab2").setVisible(false);
					this.getView().byId("descr").setVisible(false);
					this.getView().byId("stktyp").setVisible(false);
					this.getView().byId("busarea").setVisible(true);
					this.getView().byId("glacc").setVisible(true);
					this.getView().byId("costcenter").setVisible(true);
					this.getView().byId("matno").setVisible(false);
					this.getView().byId("matgrp").setVisible(false);
					this.getView().byId("strloc").setVisible(false);
					this.getView().byId("ordno").setVisible(false);
					this.getView().byId("plt").setVisible(false);
					this.getView().byId("str2").setVisible(false);
					this.getView().byId("btn").setVisible(false);
					this.getView().byId("btn1").setVisible(true);
					this.getView().byId("btn2").setVisible(false);
					this.getView().byId("inp").setVisible(false);
					this.getView().byId("inp1").setVisible(false);
					this.getView().byId("movTyp").setVisible(true);
					this.getView().byId("postDate").setValue("");
					this.getView().byId("chkotr").setVisible(true);
					this.getView().byId("checkgr").setVisible(false);
					this.getView().byId("chkres").setVisible(false);

					

				} else if (referdoc === "Reservation") {
					this.getView().byId("form2").setVisible(true);
					this.getView().byId("form1").setVisible(false);
					this.getView().byId("form3").setVisible(false);
					this.getView().byId("form4").setVisible(true);
					this.getView().byId("form5").setVisible(false);
					this.getView().byId("form6").setVisible(false);
					this.getView().byId("tab3").setVisible(false);
					this.getView().byId("tab2").setVisible(true);
					this.getView().byId("busarea").setVisible(true);
					this.getView().byId("descr").setVisible(true);
					this.getView().byId("stktyp").setVisible(true);
					this.getView().byId("stockType").setValue("Unrestricted use");
					this.getView().byId("glacc").setVisible(false);
					this.getView().byId("costcenter").setVisible(false);
					this.getView().byId("matno").setVisible(true);
					this.getView().byId("matgrp").setVisible(true);
					this.getView().byId("strloc").setVisible(false);
					this.getView().byId("ordno").setVisible(true);
					this.getView().byId("plt").setVisible(true);
					this.getView().byId("str2").setVisible(true);
					this.getView().byId("btn").setVisible(false);
					this.getView().byId("btn1").setVisible(false);
					this.getView().byId("btn2").setVisible(true);
					this.getView().byId("inp").setVisible(false);
					this.getView().byId("inp1").setVisible(true);
					this.getView().byId("movTyp").setVisible(true);
					this.getView().byId("postDate").setValue("");
					this.getView().byId("chkotr").setVisible(false);
					this.getView().byId("checkgr").setVisible(false);
					this.getView().byId("chkres").setVisible(true);

				}

			},

			post: function () {
				

				var that = this;
				that.arrayOfPOItems = [];

				var inputpo = that.getView().byId("inp").getValue();
				var plant = that.getView().byId("pltInp").getValue();
				var plantpo = plant.split(" ");
				var plantpost = plantpo[0];
				var posting = that.getView().byId("postdate1").getValue();
				var storloca = that.getView().byId("storLoc").getValue();
				var SplitFoot = storloca.split("-");
				var storage = SplitFoot[0];
				var movtype = that.getView().byId("movTyp").getValue();
				var mvtyp = movtype.split("-");
				var movetyp = mvtyp[0];
				var table1 = that.getView().byId("tab1");
				var rowlen = table1.getItems().length;

				for (var i = 0; i < rowlen; i++) {
					this.causeRows = table1.getItems()[i];
					this.causekey = this.causeRows.getCells()[0].getValue();
					this.causeNumPos = this.causeRows.getCells()[1].getValue();

					this.recqty = this.causeRows.getCells()[5].getValue();

					var grobj = {
						MvtType: movetyp,
						Material: this.causeNumPos,
						Plant: plantpost,
						StLoc: storage,
						GrQty: this.recqty,
						Item: this.causekey,
						PoNum: inputpo

					};

					that.arrayOfPOItems.push(grobj);
				}
				
				

				// if (this.opqty >= this.recqty) { //this.openqty
				// 	sap.m.MessageBox.confirm("All Order Quantity has been received and no open quantity for the particular Item", {
				// 		icon: sap.m.MessageBox.Icon.ERROR,
				// 		title: "Error",
				// 		actions: [sap.m.MessageBox.Action.OK],

				// 		onClose: function (oAction) {

				// 			if (oAction == "OK") {

				// 			}
				// 		}.bind(this)
				// 	});

				// } else {

				var postdata = {

					PoNum: inputpo,
					Check: "",
					PostingDate: posting,
					POItem: that.arrayOfPOItems

				};

				// this.checkbox = this.getView().byId("chckbox").getSelected();
				// if (this.checkbox === false) {
				// 	sap.m.MessageBox.confirm("You have not flagged any items as OK", {
				// 		icon: sap.m.MessageBox.Icon.ERROR,
				// 		title: "Error",
				// 		actions: [sap.m.MessageBox.Action.OK],

				// 		onClose: function (oAction) {

				// 			if (oAction == "OK") {

				// 			}
				// 		}.bind(this)
				// 	});
				// } 

				// var ci_table1 = this.getView().byId("tab1");
				// var rowItems = ci_table1.getSelectedItems();
				// if (rowItems == "") {
				// sap.m.MessageBox.confirm("You have not flagged any items as OK", {
				// icon: sap.m.MessageBox.Icon.WARNING,
				// title: "Warning",
				// actions: [sap.m.MessageBox.Action.OK],
				// onClose: function (oAction) {
				// if (oAction === "OK") {

				// }
				// }.bind(this)
				// });
				// }
				if (posting === undefined || posting === null || posting === "") {
					console.log("posting", posting);
					jQuery.sap.require("sap.m.MessageBox");
					sap.m.MessageBox.alert("Enter Posting date", {
						icon: sap.m.MessageBox.Icon.ERROR,
						title: "Error",
						onClose: null
					});
				} else if (this.recqty === undefined || this.recqty === null || this.recqty === "") {
					console.log("posting", posting);
					jQuery.sap.require("sap.m.MessageBox");
					sap.m.MessageBox.alert("Enter Received Quantity", {
						icon: sap.m.MessageBox.Icon.ERROR,
						title: "Error",
						onClose: null
					});
				} else {
					console.log("post:", postdata);
					var sPath = "/POHeaderSet";
					var oModel = new ODataModel('/sap/opu/odata/sap/ZPRJ_PO_MIGO_SRV', true);
					oModel.create(sPath, postdata, {
						success: function (oData, oResponse) {
							var msg1 = oData.Message;
							var typ = oData.Type;

							if (typ == "S") {

								sap.m.MessageBox.confirm(msg1, {
									icon: sap.m.MessageBox.Icon.SUCCESS,
									title: "Success",
									actions: [sap.m.MessageBox.Action.OK],

									onClose: function (oAction) {

										if (oAction == "OK") {

											table1.destroyItems();
											that.getView().byId("venInp").setValue("");
											that.getView().byId("pltInp").setValue("");
											that.getView().byId("matNum").setValue("");
											that.getView().byId("matGrp1").setValue("");
											that.getView().byId("storLoc").setValue("");
											that.getView().byId("desc").setValue("");
											that.getView().byId("stockType").setValue("");
											that.getView().byId("docdate").setValue("");
											that.getView().byId("idSelectPlan").setValue("");
											that.getView().byId("idselecCategory").setValue("");
											that.getView().byId("inp").setValue("");
											that.getView().byId("movTyp").setValue("");

											that.getView().byId("postdate1").setValue("");
											that.getView().byId("objp").setObjectTitle("");
											window.location.reload();
										}
									}.bind(this)
								});

							} else if (typ == "E") {

								sap.m.MessageBox.confirm(msg1, {
									icon: sap.m.MessageBox.Icon.INFORMATION,
									title: "Information",
									actions: [sap.m.MessageBox.Action.OK],

									onClose: function (oAction) {

										if (oAction == "OK") {

										}
									}.bind(this)
								});

							}
						}
					});

				}

				//	}
			},
			cancel: function (oEvent) {
				var that = this;
				var table1 = that.getView().byId("tab1");

				jQuery.sap.require("sap.m.MessageBox");
				sap.m.MessageBox.show(
					"Do you want to cancel?", {
						icon: sap.m.MessageBox.Icon.INFORMATION,
						title: "Information",
						actions: [sap.m.MessageBox.Action.YES, sap.m.MessageBox.Action.NO],
						onClose: function (oAction) {
							// notify user
							if (oAction == "YES") {

								table1.destroyItems();
								that.getView().byId("inp").setValue("");
								that.getView().byId("venInp").setValue("");
								that.getView().byId("pltInp").setValue("");
								that.getView().byId("matNum").setValue("");
								that.getView().byId("matGrp1").setValue("");
								that.getView().byId("storLoc").setValue("");
								that.getView().byId("desc").setValue("");
								that.getView().byId("stockType").setValue("");
								that.getView().byId("docdate").setValue("");
								that.getView().byId("postdate1").setValue("");
								that.getView().byId("idSelectPlan").setValue("");
								that.getView().byId("idselecCategory").setValue("");
								that.getView().byId("goodsissueCat").setValue("");
								that.getView().byId("movTyp").setValue("");
								that.getView().byId("objp").setObjectTitle("");
							} else if (oAction == "NO") {

							}
						}
					});
			},

			post1: function () {
				

				var that = this;
				var arrayofgi = [];
				var mov = that.getView().byId("movTyp").getValue();
				var splitFoot = mov.split("-");
				var move = splitFoot[0];
				var posts = that.getView().byId("postDate").getValue();
				var costcntr = that.getView().byId("costtocenter").getSelectedKey();
				var table1 = that.getView().byId("tab3");
				var rowlen = table1.getItems().length;

				for (var i = 0; i < rowlen; i++) {
					this.causeRows = table1.getItems()[i];
					this.itemadding = this.causeRows.getCells()[0].getValue();
					this.material = this.causeRows.getCells()[1].getValue();
					this.descript = this.causeRows.getCells()[2].getValue();
					this.quantity = this.causeRows.getCells()[3].getValue();
					this.uom = this.causeRows.getCells()[4].getValue();
					this.plnt = this.causeRows.getCells()[5].getValue();
					this.stre = this.causeRows.getCells()[6].getValue();

					this.streq = this.stre.split("-");
					this.str = this.streq[0];

					var postgi = {
						Material: this.material,
						Plant: this.plnt,
						StorageLoc: this.str,
						Quantity: this.quantity,
						UOM: this.uom,
						MovType: move,
						CostCenter: costcntr

					};
					arrayofgi.push(postgi);

				}

				var post = {
					PostingDate: posts,
					Type: "",
					Message: "",
					HeaderToOther: arrayofgi

				};
				console.log("others:", post)

				var sPath = "/CreateGIHeaderSet";
				var oModel = new ODataModel('/sap/opu/odata/sap/ZMM_GOODS_ISSUE_SRV', true);
				oModel.create(sPath, post, {
					success: function (oData, oResponse) {
						var msg = oData.Message;
						

						var type = oData.Type;
						if (type == "S") {

							sap.m.MessageBox.confirm(msg, {
								icon: sap.m.MessageBox.Icon.SUCCESS,
								title: "Success",
								actions: [sap.m.MessageBox.Action.OK],

								onClose: function (oAction) {

									if (oAction == "OK") {

										table1.destroyItems();
										that.getView().byId("costtocenter").setValue("");
										that.getView().byId("objp").setObjectTitle("");
										window.location.reload();

									}
								}.bind(this)
							});

						} else if (type) {

							sap.m.MessageBox.confirm(msg, {
								icon: sap.m.MessageBox.Icon.INFORMATION,
								title: "Information",
								actions: [sap.m.MessageBox.Action.OK],

								onClose: function (oAction) {

									if (oAction == "OK") {

									}
								}.bind(this)
							});

						}

					}
				});
			},
			post2: function () {
				

				var that = this;
				that.arrayOfREItems = [];

				var inputpo = that.getView().byId("inp1").getValue();
				var posting = that.getView().byId("postDate").getValue();
				var movtype = that.getView().byId("movTyp").getValue();
				var mvtyp = movtype.split("-");
				var movetyp = mvtyp[0];
				var plantre = that.getView().byId("plte").getValue();
				var store = that.getView().byId("strfloc").getValue();
				var table1 = that.getView().byId("tab2");
				var rowlen = table1.getItems().length;

				for (var i = 0; i < rowlen; i++) {
					this.resrows = table1.getItems()[i];
					this.causeitemre = this.resrows.getCells()[0].getValue();
					this.causeitemmat = this.resrows.getCells()[1].getValue();

					this.resqty = this.resrows.getCells()[3].getValue();
					this.Uom = this.resrows.getCells()[4].getValue();

					var greobj = {
						ReservationNo: inputpo,
						ReservationItem: this.causeitemre,
						Material: this.causeitemmat,
						Plant: plantre,
						StorageLocation: store,
						MovementType: movetyp,
						Quantity: this.resqty,
						UOM: this.Uom

					};

					that.arrayOfREItems.push(greobj);
				}
				console.log("reitem", that.arrayOfREItems);

				var postdata = {
					PostingDate: posting,
					ReservationNo: inputpo,
					MaterialDocument: "",
					MaterialDocYear: "",
					Type: "",
					Message: "",
					CreateGIResrHeaderToReser: that.arrayOfREItems
				};

				if (posting === undefined || posting === null || posting === "") {
					console.log("posting", posting);
					jQuery.sap.require("sap.m.MessageBox");
					sap.m.MessageBox.alert("Enter Posting date", {
						icon: sap.m.MessageBox.Icon.ERROR,
						title: "Error",
						onClose: null
					});
				} else {

					console.log("posti:", postdata);
					var oModelr = new sap.ui.model.odata.ODataModel('/sap/opu/odata/sap/ZMM_GOODS_ISSUE_SRV/', true);
					var sPath = "/CreateGIReservationHeaderSet";
					oModelr.create(sPath, postdata, {
						success: function (oData, oResponse) {
							var msg1 = oData.Message;
							var typ = oData.Type;

							if (typ == "S") {

								sap.m.MessageBox.confirm(msg1, {
									icon: sap.m.MessageBox.Icon.SUCCESS,
									title: "Success",
									actions: [sap.m.MessageBox.Action.OK],

									onClose: function (oAction) {

										if (oAction == "OK") {

											window.location.reload();
										}
									}.bind(this)
								});

							} else if (typ == "E") {

								sap.m.MessageBox.confirm(msg1, {
									icon: sap.m.MessageBox.Icon.INFORMATION,
									title: "Information",
									actions: [sap.m.MessageBox.Action.OK],

									onClose: function (oAction) {

										if (oAction == "OK") {

										}
									}.bind(this)
								});

							}
						}
					});
				}

			},

			ci_handleDelete: function (oEvent) {
				var path = oEvent.getParameter('listItem').getBindingContext().getPath();
				var idx = parseInt(path.substring(path.lastIndexOf('/') + 1));
				var list_ID = sap.ui.getCore().byId(oEvent.getSource().sId);

				var Data = list_ID.getModel();

				var d = Data.getData();
				d.splice(idx, 1);
				Data.setData(d);
			},

			valueHelp: function () {
				this.valueHelp.open();
				sap.ui.core.Fragment.byId("ValueHelpfragment", "technical_detail").destroyItems();
				this.plantF4Set();
				this.purOrgF4Set();
				this.vendorF4Set();
			},
			cancelHelp: function () {
				this.valueHelp.close();
			},
			itemTableCancel: function () {
				this.addbtn.close();
			},
			valueHelp1: function () {
				this.reser.open();
				this.plantRes();

			},
			plantRes: function () {

				var plantF4 = sap.ui.core.Fragment.byId("reservationfragment", "mainR");
				var oModel = new ODataModel('/sap/opu/odata/sap/ZPRJ_PO_MIGO_SRV', true);
				oModel.read('/PlantF4Set', {

					success: function (oData, oResponse) {
						var plantf4 = oData.results[0].Werks;
						var dups = [];
						var arr = oData.results.filter(function (el) {
							if (dups.indexOf(el.Werks) == -1) {
								dups.push(el.Werks);
								return true;
							}
							return false;
						});
						var arr6i = {
							"arr6i": arr
						};
						var oItems = new sap.ui.core.ListItem({
							key: "{Werks}",
							text: "{Werks} {Name1}"
						});
						var oModel6i = new sap.ui.model.json.JSONModel(arr6i);
						plantF4.setModel(oModel6i);
						plantF4.bindItems("/arr6i", oItems);
					}
				});
			},
			plantR: function () {
				var arrayR = [];
				var planttable = sap.ui.core.Fragment.byId("reservationfragment", "technical_detailR");
				var plantsec = sap.ui.core.Fragment.byId("reservationfragment", "mainR").getSelectedKey();
				var sPath = "/GIReservationGetListSet?$filter=Plant eq '" + plantsec + "'";
				var oModel = new ODataModel('/sap/opu/odata/sap/ZMM_GOODS_ISSUE_SRV', true);
				oModel.read(sPath, {
					success: function (oData, oResponse) {
						var count = oData.results.length;
						for (var i = 0; i < count; i++) {
							var renumber = oData.results[i].ReservationNo;
							var plntr = oData.results[i].Plant;

							var obj = {
								Renumber: renumber,
								Plntr: plntr

							};
							arrayR.push(obj);
							var oModelccd = new sap.ui.model.json.JSONModel({
								listdata: arrayR
							});
							planttable.setModel(oModelccd);
						}
						var titems1 = new sap.m.ColumnListItem({
							cells: [new sap.m.Text({
									text: "{Renumber}" //"{itemkey}"
								}),
								new sap.m.Text({
									text: "{Plntr}", //"{itemkey}"
									visible: false

								})

							]
						});

						planttable.bindItems("/listdata", titems1);

					}

				});
			},
			_onComboBoxSelectionChange: function (oEvent) {

				var sDialogName = "Dialog1";
				this.mDialogs = this.mDialogs || {};
				var oDialog = this.mDialogs[sDialogName];
				if (!oDialog) {
					oDialog = new Dialog1(this.getView());
					this.mDialogs[sDialogName] = oDialog;

					// For navigation.
					oDialog.setRouter(this.oRouter);
				}

				var context = oEvent.getParameter("selectedItem").getBindingContext();
				oDialog._oControl.setBindingContext(context);

				oDialog.open();

			},
			clearfilter: function () {
				var plantfilter = sap.ui.core.Fragment.byId("ValueHelpfragment", "main").setValue("");
				var purorgfilter = sap.ui.core.Fragment.byId("ValueHelpfragment", "functech").setValue("");
				var vendorfilter = sap.ui.core.Fragment.byId("ValueHelpfragment", "vendor").setValue("");
				var plantfiltertable = sap.ui.core.Fragment.byId("ValueHelpfragment", "technical_detail").destroyItems();

			},
			_onFileUploaderChange: function () {
				var oFileuploader = this.getView().byId("ci_fileUploader1");
				this.ci_attach1 = this.getView().byId("UploadCollection");
				var len = oFileuploader.length;
				console.log("totalfile:", len);
				var sFilename = oFileuploader.getValue();

				//	baseval = [" "," "," "," "," "];
				var file = jQuery.sap.domById(oFileuploader.getId() + "-fu").files[0];

				var base64_marker = 'data:' + file.type + ';base64,';

				var filename = sFilename.replace(/(\.[^/.]+)+$/, ""); // File Name
				var fileext = sFilename.slice((sFilename.lastIndexOf(".") - 1 >>> 0) + 2); // File Extension
				var sfileext = fileext.substring(0, 3);
				var tsfileext = sfileext.toUpperCase();
				var that = this;
				if (file) {
					var reader = new FileReader();

					reader.onload = function (readerEvt) {
						var binaryString = readerEvt.target.result;
						var base64 = btoa(binaryString);

						oFileuploader.setValue();
						baseval.push(base64);
						ci_obj1 = {
							Name: filename,
							Ext: tsfileext,
							Base64: base64
						};
						that.ci_att1.push(ci_obj1);

						var oModel = new sap.ui.model.json.JSONModel(that.ci_att1);
						that.ci_attach1.setModel(oModel);
						var oItems = new sap.m.ObjectListItem({
							icon: {
								path: "Ext",
								formatter: function (subject) {
									var lv = subject;
									if (lv === 'TXT') {
										return "sap-icon://document-text";
									} else if (lv === 'JPG' || lv === 'PNG' || lv === 'BMP') {
										return "sap-icon://attachment-photo";
									} else if (lv === 'PDF') {
										return "sap-icon://pdf-attachment";
									} else if (lv === 'DOC') {
										return "sap-icon://doc-attachment";
									} else if (lv === 'XLS') {
										return "sap-icon://excel-attachment";
									} else if (lv === 'MP3') {
										return "sap-icon://attachment-audio";
									} else if (lv === 'XLS') {
										return "sap-icon://excel-attachment";
									} else if (lv === 'PPT') {
										return "sap-icon://ppt-attachment";
									} else {
										return "sap-icon://document";
									}

								}
							},
							title: "{Name}.{Ext}",
							type: "Active",
						});
						that.ci_attach1.bindItems("/", oItems);
						that.getView().getModel("oGlobalModel").setProperty("/ci_att1", that.ci_att1);

					};

				};

				reader.readAsBinaryString(file);

			},

			onUploadComplete: function (oEvent) {
				var sUploadedFileName = oEvent.getParameter("files")[0].fileName;
				setTimeout(function () {
					var oUploadCollection = this.byId("UploadCollection");

					for (var i = 0; i < oUploadCollection.getItems().length; i++) {
						if (oUploadCollection.getItems()[i].getFileName() === sUploadedFileName) {
							oUploadCollection.removeItem(oUploadCollection.getItems()[i]);
							break;
						}
					}

					// delay the success message in order to see other messages before
					MessageToast.show("Event uploadComplete triggered");
				}.bind(this), 8000);
			},
			busydia: function () {
				this.busy.open();
				jQuery.sap.delayedCall(8000, this, function () {
					this.busy.close();
				});
			},
			click: function (oEvent) {
				var index = oEvent.getSource().getParent().getBindingContext("dataModel").sPath.split("/")[2];
				this.valueHelpIndex = index;

				var sId = oEvent.getSource().getId();
				this.index = sId.substr(sId.length - 1);

				this.value.open();
				sap.ui.core.Fragment.byId("valuefragment", "plantFrag").setValue("");
				sap.ui.core.Fragment.byId("valuefragment", "fragTable").destroyItems();
				this.plantF4Set1();
				this.materialTyp();
				this.materialDesc();

			},
			icontabchange: function (oEvent) {
				var icontab = this.getView().byId("byp");
				var mKey = oEvent.getParameters().key;
				if (mKey === "plantby") {

					var plant = sap.ui.core.Fragment.byId("valuefragment", "plantFrag").setValue("");

					var tableres = sap.ui.core.Fragment.byId("valuefragment", "fragTable");
					tableres.destroyItems();

				} else if (mKey === "typeby") {
					var plant1 = sap.ui.core.Fragment.byId("valuefragment", "typefrag").setValue("");
					var tableres1 = sap.ui.core.Fragment.byId("valuefragment", "fragTable");
					tableres1.destroyItems();
				} else if (mKey === "descby") {
					var plant2 = sap.ui.core.Fragment.byId("valuefragment", "descfrag").setValue("");
					var tableres2 = sap.ui.core.Fragment.byId("valuefragment", "fragTable");
					tableres2.destroyItems();

				}
			},
			icontabchange1: function (oEvent) {
				var table  = sap.ui.core.Fragment.byId("ValueHelpfragment","technical_detail");
				table.setVisible(false);
				var icontab = this.getView().byId("byp1");
				var mKey = oEvent.getParameters().key;
				if (mKey === "plantby1") {

					var plant = sap.ui.core.Fragment.byId("ValueHelpfragment", "main").setValue("");

					var tableres = sap.ui.core.Fragment.byId("ValueHelpfragment", "technical_detail");
					tableres.destroyItems();

				} else if (mKey === "typeby1") {
					var plant1 = sap.ui.core.Fragment.byId("ValueHelpfragment", "functech").setValue("");
					var tableres1 = sap.ui.core.Fragment.byId("ValueHelpfragment", "technical_detail");
					tableres1.destroyItems();
				} else if (mKey === "descby1") {
					var plant2 = sap.ui.core.Fragment.byId("ValueHelpfragment", "vendor").setValue("");
					var tableres2 = sap.ui.core.Fragment.byId("ValueHelpfragment", "technical_detail");
					tableres2.destroyItems();

				}
			},
			materialTyp: function () {

				var oModelsi = new ODataModel('/sap/opu/odata/sap/ZMM_F4_SRV_01/', true);
				oModelsi.read("/MaterialTypeSet", {
					success: function (oData, oResponse) {
						this.getView().getModel("oGlobalModel").setProperty("/materialtype", oData.results);
					}.bind(this)
				});

			},
			materialDesc: function () {

				var oModelsi = new ODataModel('/sap/opu/odata/sap/ZPM_F4_SRV/', true);
				oModelsi.read("/MaterialSet", {
					success: function (oData, oResponse) {
						this.getView().getModel("oGlobalModel").setProperty("/materialDesc", oData.results);
					}.bind(this)
				});

			},
			/*	onAfterRendering: function () {
					var element = document.getElementById("__layout4-spacer");
					element.parentNode.removeChild(element);

				},*/
			onInit: function () {

				this.getView().byId("movTyp").setValue("101-GR goods receipt");
				this.getView().byId("objp").setObjectTitle("GR");
				this.oRouter = sap.ui.core.UIComponent.getRouterFor(this);
				this.oRouter.getTarget("Page1").attachDisplay(jQuery.proxy(this.handleRouteMatched, this));
				this.valueHelp = sap.ui.xmlfragment("ValueHelpfragment", "com.sap.build.ba293bd41-us_1.grGrunt.Fragments.ValueHelp", this);
				this.getView().addDependent(this.valueHelp);
				this.addbtn = sap.ui.xmlfragment("Plantfragment", "com.sap.build.ba293bd41-us_1.grGrunt.Fragments.Plant", this);
				this.getView().addDependent(this.addbtn);
				this.value = sap.ui.xmlfragment("valuefragment", "com.sap.build.ba293bd41-us_1.grGrunt.Fragments.value", this);
				this.getView().addDependent(this.value);
				this.busy = sap.ui.xmlfragment("busyDialogfragment", "com.sap.build.ba293bd41-us_1.grGrunt.Fragments.busyDialog", this);
				this.getView().addDependent(this.busy);
				this.reser = sap.ui.xmlfragment("reservationfragment", "com.sap.build.ba293bd41-us_1.grGrunt.Fragments.reservation", this);
				this.getView().addDependent(this.reser);

			}
		});
	},
	/* bExport= */
	true);