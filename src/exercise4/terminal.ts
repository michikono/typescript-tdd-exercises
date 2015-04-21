///// <reference path="../../references.ts" />

module GameOfLife {
    export var blessed:Blessed = require('blessed');

    export class Terminal implements IPrintable {
        private blessed:Blessed;
        private program:BlessedProgram;
        private screen:BlessedScreen;
        private box:BlessedBox = {
            content: ''
        };

        constructor(blessed?:Blessed) {
            // a more testable variation of this is to call methods on whatever
            // was passed in
            if(blessed) {
                this.setBlessed(blessed);
            }
        }

        public static instance():Terminal {
            var terminal = new GameOfLife.Terminal();
            terminal.setBlessed(blessed);
            return terminal;
        }

        public print(content: string) {
            this.setContent(content);
        }

        public setContent(content:string) {
            this.screen.render();
            this.box.content = content;
        }

        public getContent() {
            return this.box.content;
        }

        public exit() {
            /* istanbul ignore else */
            if (this.program) {
                this.program.clear();
                this.program.showCursor();
                this.program.normalBuffer();
            }
            this.killProcess()
        }

        // note: this probably belongs in another class
        public setBlessed(blessed:Blessed) {
            this.program = blessed.program();
            this.program.key('q', this.getQuitCallback());
            this.program.clear();

            this.screen = blessed.screen({
                program: this.program,
                autoPadding: true,
                smartCSR: true
            });
            this.screen.enableKeys();
            // this contains the initial content
            this.box = blessed.box({
                top: '0',
                left: '0',
                width: '100%',
                height: '100%',
                content: '',
                tags: true,
                style: {
                    fg: '#ffffff',
                    bg: '#000000'
                }
            });
            this.screen.append(this.box);
        }

        /* istanbul ignore next */
        private getQuitCallback() {
            return ((ch, key) => {
                this.exit()
            }).bind(this);
        }

        private killProcess() {
            this.program.unkey('q', this.getQuitCallback());
            process.exit(0);
        }
    }
}




