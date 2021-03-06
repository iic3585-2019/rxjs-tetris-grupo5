import { Subject } from 'rxjs'
import { NUMBER_OF_COLUMNS, NUMBER_OF_ROWS, START_X, START_Y, PLAYER_1 } from './const'
import { generate_piece } from './pieces';
var _ = require('lodash')

export default class Tetris {

    constructor(container_id) {
        this.pieces = []
        this.current_piece = {}
        this.container_id = container_id
        this.pieces_as_matrix = []

        _.range(NUMBER_OF_ROWS).forEach((row) => {
            let new_row = []
            _.range(NUMBER_OF_COLUMNS).forEach((col) => {
                new_row.push(0)
            })
            this.pieces_as_matrix.push(new_row)
        })

        this.subject = new Subject()
        this.observable = this.subject.asObservable()
    }

    append_static_piece(piece) {
        this.pieces.push(piece)

        piece["points"].forEach((point) => {
            this.pieces_as_matrix[point[1]][point[0]] = 1
        })
    }

    set_current_piece(piece) {
        this.current_piece = piece
    }

    set_new_current_piece() {
        this.current_piece = generate_piece(START_X, START_Y)
    }

    show_matrix() {
        this.pieces_as_matrix.forEach((row) => {
            console.log(row)
        })
    }

    dispatch_event(event) {
        console.log("[EVENT LOGGER]")
        console.log(event)
        this.subject.next(event)
    }

    close_observable() {
        this.subject.complete()
    }

    get_observable() {
        return this.observable
    }

    get_current_piece() {
        return this.current_piece
    }

    get_static_pieces() {
        return this.pieces
    }

    get_container() {
        return this.container_id
    }

    get_matrix() {
        return this.pieces_as_matrix
    }

    check_landing(piece) {
        return piece["points"].some((point) => {
            // Caso en que algun punto de la pieza llego a la base
            if (point[1] === 0) {
                return true
            }
            // Caso en que algun punto de la pieza tiene exactamente abajo de el una
            // pieza estática
            else if (this.pieces_as_matrix[point[1] - 1][point[0]] === 1) {
                return true
            }
        })
    }

    check_game_over(piece) {
        return piece["points"].some((point) => {
            // Caso en que algun punto de la pieza topa con el techo
            if (point[1] === NUMBER_OF_ROWS - 1 && this.check_landing(piece)) {
                return true
            }
        })
    }

    is_piece_invalid(piece) {
        return piece["points"].some((point) => {
            if (this.pieces_as_matrix[point[1]][point[0]] === 1) {
                return true
            }
        })
    }

    check_score_row() {
        let scored_rows = []
        this.pieces_as_matrix.forEach((row, index) => {
            if (!row.some(x => x === 0)) {
                scored_rows.push(index)
            }
        })
        return scored_rows
    }

    delete_combo_rows(rows) {
        this.pieces_as_matrix.forEach((row, index) => {
            if (_.includes(rows, index)) {
                this.pieces_as_matrix[index] = row.map(elem => 0)
            }
        })
    }

    fall_pieces(rows) {
        this.pieces_as_matrix.forEach((row, indexY) => {
            let count = rows.filter(elem => elem < indexY).length
            this.pieces_as_matrix[indexY - count] = row
        })
    }

    add_combo_rows(rows) {
        if (rows > 4) {
            rows = 4
        }

        let new_matrix = []
        _.range(rows).forEach((row) => {
            let new_row = []
            _.range(NUMBER_OF_COLUMNS).forEach((col) => {
                new_row.push(1)
            })
            new_row[_.random(0, NUMBER_OF_COLUMNS - 1)] = 0
            new_matrix.push(new_row)
        })

        this.pieces_as_matrix.forEach((row, indexY) => {
            if (indexY + rows < NUMBER_OF_ROWS - 1) {
                new_matrix.push(row)
            }

        })
        this.pieces_as_matrix = new_matrix
    }


}