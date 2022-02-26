import { Transaction, calculateHash} from './Utils'

class Block {
    data: Transaction | null
    hash: string
    previousHash: string | undefined
    timestamp: Date
    pow: number

    constructor(data: Transaction | null, previousHash: string | undefined){
        this.data = data
        this.hash = ""
        this.previousHash = previousHash
        this.timestamp = new Date()
        this.pow = 0
    }

    mine(difficulty: number){
        const regex = new RegExp(`^(0){${difficulty}}.*`)
        while (!this.hash.match(regex)){
            this.pow++
            this.hash = calculateHash(this)
        }
    }
}

export default Block