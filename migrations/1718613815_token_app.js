const MyToken = artifacts.require("MyToken");

module.exports = function (deployer) {
  const initialSupply = 1000000;
  deployer.deploy(MyToken, initialSupply);
};
