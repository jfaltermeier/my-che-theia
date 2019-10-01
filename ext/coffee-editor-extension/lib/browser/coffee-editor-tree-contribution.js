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
import { ApplicationShell, NavigatableWidgetOpenHandler, OpenerService } from '@theia/core/lib/browser';
import { inject, injectable } from 'inversify';
import { JsonFormsTreeEditorWidget } from './json-forms-tree-editor/json-forms-tree-editor-widget';
import { JsonFormsTree } from './json-forms-tree/json-forms-tree';
import { AddCommandHandler, JsonFormsTreeCommands, JsonFormsTreeContextMenu, OpenWorkflowDiagramCommandHandler, } from './json-forms-tree/json-forms-tree-container';
var CoffeeTreeEditorContribution = /** @class */ (function (_super) {
    __extends(CoffeeTreeEditorContribution, _super);
    function CoffeeTreeEditorContribution() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.id = JsonFormsTreeEditorWidget.WIDGET_ID;
        _this.label = JsonFormsTreeEditorWidget.WIDGET_LABEL;
        return _this;
    }
    /**
     * @returns maps property name to EClass identifiers to their corresponding add command
     */
    CoffeeTreeEditorContribution.prototype.getCommandMap = function () {
        if (!this.commandMap) {
            this.commandMap = JsonFormsTreeCommands.generateAddCommands();
        }
        return this.commandMap;
    };
    CoffeeTreeEditorContribution.prototype.canHandle = function (uri) {
        if (uri.path.ext === '.coffee') {
            return 1000;
        }
        return 0;
    };
    CoffeeTreeEditorContribution.prototype.registerCommands = function (commands) {
        commands.registerCommand(JsonFormsTreeCommands.OPEN_WORKFLOW_DIAGRAM, new OpenWorkflowDiagramCommandHandler(this.shell, this.opener));
        this.getCommandMap().forEach(function (value, property, _map) {
            value.forEach(function (command, eClass) { return commands.registerCommand(command, new AddCommandHandler(property, eClass)); });
        });
    };
    CoffeeTreeEditorContribution.prototype.registerMenus = function (menus) {
        var _this = this;
        menus.registerMenuAction(JsonFormsTreeContextMenu.CONTEXT_MENU, {
            commandId: JsonFormsTreeCommands.OPEN_WORKFLOW_DIAGRAM.id,
            label: JsonFormsTreeCommands.OPEN_WORKFLOW_DIAGRAM.label
        });
        this.getCommandMap().forEach(function (value, _property, _map) {
            value.forEach(function (command, eClass) {
                menus.registerMenuAction(JsonFormsTreeContextMenu.ADD_MENU, {
                    commandId: command.id,
                    label: command.label,
                    icon: _this.labelProvider.getIconClass(eClass)
                });
            });
        });
    };
    __decorate([
        inject(ApplicationShell),
        __metadata("design:type", ApplicationShell)
    ], CoffeeTreeEditorContribution.prototype, "shell", void 0);
    __decorate([
        inject(OpenerService),
        __metadata("design:type", Object)
    ], CoffeeTreeEditorContribution.prototype, "opener", void 0);
    __decorate([
        inject(JsonFormsTree.LabelProvider),
        __metadata("design:type", Object)
    ], CoffeeTreeEditorContribution.prototype, "labelProvider", void 0);
    CoffeeTreeEditorContribution = __decorate([
        injectable()
    ], CoffeeTreeEditorContribution);
    return CoffeeTreeEditorContribution;
}(NavigatableWidgetOpenHandler));
export { CoffeeTreeEditorContribution };
//# sourceMappingURL=coffee-editor-tree-contribution.js.map