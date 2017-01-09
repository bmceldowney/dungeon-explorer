const scheduler = new ROT.Scheduler.Action();

/* generate some actors */
for (var i=0;i<4;i++) {
    scheduler.add(i+1, true, i); /* last argument - initial delay */
}

/* simulate several turns */
var template = "Actor %s performing action for %s time units (current time: %s)";
for (var i=0;i<20;i++) {
    var current = scheduler.next();

    var actionDuration = Math.ceil(ROT.RNG.getUniform() * 20);
    scheduler.setDuration(actionDuration);

    var padded = actionDuration.toString().lpad("0");
    console.log(template.format(current, padded, scheduler.getTime()))
}
