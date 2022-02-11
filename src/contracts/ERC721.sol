// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./ERC165.sol";
import "./interfaces/IERC721.sol";

contract ERC721 is ERC165, IERC721 {
    // Mapping from tokenId to the owner.
    mapping(uint256 => address) private _tokenOwner;

    // Mapping from owner to the number of token he has.
    mapping(address => uint256) private _OwnedTokenCounter;

    // Mapping from token ID to the approved address
    mapping(uint256 => address) private _tokenApprovals;

    function _exists(uint256 tokenId) internal view returns (bool) {
        address owner = _tokenOwner[tokenId];
        return owner != address(0);
    }

    function _mint(address to, uint256 tokenId) internal virtual {
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

    function transferFrom(
        address _from,
        address _to,
        uint256 _tokenId
    ) public override {
        require(isApprovedOrOwner(msg.sender, _tokenId));
    }

    function ownerOf(uint256 _tokenId) public view returns (address) {
        address owner = _tokenOwner[_tokenId];
        require(owner != address(0), "Invalid owner address");

        return owner;
    }

    function approve(address _to, uint256 _tokenId) public {
        address owner = ownerOf(_tokenId);
        require(_to != owner, "Approval to current owner");
        require(msg.sender == owner, "Current caller is not the owner");
        _tokenApprovals[_tokenId] = _to;
        emit Approval(owner, _to, _tokenId);
    }

    function isApprovedOrOwner(address spender, uint256 tokenId)
        internal
        view
        returns (bool)
    {
        require(!_exists(tokenId), "Token not found!");
        address owner = ownerOf(tokenId);
        return (owner == spender);
    }
}
