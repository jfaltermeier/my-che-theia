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
var request_file_protocol_1 = require("../common/request-file-protocol");
var workflow_analyze_protocol_1 = require("../common/workflow-analyze-protocol");
var file_server_1 = require("./file-server");
var workflow_analysis_server_1 = require("./workflow-analysis-server");
exports.default = new inversify_1.ContainerModule(function (bind) {
    bind(request_file_protocol_1.IFileServer).to(file_server_1.WorkflowFileServer).inSingletonScope();
    bind(core_1.ConnectionHandler).toDynamicValue(function (ctx) {
        return new core_1.JsonRpcConnectionHandler(request_file_protocol_1.filePath, function (client) {
            var fileServer = ctx.container.get(request_file_protocol_1.IFileServer);
            fileServer.setClient(client);
            return fileServer;
        });
    }).inSingletonScope();
    bind(workflow_analysis_server_1.WorkflowAnalysisServer).toSelf().inSingletonScope();
    bind(node_1.BackendApplicationContribution).toService(workflow_analysis_server_1.WorkflowAnalysisServer);
    bind(core_1.ConnectionHandler).toDynamicValue(function (ctx) {
        return new core_1.JsonRpcConnectionHandler(workflow_analyze_protocol_1.workflowServicePath, function (client) {
            var analysisServer = ctx.container.get(workflow_analysis_server_1.WorkflowAnalysisServer);
            analysisServer.setClient(client);
            return analysisServer;
        });
    }).inSingletonScope();
});
//# sourceMappingURL=backend-extension.js.map