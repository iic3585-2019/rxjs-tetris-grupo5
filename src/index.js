import $ from 'jquery'
window.jQuery = $
window.$ = $

import { PieceCreator, spin, move } from "./pieces"
import { initialize_grid, draw_static_pieces, draw_current_piece, update_current_piece } from "./draw"
import Tetris from "./tetris"
import { PLAYER_1, PLAYER_2, LEFT, MOVEMENT, RIGHT, REDRAW, ROTATE_LEFT, ROTATE_RIGHT, ROTATE } from './const'

initialize_grid()

let player1 = new Tetris("tetris-container-1")
let player2 = new Tetris("tetris-container-2")

player1.set_static_pieces([
    PieceCreator["Z"](0, 2),
    PieceCreator["Z"](4, 2)
])

player1.set_current_piece(PieceCreator["Z"](3, 10))

// Voy a ver lo del movimiento
player1.get_observable().subscribe(
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

// Voy a ver lo del dibujo
player1.get_observable().subscribe(
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

// subject_player1.next("Buena choro")

$(document).ready(function () {
    draw_static_pieces(player1.get_container(), player1.get_static_pieces())
    draw_current_piece(player1.get_container(), player1.get_current_piece())
})

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


if (module.hot) {
    module.hot.accept();
}