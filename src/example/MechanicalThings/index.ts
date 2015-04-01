/// <reference path="../../../references.ts" />

module Example {
    export module MechanicalThings {
        export interface Transportation {
            sound: () => string
            move: (offset:Coordinate) => void
            velocity: () => number
            position: () => Coordinate
        }
    }
}