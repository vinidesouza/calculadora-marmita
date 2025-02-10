// Get the forms and buttons
const ingredientForm = document.getElementById('ingredient-form');
const addIngredientBtn = document.getElementById('add-ingredient-btn');
const additionalExpensesForm = document.getElementById('additional-expenses-form');
const calculateBtn = document.getElementById('calculate-btn');

// Get the ingredients list and results div
const ingredientsList = document.getElementById('ingredients-list');
const resultsDiv = document.getElementById('results');

// Initialize the ingredients array
let ingredients = [];

// Add event listener to the add ingredient button
addIngredientBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const ingredientName = document.getElementById('ingredient-name').value;
    const purchasedQuantity = parseFloat(document.getElementById('purchased-quantity').value);
    const pricePaid = parseFloat(document.getElementById('price-paid').value);
    const category = document.getElementById('category').value;

    // Create a new ingredient object
    const ingredient = {
        name: ingredientName,
        quantity: purchasedQuantity,
        price: pricePaid,
        category: category
    };

    // Add the ingredient to the array
    ingredients.push(ingredient);

    // Display the ingredient in the list
    const ingredientHtml = `
        <div>
            <h3>${ingredientName}</h3>
            <p>Quantity: ${purchasedQuantity} kg/units</p>
            <p>Price: $${pricePaid}</p>
            <p>Category: ${category}</p>
        </div>
    `;
    ingredientsList.innerHTML += ingredientHtml;

    // Clear the form fields
    document.getElementById('ingredient-name').value = '';
    document.getElementById('purchased-quantity').value = '';
    document.getElementById('price-paid').value = '';
    document.getElementById('category').value = '';
});

// Add event listener to the calculate button
calculateBtn.addEventListener('click', (e) => {
    e.preventDefault();

    // Get the additional expenses values
    const packagingCost = parseFloat(document.getElementById('packaging-cost').value);
    const deliveryCost = parseFloat(document.getElementById('delivery-cost').value);
    const otherCosts = parseFloat(document.getElementById('other-costs').value);

    // Calculate the total cost and cost per meal
    let totalCost = 0;
    let costPerMeal = 0;
    let mealsProduced = 0;

    // Calculate the total cost of ingredients
    ingredients.forEach((ingredient) => {
        totalCost += ingredient.quantity * ingredient.price;
    });

    // Calculate the number of meals that can be produced
    const proteinQuantity = ingredients.filter((ingredient) => ingredient.category === 'protein').reduce((acc, ingredient) => acc + ingredient.quantity, 0);
    const carbohydrateQuantity = ingredients.filter((ingredient) => ingredient.category === 'carbohydrate').reduce((acc, ingredient) => acc + ingredient.quantity, 0);
    const vegetablesQuantity = ingredients.filter((ingredient) => ingredient.category === 'vegetables').reduce((acc, ingredient) => acc + ingredient.quantity, 0);
    const extrasQuantity = ingredients.filter((ingredient) => ingredient.category === 'extras').reduce((acc, ingredient) => acc + ingredient.quantity, 0);

    const mealWeight = 500; // grams
    const proteinWeight = mealWeight * 0.3; // 30% of meal weight
    const carbohydrateWeight = mealWeight * 0.4; // 40% of meal weight
    const vegetablesWeight = mealWeight * 0.2; // 20% of meal weight
    const extrasWeight = mealWeight * 0.1; // 10% of meal weight

    mealsProduced = Math.min(
        proteinQuantity / proteinWeight,
        carbohydrateQuantity / carbohydrateWeight,
        vegetablesQuantity / vegetablesWeight,
        extrasQuantity / extrasWeight
    );

    // Calculate the cost per meal
    costPerMeal = totalCost / mealsProduced;

    // Calculate the real cost per meal (including packaging, delivery, and other costs)
    const realCostPerMeal = costPerMeal + packagingCost + deliveryCost + otherCosts;

    // Calculate the suggested selling price and profit margin
    const suggestedSellingPrice = realCostPerMeal * 1.3; // 30% profit margin
    const profitMargin = (suggestedSellingPrice - realCostPerMeal) / realCostPerMeal * 100;

    // Display the results
    const resultsHtml = `
        <h2>Results</h2>
        <p>Total Cost: $${totalCost.toFixed(2)}</p>
        <p>Cost per Meal: $${costPerMeal.toFixed(2)}</p>
        <p>Real Cost per Meal: $${realCostPerMeal.toFixed(2)}</p>
        <p>Suggested Selling Price: $${suggestedSellingPrice.toFixed(2)}</p>
        <p>Profit Margin: ${profitMargin.toFixed(2)}%</p>
        <p>Meals Produced: ${mealsProduced.toFixed(2)}</p>
    `;
    resultsDiv.innerHTML = resultsHtml;
});
