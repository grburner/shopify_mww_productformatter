const line = 'Armelle & Bernard Rion TEST\tChambolle Musigny\tLes Echezaux\t\t1995\tAffordable 90s Chambolle in a sweet spot drinking window. Fresh, fruit-driven and elegant, from 5th generation growers. Label hand-numbered by previous collector\tRed\tPinot Noir\tBurgundy\tFrance\tClassic & Elegant\t\t\t\thttps://drive.google.com/file/d/1tOnEsCbfEKFUg94Y3My-fLSxOtmGURv0/view?usp=sharing\tactive\t$13.27\t750\t85\t\t3000\t350\t\t\t\t'

const getVariants = (product) => {
  let variantString = ''
  if (product[17]) { variantString += '{"option1":' + '"' + product[17] + '",price:"' + product[18].replace("$", '') + '"}'} 
  if (product[20]) { variantString += ',{"option1":' + '"' + product[20] + '",price:"' + product[21].replace("$", '') + '"}'} 
  if (product[23]) { variantString += ',{"option1":' + '"' + product[23] + '",price:"' + product[25].replace("$", '') + '"}'} 
  console.log(variantString)
  return variantString
}

getVariants(line.split('\t'))