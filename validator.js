const line = [
    'aaaPierre Peters ',
    'Les Chetillons ',
    'Blancs de Blanc Brut ',
    'Cuvee Speciale',
    '2005',
    '1500',
    '$800.00 ', /* format this */
    '2-3 sentences of text',
    'sparkling',
    'chardonnay',
    'champagne',
    'france',
    'grower champagne',
    'elegant',
    'sustainable',
    'f-bordeaux',
    'active',
    'https://drive.google.com/file/d/1pSsHjF8HElWNF1dPKyQ4xdHnKQy-kzbL/view?usp=sharing'
  ]

const validators = {
    // "format": {"accepted": [375, 750, 1500], "index": 5, "required": "yes"},
    "type": {"accepted": ["red", "white", "rose", "sparkling", "fortified"], "index": 8, "required": "yes"},
    "grape": {"accepted": ["pinot noir", "bordeaux blend", "chardonnay", "cabernet sauvignon"], "index": 9, "required": "yes"},
    "country": {"accepted": ["USA", "france", "italy", "germany"], "index": 11, "required": "yes"},
    "style": {"accepted": ["medium-bodied", "full-bodied", "grower champagne"], "index": 12, "required": "yes"},
    "style 2": {"accepted": ["elegant", "classic", "natural"], "index": 13, "required": "yes"},
    "farming": {"accepted": ["organic", "conventional", "biodynamic", "minimal intervention", "sustainable"], "index": 14, "required": "yes"},
    "feature-tag": {"accepted": ["f-burgundy", "f-cali", "f-bordeaux"], "index": 15, "required": "yes"},
    "status": {"accepted": ["draft", "active"], "index": 16, "required": "yes"}
}

const validate = (line, lineCount) => {
    let errors = []

    for (const property in validators) {
        const currentAccepted = validators[property]["accepted"]
        const currentProp = line[validators[property]["index"]]

        if (!currentAccepted.includes(currentProp)) {
            errors.push(`Line ${lineCount} - Column ${property.toUpperCase()}: ${currentProp} is not included in the accepted inputs. \n`)
        }
    }
    if (errors.length != 0) {return errors} else return 'success';
}

module.exports = validate;

