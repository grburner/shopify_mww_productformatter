const formatters = {
    getVintage: (vintage) => {
        if (vintage < 2020 && vintage > 2009) {return '2010'}
        else if (vintage < 2020 && vintage > 2009) return '2010'
        else if (vintage < 2010 && vintage > 1999) return '2000'
        else if (vintage < 2000 && vintage > 1989) return '1990'
        else if (vintage < 1990 && vintage > 1979) return '1980'
        else if (vintage < 1980 && vintage > 1969) return '1970'
        else if (vintage < 1970 && vintage > 1959) return '1960'
        else if (vintage < 1960 && vintage > 1949) return '1950'
        else if (vintage < 1950 && vintage > 1939) return '1940'
        else return 'NV'
    },
    imageFormatter: (src) => {
        return src.replace("/view?usp=sharing", "").replace("file/d/", "uc?id=")
    },
    formatProduct: (product) => {
        let productName = `${product[4]} ${product[0]} ${product[1]} ${product[2]} ${product[3]}`
        return productName.replace(/ +(?= )/g,'')
    },
    getBottleSizes: (product) => {
        let tags = []
        if (product[17]) {tags.push(product[17])}
        if (product[20]) {tags.push(product[20])}
        if (product[23]) {tags.push(product[23])}
        return tags
    }
}

module.exports = formatters;