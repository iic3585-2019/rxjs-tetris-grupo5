import { LEFT, RIGHT, DOWN, NUMBER_OF_ROWS, NUMBER_OF_COLUMNS } from './const'
var _ = require('lodash')

const PIECES = [
    // Z
    (x, y) => {
        return {
            "name": "Z",
            "points": [[x, y], [x + 1, y], [x + 1, y - 1], [x + 2, y - 1]],
            "center": 2,
            "color": "#6200EE"
        }
    },
    // O
    (x, y) => {
        return {
            "name": "O",
            "points": [[x, y], [x + 1, y], [x, y - 1], [x + 1, y - 1]],
            "center": 0,
            "color": "#F7990C"
        }
    },
    // T
    (x, y) => {
        return {
            "name": "T",
            "points": [[x, y], [x + 1, y], [x + 2, y], [x + 1, y - 1]],
            "center": 1,
            "color": "#40FF00"
        }
    },
    // L
    (x, y) => {
        return {
            "name": "L",
            "points": [[x, y], [x, y - 1], [x, y - 2], [x +1, y - 2]],
            "center": 2,
            "color": "#58FAF4"
        }
    },
    // I
    (x, y) => {
        return {
            "name": "I",
            "points": [[x, y], [x, y - 1], [x, y - 2], [x, y - 3]],
            "center": 2,
            "color": "#FA58F4"
        }
    },
    // LI
    (x, y) => {
        return {
            "name": "LI",
            "points": [[x, y], [x, y - 1], [x, y - 2], [x - 1, y - 2]],
            "center": 2,
            "color": "#B45F04"
        }
    },
]

export const generate_piece = (x, y) => {
    return PIECES[_.random(0, PIECES.length - 1)](x, y)
}

// Recibe objeto pieza y una direccion de rotacion LEFT o RIGHT
// Retorna el objeto pieza resultante
export const spin = (piece, rotation) => {
    // La O no se rota
    if (piece["name"] === "O") {
        return piece
    }

    const transformation = (rotation === LEFT) ? (point) => [point[1] * -1, point[0]] : (point) => [point[1], point[0] * -1]
    const [x, y] = piece["points"][piece["center"]]
    const centered_points = center_points(piece["points"], x, y)

    return { ...piece, "points": restore_points(centered_points.map(transformation), x, y) }
}


export const move = (piece, direction) => {
    let moved_points = [...piece["points"]]
    switch (direction) {

        case LEFT:
            moved_points = piece["points"].map((point) => {
                return [point[0] - 1, point[1]]
            })
            break
        case RIGHT:
            moved_points = piece["points"].map((point) => {
                return [point[0] + 1, point[1]]
            })
            break
        case DOWN:
            moved_points = piece["points"].map((point) => {
                return [point[0], point[1] - 1]
            })
            break
    }
    const is_invalid = moved_points.some((point) => {
        if ((point[1] < 0) || (point[1] >= NUMBER_OF_ROWS)) {
            return true
        }
        else if ((point[0] < 0) || (point[0] >= NUMBER_OF_COLUMNS)) {
            return true
        }
    })
    if (is_invalid) {
        return piece
    }
    else {
        return { ...piece, "points": moved_points }
    }
}

const center_points = (points, x, y) => {
    return points.map((arr) => [arr[0] - x, arr[1] - y])
}

const restore_points = (points, x, y) => {
    return points.map((arr) => [arr[0] + x, arr[1] + y])
}