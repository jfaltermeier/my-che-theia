import { ChildrenDescriptor } from './json-forms-tree-container';
export declare namespace CoffeeModel {
    namespace Type {
        const AutomaticTask = "http://www.eclipsesource.com/modelserver/example/coffeemodel#//AutomaticTask";
        const BrewingUnit = "http://www.eclipsesource.com/modelserver/example/coffeemodel#//BrewingUnit";
        const Component = "http://www.eclipsesource.com/modelserver/example/coffeemodel#//Component";
        const ControlUnit = "http://www.eclipsesource.com/modelserver/example/coffeemodel#//ControlUnit";
        const Decision = "http://www.eclipsesource.com/modelserver/example/coffeemodel#//Decision";
        const Dimension = "http://www.eclipsesource.com/modelserver/example/coffeemodel#//Dimension";
        const DipTray = "http://www.eclipsesource.com/modelserver/example/coffeemodel#//DipTray";
        const Display = "http://www.eclipsesource.com/modelserver/example/coffeemodel#//Display";
        const Flow = "http://www.eclipsesource.com/modelserver/example/coffeemodel#//Flow";
        const Fork = "http://www.eclipsesource.com/modelserver/example/coffeemodel#//Fork";
        const Join = "http://www.eclipsesource.com/modelserver/example/coffeemodel#//Join";
        const Machine = "http://www.eclipsesource.com/modelserver/example/coffeemodel#//Machine";
        const ManualTask = "http://www.eclipsesource.com/modelserver/example/coffeemodel#//ManualTask";
        const Merge = "http://www.eclipsesource.com/modelserver/example/coffeemodel#//Merge";
        const Node = "http://www.eclipsesource.com/modelserver/example/coffeemodel#//Node";
        const Processor = "http://www.eclipsesource.com/modelserver/example/coffeemodel#//Processor";
        const RAM = "http://www.eclipsesource.com/modelserver/example/coffeemodel#//RAM";
        const Task = "http://www.eclipsesource.com/modelserver/example/coffeemodel#//Task";
        const WaterTank = "http://www.eclipsesource.com/modelserver/example/coffeemodel#//WaterTank";
        const WeightedFlow = "http://www.eclipsesource.com/modelserver/example/coffeemodel#//WeightedFlow";
        const Workflow = "http://www.eclipsesource.com/modelserver/example/coffeemodel#//Workflow";
        function name(type: string): string;
    }
    /** Maps types to their creatable children */
    const childrenMapping: Map<string, ChildrenDescriptor[]>;
}
