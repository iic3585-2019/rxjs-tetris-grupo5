/* Habilita el uso de Jquery */
import $ from 'jquery';
window.jQuery = $;
window.$ = $;

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


const NUMBER_OF_COLUMNS = 8
const NUMBER_OF_ROWS = 12

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

export const update_grid = (target, pieces, current) => {
    pieces.forEach((piece) => {
        piece["points"].forEach((point) => {
            paint_block(target, point, piece["color"])
        })
    })

}