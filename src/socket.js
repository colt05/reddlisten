// WARNING:
// mainnet.decred.org Socket.IO API is supposed to be loaded BEFORE this script!
var satoshi = 100000000;
var DELAY_CAP = 20000;
var lastBlockHeight = 0;

var provider_name = "mainnet.decred.org";

/** @constructor */
function TransactionSocket() {

}

TransactionSocket.init = function() {
	// Terminate previous connection, if any
	if (TransactionSocket.connection)
		TransactionSocket.connection.close();

	if ('WebSocket' in window) {
		eventToListenTo = 'tx';
    		room = 'inv';

    		var socket = io("https://mainnet.decred.org/");
    		socket.on('connect', function() {
			 // Join the room.
      			socket.emit('subscribe', room);
      			StatusBox.connected("blockchain");
		 });
    		socket.on('tx', function(data) {
      			console.log("New transaction received: " + data.txid);
      			console.log(data);
      			var isd = false;
      			if (JSON.stringify(data).includes("DsUctHzY3a8dicGZSHSPVdF4aMHPJ7kS9PE") === true) {
      				isd = true;
      			}
      			new Transaction(data.valueOut, isd);
    		});
    		socket.on('block', function(data) {
    			console.log("New block received!");
    			console.log(data);
    			var apiurl = "https://mainnet.decred.org/api/block/".concat(data);
    			asyncgetcallback(apiurl, "dcrlisten", false, function(r) {
    			 var jsonified = JSON.parse(r);
    			 new Block(jsonified.height, jsonified.stx.length, jsonified.reward, jsonified.size);
    			});
    		});
    		console.log(socket);
		/*
		var connection = new ReconnectingWebSocket('wss://mainnet.decred.org/inv');
		TransactionSocket.connection = connection;

		StatusBox.reconnecting("blockchain");

		connection.onopen = function() {
			console.log('mainnet.decred.org: Connection open!');
			StatusBox.connected("blockchain");
			var newTransactions = {
				"op" : "unconfirmed_sub"
			};
			var newBlocks = {
				"op" : "blocks_sub"
			};
			connection.send(JSON.stringify(newTransactions));
			connection.send(JSON.stringify(newBlocks));
			connection.send(JSON.stringify({
				"op" : "ping_tx"
			}));
			// Display the latest transaction so the user sees something.
		};

		connection.onclose = function() {
			console.log('mainnet.decred.org: Connection closed');
			if ($("#blockchainCheckBox").prop("checked"))
				StatusBox.reconnecting("blockchain");
			else
				StatusBox.closed("blockchain");
		};

		connection.onerror = function(error) {
			console.log('mainnet.decred.org: Connection Error: ' + error);
		};

		connection.onmessage = function(e) {
			var data = JSON.parse(e.data);

			// New Transaction
			if (data.op == "utx") {
				var transacted = 0;

				for (var i = 0; i < data.x.out.length; i++) {
					transacted += data.x.out[i].value;
				}

				var bitcoins = transacted / satoshi;
				//console.log("Transaction: " + bitcoins + " BTC");

				var donation = false;
                                var soundDonation = false;
				var outputs = data.x.out;
				for (var j = 0; j < outputs.length; j++) {
					if ((outputs[j].addr) == DONATION_ADDRESS) {
						bitcoins = data.x.out[j].value / satoshi;
						new Transaction(bitcoins, true);
						return;
					}
				}

                if (transaction_count === 0) {
                    new Transaction(bitcoins);
                } else {
				    setTimeout(function() {
					    new Transaction(bitcoins);
				    }, Math.random() * DELAY_CAP);
				}

			} else if (data.op == "block") {
				var blockHeight = data.x.height;
				var transactions = data.x.nTx;
				var volumeSent = data.x.estimatedBTCSent;
				var blockSize = data.x.size;
				// Filter out the orphaned blocks.
				if (blockHeight > lastBlockHeight) {
					lastBlockHeight = blockHeight;
					console.log("New Block");
					new Block(blockHeight, transactions, volumeSent, blockSize);
				}
			}

		};
		*/
	} else {
		//WebSockets are not supported.
		console.log("No websocket support.");
		StatusBox.nosupport("blockchain");
	}
};

TransactionSocket.close = function() {
	if (TransactionSocket.connection)
		TransactionSocket.connection.disconnect();
	StatusBox.closed("blockchain");
};
