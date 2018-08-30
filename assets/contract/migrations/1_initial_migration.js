var CafeArticle = artifacts.require('./CafeArticle');
var Payment = artifacts.require('./Payment');

module.exports = function (deployer) {
  deployer.deploy(CafeArticle, 'CafeArticle', 'CA').then(() => {
    return deployer.deploy(Payment, CafeArticle.address);
  });
};
