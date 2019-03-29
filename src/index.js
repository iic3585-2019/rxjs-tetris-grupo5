/*import { Observable } from 'rxjs'

var observable = Observable.create((observer) => {
    observer.next('Hello World!')
    observer.next('Hello Again!')
    observer.next('Buena choro!')
    observer.complete()
    observer.next('Bye')
})

observable.subscribe(
    (x) => logItem(x),
    (error) => logItem('Error: ' + error),
    () => logItem('Completed')
)

function logItem(val) {
    var node = document.createElement("li")
    var textnode = document.createTextNode(val)
    node.appendChild(textnode)
    document.getElementById("list").appendChild(node)
}*/


import $ from 'jquery'
window.jQuery = $
window.$ = $

import { PieceCreator, spin } from "./pieces"
import { initialize_grid, update_grid } from "./draw"

initialize_grid()


let my_z = PieceCreator["Z"](3, 3)

$(document).ready(function () {
    update_grid("tetris-container-1", [my_z], null)
    update_grid("tetris-container-2", [spin(my_z, "left")], null)
})


if (module.hot) {
    module.hot.accept();
}