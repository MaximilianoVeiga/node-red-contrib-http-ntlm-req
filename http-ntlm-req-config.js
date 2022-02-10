module.exports = function (RED) {
    function HttpNtlmReqConfig(n) {
        RED.nodes.createNode(this, n);
        this.user = n.user;
        this.pass = n.pass;
        this.key = n.key;
        this.cert = n.cert;
        this.token = n.token;
        this.domain = n.domain;
    }

    RED.nodes.registerType("http-ntlm-req-config", HttpNtlmReqConfig);
}