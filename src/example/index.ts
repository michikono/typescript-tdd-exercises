/// <reference path="../../references.ts" />

module MechanicalThings {
    export interface Coordinate {
        x: number
        y: number
    }

    export interface Car {
        sound: () => string
        move: (offset: Coordinate) => void
        position: () => Coordinate
    }

    export class CarImpl implements Car {
        private x: number = 0;
        private y: number = 0;

        sound(): string {
            return "vroom!";
        }

        position(): Coordinate {
            return {
                x: this.x,
                y: this.y
            };
        }

        move(offset: Coordinate) {
            this.x = this.x + offset.x;
            this.y = this.y + offset.y;
        }
    }
}
