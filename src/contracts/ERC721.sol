// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ERC721 {
    event Transfer(
        address indexed from,
        address indexed to,
        uint256 indexed tokenId
    );

    // Mapping from tokenId to the owner.
    mapping(uint256 => address) private _tokenOwner;

    // Mapping from owner to the number of token he has.
    mapping(address => uint256) private _OwnedTokenCounter;

    function _exists(uint256 tokenId) internal view returns (bool) {
        address owner = _tokenOwner[tokenId];
        return owner != address(0);
    }

    function _mint(address to, uint256 tokenId) internal {
        require(to != address(0), "ERC721: minting to the zero address.");
        require(!_exists(tokenId), "ERC721: token already minting");

        _tokenOwner[tokenId] = to;
        _OwnedTokenCounter[to] += 1;

        emit Transfer(address(0), to, tokenId);
    }

    function balanceOf(address _owner) public view returns (uint256) {
        require(_owner != address(0), "Invalid owner address");

        // if (_OwnedTokenCounter[_owner]) {
        return _OwnedTokenCounter[_owner];
        // } else {
        // return 0;
        // }
    }
}
