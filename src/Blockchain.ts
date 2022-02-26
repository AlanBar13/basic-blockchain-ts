import Block from "./Block"
import { Transaction, calculateHash } from './Utils'

class Blockchain {
    genesisBlock: Block
    chain: Array<Block>
    difficulty: number
    blockTime: number //estimated time it take for a new block to be added to the chain after mining

    constructor(genesisBlock: Block, chain: Array<Block>, difficulty: number){
        this.genesisBlock = genesisBlock
        this.chain = chain
        this.difficulty = difficulty
        this.blockTime = 10000
    }

    static create(difficulty: number): Blockchain{
        const genesisBlock = new Block(null, undefined)
        return new Blockchain(genesisBlock, [genesisBlock], difficulty)
    }

    addBlock(from: string, to: string, amount: number){
        const blockData: Transaction = {from, to, amount}
        const lastBlock = this.chain[this.chain.length - 1]
        const newBlock = new Block(blockData, lastBlock.hash)
        newBlock.mine(this.difficulty)
        this.chain.push(newBlock)
        this.difficulty += (Date.now() - newBlock.timestamp.getTime()) > this.blockTime ? -1 : 1 //if the new block takes more time than the block time, if it takes more reduce 1 else increase 1
    }

    isValid(): boolean{
        if (this.chain.length === 1) return true //Only genesis block
        for(let i = 1; i < this.chain.length; i++){
            const currentBlock = this.chain[i]
            const previousBlock = this.chain[i - 1]
            if ( currentBlock.hash !== calculateHash(currentBlock) || previousBlock.hash !== currentBlock.previousHash){
                return false
            }
        }
        return true
    }
}

export default Blockchain