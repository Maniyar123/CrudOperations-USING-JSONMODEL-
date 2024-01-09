sap.ui.define([
    "./BaseController",
    // "sap/ui/core/Fragment"
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"

],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (BaseController, Filter, FilterOperator) {
        "use strict";

        return BaseController.extend("project2.controller.View2", {
            onInit: function () {
                // var formData=this.getView().getModel("formData").getData();

                // var oTable=this.byId("table");
                // oTable.getModel().setData(formData );

                // this.getRouter().getRoute()
                var oModel = this.getView().getModel("newModel");
                this.getView().byId("table").setModel(oModel);
                // this.getView().setModel(this.getView().getModel("newModel"));

            },
            onAfterRendering: function () {
                var oModel = this.getView().getModel("newModel");
                this.getView().byId("table").setModel(oModel);
            },

            // ---------NavBar back button--------
            onNavButtonPressPage2: function () {
                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                oRouter.navTo("RouteView1");

            },

            // --------navigate to page3-----------
            onTableItemPress: function (oEvent) {
                var oSelectedItem = oEvent.getParameter("listItem");
                var oContext = oSelectedItem.getBindingContext();
                var sPath = oContext.getPath();
                var oData = oContext.getModel().getProperty(sPath);

                // Store the selected row data in the model or pass it to the next view
                var oModel = new sap.ui.model.json.JSONModel();
                oModel.setData(oData);
                this.getOwnerComponent().setModel(oModel, "selectedRowData");

                // Navigate to the next view
                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                oRouter.navTo("Page3View3");
            },



            //    ----------search functionality on table---------
            onFilterPosts: function (oEvent) {
                // add filter for search
                var aFilters = [];
                var sQuery = oEvent.getSource().getValue();
                var oFirstNameFilter = new sap.ui.model.Filter("firstname", sap.ui.model.FilterOperator.Contains, sQuery);
                var oFieldFilter = new sap.ui.model.Filter("field", sap.ui.model.FilterOperator.Contains, sQuery);

                if (sQuery && sQuery.length > 0) {
                    var filter = new sap.ui.model.Filter({ filters: [oFirstNameFilter, oFieldFilter] }, sap.ui.model.FilterOperator.Contains, sQuery);
                    aFilters.push(filter);
                }// update list binding
                var oList = this.byId("table");
                var oBinding = oList.getBinding("items");
                oBinding.filter(aFilters, "Application");
            },



            // --------- delete event in table-------

            onDeleteItem: function (oEvent) {
                var oTable = this.getView().byId("table");
                var oModel = this.getView().getModel("newModel");
                var oItem = oEvent.getParameter("listItem");
                var sPath = oItem.getBindingContextPath();
                var nIndex = parseInt(sPath.split("/").pop(), 10);

                oModel.getData().splice(nIndex, 1);
                oModel.updateBindings();
            },

           
           

        });
    });
