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
var browser_1 = require("@theia/core/lib/browser");
var uri_1 = require("@theia/core/lib/common/uri");
var browser_2 = require("@theia/languages/lib/browser");
var inversify_1 = require("inversify");
var generate_protocol_1 = require("../common/generate-protocol");
var GenerateCodeService = /** @class */ (function () {
    function GenerateCodeService(workspace, preferenceService, codeGenServer, messageService, logger) {
        var _this = this;
        this.workspace = workspace;
        this.preferenceService = preferenceService;
        this.codeGenServer = codeGenServer;
        this.messageService = messageService;
        this.logger = logger;
        this.AUTO_CODEGEN_PREFERENCE = 'editor.autoGenerateCode';
        this.toDispose = new core_1.DisposableCollection();
        var event = this.workspace.onDidSaveTextDocument;
        if (event) {
            this.toDispose.push(event(function (textDocument) {
                var fileUri = new uri_1.default(textDocument.uri);
                if (_this.isWorkflowFile(fileUri)) {
                    _this.logger.info("Saved " + fileUri.path.base + ", autogenerate is set to: " + _this.isAutoGenerateOn());
                    if (_this.isAutoGenerateOn()) {
                        _this.logger.info("Generate code for " + fileUri);
                        _this.generateCode(fileUri);
                    }
                }
            }));
        }
    }
    GenerateCodeService.prototype.generateCode = function (uri) {
        var _this = this;
        this.messageService.showProgress({ text: "Generating code for " + uri.parent.relative(uri), options: { cancelable: false } }).then(function (progress) { return _this.doGenerateCode(uri, progress); });
    };
    GenerateCodeService.prototype.doGenerateCode = function (uri, progress) {
        var generationDirectory = uri.parent;
        var packageName = generationDirectory.path.name;
        var sourceFile = uri.toString();
        var target = generationDirectory.toString();
        this.codeGenServer.generateCode(sourceFile, target, packageName)
            .finally(function () { return progress.cancel(); });
    };
    GenerateCodeService.prototype.dispose = function () {
        this.toDispose.dispose();
    };
    GenerateCodeService.prototype.isAutoGenerateOn = function () {
        var autoSave = this.preferenceService.get(this.AUTO_CODEGEN_PREFERENCE);
        return autoSave === 'on' || autoSave === undefined;
    };
    GenerateCodeService.prototype.toggleAutoGenerate = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.preferenceService.set(this.AUTO_CODEGEN_PREFERENCE, this.isAutoGenerateOn() ? 'off' : 'on');
                return [2 /*return*/];
            });
        });
    };
    GenerateCodeService.prototype.isWorkflowFile = function (fileUri) {
        return fileUri.toString().endsWith('.coffee');
    };
    GenerateCodeService = __decorate([
        inversify_1.injectable(),
        __param(0, inversify_1.inject(browser_2.Workspace)),
        __param(1, inversify_1.inject(browser_1.PreferenceService)),
        __param(2, inversify_1.inject(generate_protocol_1.CodeGenServer)),
        __param(3, inversify_1.inject(core_1.MessageService)),
        __param(4, inversify_1.inject(core_1.ILogger)),
        __metadata("design:paramtypes", [Object, Object, Object, core_1.MessageService, Object])
    ], GenerateCodeService);
    return GenerateCodeService;
}());
exports.GenerateCodeService = GenerateCodeService;
//# sourceMappingURL=generate-code-service.js.map