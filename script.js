const baseURL = "https://solid-bedecked-walrus.glitch.me";

let currentTab = "task";

function showTab(tabId) {
  document.querySelectorAll(".tab-content").forEach(div => div.classList.remove("active"));
  document.getElementById(tabId).classList.add("active");

  document.querySelectorAll(".tab-btn").forEach(btn => btn.classList.remove("active"));
  event.target.classList.add("active");
}

function withdraw(amount) {
  const userBinance = document.getElementById("binance-details").value.trim();
  if (!userBinance) {
    alert("Enter Binance Details");
    return;
  }

  const data = {
    uid: localStorage.getItem("uid"),
    amount: amount,
    binance: userBinance
  };

  fetch(baseURL + "/withdraw", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  })
  .then(res => res.json())
  .then(response => {
    alert("Withdraw Request Sent");
  })
  .catch(() => alert("Error sending request"));
}
