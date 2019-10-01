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
var common_1 = require("@theia/core/lib/common");
var uri_command_handler_1 = require("@theia/core/lib/common/uri-command-handler");
var browser_1 = require("@theia/editor/lib/browser");
var inversify_1 = require("inversify");
var analysis_service_1 = require("./analysis-service");
exports.ANALYZE_COMMAND = {
    id: 'workflow.analyze.command',
    label: 'Analyze workflow model'
};
var WorkflowCommandContribution = /** @class */ (function () {
    function WorkflowCommandContribution(selectionService, analysisService) {
        this.selectionService = selectionService;
        this.analysisService = analysisService;
    }
    WorkflowCommandContribution.prototype.registerMenus = function (menus) {
        menus.registerMenuAction(__spread(browser_1.EDITOR_CONTEXT_MENU, ['0_addition']), {
            commandId: exports.ANALYZE_COMMAND.id,
            label: 'Perform Analysis'
        });
    };
    WorkflowCommandContribution.prototype.registerCommands = function (registry) {
        var _this = this;
        registry.registerCommand(exports.ANALYZE_COMMAND, this.newUriAwareCommandHandler({
            execute: function (uri) { return _this.analysisService.analyze(uri); },
            isVisible: function (uri) { return uri.toString().endsWith('wfconfig'); },
            isEnabled: function (uri) { return uri.toString().endsWith('wfconfig'); }
        }));
    };
    WorkflowCommandContribution.prototype.newUriAwareCommandHandler = function (handler) {
        return new uri_command_handler_1.UriAwareCommandHandler(this.selectionService, handler);
    };
    WorkflowCommandContribution = __decorate([
        inversify_1.injectable(),
        __param(0, inversify_1.inject(common_1.SelectionService)),
        __param(1, inversify_1.inject(analysis_service_1.AnalysisService)),
        __metadata("design:paramtypes", [common_1.SelectionService,
            analysis_service_1.AnalysisService])
    ], WorkflowCommandContribution);
    return WorkflowCommandContribution;
}());
exports.WorkflowCommandContribution = WorkflowCommandContribution;
//# sourceMappingURL=command-contribution.js.map