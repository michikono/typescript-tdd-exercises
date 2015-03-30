/// <reference path="../../references.ts" />

module MechanicalThings {

    export class PlaneImpl implements Transportation {
        private x: number = 0;
        private y: number = 10;

        sound(): string {
            return "vroooooooom!";
        }

        position(): Coordinate {
            return {
                x: this.x,
                y: this.y
            };
        }

        move(offset: Coordinate) {
            this.x = this.x + (offset.x * 10);
            this.y = this.y + (offset.y * 10);
        }
    }
}
