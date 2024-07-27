const { execSync } = require('child_process');
const path = require('path');
const snarkjsPath = path.resolve('node_modules/.bin/snarkjs');
const fs = require('fs');

async function setupAndProve() {
    // Trusted setup
    execSync(`${snarkjsPath} powersoftau new bn128 12 powersOfTau28_hez_final_10.ptau -v`, { stdio: 'inherit' });
    execSync(`${snarkjsPath} powersoftau contribute powersOfTau28_hez_final_10.ptau powersOfTau28_hez_final_11.ptau --name="First contribution" -v`, { stdio: 'inherit' });
    execSync(`${snarkjsPath} powersoftau prepare phase2 powersOfTau28_hez_final_11.ptau powersOfTau28_hez_final.ptau -v`, { stdio: 'inherit' });
    execSync(`${snarkjsPath} groth16 setup polynomial.r1cs powersOfTau28_hez_final.ptau polynomial_0000.zkey -v`, { stdio: 'inherit' });
    execSync(`${snarkjsPath} zkey contribute polynomial_0000.zkey polynomial_final.zkey --name="First contribution" -v`, { stdio: 'inherit' });
    execSync(`${snarkjsPath} zkey export verificationkey polynomial_final.zkey verification_key.json`, { stdio: 'inherit' });

    // Generate witness
    const input = { x: 1 }; 
    fs.writeFileSync('input.json', JSON.stringify(input));
    execSync(`node polynomial_js/generate_witness.js polynomial_js/polynomial.wasm input.json witness.wtns`, { stdio: 'inherit' });

    // Generate proof
    execSync(`${snarkjsPath} groth16 prove polynomial_final.zkey witness.wtns proof.json public.json`, { stdio: 'inherit' });
}

setupAndProve();
