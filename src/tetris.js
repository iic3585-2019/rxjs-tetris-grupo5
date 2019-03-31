import { Subject } from 'rxjs'
import { NUMBER_OF_COLUMNS, NUMBER_OF_ROWS, START_X, START_Y } from './const'
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

        this.subject = new Subject();
        this.observable = this.subject.asObservable();
    }

    append_static_piece(piece) {
        this.pieces.push(piece)

        piece["points"].forEach((point) => {
            this.pieces_as_matrix[point[0]][point[1]] = 1
        })
    }

    set_current_piece(piece) {
        this.current_piece = piece
    }

    set_new_current_piece() {
        this.current_piece = generate_piece(START_X, START_Y)
    }

    dispatch_event(event) {
        console.log("[EVENT LOGGER]")
        console.log(event)
        this.subject.next(event)
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

    check_landing(piece) {
        return piece["points"].some((point) => {
            // Caso en que algun punto de la pieza llego a la base
            if (point[1] === 0) {
                return true
            }
            // Caso en que algun punto de la pieza tiene exactamente abajo de el una
            // pieza estática
            else if (this.pieces_as_matrix[point[0]][point[1] - 1] === 1) {
                return true
            }
        })
    }

    is_piece_invalid(piece) {
        return piece["points"].some((point) => {
            if (this.pieces_as_matrix[point[0]][point[1]] === 1) {
                return true
            }
        })
    }

}