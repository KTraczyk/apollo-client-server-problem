# How to reproduce the error

1. Start the server in one shell

   `cd ./server`

   `npm ci`

   `node ./index.js`

1. Start the client in the second shell

   `cd ./client`

   `npm ci`

   `node ./client.js`

1. Send requests to the client

   `./test.sh`

You will see in client logs that it sends 2 requests to the server. However, the server only receives one request and as a result, the client returns the same result for both requests.
