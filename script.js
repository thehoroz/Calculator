const screen1 = document.querySelector('.screen1')
const screen2 = document.querySelector('.screen2')
const btncontainer = document.querySelector('.btn-container');
const numberStore = [];
const operationStore = [];

//buttons
//Creating buttons 0-9 and making them appear on the screen
for(let i = 9; i >= 0; i--) {
    let button = document.createElement('button');
    button.classList.add(`btn`, `btn${i}`)
    button.textContent = i;
    //changes the calc screen2 to the pressed button number
    button.addEventListener('click', function() {
        screenText(this.textContent);
        numberStore.push(this.textContent)});
    btncontainer.appendChild(button);
}

//creating the operator buttons

const buttonClear = document.createElement('button');
    buttonClear.classList.add('btn', 'btn-clr');
    buttonClear.textContent = 'C';
    buttonClear.addEventListener('click', () => {
        clearText(screen1)
        clearText(screen2)
        clearArray(numberStore)
        clearArray(operationStore)});
    btncontainer.appendChild(buttonClear);


// When the equals button is pressed, it will find the stored values
// and it will execute the operate function on the stored values
const buttonEquals = document.createElement('button');
    buttonEquals.classList.add('btn', 'btn-eq');
    buttonEquals.textContent = '=';
    buttonEquals.addEventListener('click', function() {
        if(operationStore[0] !== undefined && operationStore[1] !== undefined && numberStore[0] !== undefined){
            operate(operationStore[1], Number(operationStore[0]), Number(numberStore.join('')))
        clearArray(numberStore);
        clearArray(operationStore);
        operationStore.push(screen1.textContent);
        clearText(screen2);
    }});
    btncontainer.appendChild(buttonEquals);

//the operator buttons below will store the numbers and operator of choice on screen into the calcObj

const buttonAdd = document.createElement('button');
    buttonAdd.classList.add('btn', 'btn-add');
    buttonAdd.textContent = '+';
    buttonAdd.addEventListener('click', function() {
        elementStorer(add)
        onScreen(this.textContent);
        });
    btncontainer.appendChild(buttonAdd);

const buttonSubtract = document.createElement('button');
    buttonSubtract.classList.add('btn', 'btn-subtract');
    buttonSubtract.textContent = '-';
    buttonSubtract.addEventListener('click', function() {
        elementStorer(subtract)
        onScreen(this.textContent);
        });
    btncontainer.appendChild(buttonSubtract);

const buttonMultiply = document.createElement('button');
    buttonMultiply.classList.add('btn', 'btn-multiply');
    buttonMultiply.textContent = '*';
    buttonMultiply.addEventListener('click', function() {
        elementStorer(multiply)
        onScreen(this.textContent);
        });
    btncontainer.appendChild(buttonMultiply);


const buttonDivide = document.createElement('button');
    buttonDivide.classList.add('btn','btn-divide');
    buttonDivide.textContent = '/';
    buttonDivide.addEventListener('click', function() {
        elementStorer(divide)
        onScreen(this.textContent);
        });
    btncontainer.appendChild(buttonDivide);

const buttonDot = document.createElement('button');
    buttonDot.classList.add('btn','btn-dot');
    buttonDot.textContent = '.';
    buttonDot.addEventListener('click', function() {
        //This checks if a dot is entered, if not, it adds a dot on click        
        if(numberStore.includes('.')){ 
            return
        }
        screenText(this.textContent);
        numberStore.push(this.textContent);
        });
    btncontainer.appendChild(buttonDot);


//The operator functions, they return the value to the screen
const add = (a, b) => screen1.textContent = Math.round((a + b) * 10000000) / 10000000;
const subtract = (a, b) => screen1.textContent = Math.round((a - b) * 10000000) / 10000000;
const multiply = (a, b) => screen1.textContent = Math.round((a * b) * 10000000) / 10000000;
const divide = (a, b) => {
    if(b === 0) {
        return screen1.textContent = `Bismillah`};
    return screen1.textContent = Math.round((a / b) * 10000000) / 10000000};

const operate = (operator, a, b) => operator == undefined ? 0 : operator(a, b);

const screenText = (num) => screen2.textContent += num;

const clearText = (text) => {text.textContent = ''};

const elementStorer = (operator) => {
    if(operationStore[0] !== undefined && operationStore[1] !== undefined && numberStore[0] !== undefined){
        operate(operationStore[1], Number(operationStore[0]), Number(numberStore.join(''))) 
        clearArray(numberStore);
        clearArray(operationStore);
        operationStore.push(screen1.textContent, operator)
    }
    else if(operationStore[0] !== undefined) {
        operationStore[1] = operator;
    }
    else if(operationStore[0] == undefined) {
        operationStore.push(numberStore.join(''), operator);
        clearArray(numberStore);
    }
    return;
}

const clearArray = function(array) {
    array.splice(0, array.length);}

//this function changes the operator on screen 2. 
//if you click an operator after an operator has already been clicked
//it changes the operator to the most recent clicked operator
let onScreen = function (operator) {
    let string = '';
    switch (screen2.textContent.charAt(screen2.textContent.length -1)) {
        case '+':
            string = screen2.textContent.slice(0, -1) + operator;
            screen2.textContent = string;
            break;
        case '-':
            string = screen2.textContent.slice(0, -1) + operator;
            screen2.textContent = string;
            break;
        case '/':
            string = screen2.textContent.slice(0, -1) + operator;
            screen2.textContent = string;
            break;
        case '*':
            string = screen2.textContent.slice(0, -1) + operator;
            screen2.textContent = string;
            break;
        default:
            screen2.textContent += operator;
    }
};