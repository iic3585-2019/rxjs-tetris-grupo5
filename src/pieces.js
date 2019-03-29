export const PieceCreator = {
    "Z": (x, y) => {
        return {
            "points": [[x, y], [x + 1, y], [x + 1, y - 1], [x + 2, y - 1]],
            "center": 2,
            "color": "#6200EE"
        }
    },
    "O": (x, y) => {
        return {
            "points": [[x, y], [x + 1, y], [x, y - 1], [x + 1, y - 1]],
            "center": 0
        }
    }
}

export const spin = (piece, rotation) => {

    const transformation = (rotation === "left") ? (point) => [point[1] * -1, point[0]] : (point) => [point[1], point[0] * -1]


    const [x, y] = piece["points"][piece["center"]]
    const centered_points = center_points(piece["points"], x, y)

    return { ...piece, "points": restore_points(centered_points.map(transformation), x, y) }
}

const center_points = (points, x, y) => {
    return points.map((arr) => [arr[0] - x, arr[1] - y])
}

const restore_points = (points, x, y) => {
    return points.map((arr) => [arr[0] + x, arr[1] + y])
}