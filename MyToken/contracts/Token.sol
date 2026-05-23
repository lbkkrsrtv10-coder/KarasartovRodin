// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import '@openzeppelin/contracts/token/ERC20/ERC20.sol';

contract MyToken is ERC20 {
    uint256 public constant INITIAL_SUPPLY = 1000000000 * (10 ** 18);
    
    constructor() ERC20("PRACTICE", "PRC") {
        _mint(msg.sender, INITIAL_SUPPLY);
    }
}