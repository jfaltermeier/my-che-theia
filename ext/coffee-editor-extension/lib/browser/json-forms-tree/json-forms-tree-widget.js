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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { Emitter } from '@theia/core';
import { ConfirmDialog, TreeModel } from '@theia/core/lib/browser';
import { ContextMenuRenderer } from '@theia/core/lib/browser/context-menu-renderer';
import { TreeProps, TreeWidget } from '@theia/core/lib/browser/tree/tree-widget';
import { inject, injectable, postConstruct } from 'inversify';
import * as React from 'react';
import { v4 } from 'uuid';
import { JsonFormsTree } from './json-forms-tree';
import { JsonFormsTreeContextMenu } from './json-forms-tree-container';
var JsonFormsTreeWidget = /** @class */ (function (_super) {
    __extends(JsonFormsTreeWidget, _super);
    function JsonFormsTreeWidget(props, model, contextMenuRenderer, labelProvider, nodeFactory) {
        var _this = _super.call(this, props, model, contextMenuRenderer) || this;
        _this.props = props;
        _this.model = model;
        _this.contextMenuRenderer = contextMenuRenderer;
        _this.labelProvider = labelProvider;
        _this.nodeFactory = nodeFactory;
        _this.onTreeWidgetSelectionEmitter = new Emitter();
        _this.onDeleteEmitter = new Emitter();
        _this.onAddEmitter = new Emitter();
        _this.id = JsonFormsTreeWidget_1.WIDGET_ID;
        _this.title.label = JsonFormsTreeWidget_1.WIDGET_LABEL;
        _this.title.caption = JsonFormsTreeWidget_1.WIDGET_LABEL;
        _this.addClass(JsonFormsTreeWidget_1.Styles.JSONFORMS_TREE_CLASS);
        model.root = {
            id: JsonFormsTreeWidget_1.WIDGET_ID,
            name: JsonFormsTreeWidget_1.WIDGET_LABEL,
            parent: undefined,
            visible: false,
            children: []
        };
        return _this;
    }
    JsonFormsTreeWidget_1 = JsonFormsTreeWidget;
    JsonFormsTreeWidget.prototype.init = function () {
        var _this = this;
        _super.prototype.init.call(this);
        this.addClass('tree-container');
        this.toDispose.push(this.onTreeWidgetSelectionEmitter);
        this.toDispose.push(this.onDeleteEmitter);
        this.toDispose.push(this.onAddEmitter);
        this.toDispose.push(this.model.onSelectionChanged(function (e) {
            _this.onTreeWidgetSelectionEmitter.fire(e);
        }));
    };
    /** Overrides method in TreeWidget */
    JsonFormsTreeWidget.prototype.handleClickEvent = function (node, event) {
        var x = event.target;
        if (x.classList.contains('node-button')) {
            // Don't do anything because the event is handled in the button's handler
            return;
        }
        _super.prototype.handleClickEvent.call(this, node, event);
    };
    /*
     * Overrides TreeWidget.renderTailDecorations
     * Add a add child and a remove button.
     */
    JsonFormsTreeWidget.prototype.renderTailDecorations = function (node, props) {
        var deco = _super.prototype.renderTailDecorations.call(this, node, props);
        if (!JsonFormsTree.Node.is(node)) {
            return deco;
        }
        var addPlus = this.nodeFactory.hasCreatableChildren(node);
        return (React.createElement(React.Fragment, null,
            deco,
            React.createElement("div", { className: 'node-buttons' },
                addPlus ? (React.createElement("div", { className: 'node-button far fa-plus-square', onClick: this.createAddHandler(node) })) : (''),
                React.createElement("div", { className: 'node-button far fa-minus-square', onClickCapture: this.createRemoveHandler(node) }))));
    };
    /**
     * Creates a handler for the delete button of a tree node.
     * @param node The tree node to create a remove handler for
     */
    JsonFormsTreeWidget.prototype.createRemoveHandler = function (node) {
        var _this = this;
        return function (event) {
            event.stopPropagation();
            var dialog = new ConfirmDialog({
                title: 'Delete Node?',
                msg: 'Are you sure you want to delete the selected node?'
            });
            dialog.open().then(function (remove) {
                if (remove && node.parent && node.parent && JsonFormsTree.Node.is(node.parent)) {
                    _this.onDeleteEmitter.fire(node);
                }
            });
        };
    };
    JsonFormsTreeWidget.prototype.createAddHandler = function (node) {
        var _this = this;
        return function (event) {
            var addHandler = function (property, eClass) { return _this.onAddEmitter.fire({ node: node, property: property, eClass: eClass }); };
            var treeAnchor = {
                x: event.nativeEvent.x,
                y: event.nativeEvent.y,
                node: node,
                onClick: addHandler
            };
            _this.contextMenuRenderer.render(JsonFormsTreeContextMenu.ADD_MENU, treeAnchor);
        };
    };
    JsonFormsTreeWidget.prototype.setData = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.data = data;
                        return [4 /*yield*/, this.refreshModelChildren()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    JsonFormsTreeWidget.prototype.selectFirst = function () {
        if (this.model.root &&
            JsonFormsTree.RootNode.is(this.model.root) &&
            this.model.root.children.length > 0 &&
            JsonFormsTree.Node.is(this.model.root.children[0])) {
            this.model.selectNode(this.model.root.children[0]);
            this.model.refresh();
        }
    };
    JsonFormsTreeWidget.prototype.findNode = function (propIndexPaths) {
        var rootNode = this.model.root;
        return propIndexPaths.reduce(function (parent, segment) {
            var fitting = parent.children.filter(function (n) { return JsonFormsTree.Node.is(n) && n.jsonforms.property === segment.property && n.jsonforms.index === segment.index; });
            return fitting[0];
        }, rootNode.children[0]);
    };
    JsonFormsTreeWidget.prototype.select = function (paths) {
        if (paths.length === 0) {
            return;
        }
        var rootNode = this.model.root;
        var toSelect = paths.reduceRight(function (node, path) { return node.children.find(function (value) { return value.name === path; }); }, rootNode);
        this.model.selectNode(toSelect);
        this.model.refresh();
    };
    Object.defineProperty(JsonFormsTreeWidget.prototype, "onSelectionChange", {
        get: function () {
            return this.onTreeWidgetSelectionEmitter.event;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(JsonFormsTreeWidget.prototype, "onDelete", {
        get: function () {
            return this.onDeleteEmitter.event;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(JsonFormsTreeWidget.prototype, "onAdd", {
        get: function () {
            return this.onAddEmitter.event;
        },
        enumerable: true,
        configurable: true
    });
    JsonFormsTreeWidget.prototype.refreshModelChildren = function () {
        return __awaiter(this, void 0, void 0, function () {
            var newTree;
            return __generator(this, function (_a) {
                if (this.model.root && JsonFormsTree.RootNode.is(this.model.root)) {
                    newTree = !this.data || this.data.error ? [] : this.nodeFactory.mapDataToNodes(this.data);
                    this.model.root.children = newTree;
                    this.model.refresh();
                }
                return [2 /*return*/];
            });
        });
    };
    JsonFormsTreeWidget.prototype.defaultNode = function () {
        return {
            id: v4(),
            expanded: false,
            selected: false,
            parent: undefined,
            decorationData: {},
            children: []
        };
    };
    JsonFormsTreeWidget.prototype.isExpandable = function (node) {
        return JsonFormsTree.Node.is(node) && node.children.length > 0;
    };
    JsonFormsTreeWidget.prototype.renderIcon = function (node) {
        return (React.createElement("div", { className: 'tree-icon-container' },
            React.createElement("div", { className: this.labelProvider.getIconClass(node) })));
    };
    /**
     * Updates the data of the given node with the new data. Refreshes the tree if necessary.
     * Note that this method will only work properly if only data relevant for this node was changed.
     * If data of the subtree was changed too please call updateDataForSubtree instead.
     */
    JsonFormsTreeWidget.prototype.updateDataForNode = function (node, data) {
        Object.assign(node.jsonforms.data, data);
        var newName = this.labelProvider.getName(data);
        if (node.name !== newName) {
            node.name = newName;
            this.model.refresh();
        }
    };
    /**
     * Updates the data of the given node and recreates its whole subtree. Refreshes the tree.
     */
    JsonFormsTreeWidget.prototype.updateDataForSubtree = function (node, data) {
        Object.assign(node.jsonforms.data, data);
        var newNode = this.nodeFactory.mapData(data);
        node.name = newNode.name;
        node.children = newNode.children;
        this.model.refresh();
    };
    JsonFormsTreeWidget.prototype.addChildren = function (node, data, property) {
        var _this = this;
        var currentValue = node.jsonforms.data[property];
        var index = 0;
        if (Array.isArray(currentValue)) {
            index = currentValue.length;
        }
        data.map(function (d, i) { return _this.nodeFactory.mapData(d, node, property, d.eClass, index + i); });
        this.updateIndex(node, property);
        this.model.refresh();
    };
    JsonFormsTreeWidget.prototype.removeChildren = function (node, indices, property) {
        var toDelete = node.children.filter(function (n) {
            return JsonFormsTree.Node.is(n) &&
                n.jsonforms.property === property &&
                indices.includes(Number(n.jsonforms.index));
        }).map(function (n) { return node.children.indexOf(n); });
        toDelete.forEach(function (i) { return node.children.splice(i, 1); });
        this.updateIndex(node, property);
        this.model.refresh();
    };
    JsonFormsTreeWidget.prototype.updateIndex = function (node, property) {
        var realIndex = 0;
        node.children.forEach(function (n, i) {
            if (JsonFormsTree.Node.is(n) && n.jsonforms.property === property) {
                n.jsonforms.index = realIndex.toString();
                realIndex++;
            }
        });
    };
    var JsonFormsTreeWidget_1;
    __decorate([
        postConstruct(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], JsonFormsTreeWidget.prototype, "init", null);
    JsonFormsTreeWidget = JsonFormsTreeWidget_1 = __decorate([
        injectable(),
        __param(0, inject(TreeProps)),
        __param(1, inject(TreeModel)),
        __param(2, inject(ContextMenuRenderer)),
        __param(3, inject(JsonFormsTree.LabelProvider)),
        __param(4, inject(JsonFormsTree.NodeFactory)),
        __metadata("design:paramtypes", [Object, Object, Object, Object, Object])
    ], JsonFormsTreeWidget);
    return JsonFormsTreeWidget;
}(TreeWidget));
export { JsonFormsTreeWidget };
(function (JsonFormsTreeWidget) {
    JsonFormsTreeWidget.WIDGET_ID = 'json-forms-tree';
    JsonFormsTreeWidget.WIDGET_LABEL = 'JSONForms Tree';
    /**
     * CSS styles for the `JSONForms Hierarchy` widget.
     */
    var Styles;
    (function (Styles) {
        Styles.JSONFORMS_TREE_CLASS = 'json-forms-tree';
    })(Styles = JsonFormsTreeWidget.Styles || (JsonFormsTreeWidget.Styles = {}));
})(JsonFormsTreeWidget || (JsonFormsTreeWidget = {}));
//# sourceMappingURL=json-forms-tree-widget.js.map