////// Display data in UI

function Get_data() {
  fetch(`/show_data/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "X-CSRFToken": csrftoken,
    },
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      UpdatingUI(data["data"]);
    });
}

Get_data();

// selecting control sections of the app
const add_type = document.querySelector(".add__type");
const add__description = document.querySelector(".add__description");
const add__value = document.querySelector(".add__value");
const add__btn = document.querySelector(".add__btn");

// Updating UI of the app

function formatWithComma(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function UpdatingUI(data) {

  const date = document.querySelector('.budget__title--month')

  const budget__value = document.querySelector(".budget__value");
  const budget__income = document.querySelector(".budget__income--value");
  const budget__expenses = document.querySelector(".budget__expenses--value");
  const expense_percentage = document.querySelector(
    ".budget__expenses--percentage"
  );

  const income_list = document.querySelector(".income__list");
  const expense_list = document.querySelector(".expenses__list");

  date.textContent = `${data['date']}`

  budget__value.textContent = `+ ${formatWithComma(data["total_income"])}`;
  budget__income.textContent = `+ ${formatWithComma(data["remaining_income"])}`;
  budget__expenses.textContent = `- ${formatWithComma(data["total_expense"])}`;
  expense_percentage.textContent = ` ${data["expense_percentage"].toFixed(0)}%`;

  let income_html = data["Incomes"].map((cur) => {
    return `
    <div class="item clearfix" id="income-0">
              <div class="item__description">${cur.description}</div>
              <div class="right clearfix">
                  <div class="item__value">+ ${formatWithComma(
                    cur.income
                  )} </div>
                  <div class="item__delete">
                    
                      <button data-label = ${cur.id} class="item__delete--btn">
                  
                        <i class="ion-ios-close-outline">x</i></button>
                  </div>
              </div>
          </div>
    `;
  });

  let expense_html = data["Expenses"].map((cur) => {
    return `
    <div class="item clearfix" id="expense-0">
              <div class="item__description">${cur.description}</div>
              <div class="right clearfix">
                  <div class="item__value expense">- ${formatWithComma(
                    cur.expense
                  )}</div>
                  
                  <div class="item__percentage"> ${(
                    (cur.expense / data["total_income"]) *
                    100
                  ).toFixed(0)}%  </div>

                  <div class="item__delete">
                      <button data-label = ${
                        cur.id
                      } class="item__delete--btn"> <i class="ion-ios-close-outline">x</i></button>
                  </div>
              </div>
          </div>
    `;
  });

  income_list.innerHTML = income_html.join("");
  expense_list.innerHTML = expense_html.join("");

  let delete_items = document.querySelectorAll(".item__delete--btn");

  delete_items.forEach((cur) => {
    cur.addEventListener("click", (ev) => {
      let id = ev.target.parentElement.getAttribute("data-label");

      fetch(`/delete_item/${id}/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": csrftoken,
        },
        body: JSON.stringify({}),
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          UpdatingUI(data["data"]);
        });
    });
  });
}

// csrf token

function getToken(name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== "") {
    const cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      // Does this cookie string begin with the name we want?
      if (cookie.substring(0, name.length + 1) === name + "=") {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}

var csrftoken = getToken("csrftoken");

////////////////////////////********************************************************************\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
budget_info = {
  Type: "inc",
  description: "",
  value: "",
};

function get_budget_info(field) {
  field.addEventListener("input", (ev) => {
    budget_info[ev.target.getAttribute("data-label")] = ev.target.value;
  });
}

get_budget_info(add_type);
get_budget_info(add__description);
get_budget_info(add__value);

add__btn.addEventListener("click", (ev) => {
  var add_budget = "/add_budget/";

  fetch(add_budget, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-CSRFToken": csrftoken,
    },
    body: JSON.stringify(budget_info),
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      UpdatingUI(data["data"]);
    });
});
