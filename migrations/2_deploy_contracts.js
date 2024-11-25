// migrations/2_deploy_contracts.js
const MessageApp = artifacts.require("MessageApp");

module.exports = function(deployer) {
    deployer.deploy(MessageApp);
};
