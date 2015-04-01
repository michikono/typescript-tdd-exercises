/// <reference path="../../../references.ts" />

module Example {
    export module MechanicalThings {
        export class PlaneImpl implements Transportation {
            private x:number = 0;
            private y:number = 10;

            sound():string {
                return "vroooooooom!";
            }

            position():Coordinate {
                return {
                    x: this.x,
                    y: this.y
                };
            }

            velocity() {
                return 10;
            }

            move(offset:Coordinate) {
                this.x = this.x + (offset.x * this.velocity());
                this.y = this.y + (offset.y * this.velocity());
            }
        }
    }
}