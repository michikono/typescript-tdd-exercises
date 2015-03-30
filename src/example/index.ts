/// <reference path="../../references.ts" />

module MechanicalThings {
    export interface Transportation {
        sound: () => string
        move: (offset: Coordinate) => void
        position: () => Coordinate
    }
}
