type TrueType = true

const component = {
    with: {
        componentAttributes: true as TrueType,
    },
}
const boardSetup = {
    with: {
        deck: component,
        trucks: component,
        wheels: component,
        bearings: component,
        hardware: component,
        griptape: component,
    },
}

export default boardSetup
