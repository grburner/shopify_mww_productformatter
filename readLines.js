const fs = require('fs');
const readline = require('readline');
const sender = require('./sendReq');
const validate = require('./validator');
const summary = require('./summary');

const readLines = async () => {
        let productPromises = []
        const fileStream = fs.createReadStream(process.argv[2]);
    
        const rl = readline.createInterface({
            input: fileStream,
            crlfDelay: Infinity
        });
    
        let skipper = true
        let lineCount = 1
        for await (const line of rl) {
            if (skipper === true) {
                skipper = false
            } else {
            productPromises.push(new Promise((resolve, reject) => {
                const currentLine = line.split(',')
                const validator = validate(currentLine, lineCount)
                
                if (validator === 'success') {
                    sender(currentLine, lineCount).then(data => resolve('data: ' + data))
                } else {
                    reject('validation error')
                };
            }));
            lineCount++
        };
    }
    return productPromises
};

const runAndSummarize = async () => {
    await readLines().then((promises) => {
        console.log(promises)
        Promise.allSettled(promises)
        .then(values => {
            console.log('Values: ' + values)
            summary.summarize()
        })
        .catch(e => {
            console.log(e)
        })
    }) 
}
    //Promise.allSettled(productPromises).then((vals) => {
    //    console.log(vals)
    // console.log(`There were errors with ${summary.errors.length} products: \n ${summary.errors}`)
    // if (summary.completed.length > 0) {console.log(`These lines were completed: ${summary.completed}`)} else {console.log(`No products entries were sent`)}
    // console.log('Error Line List: ' + summary.errorLine)
    //});

runAndSummarize();