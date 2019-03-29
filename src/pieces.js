export const PieceCreator = {
    "Z": (x, y) => {
        return {
            "points": [[x, y], [x + 1, y], [x + 1, y - 1], [x + 2, y - 1]],
            "center": 2
        }
    }
}

export const left_spin = (piece) => {
    const left_transformation = (point) => [point[1] * -1, point[0]]

    const [x, y] = piece["points"][piece["center"]]
    const centered_points = center_points(piece["points"], x, y)

    return { ...piece, "points": restore_points(centered_points.map(left_transformation), x, y) }
}

const center_points = (points, x, y) => {
    return points.map((arr) => [arr[0] - x, arr[1] - y])
}

const restore_points = (points, x, y) => {
    return points.map((arr) => [arr[0] + x, arr[1] + y])
}