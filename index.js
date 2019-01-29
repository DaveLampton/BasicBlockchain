const Block = require('./block').Block;
const BlockChain = require('./blockchain').Blockchain;
const Transaction = require('./transaction').Transaction;
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');

const myKey = ec.keyFromPrivate('875b4c864db09738d378afc954dba88c5fa33263485342d8caed4a7b0a5a71d9');
const myPublicKey = myKey.getPublic('hex');


let MiCadena = new BlockChain();

// Public key to doctor // Public key to patient // CLinic historial
let transaccion1 = new Transaction(myPublicKey, "Paciente1key", "Historial clínico 1");
transaccion1.signTransaction(myKey); // Firma de la transacción
let transaccion2 = new Transaction(myPublicKey, "Paciente2key", "Historial clínico 2");
transaccion2.signTransaction(myKey);
let transaccion3 = new Transaction(myPublicKey, "Paciente1key", "Historial clínico 3");
transaccion3.signTransaction(myKey);
let transaccion4 = new Transaction(myPublicKey, "Paciente2key", "Historial clínico 4");
transaccion4.signTransaction(myKey);
let transaccion5 = new Transaction(myPublicKey, "Paciente1key", "Historial clínico 5");
transaccion5.signTransaction(myKey);
let transaccion6 = new Transaction(myPublicKey, "Paciente2key", "Historial clínico 6");
transaccion6.signTransaction(myKey);

MiCadena.addTransaction(transaccion1);
MiCadena.addTransaction(transaccion2);


MiCadena.addBlock();

MiCadena.addTransaction(transaccion3);
MiCadena.addTransaction(transaccion4);
MiCadena.addTransaction(transaccion5);
MiCadena.addTransaction(transaccion6);

MiCadena.addBlock();

// console.log(MiCadena.chain);

console.log('Mi cadena es valida? ' + MiCadena.isChainValid());

console.log(MiCadena.chain[1].transactions[0].amount = "cambio en el historial clinico");

console.log('Mi cadena es valida? ' + MiCadena.isChainValid());