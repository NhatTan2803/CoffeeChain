var CafeArticle = artifacts.require('./CafeArticle');
var Payment = artifacts.require('./BuyToken');

module.exports = function (deployer) {
  deployer.deploy(CafeArticle, 'CafeArticle', 'CA').then(()=>{
    return deployer.deploy(Payment,CafeArticle.address);
  });
};
