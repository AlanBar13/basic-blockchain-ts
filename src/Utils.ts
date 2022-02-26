import * as crypto from "crypto";
import Block from './Block'

interface Transaction {
    from: String;
    to: String;
    amount: Number;
}

const calculateHash = (block: Block): string => {
    const data = JSON.stringify(block.data)
    const blockData = data + block.previousHash + block.timestamp.toISOString() + block.pow.toString()

    return crypto.createHash("sha256").update(blockData).digest("hex")
}

export { Transaction, calculateHash}