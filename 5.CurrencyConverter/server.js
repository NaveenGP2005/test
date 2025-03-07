document.addEventListener("DOMContentLoaded", () => {
  feather.replace();

  const amountInput = document.getElementById("amount");
  const fromCurrency = document.getElementById("from-currency");
  const toCurrency = document.getElementById("to-currency");
  const convertBtn = document.getElementById("convert-btn");
  const result = document.getElementById("result");
  const baseCurrency = document.getElementById("base-currency");
  const getRatesBtn = document.getElementById("get-rates-btn");
  const exchangeRates = document.getElementById("exchange-rates");
  const exchangeMode = document.getElementById("exchange-mode");
  const convertMode = document.getElementById("convert-mode");
  const toggleBtns = document.querySelectorAll(".toggle-btn");
  const Api_Key = "7056b4eef3fb9cabcc7f713b";

  toggleBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      toggleBtns.forEach((btn) => btn.classList.remove("active"));
      btn.classList.add("active");
      const mode = btn.getAttribute("data-mode");
      if (mode === "convert") {
        convertMode.style.display = "flex";
        exchangeMode.style.display = "none";
      } else {
        convertMode.style.display = "none";
        exchangeMode.style.display = "flex";
      }
    });
  });

  convertBtn.addEventListener("click", () => {
    const amount = parseFloat(amountInput.value);
    const from = fromCurrency.value;
    const to = toCurrency.value;

    if (isNaN(amount) || amount <= 0) {
      result.innerHTML = "Please enter a valid amount.";
      return;
    }

    fetch(`https://v6.exchangerate-api.com/v6/${Api_Key}/pair/${from}/${to}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        const rate = data.conversion_rate;
        const convertedAmount = (amount * rate).toFixed(2);
        result.innerHTML = `${amount} ${from} = ${convertedAmount} ${to}`;
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
        result.innerHTML = "Error fetching exchange rate. Please try again.";
      });
  });

  getRatesBtn.addEventListener("click", () => {
    const base = baseCurrency.value;

    fetch(`https://v6.exchangerate-api.com/v6/${Api_Key}/latest/${base}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        let ratesHtml = "<h2>Exchange Rates</h2>";
        for (const [currency, rate] of Object.entries(data.conversion_rates)) {
          if (currency !== base) {
            ratesHtml += `
              <div class="currency-icon">
                ${currency}: ${rate.toFixed(4)}
              </div>
            `;
          }
        }
        exchangeRates.innerHTML = ratesHtml;
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
        exchangeRates.innerHTML =
          "Error fetching exchange rates. Please try again.";
      });
  });
});
