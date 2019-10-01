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
var theia_1 = require("@modelserver/theia");
var backend_application_1 = require("@theia/core/lib/node/backend-application");
var inversify_1 = require("inversify");
var path_1 = require("path");
var glsp_server_launcher_1 = require("./glsp-server-launcher");
exports.default = new inversify_1.ContainerModule(function (bind, _unbind, isBound, rebind) {
    if (isBound(theia_1.LaunchOptions)) {
        rebind(theia_1.LaunchOptions).to(CoffeeLaunchOptions).inSingletonScope();
    }
    else {
        bind(theia_1.LaunchOptions).to(CoffeeLaunchOptions).inSingletonScope();
    }
    bind(glsp_server_launcher_1.GLSPLaunchOptions).to(CoffeeGlspLaunchOptions).inSingletonScope();
    bind(backend_application_1.BackendApplicationContribution).to(glsp_server_launcher_1.GLSPServerLauncher);
});
var CoffeeLaunchOptions = /** @class */ (function () {
    function CoffeeLaunchOptions() {
        this.isRunning = false;
        this.baseURL = 'api/v1/';
        this.serverPort = 8081;
        this.hostname = 'localhost';
        this.jarPath = path_1.resolve(path_1.join(__dirname, '..', '..', 'build', 'com.eclipsesource.modelserver.example-0.0.1-SNAPSHOT-standalone.jar'));
        this.additionalArgs = ['--errorsOnly'];
    }
    CoffeeLaunchOptions = __decorate([
        inversify_1.injectable()
    ], CoffeeLaunchOptions);
    return CoffeeLaunchOptions;
}());
exports.CoffeeLaunchOptions = CoffeeLaunchOptions;
var CoffeeGlspLaunchOptions = /** @class */ (function () {
    function CoffeeGlspLaunchOptions() {
        this.jarPath = path_1.resolve(path_1.join(__dirname, '..', '..', 'build', 'workflow-modelserver-example-1.2.0-SNAPSHOT-glsp.jar'));
    }
    CoffeeGlspLaunchOptions = __decorate([
        inversify_1.injectable()
    ], CoffeeGlspLaunchOptions);
    return CoffeeGlspLaunchOptions;
}());
exports.CoffeeGlspLaunchOptions = CoffeeGlspLaunchOptions;
//# sourceMappingURL=backend-module.js.map