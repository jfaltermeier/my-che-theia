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
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
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
import { ModelServerSubscriptionService } from '@modelserver/theia/lib/browser';
import { ModelServerClient, ModelServerCommandUtil, } from '@modelserver/theia/lib/common';
import { BaseWidget, SplitPanel, Widget } from '@theia/core/lib/browser';
import { Emitter, ILogger } from '@theia/core/lib/common';
import { WorkspaceService } from '@theia/workspace/lib/browser/workspace-service';
import { inject, injectable } from 'inversify';
import { clone, isEqual } from 'lodash';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { JsonFormsTree } from '../json-forms-tree/json-forms-tree';
import { JsonFormsTreeWidget } from '../json-forms-tree/json-forms-tree-widget';
import { JSONFormsWidget } from './json-forms-widget';
export var JsonFormsTreeEditorWidgetOptions = Symbol('JsonFormsTreeEditorWidgetOptions');
var JsonFormsTreeEditorWidget = /** @class */ (function (_super) {
    __extends(JsonFormsTreeEditorWidget, _super);
    function JsonFormsTreeEditorWidget(options, treeWidget, formWidget, modelServerApi, workspaceService, logger, subscriptionService) {
        var _this = _super.call(this) || this;
        _this.options = options;
        _this.treeWidget = treeWidget;
        _this.formWidget = formWidget;
        _this.modelServerApi = modelServerApi;
        _this.workspaceService = workspaceService;
        _this.logger = logger;
        _this.subscriptionService = subscriptionService;
        _this.dirty = false;
        _this.onDirtyChangedEmitter = new Emitter();
        _this.id = JsonFormsTreeEditorWidget_1.WIDGET_ID;
        _this.title.label = options.uri.path.base;
        _this.title.caption = JsonFormsTreeEditorWidget_1.WIDGET_LABEL;
        _this.title.closable = true;
        _this.title.iconClass = 'fa coffee-icon dark-purple';
        _this.splitPanel = new SplitPanel();
        _this.addClass('json-forms-tree-editor');
        _this.splitPanel.addClass('json-forms-tree-editor-sash');
        _this.treeWidget.addClass('json-forms-tree-editor-tree');
        _this.formWidget.addClass('json-forms-tree-editor-forms');
        _this.formWidget.onChange(function (data) {
            if (isEqual(_this.selectedNode.jsonforms.data, data)) {
                return;
            }
            _this.treeWidget.updateDataForNode(_this.selectedNode, data);
            _this.modelServerApi.update(_this.getModelIDToRequest(), _this.instanceData);
        });
        _this.toDispose.push(_this.treeWidget.onSelectionChange(function (ev) { return _this.treeSelectionChanged(ev); }));
        _this.toDispose.push(_this.treeWidget.onDelete(function (node) { return _this.deleteNode(node); }));
        _this.toDispose.push(_this.treeWidget.onAdd(function (addProp) { return _this.addNode(addProp); }));
        _this.toDispose.push(_this.onDirtyChangedEmitter);
        _this.subscriptionService.onDirtyStateListener(function (dirtyState) {
            _this.dirty = dirtyState;
            _this.onDirtyChangedEmitter.fire();
        });
        _this.subscriptionService.onFullUpdateListener(function (fullUpdate) {
            _this.instanceData = fullUpdate;
            _this.treeWidget
                .setData({ error: false, data: _this.instanceData })
                .then(function () { return _this.treeWidget.select(_this.getOldSelectedPath()); });
        });
        _this.subscriptionService.onIncrementalUpdateListener(function (incrementalUpdate) {
            var _a;
            var command = incrementalUpdate;
            // the #/ marks the beginning of the actual path, but we also want the first slash removed so +3
            var ownerPropIndexPath = command.owner.$ref.substring(command.owner.$ref.indexOf('#/') + 3)
                .split('/')
                .map(function (path) {
                var indexSplitPos = path.indexOf('.');
                // each property starts with an @ so we ignore it
                return { property: path.substring(1, indexSplitPos), index: path.substring(indexSplitPos + 1) };
            });
            var ownerNode = _this.treeWidget.findNode(ownerPropIndexPath);
            var objectToModify = ownerPropIndexPath.reduce(function (data, path) { return path.index === undefined ? data[path.property] : data[path.property][path.index]; }, _this.instanceData);
            switch (command.type) {
                case 'add': {
                    (_a = objectToModify[command.feature]).push.apply(_a, __spread(command.objectsToAdd));
                    _this.treeWidget.addChildren(ownerNode, command.objectsToAdd, command.feature);
                    break;
                }
                case 'remove': {
                    command.indices.forEach(function (i) { return objectToModify[command.feature].splice(i, 1); });
                    _this.treeWidget.removeChildren(ownerNode, command.indices, command.feature);
                    break;
                }
                case 'set': {
                    // maybe we can directly manipulate the data?
                    var data = clone(ownerNode.jsonforms.data);
                    // FIXME handle array changes and references
                    data[command.feature] = command.dataValues[0];
                    objectToModify[command.feature] = command.dataValues[0];
                    _this.treeWidget.updateDataForNode(ownerNode, data);
                }
                default: {
                }
            }
        });
        _this.modelServerApi.get(_this.getModelIDToRequest()).then(function (response) {
            if (response.statusCode === 200) {
                if (isEqual(_this.instanceData, response.body)) {
                    return;
                }
                _this.instanceData = response.body;
                _this.treeWidget
                    .setData({ error: false, data: _this.instanceData })
                    .then(function () { return _this.treeWidget.selectFirst(); });
                return;
            }
            _this.treeWidget.setData({ error: response.statusMessage });
            _this.renderError("An error occurred when requesting '" +
                _this.getModelIDToRequest() +
                "' - Status " +
                response.statusCode +
                ' ' +
                response.statusMessage);
            _this.instanceData = undefined;
            return;
        });
        _this.modelServerApi.subscribe(_this.getModelIDToRequest());
        return _this;
    }
    JsonFormsTreeEditorWidget_1 = JsonFormsTreeEditorWidget;
    Object.defineProperty(JsonFormsTreeEditorWidget.prototype, "onDirtyChanged", {
        get: function () {
            return this.onDirtyChangedEmitter.event;
        },
        enumerable: true,
        configurable: true
    });
    JsonFormsTreeEditorWidget.prototype.getOldSelectedPath = function () {
        var paths = [];
        if (!this.selectedNode) {
            return paths;
        }
        paths.push(this.selectedNode.name);
        var parent = this.selectedNode.parent;
        while (parent) {
            paths.push(parent.name);
            parent = parent.parent;
        }
        paths.splice(paths.length - 1, 1);
        return paths;
    };
    JsonFormsTreeEditorWidget.prototype.uri = function () {
        return this.options.uri;
    };
    JsonFormsTreeEditorWidget.prototype.save = function () {
        this.logger.info('Save data to server');
        this.modelServerApi.save(this.getModelIDToRequest());
    };
    JsonFormsTreeEditorWidget.prototype.onResize = function (_msg) {
        if (this.splitPanel) {
            this.splitPanel.update();
        }
    };
    JsonFormsTreeEditorWidget.prototype.getModelIDToRequest = function () {
        var rootUriLength = this.workspaceService
            .getWorkspaceRootUri(this.options.uri)
            .toString().length;
        return this.options.uri.toString().substring(rootUriLength + 1);
    };
    JsonFormsTreeEditorWidget.prototype.getResourceUri = function () {
        return this.options.uri;
    };
    JsonFormsTreeEditorWidget.prototype.createMoveToUri = function (resourceUri) {
        return this.options.uri && this.options.uri.withPath(resourceUri.path);
    };
    JsonFormsTreeEditorWidget.prototype.renderError = function (errorMessage) {
        ReactDOM.render(React.createElement(React.Fragment, null, errorMessage), this.formWidget.node);
    };
    JsonFormsTreeEditorWidget.prototype.treeSelectionChanged = function (selectedNodes) {
        if (selectedNodes.length === 0) {
            this.selectedNode = undefined;
        }
        else {
            this.selectedNode = selectedNodes[0];
            this.formWidget.setSelection(this.selectedNode);
        }
        this.update();
    };
    JsonFormsTreeEditorWidget.prototype.getNodeDescription = function (node) {
        var getRefSegment = function (n) { return n.jsonforms.property ? ("@" + n.jsonforms.property + (n.jsonforms.index ? "." + n.jsonforms.index : '')) : ''; };
        var refToNode = '';
        var toCheck = node;
        while (toCheck && JsonFormsTree.Node.is(toCheck)) {
            var parentRefSeg = getRefSegment(toCheck);
            refToNode = parentRefSeg === '' ? refToNode : ('/' + parentRefSeg + refToNode);
            toCheck = toCheck.parent;
        }
        var ownerRef = this.workspaceService.workspace.uri + "/" + this.getModelIDToRequest() + "#/" + refToNode;
        return {
            eClass: node.jsonforms.type, $ref: ownerRef.replace('file:///', 'file:/')
        };
    };
    JsonFormsTreeEditorWidget.prototype.deleteNode = function (node) {
        var removeCommand = ModelServerCommandUtil.createRemoveCommand(this.getNodeDescription(node.parent), node.jsonforms.property, node.jsonforms.index ? [Number(node.jsonforms.index)] : []);
        this.modelServerApi.edit(this.getModelIDToRequest(), removeCommand);
    };
    JsonFormsTreeEditorWidget.prototype.addNode = function (_a) {
        var node = _a.node, eClass = _a.eClass, property = _a.property;
        var addCommand = ModelServerCommandUtil.createAddCommand(this.getNodeDescription(node), property, [{ eClass: eClass }]);
        this.modelServerApi.edit(this.getModelIDToRequest(), addCommand);
    };
    JsonFormsTreeEditorWidget.prototype.onAfterAttach = function (msg) {
        this.splitPanel.addWidget(this.treeWidget);
        this.splitPanel.addWidget(this.formWidget);
        this.splitPanel.setRelativeSizes([1, 4]);
        Widget.attach(this.splitPanel, this.node);
        this.treeWidget.activate();
        _super.prototype.onAfterAttach.call(this, msg);
    };
    JsonFormsTreeEditorWidget.prototype.onActivateRequest = function () {
        if (this.splitPanel) {
            this.splitPanel.node.focus();
        }
    };
    JsonFormsTreeEditorWidget.prototype.dispose = function () {
        this.modelServerApi.unsubscribe(this.getModelIDToRequest());
        _super.prototype.dispose.call(this);
    };
    var JsonFormsTreeEditorWidget_1;
    JsonFormsTreeEditorWidget = JsonFormsTreeEditorWidget_1 = __decorate([
        injectable(),
        __param(0, inject(JsonFormsTreeEditorWidgetOptions)),
        __param(1, inject(JsonFormsTreeWidget)),
        __param(2, inject(JSONFormsWidget)),
        __param(3, inject(ModelServerClient)),
        __param(4, inject(WorkspaceService)),
        __param(5, inject(ILogger)),
        __param(6, inject(ModelServerSubscriptionService)),
        __metadata("design:paramtypes", [Object, JsonFormsTreeWidget,
            JSONFormsWidget, Object, WorkspaceService, Object, Object])
    ], JsonFormsTreeEditorWidget);
    return JsonFormsTreeEditorWidget;
}(BaseWidget));
export { JsonFormsTreeEditorWidget };
(function (JsonFormsTreeEditorWidget) {
    JsonFormsTreeEditorWidget.WIDGET_ID = 'json-forms-tree-editor';
    JsonFormsTreeEditorWidget.WIDGET_LABEL = 'JSONForms Tree Editor';
    var Styles;
    (function (Styles) {
        Styles.JSONFORMS_TREE_EDITOR_CLASS = 'json-forms-tree-editor';
    })(Styles = JsonFormsTreeEditorWidget.Styles || (JsonFormsTreeEditorWidget.Styles = {}));
})(JsonFormsTreeEditorWidget || (JsonFormsTreeEditorWidget = {}));
//# sourceMappingURL=json-forms-tree-editor-widget.js.map