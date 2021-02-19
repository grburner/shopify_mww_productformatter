const fs = require('fs');
const readline = require('readline');
const sender = require('./sendReq');
const validate = require('./validator');
const generateCSV = require('./generateCSV');
const summary = require('./summary');

let revisedCSV = []
let backlog = []
let bucket = 0
let productPromises = []

if (bucket > 0) {
    setTimeout(() => {bucket -= 1000}, 50)
}

const readLines = async () => {
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
                backlog.push({"lineCount": lineCount, "line": line})
                lineCount++
            }
        }
        runner(backlog)
};

const runner = (backlog) => {
    if (backlog.length === 1) {
        Promise.allSettled(productPromises)
        .then(() => {
            console.log(revisedCSV)
            summary.summarize()
            generateCSV(revisedCSV)
        })
        .catch(e => {
            console.log(e)
        });
    }
    else {
        if (bucket < 9500) {
            console.log(backlog[0])
            backlog.shift() 
            productPromises.push(new Promise((resolve, reject) => {
                bucket += 500;
                const currentLine = backlog[0].line.split('\t');
                sender(currentLine, backlog[0].lineCount)
                .then(data => resolve('data: ' + data));
            }));
            return runner(backlog)
        } else {
            setTimeout(() => {
                bucket -= 500
                return runner(backlog)
            }, 500)
        }
    }
}

readLines();