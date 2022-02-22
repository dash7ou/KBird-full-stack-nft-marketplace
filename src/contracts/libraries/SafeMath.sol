// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

library SafeMath {
    function add(uint256 x, uint256 y) internal pure returns (uint256) {
        uint256 r = x + y;
        require(r >= x, "SafeMath: Addition Overflow");
        return r;
    }

    function subtract(uint256 x, uint256 y) internal pure returns (uint256) {
        require(y <= x, "SafeMath: Subtraction Overflow");
        uint256 r = x - y;
        return r;
    }

    function mul(uint256 x, uint256 y) internal pure returns (uint256) {
        // gas optimization
        if (x == 0) {
            return 0;
        }

        uint256 r = x * y;
        require(r / x == y, "SafeMath: multiplication overflow");
        return r;
    }

    function divide(uint256 x, uint256 y) internal pure returns (uint256) {
        require(y > 0, "SafeMath: division by zero");
        uint256 r = x / y;
        return r;
    }

    // gas spending remains untouched
    function mod(uint256 x, uint256 y) internal pure returns (uint256) {
        require(y != 0, "Safemath: division by zero");
        return x % y;
    }
}

/**
    x = x + 1
    r = x + y abs r >= x
    if x = 4 and y = 3 then r =7
    abs r >= x
    r = x -y, abs y <= x
 */
