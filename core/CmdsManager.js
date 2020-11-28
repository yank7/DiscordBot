class CmdsManager {

    constructor() {
        this.componentsRegister = [];
    }

    register(name, component) {
        this.componentsRegister[name] = new component;
    }

    getCmd(name) {
        return this.componentsRegister[name];
    }

    doesCmdExists(cmdTxt) {
        return this.componentsRegister[cmdTxt] !== undefined;
    }

    logRegister() {
        console.log(this.componentsRegister);
    }
}

module.exports = CmdsManager