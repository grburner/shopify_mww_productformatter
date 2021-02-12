const summary = {
    errorLine: [], // line number of errors
    errors: [], // description of errors
    completed: [], // successfully completed product adds
    addErrorLine: (num) => {
        summary.errorLine.push(num);
    },
    addErrors: (err) => {
        summary.errors.push(err);
    },
    addCompleted: (num) => {
        summary.completed.push(num);
    },
    summarize: () => {
        console.log(`Line Errors: ${summary.errorLine} \n Line Success: ${summary.completed}`)
    }
}

module.exports = summary;