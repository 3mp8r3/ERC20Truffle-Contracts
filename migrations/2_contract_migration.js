var erc20truffle = artifacts.require("./ERC20Truffle.sol");

const _name = "ERC20Truffle";
const _symble = "ERCT";
const _total_supply = 100000000000;

module.exports = function (deployer) {
    deployer.deploy(erc20truffle, _name, _symbol, 18, _total_supply);
};