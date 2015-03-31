/// <reference path="../../../references.ts" />

module Example {
    export module MechanicalThings {
        export class CarImpl implements Transportation {
            private x:number = 0;
            private y:number = 0;

            sound():string {
                return "vroom!";
            }

            position():Coordinate {
                return {
                    x: this.x,
                    y: this.y
                };
            }

            move(offset:Coordinate) {
                this.x = this.x + offset.x;
                this.y = this.y + offset.y;
            }
        }
    }
}