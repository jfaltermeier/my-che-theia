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
import { ModelServerObject } from '@modelserver/theia';
import { Emitter } from '@theia/core';
import { ExpandableTreeNode, TreeModel } from '@theia/core/lib/browser';
import { ContextMenuRenderer } from '@theia/core/lib/browser/context-menu-renderer';
import { TreeNode } from '@theia/core/lib/browser/tree/tree';
import { NodeProps, TreeProps, TreeWidget } from '@theia/core/lib/browser/tree/tree-widget';
import * as React from 'react';
import { JsonFormsTree } from './json-forms-tree';
export interface AddCommandProperty {
    node: JsonFormsTree.Node;
    property: string;
    eClass: string;
}
export declare class JsonFormsTreeWidget extends TreeWidget {
    readonly props: TreeProps;
    readonly model: TreeModel;
    readonly contextMenuRenderer: ContextMenuRenderer;
    readonly labelProvider: JsonFormsTree.LabelProvider;
    protected readonly nodeFactory: JsonFormsTree.NodeFactory;
    protected onTreeWidgetSelectionEmitter: Emitter<readonly Readonly<JsonFormsTree.Node>[]>;
    protected onDeleteEmitter: Emitter<Readonly<JsonFormsTree.Node>>;
    protected onAddEmitter: Emitter<Readonly<AddCommandProperty>>;
    protected data: JsonFormsTree.TreeData;
    constructor(props: TreeProps, model: TreeModel, contextMenuRenderer: ContextMenuRenderer, labelProvider: JsonFormsTree.LabelProvider, nodeFactory: JsonFormsTree.NodeFactory);
    protected init(): void;
    /** Overrides method in TreeWidget */
    protected handleClickEvent(node: TreeNode | undefined, event: React.MouseEvent<HTMLElement>): void;
    protected renderTailDecorations(node: TreeNode, props: NodeProps): React.ReactNode;
    /**
     * Creates a handler for the delete button of a tree node.
     * @param node The tree node to create a remove handler for
     */
    private createRemoveHandler;
    private createAddHandler;
    setData(data: any): Promise<void>;
    selectFirst(): void;
    findNode(propIndexPaths: {
        property: string;
        index?: string;
    }[]): JsonFormsTree.Node;
    select(paths: string[]): void;
    readonly onSelectionChange: import('@theia/core').Event<readonly Readonly<JsonFormsTree.Node>[]>;
    readonly onDelete: import('@theia/core').Event<Readonly<JsonFormsTree.Node>>;
    readonly onAdd: import('@theia/core').Event<Readonly<AddCommandProperty>>;
    protected refreshModelChildren(): Promise<void>;
    protected defaultNode(): Pick<JsonFormsTree.Node, 'id' | 'expanded' | 'selected' | 'parent' | 'decorationData' | 'children'>;
    protected isExpandable(node: TreeNode): node is ExpandableTreeNode;
    protected renderIcon(node: TreeNode): React.ReactNode;
    /**
     * Updates the data of the given node with the new data. Refreshes the tree if necessary.
     * Note that this method will only work properly if only data relevant for this node was changed.
     * If data of the subtree was changed too please call updateDataForSubtree instead.
     */
    updateDataForNode(node: JsonFormsTree.Node, data: any): void;
    /**
     * Updates the data of the given node and recreates its whole subtree. Refreshes the tree.
     */
    updateDataForSubtree(node: JsonFormsTree.Node, data: any): void;
    addChildren(node: JsonFormsTree.Node, data: ModelServerObject[], property: string): void;
    removeChildren(node: JsonFormsTree.Node, indices: number[], property: string): void;
    private updateIndex;
}
export declare namespace JsonFormsTreeWidget {
    const WIDGET_ID = "json-forms-tree";
    const WIDGET_LABEL = "JSONForms Tree";
    /**
     * CSS styles for the `JSONForms Hierarchy` widget.
     */
    namespace Styles {
        const JSONFORMS_TREE_CLASS = "json-forms-tree";
    }
}
