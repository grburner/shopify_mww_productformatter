const fs = require('fs');
const readline = require('readline');
const sender = require('./sendReq')

const readLines = async () => {
    const fileStream = fs.createReadStream(process.argv[2]);

    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });

    let skipper = true
    for await (const line of rl) {
        if (skipper === true) {
            skipper = false
        } else {
            sender(line.split(','))
        }
    }
} 

readLines();