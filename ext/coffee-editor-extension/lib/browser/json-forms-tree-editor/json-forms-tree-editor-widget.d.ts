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
import { ModelServerClient } from '@modelserver/theia/lib/common';
import { BaseWidget, Message, Navigatable, Saveable } from '@theia/core/lib/browser';
import { Emitter, Event, ILogger } from '@theia/core/lib/common';
import URI from '@theia/core/lib/common/uri';
import { WorkspaceService } from '@theia/workspace/lib/browser/workspace-service';
import { JsonFormsTree } from '../json-forms-tree/json-forms-tree';
import { JsonFormsTreeWidget } from '../json-forms-tree/json-forms-tree-widget';
import { JSONFormsWidget } from './json-forms-widget';
export declare const JsonFormsTreeEditorWidgetOptions: unique symbol;
export interface JsonFormsTreeEditorWidgetOptions {
    uri: URI;
}
export declare class JsonFormsTreeEditorWidget extends BaseWidget implements Navigatable, Saveable {
    protected readonly options: JsonFormsTreeEditorWidgetOptions;
    private readonly treeWidget;
    private readonly formWidget;
    protected readonly modelServerApi: ModelServerClient;
    protected readonly workspaceService: WorkspaceService;
    private readonly logger;
    private readonly subscriptionService;
    dirty: boolean;
    autoSave: 'off';
    private splitPanel;
    protected readonly onDirtyChangedEmitter: Emitter<void>;
    readonly onDirtyChanged: Event<void>;
    selectedNode: JsonFormsTree.Node;
    protected instanceData: any;
    constructor(options: JsonFormsTreeEditorWidgetOptions, treeWidget: JsonFormsTreeWidget, formWidget: JSONFormsWidget, modelServerApi: ModelServerClient, workspaceService: WorkspaceService, logger: ILogger, subscriptionService: ModelServerSubscriptionService);
    private getOldSelectedPath;
    uri(): URI;
    save(): void;
    protected onResize(_msg: any): void;
    getModelIDToRequest(): string;
    getResourceUri(): URI | undefined;
    createMoveToUri(resourceUri: URI): URI | undefined;
    protected renderError(errorMessage: string): void;
    protected treeSelectionChanged(selectedNodes: readonly Readonly<JsonFormsTree.Node>[]): void;
    private getNodeDescription;
    private deleteNode;
    private addNode;
    protected onAfterAttach(msg: Message): void;
    protected onActivateRequest(): void;
    dispose(): void;
}
export declare namespace JsonFormsTreeEditorWidget {
    const WIDGET_ID = "json-forms-tree-editor";
    const WIDGET_LABEL = "JSONForms Tree Editor";
    namespace Styles {
        const JSONFORMS_TREE_EDITOR_CLASS = "json-forms-tree-editor";
    }
}
