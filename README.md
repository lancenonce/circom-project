# Basic Circom Project
This is a basic circom project that was presented at the Aya Builder showcase in July 2024. It explains how to evaluate a polynomial:
$$
x^3 + 6x^2 + 8x + 9
$$

evaluates to $$24$$ at $$x=1$$

### Usage
Open the repo and run:
```
node compile.js
```

This will compile the circuit and create the necessary packages for the build.

Next, run:
```
node setup_and_prove.js
```
This completes the powers of tau ceremony with stdin randomness and generates a proof for a certain input `{x: 1}`.

Now, create the solidity verifier:

```
npx snarkjs zkey export solidityverifier polynomial_final.zkey verifier.sol
```

Move the `verifier.sol` contract to the `src` directory in `./deploy`.

Fill in the `.env` section with your sepolia private key and RPC url.

Deploy the contract:

```
forge create --rpc-url $SEPOLIA_RPC_URL --private-key $PRIVATE_KEY src/verifier.sol:Groth16Verifier
```

verify it:
```
node verify_proof.js
```