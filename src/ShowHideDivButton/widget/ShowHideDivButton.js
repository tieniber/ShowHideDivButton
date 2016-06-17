/*
    ShowHideDivButton
    ========================

    @file      : ShowHideDivButton.js
    @version   : 0.1
    @author    : Eric Tieniber
    @date      : Fri, 20 Nov 2015 03:02:59 GMT
    @copyright : 
    @license   : 

    Documentation
    ========================
    Describe your widget here.
*/

// Required module list. Remove unnecessary modules, you can always get them back from the boilerplate.
define([
    "dojo/_base/declare",
    "mxui/widget/_WidgetBase",
    "dijit/_TemplatedMixin",
    "mxui/dom",
    "dojo/dom",
    "dojo/dom-prop",
    "dojo/dom-geometry",
    "dojo/dom-class",
    "dojo/dom-style",
    "dojo/dom-construct",
    "dojo/_base/array",
    "dojo/_base/lang",
    "dojo/text",
    "dojo/html",
    "dojo/_base/event",
    "ShowHideDivButton/lib/jquery-1.11.2",
    "dojo/text!ShowHideDivButton/widget/template/ShowHideDivButton.html"
], function(declare, _WidgetBase, _TemplatedMixin, dom, dojoDom, dojoProp, dojoGeometry, dojoClass, dojoStyle, dojoConstruct, dojoArray, dojoLang, dojoText, dojoHtml, dojoEvent, _jQuery, widgetTemplate) {
    "use strict";

    var $ = _jQuery.noConflict(true);
    
    // Declare widget's prototype.
    return declare("ShowHideDivButton.widget.ShowHideDivButton", [ _WidgetBase, _TemplatedMixin ], {
        // _TemplatedMixin will create our dom node using this HTML template.
        templateString: widgetTemplate,
		
        // DOM elements

        // Parameters configured in the Modeler.
        //targetButtonClass: "",

        // dojo.declare.constructor is called to construct the widget instance. Implement to initialize non-primitive properties.
        constructor: function() {
            this._handles = [];
        },

        // dijit._WidgetBase.postCreate is called after constructing the widget. Implement to do extra setup work.
        postCreate: function() {
            console.log(this.id + ".postCreate");
            this._updateRendering();
            this._setupEvents();
			
			$(document).on('click.' + this.id, '.toggleButton', function() {
				$(this).toggleClass("fa-caret-right fa-caret-down");
				$(this).parent().parent().next().slideToggle("fast");
			});
        },

        // mxui.widget._WidgetBase.update is called when context is changed or initialized. Implement to re-render and / or fetch data.
        update: function(obj, callback) {
            console.log(this.id + ".update");

            this._contextObj = obj;
            this._resetSubscriptions();
            this._updateRendering();

            callback();
        },

        // mxui.widget._WidgetBase.enable is called when the widget should enable editing. Implement to enable editing if widget is input widget.
        enable: function() {},

        // mxui.widget._WidgetBase.enable is called when the widget should disable editing. Implement to disable editing if widget is input widget.
        disable: function() {},

        // mxui.widget._WidgetBase.resize is called when the page's layout is recalculated. Implement to do sizing calculations. Prefer using CSS instead.
        resize: function(box) {},

        // mxui.widget._WidgetBase.uninitialize is called when the widget is destroyed. Implement to do special tear-down work.
        uninitialize: function() {
            // Clean up listeners, helper objects, etc. There is no need to remove listeners added with this.connect / this.subscribe / this.own.
			$(document).off('click.' + this.id, '.toggleButton');
        },

        // We want to stop events on a mobile device
        _stopBubblingEventOnMobile: function(e) {
            if (typeof document.ontouchstart !== "undefined") {
                dojoEvent.stop(e);
            }
        },

        // Attach events to HTML dom elements
        _setupEvents: function() {

        },

        // Rerender the interface.
        _updateRendering: function() {
        },

        // Handle validations.
        _handleValidation: function(validations) {
            this._clearValidations();

            var validation = validations[0],
                message = validation.getReasonByAttribute(this.backgroundColor);

            if (this.readOnly) {
                validation.removeAttribute(this.backgroundColor);
            } else if (message) {
                this._addValidation(message);
                validation.removeAttribute(this.backgroundColor);
            }
        },

        // Clear validations.
        _clearValidations: function() {
            dojoConstruct.destroy(this._alertDiv);
            this._alertDiv = null;
        },

        // Show an error message.
        _showError: function(message) {
        },

        // Add a validation.
        _addValidation: function(message) {
            this._showError(message);
        },

        // Reset subscriptions.
        _resetSubscriptions: function() {

        }
    });
});

require(["ShowHideDivButton/widget/ShowHideDivButton"], function() {
    "use strict";
});
