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
import { CommandContribution, CommandRegistry, MenuContribution, MenuModelRegistry } from '@theia/core';
import { ApplicationShell, NavigatableWidgetOpenHandler, OpenerService } from '@theia/core/lib/browser';
import URI from '@theia/core/lib/common/uri';
import { JsonFormsTreeEditorWidget } from './json-forms-tree-editor/json-forms-tree-editor-widget';
import { JsonFormsTree } from './json-forms-tree/json-forms-tree';
export declare class CoffeeTreeEditorContribution extends NavigatableWidgetOpenHandler<JsonFormsTreeEditorWidget> implements CommandContribution, MenuContribution {
    protected shell: ApplicationShell;
    protected opener: OpenerService;
    protected labelProvider: JsonFormsTree.LabelProvider;
    readonly id = "json-forms-tree-editor";
    readonly label = "JSONForms Tree Editor";
    private commandMap;
    /**
     * @returns maps property name to EClass identifiers to their corresponding add command
     */
    private getCommandMap;
    canHandle(uri: URI): number;
    registerCommands(commands: CommandRegistry): void;
    registerMenus(menus: MenuModelRegistry): void;
}
