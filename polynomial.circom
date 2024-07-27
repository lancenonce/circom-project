pragma circom 2.1.4;

template Polynomial() {
    signal input x;
    signal output result;

    signal intermediate1;
    signal intermediate2;
    signal intermediate3;
    signal intermediate4;
    signal intermediate5;

    // x^3 + 6x^2 + 8x + 9
    intermediate1 <== x * x;
    intermediate2 <== intermediate1 * x;
    intermediate3 <== 6 * x;
    intermediate4 <== intermediate3 * x;
    intermediate5 <== 8 * x;

    result <== intermediate2 + intermediate4 + intermediate5 + 9;

    result === 24;
}

component main = Polynomial();