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
import URI from '@theia/core/lib/common/uri';
export var CoffeeModel;
(function (CoffeeModel) {
    var Type;
    (function (Type) {
        Type.AutomaticTask = 'http://www.eclipsesource.com/modelserver/example/coffeemodel#//AutomaticTask';
        Type.BrewingUnit = 'http://www.eclipsesource.com/modelserver/example/coffeemodel#//BrewingUnit';
        Type.Component = 'http://www.eclipsesource.com/modelserver/example/coffeemodel#//Component';
        Type.ControlUnit = 'http://www.eclipsesource.com/modelserver/example/coffeemodel#//ControlUnit';
        Type.Decision = 'http://www.eclipsesource.com/modelserver/example/coffeemodel#//Decision';
        Type.Dimension = 'http://www.eclipsesource.com/modelserver/example/coffeemodel#//Dimension';
        Type.DipTray = 'http://www.eclipsesource.com/modelserver/example/coffeemodel#//DipTray';
        Type.Display = 'http://www.eclipsesource.com/modelserver/example/coffeemodel#//Display';
        Type.Flow = 'http://www.eclipsesource.com/modelserver/example/coffeemodel#//Flow';
        Type.Fork = 'http://www.eclipsesource.com/modelserver/example/coffeemodel#//Fork';
        Type.Join = 'http://www.eclipsesource.com/modelserver/example/coffeemodel#//Join';
        Type.Machine = 'http://www.eclipsesource.com/modelserver/example/coffeemodel#//Machine';
        Type.ManualTask = 'http://www.eclipsesource.com/modelserver/example/coffeemodel#//ManualTask';
        Type.Merge = 'http://www.eclipsesource.com/modelserver/example/coffeemodel#//Merge';
        Type.Node = 'http://www.eclipsesource.com/modelserver/example/coffeemodel#//Node';
        Type.Processor = 'http://www.eclipsesource.com/modelserver/example/coffeemodel#//Processor';
        Type.RAM = 'http://www.eclipsesource.com/modelserver/example/coffeemodel#//RAM';
        Type.Task = 'http://www.eclipsesource.com/modelserver/example/coffeemodel#//Task';
        Type.WaterTank = 'http://www.eclipsesource.com/modelserver/example/coffeemodel#//WaterTank';
        Type.WeightedFlow = 'http://www.eclipsesource.com/modelserver/example/coffeemodel#//WeightedFlow';
        Type.Workflow = 'http://www.eclipsesource.com/modelserver/example/coffeemodel#//Workflow';
        function name(type) {
            return new URI(type).fragment.substring(2);
        }
        Type.name = name;
    })(Type = CoffeeModel.Type || (CoffeeModel.Type = {}));
    var components = [
        Type.Component,
        Type.Machine,
        Type.ControlUnit,
        Type.BrewingUnit,
        Type.DipTray,
        Type.WaterTank
    ];
    var nodes = [
        Type.AutomaticTask,
        Type.Decision,
        Type.Fork,
        Type.Join,
        Type.ManualTask,
        Type.Merge
    ];
    var flows = [
        Type.Flow,
        Type.WeightedFlow
    ];
    /** Maps types to their creatable children */
    CoffeeModel.childrenMapping = new Map([
        [
            Type.BrewingUnit, [
                {
                    property: 'children',
                    children: components
                }
            ]
        ],
        [
            Type.Component, [
                {
                    property: 'children',
                    children: components
                },
                {
                    property: 'workflows',
                    children: [Type.Workflow]
                }
            ]
        ],
        [
            Type.ControlUnit, [
                {
                    property: 'children',
                    children: components
                }
            ]
        ],
        [
            Type.DipTray, [
                {
                    property: 'children',
                    children: components
                }
            ]
        ],
        [
            Type.Machine, [
                {
                    property: 'children',
                    children: components
                },
                {
                    property: 'workflows',
                    children: [Type.Workflow]
                }
            ]
        ],
        [
            Type.WaterTank, [
                {
                    property: 'children',
                    children: components
                }
            ]
        ],
        [
            Type.Workflow, [
                {
                    property: 'flows',
                    children: flows
                },
                {
                    property: 'nodes',
                    children: nodes
                }
            ]
        ],
    ]);
})(CoffeeModel || (CoffeeModel = {}));
//# sourceMappingURL=coffee-model.js.map