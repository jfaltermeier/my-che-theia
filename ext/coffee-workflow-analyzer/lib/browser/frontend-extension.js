"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
var location_mapper_service_1 = require("@theia/mini-browser/lib/browser/location-mapper-service");
var inversify_1 = require("inversify");
var request_file_protocol_1 = require("../common/request-file-protocol");
var workflow_analyze_protocol_1 = require("../common/workflow-analyze-protocol");
var analysis_service_1 = require("./analysis-service");
var command_contribution_1 = require("./command-contribution");
var editor_contribution_1 = require("./editor-contribution");
exports.default = new inversify_1.ContainerModule(function (bind) {
    bind(analysis_service_1.AnalysisService).toSelf().inSingletonScope();
    bind(command_contribution_1.WorkflowCommandContribution).toSelf().inSingletonScope();
    bind(WorkflowFileClient).toSelf();
    bind(request_file_protocol_1.IFileServer).toDynamicValue(function (ctx) {
        var connection = ctx.container.get(browser_1.WebSocketConnectionProvider);
        var client = ctx.container.get(WorkflowFileClient);
        return connection.createProxy(request_file_protocol_1.filePath, client);
    }).inSingletonScope();
    bind(analysis_service_1.WorkflowAnalysisClientImpl).toSelf().inSingletonScope();
    bind(workflow_analyze_protocol_1.WorkflowAnalyzer).toDynamicValue(function (ctx) {
        var connection = ctx.container.get(browser_1.WebSocketConnectionProvider);
        var client = ctx.container.get(analysis_service_1.WorkflowAnalysisClientImpl);
        return connection.createProxy(workflow_analyze_protocol_1.workflowServicePath, client);
    }).inSingletonScope();
    bind(browser_1.OpenHandler).to(editor_contribution_1.AnalysisEditorOpenHandler);
    bind(location_mapper_service_1.LocationMapper).to(editor_contribution_1.WorkflowFileLocationMapper);
    [core_1.CommandContribution, core_1.MenuContribution].forEach(function (s) { return bind(s).to(command_contribution_1.WorkflowCommandContribution); });
});
var WorkflowFileClient = /** @class */ (function () {
    function WorkflowFileClient() {
    }
    WorkflowFileClient = __decorate([
        inversify_1.injectable()
    ], WorkflowFileClient);
    return WorkflowFileClient;
}());
exports.WorkflowFileClient = WorkflowFileClient;
//# sourceMappingURL=frontend-extension.js.map