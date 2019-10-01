"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
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
var node_1 = require("@theia/languages/lib/node");
var child_process_1 = require("child_process");
var glob = require("glob");
var inversify_1 = require("inversify");
var net = require("net");
var path = require("path");
var server_1 = require("vscode-ws-jsonrpc/lib/server");
function getPort() {
    var arg = process.argv.filter(function (argument) { return argument.startsWith('--WF_LSP='); })[0];
    if (!arg) {
        return undefined;
    }
    else {
        return Number.parseInt(arg.substring('--WF_LSP='.length));
    }
}
var WorkflowContribution = /** @class */ (function (_super) {
    __extends(WorkflowContribution, _super);
    function WorkflowContribution() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.description = {
            id: _this.id,
            name: _this.name,
            documentSelector: ['wfconfig'],
            fileEvents: [
                '**/*.wfconfig'
            ]
        };
        _this.id = 'wfconfig';
        _this.name = 'WFCONFIG';
        _this.serverConnection = undefined;
        _this.serverStarted = false;
        return _this;
    }
    WorkflowContribution.prototype.start = function (clientConnection) {
        var _this = this;
        this.logger.info('[WorkflowDSL] Start Server for Client Connection.');
        var socketPort = getPort();
        if (socketPort) {
            if (!this.serverStarted) {
                var command = 'java';
                var serverPath = path.resolve(__dirname, '..', '..', 'server');
                var jarPaths = glob.sync('**/plugins/org.eclipse.equinox.launcher_*.jar', { cwd: serverPath });
                if (jarPaths.length === 0) {
                    throw new Error('[WorkflowDSL] Server launcher not found.');
                }
                var jarPath = path.resolve(serverPath, jarPaths[0]);
                var args = [];
                args.push('-jar', jarPath);
                this.logger.info('[WorkflowDSL] Spawn Server Process from ' + jarPath);
                var child = child_process_1.spawn(command, args, {
                    detached: true,
                    shell: true,
                    stdio: 'inherit'
                });
                child.unref();
                this.serverStarted = true;
            }
            var socket_1 = new net.Socket();
            this.logger.info('[WorkflowDSL] Create Socket Connection at ' + socketPort);
            this.serverConnection = server_1.createSocketConnection(socket_1, socket_1, function () {
                _this.logger.info('[WorkflowDSL] Socket Connection Disposed');
                socket_1.destroy();
            });
            this.logger.info('[WorkflowDSL] Forward Client Connections.');
            this.forward(clientConnection, this.serverConnection);
            socket_1.connect(socketPort);
            this.logger.info('[WorkflowDSL] Client Connection Started.');
        }
        else {
            this.logger.error('[WorkflowDSL] Unable to connect to Workflow Graphical Language Server: No Socket Port');
        }
    };
    WorkflowContribution.prototype.onDidFailSpawnProcess = function (error) {
        _super.prototype.onDidFailSpawnProcess.call(this, error);
        this.logger.error('[WorkflowDSL] Error starting Workflow language server', error);
    };
    __decorate([
        inversify_1.inject(core_1.ILogger),
        __metadata("design:type", Object)
    ], WorkflowContribution.prototype, "logger", void 0);
    WorkflowContribution = __decorate([
        inversify_1.injectable()
    ], WorkflowContribution);
    return WorkflowContribution;
}(node_1.BaseLanguageServerContribution));
exports.WorkflowContribution = WorkflowContribution;
//# sourceMappingURL=language-contribution.js.map