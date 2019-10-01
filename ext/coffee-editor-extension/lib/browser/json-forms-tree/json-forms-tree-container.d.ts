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
import { Command, CommandHandler, MenuPath } from '@theia/core';
import { ApplicationShell, OpenerService } from '@theia/core/lib/browser';
import { TreeProps } from '@theia/core/lib/browser/tree';
import URI from '@theia/core/lib/common/uri';
import { interfaces } from 'inversify';
import { JsonFormsTreeEditorWidget } from '../json-forms-tree-editor/json-forms-tree-editor-widget';
import { JsonFormsTree } from './json-forms-tree';
import { JsonFormsTreeWidget } from './json-forms-tree-widget';
export interface ChildrenDescriptor {
    property: string;
    children: string[];
}
export declare namespace JsonFormsTreeContextMenu {
    const CONTEXT_MENU: MenuPath;
    const ADD_MENU: MenuPath;
}
export declare namespace JsonFormsTreeCommands {
    const OPEN_WORKFLOW_DIAGRAM: Command;
    function generateAddCommands(): Map<string, Map<string, Command>>;
}
export interface JsonFormsTreeAnchor {
    x: number;
    y: number;
    node: JsonFormsTree.Node;
    onClick: (property: string, eClass: string) => void;
}
export declare class AddCommandHandler implements CommandHandler {
    private readonly property;
    private readonly eclass;
    constructor(property: string, eclass: string);
    execute(treeAnchor: JsonFormsTreeAnchor): void;
    isVisible(treeAnchor: JsonFormsTreeAnchor): boolean;
}
export declare class OpenWorkflowDiagramCommandHandler implements CommandHandler {
    protected readonly shell: ApplicationShell;
    protected readonly openerService: OpenerService;
    constructor(shell: ApplicationShell, openerService: OpenerService);
    execute(): void;
    isVisible(): boolean;
    getTreeEditorWidget(): JsonFormsTreeEditorWidget | undefined;
    getSelectedWorkflow(widget: JsonFormsTreeEditorWidget): JsonFormsTree.Node | undefined;
    getNotationUri(widget: JsonFormsTreeEditorWidget): URI;
    createServerOptions(node: JsonFormsTree.Node): {
        serverOptions: {
            workflowIndex: string;
        };
    };
}
export declare const JSON_FORMS_TREE_PROPS: TreeProps;
export declare function createJsonFormsTreeWidget(parent: interfaces.Container): JsonFormsTreeWidget;
