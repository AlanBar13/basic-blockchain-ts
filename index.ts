import Blockchain from "./src/Blockchain";

const test = () =>{
    const blockchain = Blockchain.create(2)
    blockchain.addBlock("Juan", "Alex", 10)
    blockchain.addBlock("Alex", "Maria", 1000)
    console.log(blockchain)
    console.log(blockchain.isValid())
    blockchain.chain[1].data!.amount = 200
    console.log(blockchain.isValid())
}

test()