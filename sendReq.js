const https = require('https');
const dotenv = require('dotenv');
dotenv.config();
const { getVintage, imageFormatter } = require('./formatters');
const summary = require('./summary');

const formatProduct = (product) => {
    let productName = `${product[4]} ${product[0]} ${product[1]} ${product[2]} ${product[3]}`
    return productName.replace(/ +(?= )/g,'')
}

const sender = (product, lineCount) => {
    const postData = JSON.stringify(
        {
            "product": {
                "title": `${formatProduct(product)}`,
                "body_html": product[7],
                "vendor": "Mad Wild Wine",
                "product_type": "",
                // "status": `${product[18]}`,
                "status": 'active',
                "images": [
                    {
                        "src": `${imageFormatter(product[17])}`
                    }
                ],
                "tags": [
                        product[15] ? product[15] : '',
                        `${getVintage(product[4])}`
                ],
                "variants": [
                    {
                        "price": product[6].replace("$", ''),
                        "inventory": 1  // add in inventory item id
                    }
                ],
                "metafields": [
                    {
                    "key": "type",
                    "value": product[8],
                    "value_type": "string",
                    "namespace": "product-attributes"
                    },
                    {
                    "key": "producer",
                    "value": product[0],
                    "value_type": "string",
                    "namespace": "product-attributes"
                    },
                    {
                    "key": "country",
                    "value": product[11],
                    "value_type": "string",
                    "namespace": "product-attributes"
                    },
                    {
                    "key": "region",
                    "value": product[10],
                    "value_type": "string",
                    "namespace": "product-attributes"
                    },
                    {
                    "key": "appelation",
                    "value": product[1],
                    "value_type": "string",
                    "namespace": "product-attributes"
                    },
                    {
                    "key": "grape",
                    "value": product[9],
                    "value_type": "string",
                    "namespace": "product-attributes"
                    },
                        {
                    "key": "style",
                    "value": product[12],
                    "value_type": "string",
                    "namespace": "product-attributes"
                    },
                    {
                    "key": "farming",
                    "value": product[14],
                    "value_type": "string",
                    "namespace": "product-attributes"
                    }
                ]
            }
        }
    )
    
    const options = {
        'method': 'POST',
        'hostname': `${process.env.HOSTNAME}`,
        'path': '/admin/api/2021-01/products.json',
        'headers': {
            'X-Shopify-Access-Token': `${process.env.XSHOPIFYACCESSTOKEN}`,
            'Content-Type': 'application/json',
            'Cookie': `${process.env.COOKIE}`
        },
        'maxRedirects': 20
    };

    return httpsRequest(options, postData, lineCount)
        .catch(e => console.log(e))
    }

const httpsRequest = (options, postData, lineCount) => {
    console.log(postData)
    return new Promise((resolve, reject) => {
        const req = https.request(options, (res) => {
            if (res.statusCode < 200 || res.statusCode >= 300) {
                // return reject(new Error('StatusCode= ' + res.statusCode));
                summary.addErrorLine(lineCount)
                return reject(('StatusCode= ' + res.statusCode + ' ' + lineCount));
            }
            
            let chunks = [];
            res.on("data", (chunk) => {
                chunks.push(chunk);
            });
          
            res.on("end", () => {
                try {
                    summary.addCompleted(lineCount)
                    chunks = Buffer.concat(chunks);
                } catch(e) {
                    summary.addErrorLine(lineCount)
                    reject(e);
                }
                resolve(chunks)
            });
          
            res.on("error", (error) => {
                summary.addErrorLine(lineCount)
                reject(error);
            });
        });

        
        if (postData) {
            req.write(postData);
        }
        
        req.end();

    });
};

module.exports = sender;


