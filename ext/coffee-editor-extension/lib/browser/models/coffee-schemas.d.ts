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
export declare const controlUnitView: {
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
};
export declare const machineView: {
    'type': string;
    'elements': {
        'type': string;
        'label': string;
        'scope': string;
    }[];
};
export declare const brewingView: {
    'type': string;
    'text': string;
};
export declare const manualTaskView: {
    'type': string;
    'elements': ({
        'type': string;
        'label': string;
        'scope': string;
        'options': {
            focus: boolean;
        };
    } | {
        'type': string;
        'label': string;
        'scope': string;
        'options'?: undefined;
    })[];
};
export declare const automaticTaskView: {
    'type': string;
    'elements': ({
        'type': string;
        'label': string;
        'scope': string;
        'options': {
            focus: boolean;
        };
    } | {
        'type': string;
        'label': string;
        'scope': string;
        'options'?: undefined;
    })[];
};
export declare const workflowView: {
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
export declare const coffeeSchema: {
    'definitions': {
        'component': {
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
                'workflows': {
                    'type': string;
                    'items': {
                        '$ref': string;
                    };
                };
            };
            'additionalProperties': boolean;
        };
        'machine': {
            '$id': string;
            'title': string;
            'properties': {
                'eClass': {
                    'const': string;
                };
                'name': {
                    'type': string;
                };
                'children': {
                    'type': string;
                    'items': {
                        'anyOf': {
                            '$ref': string;
                        }[];
                    };
                };
                'workflows': {
                    'type': string;
                    'items': {
                        '$ref': string;
                    };
                };
            };
            'additionalProperties': boolean;
        };
        'controlunit': {
            '$id': string;
            'title': string;
            'type': string;
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
                'processor': {
                    '$ref': string;
                };
                'dimension': {
                    '$ref': string;
                };
                'ram': {
                    'type': string;
                    'items': {
                        '$ref': string;
                    };
                };
                'display': {
                    '$ref': string;
                };
                'userDescription': {
                    'type': string;
                };
            };
            'additionalProperties': boolean;
            'required': string[];
        };
        'brewingunit': {
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
        };
        'diptray': {
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
        };
        'watertank': {
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
        };
        'processor': {
            '$id': string;
            'type': string;
            'title': string;
            'properties': {
                'eClass': {
                    'const': string;
                };
                'vendor': {
                    'type': string;
                };
                'clockSpeed': {
                    'type': string;
                };
                'numberOfCores': {
                    'type': string;
                };
                'socketconnectorType': {
                    'type': string;
                    'enum': string[];
                };
                'thermalDesignPower': {
                    'type': string;
                };
                'manufactoringProcess': {
                    'type': string;
                    'enum': string[];
                };
            };
            'additionalProperties': boolean;
        };
        'dimension': {
            '$id': string;
            'title': string;
            'type': string;
            'properties': {
                'eClass': {
                    'const': string;
                };
                'width': {
                    'type': string;
                };
                'height': {
                    'type': string;
                };
                'length': {
                    'type': string;
                };
            };
            'additionalProperties': boolean;
        };
        'ram': {
            '$id': string;
            'title': string;
            'type': string;
            'properties': {
                'eClass': {
                    'const': string;
                };
                'clockSpeed': {
                    'type': string;
                };
                'size': {
                    'type': string;
                };
                'type': {
                    'type': string;
                    'enum': string[];
                };
            };
            'additionalProperties': boolean;
        };
        'display': {
            '$id': string;
            'type': string;
            'title': string;
            'properties': {
                'eClass': {
                    'const': string;
                };
                'width': {
                    'type': string;
                };
                'height': {
                    'type': string;
                };
            };
            'additionalProperties': boolean;
        };
        'workflow': {
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
        };
        'node': {
            '$id': string;
            'type': string;
            'title': string;
            'properties': {
                'eClass': {
                    'const': string;
                };
            };
            'additionalProperties': boolean;
        };
        'task': {
            '$id': string;
            'title': string;
            'type': string;
            'properties': {
                'eClass': {
                    'const': string;
                };
                'name': {
                    'type': string;
                };
                'duration': {
                    'type': string;
                };
            };
            'additionalProperties': boolean;
        };
        'automatictask': {
            '$id': string;
            'title': string;
            'type': string;
            'properties': {
                'eClass': {
                    'const': string;
                };
                'name': {
                    'type': string;
                };
                'duration': {
                    'type': string;
                };
            };
        };
        'manualtask': {
            '$id': string;
            'title': string;
            'type': string;
            'properties': {
                'eClass': {
                    'const': string;
                };
                'name': {
                    'type': string;
                };
                'duration': {
                    'type': string;
                };
                'actor': {
                    'type': string;
                };
            };
            'additionalProperties': boolean;
        };
        'fork': {
            '$id': string;
            'title': string;
            'type': string;
            'properties': {
                'eClass': {
                    'const': string;
                };
            };
            'additionalProperties': boolean;
        };
        'join': {
            '$id': string;
            'title': string;
            'type': string;
            'properties': {
                'eClass': {
                    'const': string;
                };
            };
            'additionalProperties': boolean;
        };
        'decision': {
            '$id': string;
            'title': string;
            'type': string;
            'properties': {
                'eClass': {
                    'const': string;
                };
            };
            'additionalProperties': boolean;
        };
        'merge': {
            '$id': string;
            'title': string;
            'type': string;
            'properties': {
                'eClass': {
                    'const': string;
                };
            };
            'additionalProperties': boolean;
        };
        'flow': {
            '$id': string;
            'title': string;
            'type': string;
            'properties': {
                'eClass': {
                    'const': string;
                };
            };
        };
        'weightedflow': {
            '$id': string;
            'title': string;
            'type': string;
            'properties': {
                'eClass': {
                    'const': string;
                };
                'probability': {
                    'type': string;
                    'enum': string[];
                };
            };
        };
    };
    '$ref': string;
};
