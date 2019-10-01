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
var node_1 = require("@theia/core/lib/node");
var inversify_1 = require("inversify");
var generate_protocol_1 = require("../common/generate-protocol");
var coffee_codegen_server_1 = require("./coffee-codegen-server");
exports.default = new inversify_1.ContainerModule(function (bind) {
    bind(coffee_codegen_server_1.CoffeeCodeGenServer).toSelf().inSingletonScope();
    bind(node_1.BackendApplicationContribution).toService(coffee_codegen_server_1.CoffeeCodeGenServer);
    bind(core_1.ConnectionHandler).toDynamicValue(function (ctx) {
        return new core_1.JsonRpcConnectionHandler(generate_protocol_1.CODEGEN_SERVICE_PATH, function () {
            return ctx.container.get(coffee_codegen_server_1.CoffeeCodeGenServer);
        });
    }).inSingletonScope();
});
//# sourceMappingURL=backend-extension.js.map