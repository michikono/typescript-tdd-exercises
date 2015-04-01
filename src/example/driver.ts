/// <reference path="../../references.ts" />

module Example {
    export class Driver {
        private coordinate:Coordinate = {x: 0, y: 0};

        constructor(private vehicle:MechanicalThings.Transportation) {

        }

        park() {
            var position = this.vehicle.position();
            this.vehicle.move({x: -position.x / this.vehicle.velocity(), y: -position.y / this.vehicle.velocity()});
        }

        goForward() {
            this.vehicle.move({x: 0, y: 1});
        }

        goBackwards() {
            this.vehicle.move({x: 0, y: -1});
        }

        turnLeft() {
            this.vehicle.move({x: -1, y: 0});
        }

        turnRight() {
            this.vehicle.move({x: 1, y: 0});
        }


    }
}