const etherlime = require('etherlime');
const CryptoColor = require('../build/CryptoColor.json');

describe('Crypto color contract', () => {
	let accountZero;
	let accountThree;
	let deployer;
	let deployerContractWrapper;
	let cryptoColorContract;

	beforeEach(async () => {
		deployer = new etherlime.EtherlimeGanacheDeployer();
		deployerContractWrapper = await deployer.deploy(CryptoColor);
		cryptoColorContract = deployerContractWrapper.contract;

		accountZero = await accounts[0].wallet.connect(deployer.provider);
		accountThree = await accounts[3].wallet.connect(deployer.provider);
	});

	it('the account should have 0 balance', async () => {
		const balanceBefore = await cryptoColorContract.balanceOf(accountZero.address);
		assert(balanceBefore.eq(0), 'The balance is not zero');
	});

	it('the account should have 1 token balance', async () => {
		await cryptoColorContract.mint();
		const balanceAfter = await cryptoColorContract.balanceOf(accountZero.address);
		assert(balanceAfter.eq(1), 'Invalid balance. It is not 1');
	})

	it('getting real color by id', async () => {
		await cryptoColorContract.mint();
		const rgbColor = await cryptoColorContract.getColorFromId(0);
		assert.isArray(rgbColor, 'The result rgbColor is not array');
		assert.isNumber(rgbColor[0], 'The first element of the array is not number');
		assert.isNumber(rgbColor[1], 'The second element of the array is not number');
		assert.isNumber(rgbColor[2], 'The third element of the array is not number');
	})

	it('the account should have 1 token balance', async () => {
		const nonOwnerContractInstance = await cryptoColorContract.connect(accountThree);

		await assert.revert(nonOwnerContractInstance.mint());
		const balanceAfter = await nonOwnerContractInstance.balanceOf(accountThree.address);
		assert(balanceAfter.eq(0), 'Invalid balance. It is not 0');
	})
});