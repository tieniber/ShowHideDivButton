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
    "dojo/dom-class",
    "dojo/dom-style",
    "dojo/query",
    "dojo/on",
    "dojo/text!ShowHideDivButton/widget/template/ShowHideDivButton.html",
    "dojo/fx",
    "dojo/fx/Toggler",
    "dojo/NodeList-traverse"
], function(declare, _WidgetBase, _TemplatedMixin, dojoClass, dojoStyle, query, on, widgetTemplate, coreFx, Toggler) {
    "use strict";

    // Declare widget's prototype.
    return declare("ShowHideDivButton.widget.ShowHideDivButton", [_WidgetBase, _TemplatedMixin], {
        // _TemplatedMixin will create our dom node using this HTML template.
        templateString: widgetTemplate,

        // DOM elements
        theButton: null,

        // Parameters configured in the Modeler.
        //targetButtonClass: "",
        toggleClass: "",
        targetDivClass: "",
        startHidden: true,
        buttonText: "",
        showDuration: 200,
        hideDuration: 200,
        event: null,

        //private
        _targetDiv: null,
        _hidden: true,
        _commonParent: null,

        // dojo.declare.constructor is called to construct the widget instance. Implement to initialize non-primitive properties.
        constructor: function() {
            this._handles = [];
        },

        // dijit._WidgetBase.postCreate is called after constructing the widget. Implement to do extra setup work.
        postCreate: function() {
            console.log(this.id + ".postCreate");

            var self = this;
            this.theButton.innerText = this.buttonText;

            var commonParentList = query(this.theButton).parents("." + this.sharedParentClass);
            if (commonParentList) {
                this._commonParent = commonParentList[0];
                var targetDivList = query("." + self.targetDivClass, this._commonParent);

                if (targetDivList) {
                    this._targetDiv = targetDivList[0];
                    //dojoClass.add(this._targetDiv, "showHideDivTargetBase");

                    var toggler = new Toggler({
                        node: this._targetDiv,
                        showFunc: coreFx.wipeIn,
                        hideFunc: coreFx.wipeOut,
                        showDuration: this.showDuration,
                        hideDuration: this.hideDuration
                    });

                    if (this.startHidden) {
                        dojoStyle.set(this._targetDiv, "display", "none");
                        this._hidden = true;
                    } else {
                        this._hidden = false;
                    }
                    // var trigger = this.event === "click" ? "click" : "mouseover, mouseleave";
                    if (this.event === "click") {
                        on(this.theButton, "click", function() {
                            if (self._hidden) {
                                toggler.show();
                                self._hidden = false;
                            } else {
                                toggler.hide();
                                self._hidden = true;
                            }
                            dojoClass.toggle(self.theButton, self.toggleClass);
                        });
                    } else {
                        // hover
                        // hover on the button --> show 
                        on(this.theButton, "mouseover", function(e) {
                            if (self._hidden) {
                                toggler.show();
                                self._hidden = false;
                                dojoClass.toggle(self.theButton, self.toggleClass);
                            }
                        });
                        // exit the target --> hide (unless)
                        on(this._targetDiv, "mouseleave", function(e) {
                            if (e.toElement === self.theButton) { return; }
                            if (!self._hidden) {
                                toggler.hide();
                                self._hidden = true;
                                dojoClass.toggle(self.theButton, self.toggleClass);
                            }
                        });
                        // exit the button --> hide (unless)
                        on(this.theButton, "mouseleave", function(e) {
                            console.log(e);
                            if (self._isChildOfTargetDiv(e.toElement)) { return; }
                            if (!self._hidden) {
                                toggler.hide();
                                self._hidden = true;
                                dojoClass.toggle(self.theButton, self.toggleClass);
                            }
                        });
                    }

                } else {
                    console.log(this.id + ": Could not find target div");
                }
            } else {
                console.log(this.id + ": Could not find common parent container");
            }
        },

        // mxui.widget._WidgetBase.update is called when context is changed or initialized. Implement to re-render and / or fetch data.
        update: function(obj, callback) {
            console.log(this.id + ".update");
            
            this._contextObj = obj;
            if (this._contextObj && this.dynamicButtonTitleAttribute) {
                this.theButton.innerText = this._contextObj.get(this.dynamicButtonTitleAttribute)
            }
            callback();
        },
        // mxui.widget._WidgetBase.uninitialize is called when the widget is destroyed. Implement to do special tear-down work.
        uninitialize: function() {
            // Clean up listeners, helper objects, etc. There is no need to remove listeners added with this.connect / this.subscribe / this.own.
        },
        _isChildOfTargetDiv: function(element) {
            if (element === this._targetDiv) {
                return true;
            } else if (element.tagName === "BODY") {
                return false;
            } else {
                return this._isChildOfTargetDiv(element.parentElement);
            }
        }
    });
});

require(["ShowHideDivButton/widget/ShowHideDivButton"], function() {
    "use strict";
});