const etherlime = require('etherlime');
const CryptoColor = require('../build/CryptoColor.json');
const infuraApiKey = 'b93ddc9f4ec24851a93c5cf911340d2d';

const deploy = async (network, secret) => {

	const deployer = new etherlime.InfuraPrivateKeyDeployer(secret, network, infuraApiKey);
	const deployerWrapper = await deployer.deploy(CryptoColor);

	const mintTransaction = await deployerWrapper.contract.mint();
	await deployerWrapper.verboseWaitForTransaction(mintTransaction, 'Ropsten deployment');

	// Local
	// const deployer = new etherlime.EtherlimeGanacheDeployer();
	// const deployerWrapper = await deployer.deploy(CryptoColor);
	// const balanceBefore = await deployerWrapper.contract.balanceOf('0xD9995BAE12FEe327256FFec1e3184d492bD94C31');
	// console.log(balanceBefore.toString());
	//
	// const mintTransaction = await deployerWrapper.contract.mint();
	// await deployerWrapper.verboseWaitForTransaction(mintTransaction, 'Mint our first token on local');
	//
	// const balanceAfter = await deployerWrapper.contract.balanceOf('0xD9995BAE12FEe327256FFec1e3184d492bD94C31');
	// console.log(balanceAfter.toString());
	//
	// const rgbColor = await deployerWrapper.contract.getColorFromId(0);
	// console.log(rgbColor);
};

module.exports = {
	deploy
};