const fs = require('fs');
const readline = require('readline');
const sender = require('./sendReq');
const validate = require('./validator');

const readLines = async () => {
    const fileStream = fs.createReadStream(process.argv[2]);

    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });

    let skipper = true
    let errors = []
    let completed = []
    let lineCount = 0
    for await (const line of rl) {
        if (skipper === true) {
            skipper = false
        } else {
            const currentLine = line.split(',')
            const validator = validate(currentLine, lineCount)
            
            if (validator === 'success') {
                sender(currentLine)
                completed.push(lineCount + 2)
            } else {
                errors.push(`${validator} '\n'`)
            }
        }
        lineCount++
    }
    console.log(`There were errors with ${errors.length} products: \n ${errors}`)
    if (completed.length > 0) {console.log(`These lines were completed: ${completed}`)} else {console.log(`No products entries were sent`)}
} 

readLines();