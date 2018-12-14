declare let require: any;
import { Component } from '@angular/core';
import * as ethers from 'ethers';
const CryptoColor = require('./contract_interfaces/CryptoColor.json');

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  public tokenId: string;
  public infuraApiKey = 'abca6d1110b443b08ef271545f24b80d';
  public infuraProvider: ethers.providers.InfuraProvider;
  public contractAddress = '0x41A32C610FA23dEa9E85D471CAD66ea828853153';
  public deployedContract: ethers.Contract;
  public tokensCount = 0;
  public tokenData = {
    r: 255,
    g: 255,
    b: 255
  };

  constructor() {
    const rpcProvider = new ethers.providers.JsonRpcProvider('http://localhost:8545');
    // this.infuraProvider = new ethers.providers.InfuraProvider('ropsten', this.infuraApiKey);
    this.deployedContract = new ethers.Contract(this.contractAddress, CryptoColor.abi, rpcProvider);

  }

  public async getTokensCount() {
    this.tokensCount = await this.deployedContract.totalSupply();
  }

  public async getTokenColor() {
    const colors = await this.deployedContract.getColorFromId(this.tokenId);
    this.tokenData = {
      r: colors[0],
      g: colors[1],
      b: colors[2]
    };
  }

}
