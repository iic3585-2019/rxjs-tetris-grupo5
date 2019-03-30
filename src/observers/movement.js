import { PLAYER_1, REDRAW, MOVEMENT, ROTATE } from "../const";
import { move } from "../pieces";

export const movement_observer = (observable, player1, player2) => {
    observable.subscribe(
        (x) => {
            const player = x.target === PLAYER_1 ? player1 : player2
            if (x.type === MOVEMENT) {
                let moved_piece = move(player.get_current_piece(), x.direction)

                /* TODO: Acá se tiene quje cheackear que la pieza movida sea válida. 
                Tiene que cumlir lo siguiente
                - No salirse de la grilla
                - No estar chocando con otra cosa 
                */

                player.dispatch_event({ "target": x.target, "type": REDRAW, "old": player.get_current_piece(), "updated": moved_piece })

                player.set_current_piece(moved_piece)
            }
            else if (x.type === ROTATE) {
                let spined_piece = spin(player.get_current_piece(), x.direction)

                /*
                TODO: Por simplicidad, se va solo a checkear si es que la pieza rotada no se sale de la grilla y si no choca con nada.
                Normalmente también se tendría que ver que si va a chocar permita la rotación moviendo la pieza a un lado
                */

                player.dispatch_event({ "target": x.target, "type": REDRAW, "old": player.get_current_piece(), "updated": spined_piece })

                player.set_current_piece(spined_piece)
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