const Block = require('./block').Block;

class Blockchain {
    constructor() {
        this.chain = [this.createGenesisBlock()];
        this.difficulty = 2;
        this.pendingTransactions = [];
        this.miningReward = 100;
    }


    createGenesisBlock() {
        return new Block(Date.now(), [], '0');
    }


    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }


    addBlock() {

        let block = new Block(Date.now(), this.pendingTransactions, this.getLatestBlock().hash); // Se crea un nuevo bloque, se inicializa con la fecha actual del sistema, las transacciones pedientes y el hash del ultimo bloque 
        block.mineBlock(this.difficulty); // Se mina para poner el hash al bloque

        console.log('Block successfully mined!');
        this.chain.push(block); // Se añade el bloque en la cadena

        this.pendingTransactions = []; // Se limpian las transacciones pendientes
    }

    addTransaction(transaction) {
            if (!transaction.fromAddress || !transaction.toAddress) {
                console.log('Transaction must include from and to address');
                return false;
            }

            if (!transaction.isValid()) {
                console.log('Cannot add invalid transaction to chain');
                return false;
            }

            this.pendingTransactions.push(transaction);
        }
        /*
            getBalanceOfAddress(address) {
                let balance = 0;

                for (const block of this.chain) {
                    for (const trans of block.transactions) {
                        if (trans.fromAddress === address) {
                            balance -= trans.amount;
                        }

                        if (trans.toAddress === address) {
                            balance += trans.amount;
                        }
                    }
                }

                return balance;
            }

            getAllTransactionsForWallet(address) {
                const txs = [];

                for (const block of this.chain) {
                    for (const tx of block.transactions) {
                        if (tx.fromAddress === address || tx.toAddress === address) {
                            txs.push(tx);
                        }
                    }
                }

                return txs;
            } */

    isChainValid() {

        /*const realGenesis = JSON.stringify(this.createGenesisBlock());

        if (realGenesis !== JSON.stringify(this.chain[0])) {
            return false;
        }*/


        for (let i = 1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];

            if (!currentBlock.hasValidTransactions()) {
                return false;
            }

            if (currentBlock.hash !== currentBlock.calculateHash()) {
                return false;
            }

            if (currentBlock.previousHash !== previousBlock.calculateHash()) {
                return false;
            }
        }

        return true;
    }
}

module.exports.Blockchain = Blockchain;