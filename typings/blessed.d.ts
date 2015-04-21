declare module GameOfLife {
    export interface Blessed {
        // Properties

        // Methods
        box(options?:Object): BlessedBox
        screen(options?:Object): BlessedScreen
        program(): BlessedProgram
    }

    export interface BlessedElement {
    }
    export interface BlessedBox extends BlessedElement {
        content: string
    }

    export interface BlessedScreen {
        render(): void
        append(BlessedElement): void
        remove(BlessedElement): void
        enableKeys(): void;
    }

    export interface BlessedKeyListenerKey {
        name: string
        full: string
        shift: boolean

        ctrl: boolean
        ch: string
    }

    export interface BlessedProgram {
        key(event:string, handler:(ch:string, key:BlessedKeyListenerKey) => void): void;
        unkey(event:string, handler:(ch:string, key:BlessedKeyListenerKey) => void): void;
        clear(): void;
        enableMouse(): void;
        disableMouse(): void
        showCursor(): void;
        hideCursor(): void;
        normalBuffer(): void;
        alternateBuffer(): void;
        exit(code:number): void;
    }
}