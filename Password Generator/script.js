const result = document.getElementById('result');
const clipboard = document.getElementById('clipboard');
const passwordLength = document.getElementById('length');
const uppercase = document.getElementById('uppercase');
const lowercase = document.getElementById('lowercase');
const digits = document.getElementById('numbers');
const symbol = document.getElementById('symbols');
const getPassword = document.getElementById("generate");

const randomFunction = {
    lower: getRandomLowerCase,
    upper: getRandomUpperCase,
    number: getRandomNumber,
    symbol: getRandomSymbol,
}

clipboard.addEventListener('click', () => {
    const textarea = document.createElement('textarea')
    const password = result.innerText

    if(!password) { return }

    textarea.value = password
    document.body.appendChild(textarea)
    textarea.select()
    document.execCommand('copy')
    textarea.remove()
    alert('Password copied to clipboard!')
})

generate.addEventListener('click', () => {
    const length = +passwordLength.value
    const hasLower = lowercase.checked
    const hasUpper = uppercase.checked
    const hasNumber = digits.checked
    const hasSymbol = symbol.checked

    result.innerText = generatePassword(hasLower, hasUpper, hasNumber, hasSymbol, length)
})

function generatePassword(lower, upper, number, symbol, length) {
    let generatedPassword = ''
    const typesCount = lower + upper + number + symbol; 
    const typesArray = [{lower}, {upper}, {number}, {symbol}].filter(item => Object.values(item)[0])

    if(typesCount === 0) {
        return ''
    }

    for(let i = 0; i < length; i += typesCount) {
        typesArray.forEach(type => {
            const funcName = Object.keys(type)[0]
            generatedPassword += randomFunction[funcName]()
        })
    }

    const finalPassword = generatedPassword.slice(0, length)

    return finalPassword
}

function getRandomLowerCase() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97)
}

function getRandomUpperCase() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65)
}

function getRandomNumber() {
    return String.fromCharCode(Math.floor(Math.random() * 10) + 48)
}

function getRandomSymbol() {
    const symbols = '!"£$%^&*(){}[]=<>?<>,.'
    return symbols [Math.floor(Math.random() * symbols.length)]
}