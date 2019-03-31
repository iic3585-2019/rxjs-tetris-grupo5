import { PLAYER_1, REDRAW, DRAW } from "../const";
import { update_current_piece, draw_current_piece } from "../draw";

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
        },
        (error) => {
            console.log(error)
        },
        () => {
            console.log("Completed!")
        }
    )
}