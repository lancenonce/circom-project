const snarkjs = require('snarkjs');
const fs = require('fs');

async function generateVerifier() {
    const zkeyFilePath = 'polynomial_final.zkey';
    const verifierFilePath = 'verifier.sol';

    try {
        const verifierCode = await snarkjs.zKey.exportSolidityVerifier(zkeyFilePath);
        fs.writeFileSync(verifierFilePath, verifierCode);
        console.log(`Verifier contract written to ${verifierFilePath}`);
    } catch (error) {
        console.error('Error generating Solidity verifier:', error);
    }
}

generateVerifier();
