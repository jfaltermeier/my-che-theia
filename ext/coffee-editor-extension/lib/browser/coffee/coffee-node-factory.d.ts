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
import { ILogger } from '@theia/core';
import { JsonFormsTree } from '../json-forms-tree/json-forms-tree';
export declare class CoffeeTreeNodeFactory implements JsonFormsTree.NodeFactory {
    private readonly labelProvider;
    private readonly logger;
    constructor(labelProvider: JsonFormsTree.LabelProvider, logger: ILogger);
    mapDataToNodes(treeData: JsonFormsTree.TreeData): JsonFormsTree.Node[];
    mapData(currentData: any, parent?: JsonFormsTree.Node, property?: string, type?: string, index?: number): JsonFormsTree.Node;
    hasCreatableChildren(node: JsonFormsTree.Node): boolean;
    protected defaultNode(): Pick<JsonFormsTree.Node, 'id' | 'expanded' | 'selected' | 'parent' | 'decorationData' | 'children'>;
    protected getType(type: string, data: any): string;
}
