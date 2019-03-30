import { LEFT, RIGHT } from './const'
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
    }
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

            return { ...piece, "points": moved_points }

        case RIGHT:
            moved_points = piece["points"].map((point) => {
                return [point[0] + 1, point[1]]
            })

            return { ...piece, "points": moved_points }
        default:
            console.log("Has apretado la tecla con el sig cod: " + event.keyCode)
    }
}

const center_points = (points, x, y) => {
    return points.map((arr) => [arr[0] - x, arr[1] - y])
}

const restore_points = (points, x, y) => {
    return points.map((arr) => [arr[0] + x, arr[1] + y])
}