const EC = require('elliptic').ec;
const ec = new EC('secp256k1');
const SHA256 = require('crypto-js/sha256');

class Transaction {

    constructor(fromAddress, toAddress, amount) {
        this.fromAddress = fromAddress;
        this.toAddress = toAddress;
        this.amount = amount;
        this.timestamp = Date.now();
    }


    calculateHash() {
        return SHA256(this.fromAddress + this.toAddress + this.amount + this.timestamp)
            .toString();
    }

    signTransaction(signingKey) {
        if (signingKey.getPublic('hex') !== this.fromAddress) {
            throw new Error('You cannot sign transactions for other wallets!');
        }

        const hashTx = this.calculateHash(); // Calcula el hash de la transacción
        const sig = signingKey.sign(hashTx, 'base64'); // Crea una firma mediante el hash, en base64

        this.signature = sig.toDER('hex'); // Guarda la firma codificada mediante codificación DER(Un formato especial)

        // console.log('La firma es: ' + this.signature);

    }

    isValid() {
        if (this.fromAddress === null) return true;

        // console.log(this.signature);
        if (!this.signature || this.signature.length === 0) {
            console.log('No signature in this transaction');
            return false;
        }

        const publicKey = ec.keyFromPublic(this.fromAddress, 'hex'); // Importa la clave pubblica
        return publicKey.verify(this.calculateHash(), this.signature); // Devuelve la vereficación 
    }
}

module.exports.Transaction = Transaction;