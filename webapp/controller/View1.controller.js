sap.ui.define([
    "./BaseController",
    // "sap/ui/core/Fragment",
    "sap/ui/core/UIComponent",
    "sap/ui/core/routing/Router"
    

],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (BaseController,UIComponent,Router) {
        "use strict";

        return BaseController.extend("project2.controller.View1", {
            onInit: function () {
               
            },
 
            // ----------fragment for login page-------------------
            OnLogPress:function (){
                if(!this.loginDailog){
                    this.loginDailog=sap.ui.xmlfragment("project2.fragments.LoginForm",this);
                    }
                    this.loginDailog.open();
            },
            loginClose:function(){
                this.oView=sap.ui.xmlfragment("project2.fragments.LoginForm",this);
                this.loginDailog.close();
            },

            
        });

        
    });
