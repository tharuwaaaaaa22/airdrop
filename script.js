
console.log('Script loaded');



// ✅ Auto-generate UID if not present
let uid = localStorage.getItem("uid");
if (!uid) {
  uid = "user_" + Math.random().toString(36).substr(2, 9);
  localStorage.setItem("uid", uid);
}

// ✅ Load total points
function loadPoints() {
  fetch(`https://solid-bedecked-walrus.glitch.me/points?uid=${uid}`)
    .then(res => res.text())
    .then(data => {
      document.getElementById("totalPoints").innerText = data + " pts";
    });
}
loadPoints();

// ✅ Withdraw logic
let selectedAmount = 0;

function requestWithdraw(amount) {
  selectedAmount = amount;
  document.getElementById("withdrawForm").style.display = "block";
}

function submitWithdraw() {
  const binance = document.getElementById("binanceInput").value;
  fetch("https://solid-bedecked-walrus.glitch.me/withdraw-request", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ uid, amount: selectedAmount, binance })
  })
  .then(res => res.text())
  .then(msg => {
    document.getElementById("withdrawStatus").innerText = msg;
    loadPoints();
  });
}



function showTab(tab) {
  document.getElementById("section-tasks").style.display = "none";
  document.getElementById("section-bot").style.display = "none";
  document.getElementById("section-withdraw").style.display = "none";

  document.getElementById("section-" + tab).style.display = "block";
}
