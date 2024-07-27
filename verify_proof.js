const { ethers } = require('ethers');
const fs = require('fs');
const proof = require('./proof.json');
const publicSignals = require('./public.json');

// Load environment variables from .env file
require('dotenv').config();

const provider = new ethers.providers.JsonRpcProvider(process.env.SEPOLIA_RPC_URL);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
const contractAddress = '0x8Cd11739744f62C502166623A813Cc73A038b328';
const contractJson = JSON.parse(fs.readFileSync('Groth16Verifier.json', 'utf8'));
const abi = contractJson.abi;

const contract = new ethers.Contract(contractAddress, abi, wallet);

async function verifyProof() {
    try {
        // Convert proof values to string
        const pi_a = [proof.pi_a[0], proof.pi_a[1]];
        const pi_b = [
            [proof.pi_b[0][0], proof.pi_b[0][1]],
            [proof.pi_b[1][0], proof.pi_b[1][1]]
        ];
        const pi_c = [proof.pi_c[0], proof.pi_c[1]];
        const pubSignals = publicSignals.map(String);

        // Call the verifyProof function
        const result = await contract.verifyProof(pi_a, pi_b, pi_c, pubSignals);
        console.log('Proof verification result:', result);
    } catch (error) {
        console.error('Error verifying proof:', error);
    }
}

verifyProof();
