// contracts/MessageApp.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract MessageApp {
    string[] public messages;

    event MessageSent(string message);

    function sendMessage(string memory _message) public {
        messages.push(_message);
        emit MessageSent(_message);
    }

    function getAllMessages() public view returns (string[] memory) {
        return messages;
    }
}
