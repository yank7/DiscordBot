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
        this.name = this.msg.content.split(" ")[0].substring(this.prefix.length);
    }
}

module.exports = CmdsParser