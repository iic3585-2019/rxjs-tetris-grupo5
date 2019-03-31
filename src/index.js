import $ from 'jquery'
window.jQuery = $
window.$ = $

import { spin, move, generate_piece } from "./pieces"
import { initialize_grid, draw_static_pieces, draw_current_piece, update_current_piece } from "./draw"
import Tetris from "./tetris"
import { PLAYER_1, PLAYER_2, LEFT, MOVEMENT, RIGHT, REDRAW, ROTATE, START_X, START_Y, DOWN } from './const'
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
    player1.set_current_piece(generate_piece(START_X, START_Y))
    player2.set_current_piece(generate_piece(START_X, START_Y))

    draw_current_piece(player1.get_container(), player1.get_current_piece())
    draw_current_piece(player2.get_container(), player2.get_current_piece())

    const i = setInterval(() => {
        player1.dispatch_event({ "target": PLAYER_1, "type": MOVEMENT, "direction": DOWN })
        player2.dispatch_event({ "target": PLAYER_2, "type": MOVEMENT, "direction": DOWN })
    }, 2000)

    // clearInterval(i)

    // ================================================================================================
    // TECLAS
    // ================================================================================================
    $(document).on('keydown', (event) => {
        switch (event.keyCode) {
            // Left Arrow
            case 37:
                player1.dispatch_event({ "target": PLAYER_1, "type": MOVEMENT, "direction": LEFT })
                break
            // Right Arrow
            case 39:
                player1.dispatch_event({ "target": PLAYER_1, "type": MOVEMENT, "direction": RIGHT })
                break
            // Z
            case 90:
                player1.dispatch_event({ "target": PLAYER_1, "type": ROTATE, "direction": LEFT })
                break
            // X
            case 88:
                player1.dispatch_event({ "target": PLAYER_1, "type": ROTATE, "direction": RIGHT })
                break
            default:
                console.log("Has apretado la tecla con el sig cod: " + event.keyCode)
        }
    })
})

// draw_static_pieces(player1.get_container(), player1.get_static_pieces())
// draw_current_piece(player1.get_container(), player1.get_current_piece())

if (module.hot) {
    module.hot.accept();
}