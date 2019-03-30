import { Subject } from 'rxjs'

export default class Tetris {

    constructor(container_id) {
        this.pieces = []
        this.current_piece = {}
        this.container_id = container_id

        this.subject = new Subject();
        this.observable = this.subject.asObservable();
    }

    set_static_pieces(pieces) {
        this.pieces = [...pieces]
    }

    set_current_piece(piece) {
        this.current_piece = { ...piece }
    }

    dispatch_event(event) {
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



}