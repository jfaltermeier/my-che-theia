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
var core_1 = require("@theia/core");
var browser_1 = require("@theia/core/lib/browser");
var inversify_1 = require("inversify");
var generate_protocol_1 = require("../common/generate-protocol");
var command_contribution_1 = require("./command-contribution");
var generate_code_service_1 = require("./generate-code-service");
var junit_run_service_1 = require("./junit-run-service");
exports.default = new inversify_1.ContainerModule(function (bind) {
    bind(junit_run_service_1.JUnitRunService).toSelf().inSingletonScope();
    bind(generate_code_service_1.GenerateCodeService).toSelf().inSingletonScope();
    bind(command_contribution_1.JavaGenerationCommandContribution).toSelf().inSingletonScope();
    [core_1.CommandContribution, core_1.MenuContribution].forEach(function (s) { return bind(s).toService(command_contribution_1.JavaGenerationCommandContribution); });
    bind(generate_protocol_1.CodeGenServer).toDynamicValue(function (ctx) {
        var connection = ctx.container.get(browser_1.WebSocketConnectionProvider);
        return connection.createProxy(generate_protocol_1.CODEGEN_SERVICE_PATH);
    }).inSingletonScope();
});
//# sourceMappingURL=frontend-extension.js.map