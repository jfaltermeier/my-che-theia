var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
/*!
 * Copyright (C) 2019 EclipseSource and others.
 *
 * This program and the accompanying materials are made available under the
 * terms of the Eclipse Public License v. 2.0 which is available at
 * http://www.eclipse.org/legal/epl-2.0.
 *
 * This Source Code may also be made available under the following Secondary
 * Licenses when the conditions for such availability set forth in the Eclipse
 * Public License v. 2.0 are satisfied: GNU General Public License, version 2
 * with the GNU Classpath Exception which is available at
 * https://www.gnu.org/software/classpath/license.html.
 *
 * SPDX-License-Identifier: EPL-2.0 OR GPL-2.0 WITH Classpath-exception-2.0
 */
import { Actions, jsonformsReducer } from '@jsonforms/core';
import { materialCells, materialRenderers } from '@jsonforms/material-renderers';
import { JsonFormsDispatch, JsonFormsReduxContext } from '@jsonforms/react';
import { Emitter, ILogger } from '@theia/core';
import { BaseWidget } from '@theia/core/lib/browser';
import { inject, injectable } from 'inversify';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { combineReducers, createStore } from 'redux';
import { CoffeeModel } from '../json-forms-tree/coffee-model';
import { automaticTaskView, brewingView, coffeeSchema, controlUnitView, machineView, manualTaskView, workflowView, } from '../models/coffee-schemas';
var JSONFormsWidget = /** @class */ (function (_super) {
    __extends(JSONFormsWidget, _super);
    function JSONFormsWidget(logger) {
        var _this = _super.call(this) || this;
        _this.logger = logger;
        _this.changeEmitter = new Emitter();
        _this.store = _this.initStore();
        _this.store.dispatch(Actions.init({}, { type: 'string' }));
        _this.toDispose.push(_this.changeEmitter);
        _this.store.subscribe(function () {
            _this.changeEmitter.fire(_this.store.getState().jsonforms.core.data);
        });
        _this.renderEmptyForms();
        return _this;
    }
    Object.defineProperty(JSONFormsWidget.prototype, "onChange", {
        get: function () {
            return this.changeEmitter.event;
        },
        enumerable: true,
        configurable: true
    });
    JSONFormsWidget.prototype.initStore = function () {
        var initState = {
            jsonforms: {
                cells: materialCells,
                renderers: materialRenderers
            }
        };
        return createStore(combineReducers({ jsonforms: jsonformsReducer() }), initState);
    };
    JSONFormsWidget.prototype.setSelection = function (selectedNode) {
        this.selectedNode = selectedNode;
        this.store.dispatch(Actions.init(this.selectedNode.jsonforms.data, __assign({ definitions: coffeeSchema.definitions }, this.getSchemaForNode(this.selectedNode)), this.getUiSchemaForNode(this.selectedNode), {
            refParserOptions: {
                dereference: { circular: 'ignore' }
            }
        }));
        this.renderForms();
    };
    JSONFormsWidget.prototype.getSchemaForNode = function (node) {
        var schema = this.getSchemaForType(node.jsonforms.type);
        if (schema) {
            return schema;
        }
        // there is no type, try to guess
        if (node.jsonforms.data.nodes) {
            return coffeeSchema.definitions.workflow;
        }
        return undefined;
    };
    JSONFormsWidget.prototype.getUiSchemaForNode = function (node) {
        var schema = this.getUiSchemaForType(node.jsonforms.type);
        if (schema) {
            return schema;
        }
        // there is no type, try to guess
        if (node.jsonforms.data.nodes) {
            return workflowView;
        }
        return undefined;
    };
    JSONFormsWidget.prototype.getUiSchemaForType = function (type) {
        if (!type) {
            return undefined;
        }
        switch (type) {
            case CoffeeModel.Type.Machine:
                return machineView;
            case CoffeeModel.Type.ControlUnit:
                return controlUnitView;
            case CoffeeModel.Type.BrewingUnit:
                return brewingView;
            case CoffeeModel.Type.AutomaticTask:
                return automaticTaskView;
            case CoffeeModel.Type.ManualTask:
                return manualTaskView;
            default:
                this.logger.warn("Can't find registered ui schema for type " + type);
                return undefined;
        }
    };
    JSONFormsWidget.prototype.getSchemaForType = function (type) {
        if (!type) {
            return undefined;
        }
        var schema = Object.entries(coffeeSchema.definitions)
            .map(function (entry) { return entry[1]; })
            .find(function (definition) {
            return definition.properties && definition.properties.eClass.const === type;
        });
        if (!schema) {
            this.logger.warn("Can't find definition schema for type " + type);
        }
        return schema;
    };
    JSONFormsWidget.prototype.renderForms = function () {
        if (this.selectedNode) {
            ReactDOM.render(React.createElement(React.Fragment, null,
                React.createElement(Provider, { store: this.store },
                    React.createElement(JsonFormsReduxContext, null,
                        React.createElement(JsonFormsDispatch, null)))), this.node);
        }
        else {
            this.renderEmptyForms();
        }
    };
    JSONFormsWidget.prototype.renderEmptyForms = function () {
        ReactDOM.render(React.createElement(React.Fragment, null, "Please select an element"), this.node);
    };
    JSONFormsWidget.prototype.onUpdateRequest = function (msg) {
        _super.prototype.onUpdateRequest.call(this, msg);
        this.renderForms();
    };
    JSONFormsWidget = __decorate([
        injectable(),
        __param(0, inject(ILogger)),
        __metadata("design:paramtypes", [Object])
    ], JSONFormsWidget);
    return JSONFormsWidget;
}(BaseWidget));
export { JSONFormsWidget };
//# sourceMappingURL=json-forms-widget.js.map