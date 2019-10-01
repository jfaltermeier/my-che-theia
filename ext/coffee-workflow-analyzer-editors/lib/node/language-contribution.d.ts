import { BaseLanguageServerContribution, IConnection } from '@theia/languages/lib/node';
import { ProcessErrorEvent } from '@theia/process/lib/node/process';
export declare class WorkflowContribution extends BaseLanguageServerContribution {
    private readonly logger;
    readonly description: {
        id: string;
        name: string;
        documentSelector: string[];
        fileEvents: string[];
    };
    readonly id = "wfconfig";
    readonly name = "WFCONFIG";
    serverConnection: IConnection | undefined;
    serverStarted: boolean;
    start(clientConnection: IConnection): void;
    protected onDidFailSpawnProcess(error: ProcessErrorEvent): void;
}
//# sourceMappingURL=language-contribution.d.ts.map