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
var mini_browser_open_handler_1 = require("@theia/mini-browser/lib/browser/mini-browser-open-handler");
var inversify_1 = require("inversify");
var request_file_protocol_1 = require("../common/request-file-protocol");
var AnalysisEditor;
(function (AnalysisEditor) {
    AnalysisEditor.FILE_EXTENSION = '.wfanalysis';
})(AnalysisEditor = exports.AnalysisEditor || (exports.AnalysisEditor = {}));
var AnalysisEditorOpenHandler = /** @class */ (function () {
    function AnalysisEditorOpenHandler(selectionService, resourceProvider, fileServer, openHandler) {
        this.selectionService = selectionService;
        this.resourceProvider = resourceProvider;
        this.fileServer = fileServer;
        this.openHandler = openHandler;
        this.id = 'anaylsis-opener';
        this.label = 'Workflow Analysis Editor';
        this.iconClass = 'analysis-icon';
    }
    AnalysisEditorOpenHandler.prototype.canHandle = function (uri, options) {
        if (uri.path.ext === AnalysisEditor.FILE_EXTENSION) {
            return 1000;
        }
        return 0;
    };
    AnalysisEditorOpenHandler.prototype.open = function (uri, options) {
        var _this = this;
        return this.resourceProvider(uri).then(function (resource) {
            return resource.readContents().then(function (content) { return __awaiter(_this, void 0, void 0, function () {
                var htmlFile, jsonFile, editorName, urlWithQuery;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.fileServer.requestFile(request_file_protocol_1.FileTypes.WORKFLOW_ANALYSIS_HTML)];
                        case 1:
                            htmlFile = _a.sent();
                            if (this.openHandler.canHandle(new uri_1.default(htmlFile))) {
                                jsonFile = escape(content);
                                editorName = resource.uri.displayName.replace(AnalysisEditor.FILE_EXTENSION, '');
                                urlWithQuery = htmlFile + '?json=' + jsonFile;
                                return [2 /*return*/, this.openHandler.open(new uri_1.default(undefined), { name: editorName, startPage: urlWithQuery, toolbar: 'hide' })];
                            }
                            return [2 /*return*/];
                    }
                });
            }); });
        });
    };
    AnalysisEditorOpenHandler = __decorate([
        inversify_1.injectable(),
        __param(0, inversify_1.inject(core_1.SelectionService)),
        __param(1, inversify_1.inject(core_1.ResourceProvider)),
        __param(2, inversify_1.inject(request_file_protocol_1.IFileServer)),
        __param(3, inversify_1.inject(mini_browser_open_handler_1.MiniBrowserOpenHandler)),
        __metadata("design:paramtypes", [core_1.SelectionService, Function, Object, mini_browser_open_handler_1.MiniBrowserOpenHandler])
    ], AnalysisEditorOpenHandler);
    return AnalysisEditorOpenHandler;
}());
exports.AnalysisEditorOpenHandler = AnalysisEditorOpenHandler;
var WorkflowFileLocationMapper = /** @class */ (function () {
    function WorkflowFileLocationMapper() {
    }
    WorkflowFileLocationMapper.prototype.canHandle = function (location) {
        return location.startsWith('file://') ? 2 : 0;
    };
    WorkflowFileLocationMapper.prototype.map = function (location) {
        return this.toURL(location);
    };
    WorkflowFileLocationMapper.prototype.toURL = function (uri, endpointPath) {
        if (endpointPath === void 0) { endpointPath = 'mini-browser'; }
        if (!uri.startsWith('file://')) {
            throw new Error("Only URIs with 'file' scheme can be mapped to an URL. URI was: " + uri + ".");
        }
        var queryIndex = uri.lastIndexOf('?');
        var queryString = uri.substring(queryIndex, uri.length);
        var rawLocation = uri.substring(7, queryIndex);
        if (rawLocation.charAt(0) === '/') {
            rawLocation = rawLocation.substr(1);
        }
        return new browser_1.Endpoint().getRestUrl().resolve(endpointPath + "/" + rawLocation).toString() + queryString;
    };
    WorkflowFileLocationMapper = __decorate([
        inversify_1.injectable()
    ], WorkflowFileLocationMapper);
    return WorkflowFileLocationMapper;
}());
exports.WorkflowFileLocationMapper = WorkflowFileLocationMapper;
//# sourceMappingURL=editor-contribution.js.map