const KryptoBird = artifacts.require("KryptoBird");


module.export = function (deployer) {
    deployer.deploy(KryptoBird)
}