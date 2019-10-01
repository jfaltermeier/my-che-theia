export var JsonFormsTree;
(function (JsonFormsTree) {
    var RootNode;
    (function (RootNode) {
        function is(node) {
            return !!node;
        }
        RootNode.is = is;
    })(RootNode = JsonFormsTree.RootNode || (JsonFormsTree.RootNode = {}));
    /**
     * Encapsulates logic to create the tree nodes from the tree's input data.
     */
    JsonFormsTree.NodeFactory = Symbol('NodeFactory');
    /**
     * Label provider for the tree providing icons and display names for tree nodes.
     */
    JsonFormsTree.LabelProvider = Symbol('LabelProvider');
    var Node;
    (function (Node) {
        function is(node) {
            if (!!node && 'jsonforms' in node) {
                var jsonforms = node.jsonforms;
                return !!jsonforms;
            }
            return false;
        }
        Node.is = is;
        function hasType(node, type) {
            return is(node) && node.jsonforms.type === type;
        }
        Node.hasType = hasType;
    })(Node = JsonFormsTree.Node || (JsonFormsTree.Node = {}));
})(JsonFormsTree || (JsonFormsTree = {}));
//# sourceMappingURL=json-forms-tree.js.map