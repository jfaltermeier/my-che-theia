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
import { createTreeContainer, defaultTreeProps, TreeProps, TreeWidget } from '@theia/core/lib/browser/tree';
import { JsonFormsTreeEditorWidget } from '../json-forms-tree-editor/json-forms-tree-editor-widget';
import { CoffeeModel } from './coffee-model';
import { JsonFormsTree } from './json-forms-tree';
import { JsonFormsTreeWidget } from './json-forms-tree-widget';
export var JsonFormsTreeContextMenu;
(function (JsonFormsTreeContextMenu) {
    JsonFormsTreeContextMenu.CONTEXT_MENU = ['json-forms-tree-context-menu'];
    JsonFormsTreeContextMenu.ADD_MENU = ['json-forms-tree-add-menu'];
})(JsonFormsTreeContextMenu || (JsonFormsTreeContextMenu = {}));
export var JsonFormsTreeCommands;
(function (JsonFormsTreeCommands) {
    JsonFormsTreeCommands.OPEN_WORKFLOW_DIAGRAM = {
        id: 'workflow.open',
        label: 'Open Workflow Diagram'
    };
    function generateAddCommands() {
        var creatableTypes = Array.from(CoffeeModel.childrenMapping, function (_a) {
            var _b = __read(_a, 2), _key = _b[0], value = _b[1];
            return value;
        })
            // get flat array of child descriptors
            .reduce(function (acc, val) { return acc.concat(val); }, [])
            // unify by adding to set
            .reduce(function (acc, val) { return acc.add(val); }, new Set());
        // Create a command for every eclass which can be added to at least one model object
        var commandMap = new Map();
        Array.from(creatableTypes).forEach(function (desc) {
            var classCommandMap = new Map();
            desc.children.forEach(function (eclass) {
                var name = CoffeeModel.Type.name(eclass);
                var command = {
                    id: 'json-forms-tree.add.' + name,
                    label: name
                };
                classCommandMap.set(eclass, command);
            });
            commandMap.set(desc.property, classCommandMap);
        });
        return commandMap;
    }
    JsonFormsTreeCommands.generateAddCommands = generateAddCommands;
})(JsonFormsTreeCommands || (JsonFormsTreeCommands = {}));
var AddCommandHandler = /** @class */ (function () {
    function AddCommandHandler(property, eclass) {
        this.property = property;
        this.eclass = eclass;
    }
    AddCommandHandler.prototype.execute = function (treeAnchor) {
        treeAnchor.onClick(this.property, this.eclass);
    };
    AddCommandHandler.prototype.isVisible = function (treeAnchor) {
        if (!treeAnchor) {
            return false;
        }
        return CoffeeModel.childrenMapping.get(treeAnchor.node.jsonforms.type)
            .map(function (desc) { return desc.children; })
            .reduce(function (acc, val) { return acc.concat(val); }, [])
            .reduce(function (acc, val) { return acc.add(val); }, new Set())
            .has(this.eclass);
    };
    return AddCommandHandler;
}());
export { AddCommandHandler };
var OpenWorkflowDiagramCommandHandler = /** @class */ (function () {
    function OpenWorkflowDiagramCommandHandler(shell, openerService) {
        this.shell = shell;
        this.openerService = openerService;
    }
    OpenWorkflowDiagramCommandHandler.prototype.execute = function () {
        var _this = this;
        var editorWidget = this.getTreeEditorWidget();
        if (editorWidget) {
            var workflowNode_1 = this.getSelectedWorkflow(editorWidget);
            if (workflowNode_1) {
                var notationUri_1 = this.getNotationUri(editorWidget);
                this.openerService.getOpener(notationUri_1).then(function (opener) { return opener.open(notationUri_1, _this.createServerOptions(workflowNode_1)); });
            }
        }
    };
    OpenWorkflowDiagramCommandHandler.prototype.isVisible = function () {
        return this.getSelectedWorkflow(this.getTreeEditorWidget()) !== undefined;
    };
    OpenWorkflowDiagramCommandHandler.prototype.getTreeEditorWidget = function () {
        var currentWidget = this.shell.currentWidget;
        if (currentWidget instanceof JsonFormsTreeEditorWidget) {
            return currentWidget;
        }
        return undefined;
    };
    OpenWorkflowDiagramCommandHandler.prototype.getSelectedWorkflow = function (widget) {
        if (widget && JsonFormsTree.Node.hasType(widget.selectedNode, CoffeeModel.Type.Workflow)) {
            return widget.selectedNode;
        }
        return undefined;
    };
    OpenWorkflowDiagramCommandHandler.prototype.getNotationUri = function (widget) {
        var coffeeUri = widget.uri();
        var coffeeNotationUri = coffeeUri.parent.resolve(coffeeUri.displayName + 'notation');
        return coffeeNotationUri;
    };
    OpenWorkflowDiagramCommandHandler.prototype.createServerOptions = function (node) {
        return {
            serverOptions: {
                workflowIndex: node.jsonforms.index
            }
        };
    };
    return OpenWorkflowDiagramCommandHandler;
}());
export { OpenWorkflowDiagramCommandHandler };
function createJsonFormsTreeContainer(parent) {
    var child = createTreeContainer(parent);
    child.unbind(TreeWidget);
    child.bind(JsonFormsTreeWidget).toSelf();
    child.rebind(TreeProps).toConstantValue(JSON_FORMS_TREE_PROPS);
    return child;
}
export var JSON_FORMS_TREE_PROPS = __assign({}, defaultTreeProps, { contextMenuPath: JsonFormsTreeContextMenu.CONTEXT_MENU, multiSelect: false, search: false });
export function createJsonFormsTreeWidget(parent) {
    return createJsonFormsTreeContainer(parent).get(JsonFormsTreeWidget);
}
//# sourceMappingURL=json-forms-tree-container.js.map