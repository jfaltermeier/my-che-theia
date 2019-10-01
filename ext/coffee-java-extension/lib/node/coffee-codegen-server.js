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
var path = require("path");
var CoffeeCodeGenServer = /** @class */ (function () {
    function CoffeeCodeGenServer(processFactory, logger) {
        this.processFactory = processFactory;
        this.logger = logger;
    }
    CoffeeCodeGenServer.prototype.generateCode = function (sourceFile, targetFolder, packageName) {
        var _this = this;
        var serverPath = path.resolve(__dirname, '..', '..', 'server');
        var jarPaths = glob.sync('**/plugins/org.eclipse.equinox.launcher_*.jar', { cwd: serverPath });
        if (jarPaths.length === 0) {
            throw new Error('The Java server launcher is not found.');
        }
        var jarPath = path.resolve(serverPath, jarPaths[0]);
        var command = 'java';
        var args = [];
        args.push('-jar', jarPath, '-targetFolder', targetFolder, '-source', sourceFile, '-packageName', packageName);
        return new Promise(function (resolve) {
            var process = _this.spawnProcess(command, args);
            if (process === undefined || process.process === undefined) {
                resolve('Process not spawned');
                return;
            }
            process.process.on('exit', function (code) {
                switch (code) {
                    case 0:
                        resolve('OK');
                        break;
                    case -10:
                        resolve('Target Folder Parameter missing');
                        break;
                    case -11:
                        resolve('Source File Parameter missing');
                        break;
                    case -12:
                        resolve('Package Name Parameter missing');
                        break;
                    case -20:
                        resolve('Encoding not found, check Server Log!');
                        break;
                    case -30:
                        resolve('IO Exception occurred, check Server Log!');
                        break;
                    default:
                        resolve('UNKNOWN ERROR');
                        break;
                }
            });
        });
    };
    CoffeeCodeGenServer.prototype.onStop = function (app) {
        this.dispose();
    };
    CoffeeCodeGenServer.prototype.dispose = function () {
        // do nothing
    };
    CoffeeCodeGenServer.prototype.setClient = function () {
        // do nothing
    };
    CoffeeCodeGenServer.prototype.spawnProcess = function (command, args) {
        var rawProcess = this.processFactory({ command: command, args: args });
        if (rawProcess.process === undefined) {
            return undefined;
        }
        rawProcess.process.on('error', this.onDidFailSpawnProcess.bind(this));
        var stderr = rawProcess.process.stderr;
        if (stderr) {
            stderr.on('data', this.logError.bind(this));
        }
        return rawProcess;
    };
    CoffeeCodeGenServer.prototype.onDidFailSpawnProcess = function (error) {
        this.logger.error(error);
    };
    CoffeeCodeGenServer.prototype.logError = function (data) {
        if (data) {
            this.logger.error("Code Gen: " + data);
        }
    };
    CoffeeCodeGenServer = __decorate([
        inversify_1.injectable(),
        __param(0, inversify_1.inject(raw_process_1.RawProcessFactory)),
        __param(1, inversify_1.inject(core_1.ILogger)),
        __metadata("design:paramtypes", [Function, Object])
    ], CoffeeCodeGenServer);
    return CoffeeCodeGenServer;
}());
exports.CoffeeCodeGenServer = CoffeeCodeGenServer;
//# sourceMappingURL=coffee-codegen-server.js.map