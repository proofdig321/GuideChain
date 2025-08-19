import { create } from '@web3-storage/w3up-client';

export interface IPFSUploadResult {
  cid: string;
  url: string;
}

export class IPFSService {
  private client: any = null;

  async initialize() {
    if (!this.client) {
      this.client = await create();
    }
    return this.client;
  }

  async uploadFile(file: File): Promise<IPFSUploadResult> {
    try {
      const client = await this.initialize();
      const cid = await client.uploadFile(file);
      
      return {
        cid: cid.toString(),
        url: `https://gateway.ipfs.io/ipfs/${cid.toString()}`
      };
    } catch (error) {
      console.error('IPFS upload failed:', error);
      throw new Error('Failed to upload file to IPFS');
    }
  }

  async uploadJSON(data: any): Promise<IPFSUploadResult> {
    try {
      const client = await this.initialize();
      const blob = new Blob([JSON.stringify(data)], { type: 'application/json' });
      const file = new File([blob], 'data.json', { type: 'application/json' });
      
      const cid = await client.uploadFile(file);
      
      return {
        cid: cid.toString(),
        url: `https://gateway.ipfs.io/ipfs/${cid.toString()}`
      };
    } catch (error) {
      console.error('IPFS JSON upload failed:', error);
      throw new Error('Failed to upload JSON to IPFS');
    }
  }

  async fetchFromIPFS(cid: string): Promise<any> {
    try {
      const response = await fetch(`https://gateway.ipfs.io/ipfs/${cid}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('IPFS fetch failed:', error);
      throw new Error('Failed to fetch data from IPFS');
    }
  }
}

export const ipfsService = new IPFSService();