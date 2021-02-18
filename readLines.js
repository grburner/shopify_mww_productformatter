const fs = require('fs');
const readline = require('readline');
const sender = require('./sendReq');
const validate = require('./validator');
const generateCSV = require('./generateCSV');
const summary = require('./summary');

let revisedCSV = []

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
                revisedCSV.push(line)
                skipper = false
            } else {
            productPromises.push(new Promise((resolve, reject) => {
                const currentLine = line.split('\t')
                const validator = validate(currentLine, lineCount)
                
                if (validator === 'success') {
                    sender(currentLine, lineCount)
                    .then(data => resolve('data: ' + data))
                } else {
                    revisedCSV.push(line)
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
        .then(() => {
            console.log(revisedCSV)
            summary.summarize()
            generateCSV(revisedCSV)
        })
        .catch(e => {
            console.log(e)
        });
    }); 
};

runAndSummarize();