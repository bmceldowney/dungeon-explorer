const scheduler = new ROT.Scheduler.Action()

export default {
    nextActor: function () {
        const current = scheduler.next()
        current.act()
    }
}

const actions = {
    attack: {
        duration: 2
    },
    move: {
        duration: 4
    },
    wait: {
        duration: 1
    }
}

const script = [
    'move',
    'move',
    'move',
    'move',
    'wait',
    'wait',
    'attack',
]



/* generate some actors */
for (let i = 0; i < 4; i++) {
    const actor = {
        name: `Hacktor ${i + 1}`,
        act: function () {
            this.scriptStep++
            if (this.scriptStep > script.length) return null
            return script[this.scriptStep - 1]
        },
        scriptStep: 0
    }

    scheduler.add(actor, true, i + 1); /* last argument - initial delay */
}

/* simulate several turns */
for (let i = 0; i < 200; i++) {
    const current = scheduler.next()
    const action = current.act()

    if (action) {
        const actionDuration = actions[action].duration
        scheduler.setDuration(actionDuration)

        const padded = actionDuration.toString().lpad("0")
        console.log(`${current.name} performing ${action} action for ${padded} time units (current time: ${scheduler.getTime()})`)
    }
}
