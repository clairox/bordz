type TrueType = true

const boardComponent = {
    with: {
        attrs: true as TrueType,
    },
}
const board = {
    with: {
        deck: boardComponent,
        trucks: boardComponent,
        wheels: boardComponent,
        bearings: boardComponent,
        hardware: boardComponent,
        griptape: boardComponent,
    },
}

export default board
