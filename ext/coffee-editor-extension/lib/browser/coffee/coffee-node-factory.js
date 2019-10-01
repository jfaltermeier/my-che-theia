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
import { ILogger } from '@theia/core';
import { inject, injectable } from 'inversify';
import { v4 } from 'uuid';
import { CoffeeModel } from '../json-forms-tree/coffee-model';
import { JsonFormsTree } from '../json-forms-tree/json-forms-tree';
var CoffeeTreeNodeFactory = /** @class */ (function () {
    function CoffeeTreeNodeFactory(labelProvider, logger) {
        this.labelProvider = labelProvider;
        this.logger = logger;
    }
    CoffeeTreeNodeFactory.prototype.mapDataToNodes = function (treeData) {
        var node = this.mapData(treeData.data);
        if (node) {
            return [node];
        }
        return [];
    };
    CoffeeTreeNodeFactory.prototype.mapData = function (currentData, parent, property, type, index) {
        var _this = this;
        if (!currentData) {
            // sanity check
            this.logger.warn('mapData called without data');
            return undefined;
        }
        var node = __assign({}, this.defaultNode(), { name: this.labelProvider.getName(currentData), parent: parent, jsonforms: {
                type: this.getType(type, currentData),
                data: currentData,
                property: property,
                index: index !== undefined ? index.toFixed(0) : undefined
            } });
        // containments
        if (parent) {
            parent.children.push(node);
            parent.expanded = true;
        }
        if (currentData.children) {
            // component types
            currentData.children.forEach(function (element, idx) {
                _this.mapData(element, node, 'children', undefined, idx);
            });
        }
        if (currentData.workflows) {
            // machine type
            currentData.workflows.forEach(function (element, idx) {
                _this.mapData(element, node, 'workflows', CoffeeModel.Type.Workflow, idx);
            });
        }
        if (currentData.nodes) {
            // workflow type
            currentData.nodes.forEach(function (element, idx) {
                _this.mapData(element, node, 'nodes', undefined, idx);
            });
        }
        if (currentData.flows) {
            // workflow type
            currentData.flows.forEach(function (element, idx) {
                _this.mapData(element, node, 'flows', undefined, idx);
            });
        }
        return node;
    };
    CoffeeTreeNodeFactory.prototype.hasCreatableChildren = function (node) {
        return node ? CoffeeModel.childrenMapping.get(node.jsonforms.type) !== undefined : false;
    };
    CoffeeTreeNodeFactory.prototype.defaultNode = function () {
        return {
            id: v4(),
            expanded: false,
            selected: false,
            parent: undefined,
            decorationData: {},
            children: []
        };
    };
    CoffeeTreeNodeFactory.prototype.getType = function (type, data) {
        // TODO: eClass should always be sent from server
        if (type) {
            // given eClass
            return type;
        }
        if (data.eClass) {
            // eClass of node
            return data.eClass;
        }
        // guess
        if (data.nodes) {
            return CoffeeModel.Type.Workflow;
        }
        return undefined;
    };
    CoffeeTreeNodeFactory = __decorate([
        injectable(),
        __param(0, inject(JsonFormsTree.LabelProvider)),
        __param(1, inject(ILogger)),
        __metadata("design:paramtypes", [Object, Object])
    ], CoffeeTreeNodeFactory);
    return CoffeeTreeNodeFactory;
}());
export { CoffeeTreeNodeFactory };
//# sourceMappingURL=coffee-node-factory.js.map