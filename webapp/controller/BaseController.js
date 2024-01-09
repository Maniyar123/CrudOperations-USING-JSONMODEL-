sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/Fragment",
    "sap/ui/model/json/JSONModel",
    


],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, Fragment) {
        "use strict";

        return Controller.extend("project2.controller.BaseController", {
            onInit: function () {
                // var oModel = new sap.ui.model.json.JSONModel(formData);
                // this.getView().setModel(oModel, "formDataModel");
            },


            // ---logic for add button in atble view and for register button
            OnPress: function () {
                // if(!this.registrationDialog){
                this.registrationDialog = sap.ui.xmlfragment("project2.fragments.RegForm", this);

                // }

                this.registrationDialog.open();

            },

            closeButton: function () {
                this.oView = sap.ui.xmlfragment("project2.fragments.RegForm", this);
                this.registrationDialog.close();
                this.registrationDialog.destroy();
            },

            //   validation fr inputs
            handleLiveChange: function () {
                var isValid = this.validateInputPatterns();
                sap.ui.getCore().byId("sub").setEnabled(isValid);
            },
             
            validateInputPatterns: function () {
                var fnameValid = this.validatePattern("fname", /^[A-Za-z]+$/);
                var lnameValid = this.validatePattern("lastName", /^[A-Za-z]+$/);
                var fieldValid = this.validatePattern("field", /^[A-Za-z]+$/);
                var emailValid = this.validatePattern("email", /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/);
                var passwordValid = this.validatePattern("password", /^[0-9]+$/);
                var phoneValid = this.validatePattern("phn", /^[0-9]+$/);
                // Add similar pattern validations for other fields as needed
             
                return fnameValid &&lnameValid&& fieldValid&&emailValid&&passwordValid&&phoneValid;
            },
             
            validatePattern: function (inputId, regex) {
                var inputValue = sap.ui.getCore().byId(inputId).getValue().trim();
             
                if (!regex.test(inputValue)) {
                    sap.ui.getCore().byId(inputId).setValueState("Error");
                    sap.ui.getCore().byId("sub").setEnabled(false);
                    return false;
                } else {
                    sap.ui.getCore().byId(inputId).setValueState("None");
                    return true;
                }
            },
           


        //   ------logic for submit button-------




            registerSubmitButton: function () {
                var firstname = sap.ui.getCore().byId("fname").getValue()
                var lastname = sap.ui.getCore().byId("lastName").getValue()
                var field = sap.ui.getCore().byId("field").getValue()
                var email = sap.ui.getCore().byId("email").getValue()
                var password = sap.ui.getCore().byId("password").getValue()
                var phoneNumber = sap.ui.getCore().byId("phn").getValue()
                 
                if (this.updatingRow) {
                    // updating existing row
                      var updatingIndex=this.createform.indexOf(this.updatingRow);
                    if(updatingIndex!==-1){
                        this.createform[updatingIndex]={
                            firstname :  firstname,
                            lastname : lastname,
                            field : field,
                            emailid : email,
                            password : password,
                            phoneNumber : phoneNumber
        
                        };
                        this.updatingRow = null;
                    }
                   
                }else {

                    // add new entry
                    var newEntry={
                        firstname: firstname,
                        lastname: lastname,
                        field: field,
                        emailid: email,
                        password: password,
                        phoneNumber: phoneNumber

                    };
                    if (this.getView().getModel("newModel").getData().length === 0 || this.getView().getModel("newModel").getData().length === undefined) {
                        this.createform = [];
                    } else {
                        this.createform = this.getView().getModel("newModel").getData();
                    }
                    // if(!this.createform){
                    //     this.createform = [];

                    // }

                    this.createform.push(newEntry);
                       
                   

                   
                }
                // update or set model data
                var oModel = this.getView().getModel("newModel");
                oModel.setData(this.createform);
                this.getView().setModel(oModel);


                 //   refresh fields
                 sap.ui.getCore().byId("fname").setValue("");
                 sap.ui.getCore().byId("lastName").setValue("");
                 sap.ui.getCore().byId("field").setValue("");
                 sap.ui.getCore().byId("email").setValue("");
                 sap.ui.getCore().byId("password").setValue("");
                 sap.ui.getCore().byId("phn").setValue("");


                //    close and destory the registation dailog
                this.registrationDialog.close();
                this.registrationDialog.destroy();
                this.getOwnerComponent().getRouter().navTo("Page2View2");



            },


            //    ----refresh button-----------
            RefreshButton: function () {
                sap.ui.getCore().byId("fname").setValue("");
                sap.ui.getCore().byId("lastName").setValue("");
                sap.ui.getCore().byId("field").setValue("");
                sap.ui.getCore().byId("email").setValue("");
                sap.ui.getCore().byId("password").setValue("");
                sap.ui.getCore().byId("phn").setValue("");


            },
            openFormWithSelectedData: function (selectedData) {
                if (!this.registrationDialog) {
                    this.registrationDialog = sap.ui.xmlfragment("project2.fragments.RegForm", this);
                }

                // Set the selected data to the form fields
                sap.ui.getCore().byId("fname").setValue(selectedData.firstname);
                sap.ui.getCore().byId("lastName").setValue(selectedData.lastname);
                sap.ui.getCore().byId("field").setValue(selectedData.field);
                sap.ui.getCore().byId("email").setValue(selectedData.email);
                sap.ui.getCore().byId("password").setValue(selectedData.password);
                sap.ui.getCore().byId("phn").setValue(selectedData.phoneNumber);

                this.registrationDialog.open();
            },
            // ----update button----

            onUpdateButtonPress: function (oEvent) {
                // Get the selected row's data
                var selectedRowData = oEvent.getSource().getBindingContext().getObject();

                // Set updatingRow flag
                this.updatingRow = selectedRowData;

                // Open the registration form with the selected row's data
                this.registrationDialog = sap.ui.xmlfragment("project2.fragments.RegForm", this);
                // Set form fields with selected row's data
                sap.ui.getCore().byId("fname").setValue(selectedRowData.firstname);
                sap.ui.getCore().byId("lastName").setValue(selectedRowData.lastname);
                sap.ui.getCore().byId("field").setValue(selectedRowData.field);
                sap.ui.getCore().byId("email").setValue(selectedRowData.emailid);
                sap.ui.getCore().byId("password").setValue(selectedRowData.password);
                sap.ui.getCore().byId("phn").setValue(selectedRowData.phoneNumber);

               
                this.registrationDialog.open();
            },
             

            

            



        });
    }
);






