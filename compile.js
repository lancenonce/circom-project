const { execSync } = require('child_process');

function compileCircuit() {
    execSync('circom polynomial.circom --r1cs --wasm --sym', { stdio: 'inherit' });
}

compileCircuit();
