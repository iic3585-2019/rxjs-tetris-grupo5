import { PLAYER_1, REDRAW, DRAW,GRID, NUMBER_OF_COLUMNS } from "../const";
import { update_current_piece, draw_current_piece, paint_block } from "../draw";
var _ = require('lodash')

export const draw_observer = (observable, player1, player2) => {
    observable.subscribe(
        (x) => {
            const player = x.target === PLAYER_1 ? player1 : player2
            if (x.type === REDRAW) {
                update_current_piece(player.get_container(), x["old"], x["updated"])
            }
            else if (x.type === DRAW) {
                draw_current_piece(player.get_container(), x.piece)
            }
            else if (x.type == GRID){
                player.get_matrix().forEach((row, indexY) => {
                    row.forEach((elem, indexX)=>{
                        if(elem === 0){
                            paint_block(player.get_container(),[indexX, indexY], "gray")
                        }
                        else{
                            paint_block(player.get_container(),[indexX, indexY], "red")
                        }    
                    })
                });
            }
        },
        (error) => {
            console.log(error)
        },
        () => {
            console.log("Completed!")
        }
    )
}