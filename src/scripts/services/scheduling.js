const scheduler = new ROT.Scheduler.Action()

export default {
    start: function () {
        this._tick()
    },
    addActor: function (actor) {
        scheduler.add(actor, true)
    },
    _tick: function () {
        const current = scheduler.next()
        const action = current.act()

        action.completed.addOnce((duration) => {
            scheduler.setDuration(duration)
            this._tick()
        })

        action.execute()
    }
}
