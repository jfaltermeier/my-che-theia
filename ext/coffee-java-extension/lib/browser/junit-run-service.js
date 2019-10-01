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
var terminal_service_1 = require("@theia/terminal/lib/browser/base/terminal-service");
var inversify_1 = require("inversify");
var JUnitRunService = /** @class */ (function () {
    function JUnitRunService(terminalService) {
        this.terminalService = terminalService;
    }
    JUnitRunService.prototype.runTest = function (uri) {
        var _this = this;
        var projectName = this.deriveProjectName(uri);
        var packageName = this.derivePackageName(uri);
        var binDirectory = this.deriveBinDirectory(uri);
        if (projectName && packageName && binDirectory) {
            this.terminalService.newTerminal({
                title: 'JUnit Terminal',
                cwd: binDirectory.toString(),
                destroyTermOnClose: false
            }).then(function (terminalWidget) {
                terminalWidget.start().then(function (number) {
                    _this.terminalService.activateTerminal(terminalWidget);
                    terminalWidget.sendText('java -cp .:../lib/* org.junit.runner.JUnitCore ' + packageName + '\n');
                });
            });
        }
    };
    JUnitRunService.prototype.findSourceDirectory = function (javaUri) {
        var sourceDir = javaUri;
        while (!sourceDir.path.isRoot && sourceDir.path.name !== 'src' && sourceDir.path.name !== 'src-gen') {
            sourceDir = sourceDir.parent;
        }
        if (sourceDir.path.name === 'src' || sourceDir.path.name === 'src-gen') {
            return sourceDir;
        }
        return undefined;
    };
    JUnitRunService.prototype.deriveBinDirectory = function (javaUri) {
        var sourceDir = this.findSourceDirectory(javaUri);
        if (sourceDir) {
            return sourceDir.parent.resolve('bin');
        }
        return undefined;
    };
    JUnitRunService.prototype.deriveProjectName = function (javaUri) {
        var sourceDir = this.findSourceDirectory(javaUri);
        if (sourceDir) {
            return sourceDir.parent.path.name;
        }
        return undefined;
    };
    JUnitRunService.prototype.derivePackageName = function (javaUri) {
        var sourceDir = this.findSourceDirectory(javaUri);
        if (sourceDir) {
            return javaUri.toString().replace(sourceDir.toString() + '/', '').replace('.java', '').split('/').join('.');
        }
        return undefined;
    };
    JUnitRunService = __decorate([
        inversify_1.injectable(),
        __param(0, inversify_1.inject(terminal_service_1.TerminalService)),
        __metadata("design:paramtypes", [Object])
    ], JUnitRunService);
    return JUnitRunService;
}());
exports.JUnitRunService = JUnitRunService;
//# sourceMappingURL=junit-run-service.js.map