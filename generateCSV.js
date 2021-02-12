const fs = require('fs');

const generateCSV = (data) => {
    let newLineData = '';
    data.forEach(line => {
        newLineData += line += '\r\n'
    });
    console.log(newLineData)
    fs.writeFile('errorFile.csv', newLineData, (err) => {
        if (err) throw err;
        console.log('the file has been saved')
    })
}

module.exports = generateCSV;