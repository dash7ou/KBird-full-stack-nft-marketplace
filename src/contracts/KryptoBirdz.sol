// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./ERC721Connector.sol";

contract KryptoBird is ERC721Connector {
    string[] public kryptoBirdz;

    constructor() ERC721Connector("KryptoBird", "KBIRDZ") {}

    function mint(string memory _kryptoBirdz) public {
        kryptoBirdz.push(_kryptoBirdz);
        uint256 _id = kryptoBirdz.length - 1;
        _mint(msg.sender, _id);
    }
}
