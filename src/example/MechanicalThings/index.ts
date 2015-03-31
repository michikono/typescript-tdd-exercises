/// <reference path="../../../references.ts" />

module Example.MechanicalThings {
    export interface Transportation {
        sound: () => string
        move: (offset:Coordinate) => void
        position: () => Coordinate
    }
}