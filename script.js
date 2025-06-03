console.log('Script loaded');

// Auto UID
let uid = localStorage.getItem("uid");
if (!uid) {
  uid = "user_" + Math.random().toString(36).substr(2, 9);
  localStorage.setItem("uid", uid);
}

// Load points
function loadPoints() {
  fetch(`https://solid-bedecked-walrus.glitch.me/points?uid=${uid}`)
    .then(res => res.text())
    .then(data => {
      document.getElementById("totalPoints").innerText = data + " pts";
    });
}
loadPoints();

let selectedAmount = 0;
function requestWithdraw(amount) {
  selectedAmount = amount;
  document.getElementById("withdrawForm").style.display = "block";
}
function submitWithdraw() {
  const binance = document.getElementById("binanceInput").value;
  fetch("https://solid-bedecked-walrus.glitch.me/withdraw", {
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

setTimeout(() => {
  fetch(`https://solid-bedecked-walrus.glitch.me/points?uid=${uid}`)
    .then(res => res.text())
    .then(data => {
      document.getElementById("userPoints").innerText = data;
    });
}, 1000);

// ✅ THIS FIX — open /track directly, let backend redirect
document.querySelectorAll(".task button").forEach((btn, index) => {
  btn.addEventListener("click", () => {
    if (index < 3) {
      const url = `https://solid-bedecked-walrus.glitch.me/track?uid=${uid}&task=task${index + 1}`;
      window.open(url, "_blank"); // ✅ this will redirect from backend to Adsterra
    } else {
      const referralLink = `${window.location.origin}?ref=${uid}`;
      navigator.clipboard.writeText(referralLink).then(() => {
        alert("Referral link copied! Share in groups to earn.");
      });
    }
  });
});
