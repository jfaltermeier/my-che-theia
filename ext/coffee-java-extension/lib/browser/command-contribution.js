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
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
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
var browser_1 = require("@theia/core/lib/browser");
var common_1 = require("@theia/core/lib/common");
var uri_command_handler_1 = require("@theia/core/lib/common/uri-command-handler");
var inversify_1 = require("inversify");
var generate_code_service_1 = require("./generate-code-service");
var junit_run_service_1 = require("./junit-run-service");
exports.CODEGEN_COMMAND = {
    id: 'workflow.generate.code.command',
    label: 'Generate Workflow code'
};
exports.AUTO_CODEGEN_COMMAND = {
    id: 'workflow.autogenerate.code.command',
    label: 'Auto-Generate Code'
};
exports.TEST_CODE_COMMAND = {
    id: 'workflow.test.code.command',
    label: 'Run JUnit Test'
};
var JavaGenerationCommandContribution = /** @class */ (function () {
    function JavaGenerationCommandContribution(selectionService, commandService, generateCodeService, junitRunService) {
        this.selectionService = selectionService;
        this.commandService = commandService;
        this.generateCodeService = generateCodeService;
        this.junitRunService = junitRunService;
    }
    JavaGenerationCommandContribution.prototype.registerMenus = function (menus) {
        menus.registerMenuAction(__spread(['navigator-context-menu'], ['0_addition']), {
            commandId: exports.CODEGEN_COMMAND.id
        });
        menus.registerMenuAction(__spread(['navigator-context-menu'], ['1_addition']), {
            commandId: exports.TEST_CODE_COMMAND.id
        });
        menus.registerMenuAction(__spread(browser_1.CommonMenus.EDIT, ['4_autogenerate']), {
            commandId: exports.AUTO_CODEGEN_COMMAND.id,
            order: '6'
        });
    };
    JavaGenerationCommandContribution.prototype.registerCommands = function (registry) {
        var _this = this;
        registry.registerCommand(exports.AUTO_CODEGEN_COMMAND, {
            isToggled: function () { return _this.generateCodeService.isAutoGenerateOn(); },
            execute: function () { return _this.generateCodeService.toggleAutoGenerate(); }
        });
        registry.registerCommand(exports.CODEGEN_COMMAND, this.newUriAwareCommandHandler({
            execute: function (uri) { return _this.generateCodeService.generateCode(uri); },
            isVisible: function (uri) { return _this.generateCodeService.isWorkflowFile(uri); },
            isEnabled: function (uri) { return _this.generateCodeService.isWorkflowFile(uri); },
        }));
        registry.registerCommand(exports.TEST_CODE_COMMAND, this.newUriAwareCommandHandler({
            execute: function (uri) { return _this.junitRunService.runTest(uri); },
            isVisible: function (uri) { return _this.isJUnitTestFile(uri); },
            isEnabled: function (uri) { return _this.isJUnitTestFile(uri); }
        }));
    };
    JavaGenerationCommandContribution.prototype.newUriAwareCommandHandler = function (handler) {
        return new uri_command_handler_1.UriAwareCommandHandler(this.selectionService, handler);
    };
    JavaGenerationCommandContribution.prototype.isJUnitTestFile = function (fileUri) {
        return fileUri.toString().endsWith('Test.java');
    };
    JavaGenerationCommandContribution = __decorate([
        inversify_1.injectable(),
        __param(0, inversify_1.inject(common_1.SelectionService)),
        __param(1, inversify_1.inject(common_1.CommandService)),
        __param(2, inversify_1.inject(generate_code_service_1.GenerateCodeService)),
        __param(3, inversify_1.inject(junit_run_service_1.JUnitRunService)),
        __metadata("design:paramtypes", [common_1.SelectionService, Object, generate_code_service_1.GenerateCodeService,
            junit_run_service_1.JUnitRunService])
    ], JavaGenerationCommandContribution);
    return JavaGenerationCommandContribution;
}());
exports.JavaGenerationCommandContribution = JavaGenerationCommandContribution;
//# sourceMappingURL=command-contribution.js.map