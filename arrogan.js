module.exports = function (RED) {
    "use strict"
    var Arrogan = require('arrogan');

    function arroganStatus(config) {
        RED.nodes.createNode(this, config)
        var node = this
        this.arrogan = RED.nodes.getNode(config.arrogan)
        this.arroganClient = Arrogan(this.arrogan.credentials.username, this.arrogan.credentials.password)
        node.on('input', async function (msg) {
            await this.arroganClient.authorization();
            var data = await this.arroganClient.getInstance();
            msg.test = data.status;
            node.send(msg)

        });
    }
    function arroganBalance(config) {
        RED.nodes.createNode(this, config)
        var node = this
        this.arrogan = RED.nodes.getNode(config.arrogan)
        this.arroganClient = Arrogan(this.arrogan.credentials.username, this.arrogan.credentials.password)
        node.on('input', async function (msg) {
            await this.arroganClient.authorization();
            var data = await this.arroganClient.getBalance();
            msg.test = data;
            node.send(msg)

        });
    }
    function arroganStart(config) {
        RED.nodes.createNode(this, config)
        var node = this
        this.arrogan = RED.nodes.getNode(config.arrogan)
        this.arroganClient = Arrogan(this.arrogan.credentials.username, this.arrogan.credentials.password)
        node.on('input', async function (msg) {
            await this.arroganClient.authorization();
            var data = await this.arroganClient.startInstance();
            msg.test = data;
            node.send(msg)

        });
    }
    function arroganStop(config) {
        RED.nodes.createNode(this, config)
        var node = this
        this.arrogan = RED.nodes.getNode(config.arrogan)
        this.arroganClient = Arrogan(this.arrogan.credentials.username, this.arrogan.credentials.password)
        node.on('input', async function (msg) {
            await this.arroganClient.authorization();
            var data = await this.arroganClient.stopInstance();
            msg.test = data;
            node.send(msg)

        });
    }
    function ArroganConfigNode(config) {
        RED.nodes.createNode(this, config)
        this.name = config.name
    }
    RED.nodes.registerType("start instance", arroganStart)
    RED.nodes.registerType("stop instance", arroganStop)
    RED.nodes.registerType("instance status", arroganStatus)
    RED.nodes.registerType("balance", arroganBalance)
    RED.nodes.registerType("arroganConfig", ArroganConfigNode, {
        credentials: {
            username: {
                type: "text"
            },
            password: {
                type: "text"
            },
        }
    })

}