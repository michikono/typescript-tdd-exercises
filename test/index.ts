/// <reference path="../references.ts" />
require('source-map-support').install();

module Example {
    export var assert = require("assert");
    export var sinon:SinonStatic = require("sinon");
}

module Exercise1 {
    export var assert = require("assert");
    export var sinon:SinonStatic = require("sinon");
}

module Calculator {
    export var assert = require("assert");
    export var sinon:SinonStatic = require("sinon");
}

module LegacyCode {
    export var assert = require("assert");
    export var sinon:SinonStatic = require("sinon");
}
module GameOfLife {
    export var assert = require("assert");
    export var sinon:SinonStatic = require("sinon");

    // purposely destroy the local instance of this variable
    // too many bugs arise from it being accidentally invoked
    blessed = {
        program: null,
        screen: null,
        box: null
    };

}
