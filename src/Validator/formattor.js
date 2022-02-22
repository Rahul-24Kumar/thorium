function trim() {
    let word= "    Hey!   There  "
    console.log(word.trim());
}

function toLowerCase() {
    let nameL = " hI mY nAmE IS rAHuL kUmAR ChaUraSiyA"
    console.log(nameL.toLocaleLowerCase);
}

function toUpperCase() {
    let  nameU=  "hI mY naMe iS rAHuL kUmAR ChaUraSiyA"
    console.log(nameU.toLocaleUpperCase);
    
}

module.exports.tr= trim
module.exports.lC= toLowerCase
module.exports.uC= toUpperCase
