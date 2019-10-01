"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
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
var raw_process_1 = require("@theia/process/lib/node/raw-process");
var glob = require("glob");
var inversify_1 = require("inversify");
var net = require("net");
var path = require("path");
var rpc = require("vscode-jsonrpc");
var server_1 = require("vscode-ws-jsonrpc/lib/server");
var DEFAULT_PORT = 8024;
var WorkflowAnalysisServer = /** @class */ (function () {
    function WorkflowAnalysisServer(processFactory, logger) {
        this.processFactory = processFactory;
        this.logger = logger;
        this.startedServer = false;
    }
    WorkflowAnalysisServer.prototype.initialize = function () {
        var _this = this;
        var port = this.getPort();
        if (!port && !this.startedServer) {
            this.startServer(DEFAULT_PORT).then(function () { return _this.connect(DEFAULT_PORT); });
        }
        if (!port) {
            port = DEFAULT_PORT;
        }
        this.connect(port);
    };
    WorkflowAnalysisServer.prototype.getPort = function () {
        var arg = process.argv.filter(function (arg) { return arg.startsWith('--WF_ANALYZER='); })[0];
        if (!arg) {
            return undefined;
        }
        else {
            return Number.parseInt(arg.substring('--WF_ANALYZER='.length), 10);
        }
    };
    WorkflowAnalysisServer.prototype.startServer = function (port) {
        return __awaiter(this, void 0, void 0, function () {
            var serverPath, jarPaths, jarPath, command, args, process;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        serverPath = path.resolve(__dirname, '..', '..', 'server');
                        jarPaths = glob.sync('**/plugins/org.eclipse.equinox.launcher_*.jar', { cwd: serverPath });
                        if (jarPaths.length === 0) {
                            throw new Error('The workflow analysis server launcher is not found.');
                        }
                        jarPath = path.resolve(serverPath, jarPaths[0]);
                        command = 'java';
                        args = [];
                        args.push('-jar', jarPath);
                        args.push('-host', 'localhost', '-port', DEFAULT_PORT.toString());
                        this.logger.info('[WorkflowAnalyzer] Spawn Process with command ' + command + ' and arguments ' + args);
                        return [4 /*yield*/, this.spawnProcessAsync(command, args)];
                    case 1:
                        process = _a.sent();
                        this.logger.info('[WorkflowAnalyzer] Spawned process, waiting for server to be ready');
                        return [4 /*yield*/, this.waitUntilServerReady(process)];
                    case 2:
                        _a.sent();
                        this.logger.info('[WorkflowAnalyzer] Server communicated to be ready');
                        this.startedServer = true;
                        return [2 /*return*/];
                }
            });
        });
    };
    WorkflowAnalysisServer.prototype.connect = function (port) {
        return __awaiter(this, void 0, void 0, function () {
            var socket, connection;
            var _this = this;
            return __generator(this, function (_a) {
                socket = new net.Socket();
                connection = server_1.createSocketConnection(socket, socket, function () {
                    _this.logger.info('[WorkflowAnalyzer] Socket connection disposed');
                    socket.destroy();
                });
                socket.connect(port);
                this.connection = rpc.createMessageConnection(connection.reader, connection.writer);
                this.connection.listen();
                return [2 /*return*/];
            });
        });
    };
    WorkflowAnalysisServer.prototype.onStop = function (app) {
        this.dispose();
    };
    WorkflowAnalysisServer.prototype.dispose = function () {
        if (this.connection) {
            this.connection.dispose();
        }
    };
    WorkflowAnalysisServer.prototype.spawnProcessAsync = function (command, args, options) {
        var _this = this;
        var rawProcess = this.processFactory({ command: command, args: args, options: options });
        rawProcess.errorStream.on('data', this.showError.bind(this));
        return new Promise(function (resolve, reject) {
            rawProcess.onError(function (error) {
                _this.onDidFailSpawnProcess(error);
                if (error.code === 'ENOENT') {
                    var guess = command.split(/\s+/).shift();
                    if (guess) {
                        reject(new Error("Failed to spawn " + guess + "\nPerhaps it is not on the PATH."));
                        return;
                    }
                }
                reject(error);
            });
            process.nextTick(function () { return resolve(rawProcess); });
        });
    };
    WorkflowAnalysisServer.prototype.onDidFailSpawnProcess = function (error) {
        if (this.client) {
            this.client.reportStatus({ status: 'error', message: error.message });
        }
    };
    WorkflowAnalysisServer.prototype.showError = function (data) {
        if (data) {
            if (this.client) {
                this.client.reportStatus({ status: 'error', message: data.toString() });
            }
        }
    };
    WorkflowAnalysisServer.prototype.waitUntilServerReady = function (process) {
        var _this = this;
        return new Promise(function (resolve) {
            return process.outputStream.on('data', function (data) {
                var message = String.fromCharCode.apply(null, data);
                _this.logger.info('[WorkflowAnalyzer] Server output: ' + message);
                if (message.includes('Ready')) {
                    return resolve(data);
                }
            });
        });
    };
    WorkflowAnalysisServer.prototype.setClient = function (client) {
        this.client = client;
    };
    WorkflowAnalysisServer.prototype.analyze = function (wfUri, wfConfigUri) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        if (_this.connection) {
                            _this.connection.sendRequest(_this.createRunAnalysisRequest(), wfUri, wfConfigUri)
                                .then(function (r) { return resolve(r); }, function (e) { return reject(e); });
                        }
                        else {
                            reject(new Error('No connection to model analysis server'));
                        }
                    })];
            });
        });
    };
    WorkflowAnalysisServer.prototype.createRunAnalysisRequest = function () {
        return new rpc.RequestType2('runAnalysis');
    };
    WorkflowAnalysisServer = __decorate([
        inversify_1.injectable(),
        __param(0, inversify_1.inject(raw_process_1.RawProcessFactory)),
        __param(1, inversify_1.inject(core_1.ILogger)),
        __metadata("design:paramtypes", [Function, Object])
    ], WorkflowAnalysisServer);
    return WorkflowAnalysisServer;
}());
exports.WorkflowAnalysisServer = WorkflowAnalysisServer;
//# sourceMappingURL=workflow-analysis-server.js.map