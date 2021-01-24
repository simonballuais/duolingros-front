export default function () {
    let history = [];

    let memento = {
        addState(state) {
            const newState = JSON.stringify(state)
            window.console.log('Saving', newState)
            return history.push(newState)
        },
        undo() {
            history.pop()
            let previousStep = history.slice(-1)[0]

            if (!previousStep) {
                return null
            }

            return JSON.parse(previousStep)
        },
        reset(state) {
            history = [JSON.stringify(state)]
        },
        undoable() {
            return !!history.length
        },
    }

    return memento
}
