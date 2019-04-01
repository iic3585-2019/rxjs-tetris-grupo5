import $ from 'jquery'
window.jQuery = $
window.$ = $

import { initialize_grid, draw_current_piece } from "./draw"
import Tetris from "./tetris"
import { PLAYER_1, PLAYER_2, LEFT, MOVEMENT, RIGHT, ROTATE, DOWN, SECS_DOWN } from './const'
import { movement_observer } from './observers/movement';
import { draw_observer } from './observers/draw';

initialize_grid()

let player1 = new Tetris("tetris-container-1")
let player2 = new Tetris("tetris-container-2")

// ==============================================================================
// MOVIMIENTO
// ==============================================================================

movement_observer(player1.get_observable(), player1, player2)
movement_observer(player2.get_observable(), player1, player2)

// ==============================================================================
// DIBUJO
// ==============================================================================

draw_observer(player1.get_observable(), player1, player2)
draw_observer(player2.get_observable(), player1, player2)

$(document).on('click', '#start-button', function () {
    player1.set_new_current_piece()
    player2.set_new_current_piece()

    draw_current_piece(player1.get_container(), player1.get_current_piece())
    draw_current_piece(player2.get_container(), player2.get_current_piece())

    const i = setInterval(() => {
        player1.dispatch_event({ "target": PLAYER_1, "type": MOVEMENT, "direction": DOWN })
        player2.dispatch_event({ "target": PLAYER_2, "type": MOVEMENT, "direction": DOWN })
    }, 1000 * SECS_DOWN)


    // Cuando alguno gane hay que matar el intervalo con e clear
    // clearInterval(i)

    $('#start-button').hide("slow")

    // ================================================================================================
    // TECLAS
    // ================================================================================================
    $(document).on('keydown', (event) => {
        switch (event.keyCode) {
            // V
            case 86:
                player1.dispatch_event({ "target": PLAYER_1, "type": MOVEMENT, "direction": LEFT })
                break
            // N
            case 78:
                player1.dispatch_event({ "target": PLAYER_1, "type": MOVEMENT, "direction": RIGHT })
                break
            // B
            case 66:
                player1.dispatch_event({ "target": PLAYER_1, "type": MOVEMENT, "direction": DOWN })
                break
            // Z
            case 90:
                player1.dispatch_event({ "target": PLAYER_1, "type": ROTATE, "direction": LEFT })
                break
            // X
            case 88:
                player1.dispatch_event({ "target": PLAYER_1, "type": ROTATE, "direction": RIGHT })
                break
            // Left Arrow
            case 37:
                player1.dispatch_event({ "target": PLAYER_2, "type": MOVEMENT, "direction": LEFT })
                break
            // Right Arrow
            case 39:
                player1.dispatch_event({ "target": PLAYER_2, "type": MOVEMENT, "direction": RIGHT })
                break
            // Down Arrow
            case 40:
                player1.dispatch_event({ "target": PLAYER_2, "type": MOVEMENT, "direction": DOWN })
                break
            // ,
            case 188:
                player1.dispatch_event({ "target": PLAYER_2, "type": ROTATE, "direction": LEFT })
                break
            // .
            case 190:
                player1.dispatch_event({ "target": PLAYER_2, "type": ROTATE, "direction": RIGHT })
                break
            default:
                console.log("Has apretado la tecla con el sig cod: " + event.keyCode)
        }
    })
})

// TODO: Cuando alguno gane hay que llamar a la función game_over. Por ahora hay un boton para que se muestre
// $(document).on('click', '#game-over-button', () => {
//     game_over(PLAYER_1)
// })

// draw_static_pieces(player1.get_container(), player1.get_static_pieces())
// draw_current_piece(player1.get_container(), player1.get_current_piece())

if (module.hot) {
    module.hot.accept();
}