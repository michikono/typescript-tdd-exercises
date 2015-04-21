/// <reference path="../references.ts" />
require('source-map-support').install();

module Example {
    export var assert = require("assert");
    export var sinon:SinonStatic = require("sinon");
    export var sandbox:SinonSandbox;

    beforeEach(() => {
        sandbox = sinon.sandbox.create();
    });

    afterEach(() => {
        sandbox.restore();
    });
}

module Exercise1 {
    export var assert = require("assert");
    export var sinon:SinonStatic = require("sinon");
    export var sandbox:SinonSandbox;

    beforeEach(() => {
        sandbox = sinon.sandbox.create();
    });

    afterEach(() => {
        sandbox.restore();
    });
}

module Calculator {
    export var assert = require("assert");
    export var sinon:SinonStatic = require("sinon");
    export var sandbox:SinonSandbox;

    beforeEach(() => {
        sandbox = sinon.sandbox.create();
    });

    afterEach(() => {
        sandbox.restore();
    });
}

module LegacyCode {
    export var assert = require("assert");
    export var sinon:SinonStatic = require("sinon");
    export var sandbox:SinonSandbox;

    beforeEach(() => {
        sandbox = sinon.sandbox.create();
    });

    afterEach(() => {
        sandbox.restore();
    });
}
module GameOfLife {
    export var assert = require("assert");
    export var sinon:SinonStatic = require("sinon");
    export var sandbox:SinonSandbox;

    beforeEach(() => {
        sandbox = sinon.sandbox.create();
    });

    afterEach(() => {
        sandbox.restore();
    });

    // purposely destroy the local instance of this variable
    // too many bugs arise from it being accidentally invoked
    blessed = {
        program: null,
        screen: null,
        box: null
    };

}
