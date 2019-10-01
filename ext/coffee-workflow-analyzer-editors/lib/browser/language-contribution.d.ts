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
import { BaseLanguageClientContribution, LanguageClientFactory, Languages, Workspace } from '@theia/languages/lib/browser';
export declare class WorkflowClientContribution extends BaseLanguageClientContribution {
    protected readonly workspace: Workspace;
    protected readonly languages: Languages;
    protected readonly languageClientFactory: LanguageClientFactory;
    readonly id = "wfconfig";
    readonly name = "WFCONFIG";
    constructor(workspace: Workspace, languages: Languages, languageClientFactory: LanguageClientFactory);
    protected readonly globPatterns: string[];
}
export declare function registerDSL(): void;
//# sourceMappingURL=language-contribution.d.ts.map