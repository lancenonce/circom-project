const { ethers } = require('ethers');
const fs = require('fs');
const proof = require('./proof.json');
const publicSignals = require('./public.json');
const snarkjs = require('snarkjs');
const vkey = require('./verification_key.json');

require('dotenv').config();

const provider = new ethers.providers.JsonRpcProvider(process.env.SEPOLIA_RPC_URL);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
const contractAddress = '0x47DE457fc5bB3D07263dFD67774E66cfCd0C758f';
const contractJson = JSON.parse(fs.readFileSync('Groth16Verifier.json', 'utf8'));
const abi = contractJson.abi;

const contract = new ethers.Contract(contractAddress, abi, wallet);

async function verifyProof() {

    const proofObject = proof;
    const publicSignalsArray = publicSignals;

    const res = await snarkjs.groth16.verify(vkey, publicSignalsArray, proofObject);
    console.log('Proof verification result:', res);
    try {
        const pi_a = [proof.pi_a[0], proof.pi_a[1]];
        const pi_b = [
            [proof.pi_b[0][0], proof.pi_b[0][1]],
            [proof.pi_b[1][0], proof.pi_b[1][1]]
        ];
        const pi_c = [proof.pi_c[0], proof.pi_c[1]];
        const pubSignals = publicSignals.map(String);

        const result = await contract.verifyProof(pi_a, pi_b, pi_c, pubSignals);
        console.log('Proof verification result:', result);
    } catch (error) {
        console.error('Error verifying proof:', error);
    }
}

verifyProof();
