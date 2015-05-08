///// <reference path="../../references.ts" />

module GameOfLife {
    export interface IPrintable {
        print(content: string);
    }

    export interface IGame {
        cycle(pipe: IPrintable): void;
    }

    export class Engine implements IPrintable {
        private refreshInterval:number = 250;
        private intervalId:number;
        private gameInstance: IGame;
        private pipeInstance: IPrintable;

        public pipe(pipe: IPrintable) {
            this.pipeInstance = pipe;
            return this.pipeInstance
        }

        public print(content: string) {
            this.pipeInstance.print(content);
        }

        public game(game: IGame) {
            this.gameInstance = game;
        }

        public start() {
            if(this.gameInstance) {
                this.intervalId = setInterval(this.gameInstance.cycle.bind(this.gameInstance, this.pipeInstance), this.refreshInterval);
            }
        }

        public stop() {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }

        public getIntervalId() {
            return this.intervalId;
        }

        public setRefreshRate(interval:number) {
            this.refreshInterval = interval;
        }

        public getRefreshRate() {
            return this.refreshInterval;
        }

    }
}




