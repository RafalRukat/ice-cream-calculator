class Product {
    constructor(fat, sugar, sum) {
        this.fat = fat;
        this.sugar = sugar;
        this.sum = sum;
        this.fatPercent = 0;
        this.sugarPercent = 0;
    
    // elementy pobierane z DOM

    // Inputy

this.inputMilk32 = document.querySelector('input.milk32');
this.inputCream30 = document.querySelector('input.cream30');
this.inputCream36 = document.querySelector('input.cream36');
this.inputSugar = document.querySelector('input.sugar');
this.inputHoney = document.querySelector('input.honey');
this.inputCondensedMilk = document.querySelector('input.condensed-milk');

// buttony
this.buttonMilk32 = document.querySelector('button.milk32');
this.buttonCream30 = document.querySelector('button.cream30');
this.buttonCream36 = document.querySelector('button.cream36');
this.buttonSugar = document.querySelector('button.sugar');
this.buttonHoney = document.querySelector('button.honey');
this.buttonCondensedMilk = document.querySelector('button.condensed-milk');

// spany
this.spanMilk32 = document.querySelector('span.milk32');
this.spanCream30 = document.querySelector('span.cream30');
this.spanCream36 = document.querySelector('span.cream36');
this.spanSugar = document.querySelector('span.sugar');
this.spanHoney = document.querySelector('span.honey');
this.spanCondensedMilk = document.querySelector('span.condensed-milk');

// rezultaty
this.spanSum = document.querySelector('span.sum');
this.spanFatPercent = document.querySelector('span.fat-percent');
this.spanSugarPercent = document.querySelector('span.sugar-percent');

    }
    add(ingredient) {
        this.fat += ingredient.fat;
        this.sugar += ingredient.sugar;
        this.sum += ingredient.sum;
        this.fatPercent = this.fat * 100 / (this.sum);
        this.sugarPercent = this.sugar * 100 / (this.sum);
    }

    showResult() {
        this.spanSum.textContent = this.sum;
        this.spanFatPercent.textContent = this.fatPercent.toFixed(2);
        this.spanSugarPercent.textContent = this.sugarPercent.toFixed(2);
    }
}

const iceCream = new Product(0, 0, 0);

class Ingredient {
    constructor(fatPercent, sugarPercent, sum, input, button, span) {
        this.fatPercent = fatPercent;
        this.sugarPercent = sugarPercent;
        this.sum = sum;
        this.fat = 0;
        this.sugar = 0;
        this.input = input;
        this.button =  button;
        this.span = span;
    }

    showNameInConsole () {
        console.log(this.input.valueAsNumber)
    }

    addTo(product) {
        this.sum += this.input.valueAsNumber;
        this.spanValue = this.input.valueAsNumber + parseFloat(this.span.textContent); 
        this.span.textContent = spanValue;
        this.fat = this.fatPercent * this.sum / 100;
        this.sugar = this.sugarPercent * this.sum / 100;
        product.add(this)
        product.showResult()
        this.input.value = "";
    }
}

const milk32 = new Ingredient(3.2, 0, 0, inputMilk32, buttonMilk32, spanMilk32);
const cream30 = new Ingredient(30, 0, 0, inputCream30, buttonCream30, spanCream30);
const cream36 = new Ingredient(36, 0, 0, inputCream36, buttonCream36, spanCream36);
const sugar = new Ingredient(0, 100, 0, inputSugar, buttonSugar, spanSugar);
const honey = new Ingredient(0, 130, 0, inputHoney, buttonHoney, spanHoney)
const condensedMilk = new Ingredient(8, 55, 0, inputCondensedMilk, buttonCondensedMilk, spanCondensedMilk);

const addMilk32 = function (){milk32.addTo(iceCream)}
const addCream30 = function (){cream30.addTo(iceCream)}
const addCream36 = function (){cream36.addTo(iceCream)}
const addSugar = function (){sugar.addTo(iceCream)}
const addHoney = function (){honey.addTo(iceCream)}
const addCondensedMilk = function (){condensedMilk.addTo(iceCream)}


buttonMilk32.addEventListener("click", addMilk32);
buttonCream30.addEventListener("click", addCream30);
buttonCream36.addEventListener("click", addCream36);
buttonSugar.addEventListener("click", addSugar);
buttonHoney.addEventListener("click", addHoney);
buttonCondensedMilk.addEventListener("click", addCondensedMilk);