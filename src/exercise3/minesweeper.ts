/// <reference path="../../references.ts" />

module LegacyCode {
    export interface MineCoordinate {
        x: number
        y: number
    }

    /* istanbul ignore next */
    export var printMineSweeperBoard = function (guesses: Array<MineCoordinate>, mineCount:number) {
        console.log('number of mines: ' + mineCount);
        console.log('');
        var placed = 0;
        var x = 10;
        var y = 10;
        for (var i = 1; i <= y; i++) {
            var output = '';
            for (var j = 1; j <= x; j++) {
                if (placed < mineCount && (Math.random() > 0.5)) {
                    placed++;
                    var mineGuessed = false;
                    for (var k = 0; k < guesses.length; k++) {
                        if(guesses[k].x == j && guesses[k].y == i) {
                            mineGuessed = true;
                        }
                    }
                    output += mineGuessed ? '*' : '?';
                } else {
                    output += '_';
                }
            }
            console.log(output);
        }
    };
}

