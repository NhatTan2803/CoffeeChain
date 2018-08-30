pragma solidity ^0.4.24;

contract CafeArticle {
    function totalSupply() view public returns (uint256);
    function balanceOf(address _owner) public view returns (uint256);
    function transferToken(address _from,address _to,uint256 _id) internal ;
    function createArticle(uint256 _value,address _to) external;
    function transferToOwner (address _from,uint256 _id) external;
    function ownerOf(uint256 _id) external view returns (address);
    function totalDiscount(address _owner) public view returns (uint256);
}


contract Payment{
    
    CafeArticle public Cafe;
    address public owner;
    bool internal configOwner;
    
    event transferEther(address _from,uint256 _value);
    event lucky(uint _luckyNumber, uint _discount);
    
    constructor (address _tokenAdd) public {
        owner = msg.sender;
        Cafe = CafeArticle(_tokenAdd);
    }
    
    modifier isOwner {
        require(msg.sender == owner);
        _;
    }
    
    function payBill(uint256 _luckyNumber,uint256 _discount) public payable returns (uint256 _luckyNumberis) {
        require(msg.value > 0);
        owner.transfer(msg.value);
        emit transferEther(msg.sender,msg.value);
        uint256 random_number = uint(blockhash(block.number-1))%10 + 1;
        if(random_number == _luckyNumber){
            Cafe.createArticle(_discount,msg.sender);
            emit lucky(_luckyNumber,_discount);
            return _luckyNumber;
        }
        else {
            return random_number;
        }
    }
    function getDiscount(address _owner) public view returns(uint256 _discount) {
        return Cafe.totalDiscount(_owner);
    }
}