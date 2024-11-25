// Import required modules
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const Web3 = require('web3');

const app = express();
const server = http.createServer(app);

// Configure Socket.IO with CORS
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3000", // Frontend origin
    methods: ["GET", "POST"],       // Allowed methods
    allowedHeaders: ["Content-Type"], // Allowed headers
    credentials: true               // Allow credentials if needed
  }
});

// Initialize Web3
const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));

// Middleware to enable CORS
app.use(cors());

// Define the smart contract ABI and address
const contractABI = [
  {
    "anonymous": false,
    "inputs": [
      { "indexed": false, "internalType": "string", "name": "message", "type": "string" }
    ],
    "name": "MessageSent",
    "type": "event"
  },
  {
    "inputs": [],
    "name": "getAllMessages",
    "outputs": [{ "internalType": "string[]", "name": "", "type": "string[]" }],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [{ "internalType": "string", "name": "_message", "type": "string" }],
    "name": "sendMessage",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];
const contractAddress = '0x8e400d7e1f25bd86c9d683776b8680dffe8a39fd'; // Replace with your deployed contract address
const contract = new web3.eth.Contract(contractABI, contractAddress);

// Serve static files from the 'public' directory
app.use(express.static('public'));

// WebSocket handling
io.on('connection', (socket) => {
  console.log('New client connected');

  // Handle message sending
  socket.on('sendMessage', async (message) => {
    try {
      // Fetch the first account from Web3
      const accounts = await web3.eth.getAccounts();
      console.log('Using account:', accounts[0]);

      // Set custom gas limit for the transaction (increase the gas limit here)
      const gasLimit = 500000; // Adjust this based on the complexity of your contract and message

      // Send the message to the smart contract with increased gas limit
      await contract.methods.sendMessage(message).send({
        from: accounts[0],
        gas: gasLimit
      });
      console.log('Message sent to the blockchain:', message);

      // Emit the message to all connected clients
      io.emit('receiveMessage', message);
    } catch (error) {
      console.error('Error sending message:', error);
    }
  });

  // Handle client disconnection
  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

// Start the server
const PORT = 4000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
