pragma solidity ^0.4.24;

contract ERC721 {
    // Required methods
    function totalSupply() public view returns (uint256 total);
    function balanceOf(address _owner) public view returns (uint256 balance);
    function ownerOf(uint256 _tokenId) external view returns (address owner);
    function approve(address _to, uint256 _tokenId) external;
    function transfer(address _to, uint256 _tokenId) external;
    function transferFrom(address _from, address _to, uint256 _tokenId) external;

    // Events
    event Transfer(address from, address to, uint256 tokenId);
    event Approval(address owner, address approved, uint256 tokenId);

    // Optional
    // function name() public view returns (string name);
    // function symbol() public view returns (string symbol);
    // function tokensOfOwner(address _owner) external view returns (uint256[] tokenIds);
    // function tokenMetadata(uint256 _tokenId, string _preferredTransport) public view returns (string infoUrl);

    // ERC-165 Compatibility (https://github.com/ethereum/EIPs/issues/165)
    function supportsInterface(bytes4 _interfaceID) external view returns (bool);
}

contract CafeArticle {

    address public storekeeper;
    
    struct Article {
        uint256 value;
    }
    
    string internal name;
    string internal symbol;
    
    mapping(uint256 => address)  articleOwner;

    mapping(address => uint256)  ownedArticleCount;
    
    mapping(uint256 => address)  approvedArticleTo;
    
    mapping(address => uint256) discount;
    
    event Transfer(address from, address to, uint256 tokenId);
    event TokenCreaated(address to, uint256 value);
    Article[] public articles;

    modifier isStoreKeeper {
        require(msg.sender == storekeeper);
        _;
    }
    
    constructor (string _name,string _symbol) public {
         storekeeper = msg.sender;
         name = _name;
         symbol = _symbol;
    }
     
    function totalSupply() view public returns (uint256) {
        return articles.length;
    }
    
    function balanceOf(address _owner) public view returns (uint256 _balance) {
        return ownedArticleCount[_owner];
    }
    
    function transferToken(address _from,address _to,uint256 _id) internal {
        ownedArticleCount[_to] += 1;
        articleOwner[_id] = _to;
        discount[_to] += articles[_id].value;
        if(_from != address(0)){
            ownedArticleCount[_from] -= 1;
            discount[_from] -= articles[_id].value;
        }
        emit TokenCreaated(_to,articles[_id].value);
    }
    function createArticle(uint256 _value,address _to) external  {
        uint256 id = articles.length;
        Article memory newArticle = Article(_value);
        articles.push(newArticle);
        articleOwner[id] = address (0);
        transferToken(address (0),_to,id);
    }
    
    function totalDiscount(address _owner) public view returns (uint256) {
        return discount[_owner];
    } 
    
    function ownerCreateArticle(uint256 _value,address _to) public isStoreKeeper returns(bool _success) {
        uint256 id = articles.length;
        Article memory newArticle = Article(_value);
        articles.push(newArticle);
        articleOwner[id] = address (0);
        transferToken(address (0),_to,id);
        return true;
    }
    
    function transferToOwner(uint256 _id) public {
        require(articleOwner[_id] == msg.sender);
        transferToken(msg.sender, storekeeper,_id);
    }
    // function approve(address _to, uint256 _id) public {
    //     address owner = ownerOfArticle[_id];
    //     require(msg.sender == owner);
    //     require(_to != owner);
    //     approvedArticleTo[_id] = _to;
    // }
    
    // function exists(uint256 _id) public view returns (bool) {
    //     address owner = articleOwner[_id];
    //     return owner != address(0);
    // }
    
    function ownerOf(uint256 _id) external view returns (address) {
        return articleOwner[_id];
    }
    
    // function clearApproval(address _owner, uint256 _id) internal {
    //     require(articleOwner[_id] == _owner);
    //     if (approvedArticleTo[_id] != address(0)) {
    //         approvedArticleTo[_id] = address(0);
    //     }
    // }
    
    // function getApproved(uint256 _id) public view returns (address) {
    //     return approvedArticleTo[_id];
    // }
}
