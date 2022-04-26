class Ingredient {
    constructor(name, fatPercent, sugarPercent, product) {
        this.name = name;
        this.fatPercent = fatPercent;
        this.sugarPercent = sugarPercent;
        this.product = product;
        this.totalMass = 0;
        this.fat = 0;
        this.sugar = 0;
    }

    setContent() {
        this.totalMass = Number(this.input.value);
        this.fat = this.fatPercent / 100 * this.totalMass;
        this.sugar = this.sugarPercent / 100 * this.totalMass;
    }

    assignTheInput() {

        const inputsContainer = document.querySelector(".inputs");
        // stwórz span z nazwą składnika
        const ingredientSpan = document.createElement('span');
        inputsContainer.appendChild(ingredientSpan);
        ingredientSpan.textContent = this.name;
        // stwórz input dla składnika
        const ingredientInput = document.createElement('input');
        inputsContainer.appendChild(ingredientInput);
        this.input = ingredientInput;
        // ingredientInput.classList.add(inputClassName);
        // Ustaw nasłuchiwanie na zmianę w inpucie

        // zabezpieczenie przed przecinkiem
        ingredientInput.addEventListener("keyup", () => {
            if (ingredientInput.value.includes(",")) {
                const correctedValue = ingredientInput.value.replace(",", ".");
                ingredientInput.value = correctedValue;
            }

            // zabezpieczenie przed nieprawidłowymi wartościami
            if (!isNaN(Number(ingredientInput.value))) {
                this.setContent();
                this.product.changeContent();
                this.product.publishContent();
            } else {
                alert("Nieprawidłowa wartość");
                const correctedValue = ingredientInput.value.slice(0, -1);
                ingredientInput.value = correctedValue;
            }
        });
    }

}

class Product {
    constructor(totalMass, fat, sugar) {
        this.totalMass = totalMass;
        this.fat = fat;
        this.sugar = sugar;
        this.fatPercent = 0;
        this.sugarPercent = 0;
        this.newIngredientButton = document.querySelector('button.add-ingredient');


        this.ingredientsList = [
            new Ingredient("Mleko 3,2%", 3.2, 0, this),
            new Ingredient("Śmietana 30%", 30, 0, this),
            new Ingredient("Śmietana 36%", 36, 0, this),
            new Ingredient("Cukier", 0, 100, this),
            new Ingredient("Miód", 0, 130, this),
            new Ingredient("Mleko skondensowane", 8, 55, this),
        ];

        this.outputsList = [{
                name: "Masa całkowita: ",
                type: "totalMass",
            },
            {
                name: "Zawartość tłuszczu: ",
                type: "fatPercent",
            },
            {
                name: "Zawartość cukru: ",
                type: "sugarPercent",
            },
        ];

        this.ingredientsList.forEach((ingredient) => {
            ingredient.assignTheInput()
        });


        // połączenie outputów z DOM

        this.outputsList.forEach((output) => {
            output.nameSpan = document.createElement('span');
            output.valueSpan = document.createElement('span');
            output.container = document.querySelector('.outputs');

            output.container.appendChild(output.nameSpan);
            output.container.appendChild(output.valueSpan);
            output.nameSpan.textContent = output.name;
        });

        // połączenie z przyciskiem dodającym nowe składniki

        this.newIngredientButton.addEventListener("click", this.addIngredient);
    }

    getTotalMass() {
        return this.totalMass;
    }

    getFatPercent() {
        return this.fatPercent;
    }

    getSugarPercent() {
        return this.sugarPercent;
    }

    changeContent() {
        this.totalMass = 0;
        this.fat = 0;
        this.sugar = 0;
        this.ingredientsList.forEach((ingredient) => {
            this.totalMass += ingredient.totalMass;
            this.fat += ingredient.fat;
            this.sugar += ingredient.sugar;
        });

        if (this.totalMass) {
            this.fatPercent = this.fat * 100 / this.totalMass;
            this.sugarPercent = this.sugar * 100 / this.totalMass;
        } else {
            this.fatPercent = 0;
            this.sugarPercent = 0;
        }
    }

    publishContent() {
        this.outputsList.forEach((output) => {
            if (output.type == "totalMass") {
                output.value = this.getTotalMass();
                output.valueSpan.textContent = output.value.toFixed(2) + "g";
            };
            if (output.type == "fatPercent") {
                output.value = this.getFatPercent();
                output.valueSpan.textContent = output.value.toFixed(2) + "%";

            };
            if (output.type == "sugarPercent") {
                output.value = this.getSugarPercent();
                output.valueSpan.textContent = output.value.toFixed(2) + "%";
            };
        })
    }

    addIngredient = () => {
        const newIngredientName = document.querySelector('.new-name').value;
        const newIngredientFatPercent = Number(document.querySelector('.new-fat-percent').value);
        const newIngredientSugarPercent = Number(document.querySelector('.new-sugar-percent').value);
        const newIngredient = new Ingredient(newIngredientName, newIngredientFatPercent, newIngredientSugarPercent, this);
        this.ingredientsList.push(newIngredient);
        console.log (`Nowy składnik to ${newIngredient.name}. Teraz lista składników wygląda tak: ${this.ingredientsList}`);
        this.ingredientsList[this.ingredientsList.length - 1].assignTheInput();
        newIngredientName.value = "";
        newIngredientFatPercent.value = "";
        newIngredientSugarPercent.value = "";
    }
}

const iceCream = new Product(0, 0, 0);