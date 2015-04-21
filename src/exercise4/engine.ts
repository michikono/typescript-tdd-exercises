///// <reference path="../../references.ts" />

module GameOfLife {
    export interface IPrintable {
        print(content: string);
    }

    export interface IGame {
        start(): void;
    }

    export class Engine implements IPrintable, IGame {
        private refreshInterval:number = 250;
        private intervalId:number;
        private callback: (pipe: IPrintable) => void = (pipe: IPrintable) => {};
        private pipeInstance: IPrintable;

        public pipe(pipe: IPrintable) {
            this.pipeInstance = pipe;
            return this.pipeInstance
        }

        public print(content: string) {
            this.pipeInstance.print(content);
        }

        public cycle(callback: (pipe: IPrintable) => void) {
            this.callback = callback;
        }

        public start() {
            this.intervalId = setInterval(this.callback.bind(this, this.pipeInstance), this.refreshInterval);
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




