module.exports = function (RED) {
	function HttpNtlmReqNode(config) {
		var httpntlm = require('httpntlm');

		RED.nodes.createNode(this, config);
		const node = this;

		const resetStatus = () => node.status({});
		
		const raiseError = (done, text) => {
			node.status({ fill: "red", shape: "dot", text: text });
			done(text);
		};

		const signalSuccess = (text) => {
			node.status({ fill: "green", shape: "dot", text: getFormattedDate() + ' ' + text});
		};

		const getFormattedDate = () => {
			var date = new Date();
			var str = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " +  
				date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
			return str;
		}

		node.name = config.name;
		node.url = config.url;
		node.method = config.method;
		node.authconf = RED.nodes.getNode(config.auth);

		resetStatus();

		node.on('input', function (msg, send, done) {
			const requestCallback = (err, res) => {
				resetStatus();

				if (res !== undefined && res.body !== undefined) {
					msg.httpStatus = res.statusCode;
					msg.payload = config.parsejson ? JSON.parse(res.body) : res.body;
					if (res.statusCode !== 200) {
						raiseError(done, 'Response from server: ' + res.statusCode);
						return;
					}
				} else {
					msg.httpStatus = '---';
					raiseError(done, err.message);
					return;
				}

				msg.httpStatus = 200;
				signalSuccess('http:'+ res.statusCode);
				send(msg);
				done();
			};

			//headers
			var usedHeader = msg.headers || {};
			if (typeof usedHeader['Content-Type'] == 'undefined') {
				usedHeader['Content-Type'] = 'application/json';
			}

			//url
			let usedUrl = msg.url || node.url;

			let usedPayload = msg.payload || '';

			const connData = {
				username: node.authconf.user,
				password: node.authconf.pass,
				domain: node.authconf.domain,
				workstation: '',
				headers: usedHeader
			};

			switch (node.method) {
				case 'GET': {
					connData.url = usedUrl + usedPayload;
					httpntlm.get(connData, requestCallback);
					break;
				}
				case 'POST': {
					connData.url = usedUrl;
					connData.body = usedPayload;
					httpntlm.post(connData, requestCallback);
					break;
				}
			}
		});
	}

	RED.nodes.registerType("http-ntlm-req", HttpNtlmReqNode);
}
