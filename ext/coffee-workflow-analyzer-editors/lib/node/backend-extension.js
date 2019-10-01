"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
var node_1 = require("@theia/languages/lib/node");
var inversify_1 = require("inversify");
var language_contribution_1 = require("./language-contribution");
exports.default = new inversify_1.ContainerModule(function (bind) {
    bind(node_1.LanguageServerContribution).to(language_contribution_1.WorkflowContribution);
});
//# sourceMappingURL=backend-extension.js.map