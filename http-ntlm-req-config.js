module.exports = function (RED) {
	function HttpNtlmReqConfig(n) {
		RED.nodes.createNode(this, n);
		this.user = n.user;
		this.pass = n.pass;
		this.domain = n.domain;
	}

	RED.nodes.registerType("http-ntlm-req-config", HttpNtlmReqConfig);
}