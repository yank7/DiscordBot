class CmdsParser {
    constructor(botClient, msg, prefix) {
        this.botClient = botClient;
        this.msg = msg;
        this.prefix = prefix;
        this.name = ""
        this.args = [];
    }

    isNotBotAuthor() {
        return this.botClient.user.id !== this.msg.author.id
    }

    doesStartWithPrefix() {
        return this.msg.content.startsWith(this.prefix);
    }

    isValid() {
        return this.isNotBotAuthor() && this.doesStartWithPrefix();
    }

    parse() {
        let cmdArray = this.msg.content.split(" ");
        this.name = cmdArray[0].substring(this.prefix.length);
        cmdArray.forEach((item, index) => {
            if (index !== 0){
                this.args.push(item);
            }
        });
    }
}

module.exports = CmdsParser