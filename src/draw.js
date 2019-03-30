/* Habilita el uso de Jquery */
import $ from 'jquery'
import { NUMBER_OF_ROWS, NUMBER_OF_COLUMNS } from './const'
window.jQuery = $
window.$ = $

var _ = require('lodash')

/* Esta función se llama cuando el DOM está listo */
export const initialize_grid = () => {
    $(document).ready(function () {
        let grid_player1 = $("#tetris-container-1")
        let grid_player2 = $("#tetris-container-2")

        // Dibujamos la grilla
        draw_grid(grid_player1)
        draw_grid(grid_player2)
    })
}



const draw_grid = (target) => {
    _.range(NUMBER_OF_ROWS).forEach((i) => {
        target.prepend(
            generate_row(i, NUMBER_OF_COLUMNS)
        )
    })
}

const generate_row = (row_number, number_of_cols) => {
    let html = ""
    html += `<div class="columns is-centered" id="row-${row_number}">`
    _.range(number_of_cols).forEach(x => {
        html += `<div class="column is-narrow" id="col-${x}">`
        html += "<div class='block'> </div>"
        html += "</div>"
    })
    html += "</div>"
    return html
}

const paint_block = (target, [x, y], color) => {
    $(`#${target} #row-${y} #col-${x} > .block`).css({ "background-color": color })

}

const paint_piece = (target, piece, color) => {
    piece["points"].forEach((point) => {
        paint_block(target, point, color)
    })
}

// Actualiza la grilla dado el id del target, el arreglo de las piezas 
export const draw_static_pieces = (target, pieces) => {
    pieces.forEach((piece) => {
        paint_piece(target, piece, piece["color"])
    })

}

export const draw_current_piece = (target, piece) => {
    paint_piece(target, piece, piece["color"])
}

export const update_current_piece = (target, old, updated) => {
    paint_piece(target, old, "gray")
    paint_piece(target, updated, updated["color"])
}