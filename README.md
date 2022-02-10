# node-red-contrib-http-ntlm-req
Node-red nodes that allow users to send HTTP request with NTLM auth.

Forked from https://github.com/IdanZel/node-red-contrib-http-ntlm-req

# Modifications
* Complete URL can be send within the input message
* The URL field is optional
* Header can be sent within the input message
* On errors the output message can be catched and is not send in addition
* Errors are thrown for http response status codes differnt than 200 or network errors
* Fixed contributors in package.json
* Used done() instead of node.error()
* Removed unused configuration fields: key, cert, token
* Fixed method selection not working any more after changing the method once

## Usage
To set up HTTP request, create a new auth config:
* Enter the URL address to the `URL` field. 
* Or send the URL as msg.url 
*   For get requests add the parameters to the URL
*   For post requests add the content to msg.payload
* Send the headers as object in msg.headers
* Fill in *Username*, *Password* if needed.