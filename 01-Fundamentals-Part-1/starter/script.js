
//let firstName = 'Jonas'         //Variavel que sera armazenada na memória 



// Number    - tipo flutuante de dado, sempre tem decimais mesmo que não vejamos,
// Strings   - uma sequencia de carater, sempre entre aspas duplas ou simples
// boolean   - dado que só aceita true ou false
// undefined - valor de uma  variavel qunado ela não é declarada
// null      - dado vazio
// symbol    - valor unico e que nao pode ser mudado (ES2015)
// bigInt    - numeros inteiros muito grandes para serem representados pelo nunber

function bmi() {

    let mark = {

        mass: 78,
        height: 1.69,

    }

    let john = {

        mass: 92,
        height: 1.95,

    }


    let bmiJohn = john.mass / (john.height * john.height)

    let bmiMark = mark.mass / (mark.height * mark.height)

    let markHigherBMI = bmiMark > bmiJohn

    console.log("O BMI DE JOHN É " + bmiJohn)
    console.log("O BMI DE MARK É " + bmiMark)
    console.log(markHigherBMI)

}
//bmi()

function mat() {

    const firstName = "Matheus"
    const job = "Vagabundo"
    const birthYear = 1998
    const year = 2020

    const matheus = `Eu sou o ${firstName}, um ${job} de ${year - birthYear} anos.`

    console.log(`strings
com varias linhas 
é só apertar a porra do enter`)

    console.log(matheus)

}

function canDrive() {
    const age = 15
    const isOldEnough = age >= 18

    if (isOldEnough) {
        console.log(`Sara pode dirigir porra`)
    } else {
        let yearsLeft = 18 - age
        console.log(`não pode porra espera mais ${yearsLeft} anos`)
    }
}

function century21Or20() {
    const birthYear = 1991;

    let century;

    if (birthYear <= 2000) {
        century = 20
    } else {

        century = 21
    }

    console.log(century)
}

function bmiHigher() {

    let mark = {

        mass: 78,
        height: 1.69,

    }

    let john = {

        mass: 92,
        height: 1.95,

    }


    let bmiJohn = john.mass / (john.height * john.height)

    let bmiMark = mark.mass / (mark.height * mark.height)

    let markHigherBMI = bmiMark > bmiJohn


    if (markHigherBMI) {

        console.log(`O imc de ${bmiMark} do Mark é maior que o bmi de ${bmiJohn} do John`)
    } else {

        console.log(`O IMC DE ${bmiJohn} do John é maior que o bmi de ${bmiMark} do Mark`)

    }
}
//bmiHigher()



// Para converter uma string de um numero para um numero para que se possa fazer uma conta use o comando Number(variavel)

// Existem 5 valores falsos - 0, "", undefined, NaN, null, qualder desse quando convertido para boolean apresenta o valor false
// E qualque valor diferente apresentara um boolean true


function dolplhinsVsKoalas() {

    let dolphinsScore = {

        score1: 97,
        score2: 112,
        score3: 101,
    }

    let koalasScore = {

        score1: 109,
        score2: 95,
        score3: 123,
    }

    let dolphinsAverage = ((dolphinsScore.score1 + dolphinsScore.score2 + dolphinsScore.score3) / 3)

    let koalasAverage = (koalasScore.score3 + koalasScore.score2 + koalasScore.score1) / 3

    if (dolphinsAverage > koalasAverage && dolphinsAverage >= 100) {

        console.log(`dolphins campeões`)

    } else if (koalasAverage > dolphinsAverage && koalasAverage >= 100) {

        console.log(`Koalas campeões`)
    } else if (dolphinsAverage === koalasAverage && dolphinsAverage > 100) {
        console.log(`Ambos ganham o trofeu`)
    } else {
        console.log(`Niguem ganhou`)
    }

    console.log(dolphinsAverage)
    console.log(koalasAverage)
}
//dolplhinsVsKoalas()


function switchExemplo() {


    const day = `monday`;

    switch (day) {
        case `monday`:
            console.log(`curso de estrututa`)
            console.log(`vai la codificar porra`)
            break;
        case `tuesday`:
            console.log(`preparar videos teoricos`)
            break;
        case `wednesday`:
        case `thursday`:
            console.log(`escrever exemplo de codigos`)
            break;
        case `friday`:
            console.log(`gravar videos`)
            break;
        case `saturday`:
        case `monday`:
            console.log(`aproveita o fds ae`)
            break;

        default:
            console.log(`não é um dia`)
            break;
    }

}
//switchExemplo()


function exemploDeCimaComIfElse() {
    let day = `monday`;

    if (day == `monday`) {
        console.log(`curso de estrututa`)
        console.log(`vai la codificar porra`)
    } else if (day == tuesday) {
        console.log(`preparar videos teoricos`)
    } else if (day == `wednesday` || day == `thursday`) {
        console.log(`escrever exemplo de codigos`)
    } else if (day == `friday`) {
        console.log(`gravar videos`)
    } else if (day == `saturday` || day == `monday`) {
        console.log(`aproveita o fds ae`)
    } else {
        console.log(`não é um dia`)
    }

}
//exemploDeCimaComIfElse()

function ifelseDiferente() {
    const age = 15;

    const drink = age >= 18 ? `alcol` : `agua`
    console.log(`bebe ${drink} otario`)
}

function Exercicio4() {
    const billValues = {

        day1: 275,
        day2: 40,
        day3: 430,
    }

    let tip = billValues.day1 >= 50 && billValues.day1 <= 300 ? 0.15 * billValues.day1 : 0.2 * billValues.day1;
    let tip1 = billValues.day2 >= 50 && billValues.day2 <= 300 ? 0.15 * billValues.day2 : 0.2 * billValues.day2;
    let tip2 = billValues.day3 >= 50 && billValues.day3 <= 300 ? 0.15 * billValues.day3 : 0.2 * billValues.day3;

    console.log(`A conta ficou em ${billValues.day1} e a gorjeta em ${tip}, o valor final é de ${billValues.day1 + tip}.`)
    console.log(`A conta ficou em ${billValues.day2} e a gorjeta em ${tip1}, o valor final é de ${billValues.day2 + tip1}.`)
    console.log(`A conta ficou em ${billValues.day3} e a gorjeta em ${tip2}, o valor final é de ${billValues.day3 + tip2}.`)

}

