class ConsoleLogger {
    constructor() {
        this.level = {
            "CONFIG": 0,
            "INFO": 1,
            "WARNING": 2,
            "DANGER": 3
        }
    }

    log(Level, action, description) {
        let d = new Date();

        let year = d.getFullYear();
        let month = d.getMonth() + 1;
        let day = d.getDate();
        let hours = d.getHours();
        let minutes = d.getMinutes();
        let seconds = d.getSeconds();

        let dateStr = year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds;

        console.log(dateStr + " [" + action + "] " + description);
    }

    warn(action, description) {
        this.log(this.level.WARNING, action, description);
    }

    info(action, description) {
        this.log(this.level.INFO, action, description);
    }

    danger(action, description) {
        this.log(this.level.DANGER, action, description);
    }

    config(action, description) {
        this.log(this.level.CONFIG, action, description);
    }
}

module.exports = ConsoleLogger;