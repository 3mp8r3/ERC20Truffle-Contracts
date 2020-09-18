pragma solidity ^0.6.0;

import "openzeppelin-solidity/contracts/token/ERC20/ERC20.sol";

contract ERC20Truffle is ERC20 {
    constructor (string memory name, string memory symbol, uint8 decimals, uint256 totalSupply)
	ERC20(name, symbol) public{
        _setupDecimals(decimals);
        // _mint(owner(), totalSupply() * 10 ** uint(decimals()));
    }
}