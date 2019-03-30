import { PLAYER_1, REDRAW } from "../const";
import { update_current_piece } from "../draw";

export const draw_observer = (observable, player1, player2) => {
    observable.subscribe(
        (x) => {
            if (x.type === REDRAW) {
                const target = x.target === PLAYER_1 ? player1.get_container() : player2.get_container()
                update_current_piece(target, x["old"], x["updated"])
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