const https = require('https');
const dotenv = require('dotenv');
dotenv.config()
const { getVintage, imageFormatter } = require('./formatters')

const sender = (product) => {
    const body = JSON.stringify(
        {
            "product": {
                "title": `${product[4]} ${product[0]} ${product[1]} ${product[2]}`,
                "body_html": product[7],
                "vendor": "Mad Wild Wine",
                "product_type": "",
                "status": product[16],
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
                        "price": product[6].replace("$", '')
                    }
                ],
                "metafields": [
                    {
                    "key": "type",
                    "value": product[9],
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
                    "value": product[12],
                    "value_type": "string",
                    "namespace": "product-attributes"
                    },
                    {
                    "key": "region",
                    "value": product[11],
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
                    "value": product[10],
                    "value_type": "string",
                    "namespace": "product-attributes"
                    },
                        {
                    "key": "style",
                    "value": product[13],
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
    }
    
    const req = https.request(options, (res) => {
        let chunks = [];
      
        res.on("data", (chunk) => {
            chunks.push(chunk);
            process.stdout.write(chunk);
        });
      
        res.on("end", () => {
            let body = Buffer.concat(chunks);
        });
      
        res.on("error", (error) => {
            console.error("error");
        });
    });
    
    req.write(body)
    
    req.end()
}

module.exports = sender;