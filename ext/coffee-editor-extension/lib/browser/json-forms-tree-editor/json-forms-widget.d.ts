import { Emitter, Event, ILogger } from '@theia/core';
import { BaseWidget, Message } from '@theia/core/lib/browser';
import { JsonFormsTree } from '../json-forms-tree/json-forms-tree';
export declare class JSONFormsWidget extends BaseWidget {
    private readonly logger;
    private selectedNode;
    private store;
    protected changeEmitter: Emitter<Readonly<any>>;
    constructor(logger: ILogger);
    readonly onChange: Event<Readonly<any>>;
    private initStore;
    setSelection(selectedNode: JsonFormsTree.Node): void;
    protected getSchemaForNode(node: JsonFormsTree.Node): {
        '$id': string;
        'title': string;
        'properties': {
            'eClass': {
                'const': string;
            };
            'children': {
                'type': string;
                'items': {
                    'anyOf': {
                        '$ref': string;
                    }[];
                };
            };
        };
        'additionalProperties': boolean;
    } | {
        '$id': string;
        'title': string;
        'properties': {
            'eClass': {
                'const': string;
            };
            'name': {
                'type': string;
            };
            'nodes': {
                'type': string;
                'items': {
                    'anyOf': {
                        '$ref': string;
                    }[];
                };
            };
            'flows': {
                'type': string;
                'items': {
                    'anyOf': {
                        '$ref': string;
                    }[];
                };
            };
        };
        'additionalProperties': boolean;
    } | {
        '$id': string;
        'title': string;
        'type': string;
        'properties': {
            'eClass': {
                'const': string;
            };
        };
    };
    protected getUiSchemaForNode(node: JsonFormsTree.Node): {
        'type': string;
        'elements': ({
            'type': string;
            'label': string;
            'elements': {
                'type': string;
                'elements': {
                    'type': string;
                    'elements': {
                        'type': string;
                        'label': string;
                        'scope': string;
                    }[];
                }[];
            }[];
            'scope'?: undefined;
        } | {
            'type': string;
            'label': string;
            'elements': {
                'type': string;
                'elements': {
                    'type': string;
                    'label': string;
                    'scope': string;
                }[];
            }[];
            'scope'?: undefined;
        } | {
            'type': string;
            'label': string;
            'scope': string;
            'elements'?: undefined;
        } | {
            'type': string;
            'label': string;
            'elements': {
                'type': string;
                'label': string;
                'scope': string;
            }[];
            'scope'?: undefined;
        })[];
    } | {
        'type': string;
        'elements': {
            'type': string;
            'label': string;
            'scope': string;
        }[];
    } | {
        'type': string;
        'text': string;
    } | {
        'type': string;
        'elements': ({
            'type': string;
            'text': string;
            'label'?: undefined;
            'scope'?: undefined;
            'options'?: undefined;
        } | {
            'type': string;
            'label': string;
            'scope': string;
            'options': {
                focus: boolean;
            };
            'text'?: undefined;
        })[];
    };
    protected getUiSchemaForType(type: string): {
        'type': string;
        'elements': ({
            'type': string;
            'label': string;
            'elements': {
                'type': string;
                'elements': {
                    'type': string;
                    'elements': {
                        'type': string;
                        'label': string;
                        'scope': string;
                    }[];
                }[];
            }[];
            'scope'?: undefined;
        } | {
            'type': string;
            'label': string;
            'elements': {
                'type': string;
                'elements': {
                    'type': string;
                    'label': string;
                    'scope': string;
                }[];
            }[];
            'scope'?: undefined;
        } | {
            'type': string;
            'label': string;
            'scope': string;
            'elements'?: undefined;
        } | {
            'type': string;
            'label': string;
            'elements': {
                'type': string;
                'label': string;
                'scope': string;
            }[];
            'scope'?: undefined;
        })[];
    } | {
        'type': string;
        'elements': {
            'type': string;
            'label': string;
            'scope': string;
        }[];
    } | {
        'type': string;
        'text': string;
    };
    protected getSchemaForType(type: string): {
        '$id': string;
        'title': string;
        'properties': {
            'eClass': {
                'const': string;
            };
            'children': {
                'type': string;
                'items': {
                    'anyOf': {
                        '$ref': string;
                    }[];
                };
            };
        };
        'additionalProperties': boolean;
    } | {
        '$id': string;
        'title': string;
        'properties': {
            'eClass': {
                'const': string;
            };
            'name': {
                'type': string;
            };
            'nodes': {
                'type': string;
                'items': {
                    'anyOf': {
                        '$ref': string;
                    }[];
                };
            };
            'flows': {
                'type': string;
                'items': {
                    'anyOf': {
                        '$ref': string;
                    }[];
                };
            };
        };
        'additionalProperties': boolean;
    } | {
        '$id': string;
        'title': string;
        'type': string;
        'properties': {
            'eClass': {
                'const': string;
            };
        };
    };
    protected renderForms(): void;
    protected renderEmptyForms(): void;
    protected onUpdateRequest(msg: Message): void;
}
