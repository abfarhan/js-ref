var budgetController = (function () {
  var Expense = function (id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
    this.percentage = -1;
  };

  Expense.prototype.calcPercentage = function (totalIncome) {
    if (totalIncome > 0) {
      this.percentage = Math.round((this.value / totalIncome) * 100);
    } else {
      this.percentage = -1;
    }
  };

  Expense.prototype.getPercentage = function () {
    return this.percentage;
  };

  var Income = function (id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };

  var calculateTotal = function (type) {
    var sum = 0;

    data.allItems[type].forEach(function (curr) {
      sum += curr.value;
    });
    data.totals[type] = sum;
  };

  var data = {
    allItems: {
      exp: [],
      inc: [],
    },
    totals: {
      exp: 0,
      inc: 0,
    },
    budget: 0,
    percentage: -1,
  };

  return {
    addItem: function (type, des, val) {
      var newItem, ID;

      // create new id
      if (data.allItems[type].length > 0) {
        ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
      } else {
        ID = 0;
      }

      // create new item
      if (type === 'exp') {
        newItem = new Expense(ID, des, val);
      } else if (type === 'inc') {
        newItem = new Income(ID, des, val);
      }

      data.allItems[type].push(newItem);
      return newItem;
    },

    deleteItem: function (type, id) {
      var ids, index;

      ids = data.allItems[type].map(function (current) {
        return current.id;
      });

      index = ids.indexOf(id);

      if (index !== -1) {
        data.allItems[type].splice(index, 1);
      }
    },

    calculateBudget: function () {
      // calculate total income and expense
      calculateTotal('exp');
      calculateTotal('inc');

      // calculate budget: income - expense
      data.budget = data.totals.inc - data.totals.exp;

      // calculate percentage
      if (data.totals.inc > 0) {
        data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100);
      } else {
        data.percentage = -1;
      }
    },

    calculatePercentage: function () {
      data.allItems.exp.forEach((curr) => {
        curr.calcPercentage(data.totals.inc);
      });
    },
    getPercentage: function () {
      var allPerc = data.allItems.exp.map((curr) => {
        return curr.calcPercentage();
      });
      return allPerc;
    },

    calculatePercentages: function () {
      data.allItems.exp.forEach(function (cur) {
        cur.calcPercentage(data.totals.inc);
      });
    },

    getPercentages: function () {
      var allPerc = data.allItems.exp.map(function (cur) {
        return cur.getPercentage();
      });
      return allPerc;
    },

    getBudget: function () {
      return {
        budget: data.budget,
        totalInc: data.totals.inc,
        totalExp: data.totals.exp,
        percentage: data.percentage,
      };
    },
  };
})();

var UIController = (function () {
  var DomStrings = {
    inputType: '.add__type',
    inputDescription: '.add__description',
    inputValue: '.add__value',
    inputBtn: '.add__btn',
    incomeContainer: '.income__list',
    expenseContainer: '.expenses__list',
    budgetLabel: '.budget__value',
    incomeLabel: '.budget__income--value',
    expenseLabel: '.budget__expenses--value',
    percentageLabel: '.budget__expenses--percentage',
    container: '.container',
    expensePercLabel: '.item__percentage',
  };

  return {
    getInput: function () {
      return {
        type: document.querySelector(DomStrings.inputType).value, // will be either inc or exp
        description: document.querySelector(DomStrings.inputDescription).value,
        value: parseFloat(document.querySelector(DomStrings.inputValue).value),
      };
    },

    addListItem: function (obj, type) {
      var html, newHtml, element;
      // Create HTML string with placeholder text

      if (type === 'inc') {
        element = DomStrings.incomeContainer;

        html =
          '<div class="item clearfix" id="inc-%id%"> <div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
      } else if (type === 'exp') {
        element = DomStrings.expenseContainer;

        html =
          '<div class="item clearfix" id="exp-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
      }

      // Replace the placeholder text with some actual data
      newHtml = html.replace('%id%', obj.id);
      newHtml = newHtml.replace('%description%', obj.description);
      newHtml = newHtml.replace('%value%', obj.value, type);

      // Insert the HTML into the DOM
      document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
    },

    deleteListItem: function (selectorID) {
      var el = document.getElementById(selectorID);
      el.parentNode.removeChild(el);
    },

    clearFields: function () {
      var fields, fieldsArray;
      fields = document.querySelectorAll(
        DomStrings.inputDescription + ', ' + DomStrings.inputValue
      );

      fieldsArray = Array.prototype.slice.call(fields);

      fieldsArray.forEach(function (current) {
        current.value = '';
      });

      fieldsArray[0].focus();
    },

    displayBudget: function (obj) {
      document.querySelector(DomStrings.budgetLabel).textContent = obj.budget;
      document.querySelector(DomStrings.incomeLabel).textContent = obj.totalInc;
      document.querySelector(DomStrings.expenseLabel).textContent =
        obj.totalExp;
      if (obj.percentage > 0) {
        document.querySelector(DomStrings.percentageLabel).textContent =
          obj.percentage + '%';
      } else {
        document.querySelector(DomStrings.percentageLabel).textContent = '---';
      }
    },

    displayPercentages: function (percentages) {
      var fields = document.querySelectorAll(DomStrings.expensePercLabel);
      nodeListForEach(fields, function (current, index) {
        if (percentages[index] > 0) {
          current.textContent = percentages[index] + '%';
        } else {
          current.textContent = '---';
        }
      });
    },

    getDOMstrings: function () {
      return DomStrings;
    },
  };
})();

var controller = (function (budgetCtrl, UICtrl) {
  var setupEventListener = function () {
    var DOM = UICtrl.getDOMstrings();

    document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);
    document.addEventListener('keypress', function (event) {
      if (event.keyCode === '13' || event.which === 13) {
        ctrlAddItem();
      }
    });

    document
      .querySelector(DOM.container)
      .addEventListener('click', ctrlDeleteItem);
  };

  var updateBudget = function () {
    // Calculate the budget
    budgetCtrl.calculateBudget();
    // Return the budget
    var budget = budgetCtrl.getBudget();
    // Display the budget on the UI
    UICtrl.displayBudget(budget);
  };

  var updatePercentage = function () {
    budgetCtrl.calculatePercentages();

    var percentages = budgetCtrl.getPercentages();

    console.log(percentages);
  };

  var ctrlAddItem = function () {
    var input, newItem;

    // Get the input field data
    input = UICtrl.getInput();

    if (input.description !== '' && !isNaN(input.value) && input.value > 0) {
      // Add the items into the budget controller
      newItem = budgetCtrl.addItem(input.type, input.description, input.value);

      // Add items to the UI
      UICtrl.addListItem(newItem, input.type);

      // Clear the fields
      UICtrl.clearFields();

      // Calculate and update budget`
      updateBudget();

      // update percentage
      updatePercentage();
    }
  };

  var ctrlDeleteItem = function (event) {
    var itemId, splitId, type, Id;

    itemId = event.target.parentNode.parentNode.parentNode.parentNode.id;

    if (itemId) {
      splitId = itemId.split('-');
      type = splitId[0];
      Id = parseInt(splitId[1]);
    }

    budgetCtrl.deleteItem(type, Id);

    UICtrl.deleteListItem(itemId);

    updateBudget();
  };

  return {
    init: function () {
      console.log('Application Has Started');
      UICtrl.displayBudget({
        budget: 0,
        totalInc: 0,
        totalExp: 0,
        percentage: -1,
      });
      setupEventListener();
    },
  };
})(budgetController, UIController);

controller.init();
