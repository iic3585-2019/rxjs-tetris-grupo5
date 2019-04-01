import { PLAYER_1, PLAYER_2, REDRAW, MOVEMENT, ROTATE, DRAW, GRID } from "../const";
import { move, spin } from "../pieces";
import { game_over } from "../draw";
var _ = require('lodash')

export const movement_observer = (observable, player1, player2) => {
    observable.subscribe(
        (x) => {
            const player = x.target === PLAYER_1 ? player1 : player2
            const enemy = x.target === PLAYER_1 ? player2 : player1
            const enemy_target = x.target === PLAYER_1 ? PLAYER_2 : PLAYER_1
            if (x.type === MOVEMENT) {
                let moved_piece = move(player.get_current_piece(), x.direction)

                /* TODO: Acá se tiene quje cheackear que la pieza movida sea válida. 
                Tiene que cumlir lo siguiente
                - No estar chocando con otra cosa 
                */

                if (player.is_piece_invalid(moved_piece)) {
                    return null
                }

                // Si la pieza es válida se debe re-dibuja
                player.dispatch_event({ "target": x.target, "type": REDRAW, "old": player.get_current_piece(), "updated": moved_piece })

                // Se checkean si es que la pieza choca con algo
                if (player.check_landing(moved_piece)) {
                    // Se añade la pieza como estatica
                    player.append_static_piece(moved_piece)

                    // Se checkea si se hizo combo
                    let combo = player.check_score_row()
                    if (combo.length != 0) {
                        //Se eliminan las filas del combo
                        player.delete_combo_rows(combo)
                        //Se mueven las piezas restantes
                        player.fall_pieces(combo)
                        //Se envian las filas del combo al enemigo
                        enemy.add_combo_rows(combo.length)
                        player.dispatch_event({ "target": x.target, "type": GRID })
                        player.dispatch_event({ "target": enemy_target, "type": GRID })

                    }

                    // Se setea una nueva pieza
                    player.set_new_current_piece()
                    // Se dibuja la pieza por primera vez
                    player.dispatch_event({ "target": x.target, "type": DRAW, "piece": player.get_current_piece() })
                    // Se chequea si la nueva pieza hizo perder al jugador
                    if (player.check_game_over(player.get_current_piece())) {
                        game_over(x.target)
                        // CORREGIR UNSUBSCRIBE
                        player1.close_observable()
                        player2.close_observable()
                    }


                }

                // Caso en que la pieza sigue en juego, entonces se setea como current piece
                else {
                    player.set_current_piece(moved_piece)
                }

            }
            else if (x.type === ROTATE) {
                let spined_piece = spin(player.get_current_piece(), x.direction)

                if (player.is_piece_invalid(spined_piece)) {
                    console.log("LA PIEZA ES INVALIDA")
                    return null
                }

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