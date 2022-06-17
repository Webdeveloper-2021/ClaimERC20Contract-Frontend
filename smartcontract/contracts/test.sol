// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract TestToken is ERC20, Ownable {
    uint256 public priceTPD = 1 ether;
    uint256 constant public SUPPLY_CONTRACT = 10000 * 10 ** 18;
    uint256 constant public SUPPLY_ADDRESS = 1000 * 10 ** 18;

    address public ADMIN_ADDRESS = 0x26616dC479D99E019B6173b3c160968B926De682; 
    address public USER_ADDRESS1 = 0x70997970C51812dc3A010C7d01b50e0d17dc79C8; 
    address public USER_ADDRESS2 = 0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC; 
    address public USER_ADDRESS3 = 0x90F79bf6EB2c4f870365E785982E1f101E93b906; 
    address public USER_ADDRESS4 = 0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65; 

  
    constructor() ERC20("Test Token", "TT") {
        _mint(address(this), SUPPLY_CONTRACT);
        _mint(ADMIN_ADDRESS, SUPPLY_ADDRESS);
        _mint(USER_ADDRESS1, SUPPLY_ADDRESS);
        _mint(USER_ADDRESS2, SUPPLY_ADDRESS);
        _mint(USER_ADDRESS3, SUPPLY_ADDRESS);
        _mint(USER_ADDRESS4, SUPPLY_ADDRESS);
    }

    modifier onlyAdmin() {
        require(ADMIN_ADDRESS == _msgSender(), "Admin role: caller is not the admin");
        _;
    }

    function transfer(address recipient, uint256 amount) public virtual override returns (bool) {
        _transfer(_msgSender(), recipient, amount);
        return true;
    }
    function claim(uint amount) public onlyAdmin{
        require(amount <= balanceOf(address(this)), "The amount of claim is over.");
        _transfer(address(this), _msgSender(), amount);
    }

    function setAdminAddress(address _address) external onlyOwner{
        ADMIN_ADDRESS = _address;
    }
    function setUserAddress1(address _address) external onlyOwner{
        USER_ADDRESS1 = _address;
    }
    function setUserAddress2(address _address) external onlyOwner{
        USER_ADDRESS2 = _address;
    }
    function setUserAddress3(address _address) external onlyOwner{
        USER_ADDRESS3 = _address;
    }
    function setUserAddress4(address _address) external onlyOwner{
        USER_ADDRESS4 = _address;
    }
    function withdraw() external onlyOwner {
        require(address(this).balance > 0, "There is no balance.");
        payable(owner()).transfer(address(this).balance);        
    }
}