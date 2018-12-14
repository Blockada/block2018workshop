pragma solidity ^0.4.24;

import 'openzeppelin-solidity/contracts/token/ERC721/ERC721Full.sol';
import 'openzeppelin-solidity/contracts/ownership/Ownable.sol';

contract CryptoColor is ERC721Full, Ownable {
    constructor () ERC721Full('CryptoColor', 'COL') public {
    }

    struct Color {
        uint8 red;
        uint8 green;
        uint8 blue;
    }

    Color[] colors;

    function mint() public onlyOwner {
        Color memory _color = Color(uint8(now), uint8(now) - 100, uint8(now) - 200);
        uint _id = colors.push(_color) - 1;
        _mint(msg.sender, _id);
    }

    function getColorFromId(uint id) public view returns (uint8, uint8, uint8) {
        return (colors[id].red, colors[id].green, colors[id].blue);
    }
}