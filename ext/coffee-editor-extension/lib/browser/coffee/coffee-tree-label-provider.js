var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import URI from '@theia/core/lib/common/uri';
import { injectable } from 'inversify';
import { CoffeeModel } from '../json-forms-tree/coffee-model';
import { JsonFormsTree } from '../json-forms-tree/json-forms-tree';
var DEFAULT_COLOR = 'black';
var ICON_CLASSES = new Map([
    [CoffeeModel.Type.AutomaticTask, 'fa-cog ' + DEFAULT_COLOR],
    [CoffeeModel.Type.BrewingUnit, 'fa-burn ' + DEFAULT_COLOR],
    [CoffeeModel.Type.Component, 'fa-cube ' + DEFAULT_COLOR],
    [CoffeeModel.Type.ControlUnit, 'fa-server ' + DEFAULT_COLOR],
    [CoffeeModel.Type.Decision, 'fa-code-branch fa-rotate-90 ' + DEFAULT_COLOR],
    [CoffeeModel.Type.Dimension, 'fa-arrows-alt ' + DEFAULT_COLOR],
    [CoffeeModel.Type.DipTray, 'fa-inbox ' + DEFAULT_COLOR],
    [CoffeeModel.Type.Display, 'fa-tv ' + DEFAULT_COLOR],
    [CoffeeModel.Type.Flow, 'fa-exchange-alt ' + DEFAULT_COLOR],
    [CoffeeModel.Type.Fork, 'fa-code-branch fa-rotate-90 ' + DEFAULT_COLOR],
    [CoffeeModel.Type.Join, 'fa-code-branch fa-rotate-270 ' + DEFAULT_COLOR],
    [CoffeeModel.Type.Machine, 'fa-cogs ' + DEFAULT_COLOR],
    [CoffeeModel.Type.ManualTask, 'fa-wrench ' + DEFAULT_COLOR],
    [CoffeeModel.Type.Merge, 'fa-code-branch fa-rotate-270 ' + DEFAULT_COLOR],
    [CoffeeModel.Type.Node, 'fa-circle ' + DEFAULT_COLOR],
    [CoffeeModel.Type.Processor, 'fa-microchip ' + DEFAULT_COLOR],
    [CoffeeModel.Type.RAM, 'fa-memory ' + DEFAULT_COLOR],
    [CoffeeModel.Type.Task, 'fa-tasks ' + DEFAULT_COLOR],
    [CoffeeModel.Type.WaterTank, 'fa-water ' + DEFAULT_COLOR],
    [CoffeeModel.Type.WeightedFlow, 'fa-exchange-alt light-orange'],
]);
/* Icon for unknown types */
var UNKNOWN_ICON = 'fa-question-circle ' + DEFAULT_COLOR;
var CoffeeTreeLabelProvider = /** @class */ (function () {
    function CoffeeTreeLabelProvider() {
    }
    CoffeeTreeLabelProvider.prototype.getIconClass = function (node) {
        var iconClass;
        if (typeof node === 'string') {
            iconClass = ICON_CLASSES.get(node);
        }
        else if (JsonFormsTree.Node.is(node)) {
            iconClass = ICON_CLASSES.get(node.jsonforms.type);
        }
        return iconClass ? 'fa ' + iconClass : 'far ' + UNKNOWN_ICON;
    };
    CoffeeTreeLabelProvider.prototype.getName = function (data) {
        if (data.eClass) {
            switch (data.eClass) {
                case 'http://www.eclipsesource.com/modelserver/example/coffeemodel#//Task':
                case 'http://www.eclipsesource.com/modelserver/example/coffeemodel#//AutomaticTask':
                case 'http://www.eclipsesource.com/modelserver/example/coffeemodel#//ManualTask':
                case 'http://www.eclipsesource.com/modelserver/example/coffeemodel#//Machine':
                    return data.name;
                default:
                    // TODO query title of schema
                    var fragment = new URI(data.eClass).fragment;
                    if (fragment.startsWith('//')) {
                        return fragment.substring(2);
                    }
                    return fragment;
            }
        }
        // guess
        if (data.nodes) {
            return data.name || 'Workflow';
        }
        return undefined;
    };
    CoffeeTreeLabelProvider = __decorate([
        injectable()
    ], CoffeeTreeLabelProvider);
    return CoffeeTreeLabelProvider;
}());
export { CoffeeTreeLabelProvider };
//# sourceMappingURL=coffee-tree-label-provider.js.map