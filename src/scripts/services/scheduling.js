const scheduler = new ROT.Scheduler.Action()
const PAUSE_RETRY = 250
let pauseCount = 0

export default {
    start: function () {
        this._tick()
    },
    addActor: function (actor) {
        scheduler.add(actor, true)
    },
    pause: function () {
        pauseCount++
    },
    continue: function () {
        pauseCount--
    },
    _tick: function () {
        if (pauseCount > 0) {
            console.log('scheduling paused')
            return setTimeout(this._tick, PAUSE_RETRY)
        }

        const current = scheduler.next()
        current.act()
            .then(duration => {
                console.log(`action completed, ${duration} ${scheduler.getTime()}`)
                scheduler.setDuration(duration)
                this._tick()
            }, () => {
                console.log('action failed!')
                scheduler.setDuration(0)
                this._tick()
            })
    }
}
