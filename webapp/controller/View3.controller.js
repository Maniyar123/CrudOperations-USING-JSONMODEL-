sap.ui.define([
    "./BaseController",
    // "sap/ui/core/Fragment"
    "sap/ui/model/json/JSONModel"
    
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (BaseController) {
        "use strict";

        return BaseController.extend("project2.controller.View3", {
            onInit: function () {
                // var oModel = this.getOwnerComponent().getModel("selectedRowData");
                // var oData = oModel.getData();
              
                // // Use the selected row data in this view
                // this.byId("firstNameText").setText(oData.firstname);
                // this.byId("lastNameText").setText(oData.lastname);
                // this.byId("fieldNameText").setText(oData.field);
                // this.byId("emailText").setText(oData.emailid);
                // this.byId("passwordText").setText(oData.password);
                // this.byId("mobileNumberText").setText(oData.phoneNumber);

                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                oRouter.getRoute("Page3View3").attachPatternMatched(this._onObjectMatched, this);
              },

            //  funcationality to view data in view3 
              _onObjectMatched: function() {
                
                var oModel = this.getOwnerComponent().getModel("selectedRowData");
                var oData = oModel.getData();
              
                // Use the selected row data in this view
                this.byId("firstNameText").setText(oData.firstname);
                this.byId("lastNameText").setText(oData.lastname);
                this.byId("fieldNameText").setText(oData.field);
                this.byId("emailText").setText(oData.emailid);
                this.byId("passwordText").setText(oData.password);
                this.byId("mobileNumberText").setText(oData.phoneNumber);
              },

             
           
            //  ----nav back button to view2 
            onNavButtonPressPage3:function(){
                var oRouter=sap.ui.core.UIComponent.getRouterFor(this);
                oRouter.navTo("Page2View2");

            },

        });
    });













  