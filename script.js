console.log('Script loaded');

// ✅ Auto-generate UID if not present
let uid = localStorage.getItem("uid");
if (!uid) {
  uid = "user_" + Math.random().toString(36).substr(2, 9);
  localStorage.setItem("uid", uid);
}

// ✅ Load total points
function loadPoints() {
  fetch(`https://airdrop-backend-bygj.onrender.com/points?uid=${uid}`)
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
  fetch("https://airdrop-backend-bygj.onrender.com/withdraw", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ uid, amount: selectedAmount, address: binance })
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

// ✅ Points display
setTimeout(() => {
  fetch(`https://airdrop-backend-bygj.onrender.com/points?uid=${uid}`)
    .then(res => res.text())
    .then(data => {
      document.getElementById("userPoints").innerText = data;
    });
}, 1000);

// ✅ Adsterra Links (Direct)
const adLinks = [
  "https://eminentcleaveproduces.com/iazf10b6e?key=a4310e34201efab95887ed33dac431e3",
  "https://eminentcleaveproduces.com/weuyspet?key=23520775c9e3e64f6e23c2d35cb98846",
  "https://eminentcleaveproduces.com/v87w7knk3?key=51ea037a331728f325991ab5e5b59ef4"
];

// ✅ Task button logic
document.querySelectorAll(".task button").forEach((btn, index) => {
  btn.addEventListener("click", () => {
    if (index < 3) {
      // Random ad link
      const adUrl = adLinks[Math.floor(Math.random() * adLinks.length)];

      const a = document.createElement('a');
      a.href = adUrl;
      a.target = '_blank';
      a.rel = 'noopener';
      document.body.appendChild(a);
      a.click();
      a.remove();

      // Track click to backend
      fetch(`https://airdrop-backend-bygj.onrender.com/go?uid=${uid}&task=task${index + 1}`);
    } else {
      const referralLink = `${window.location.origin}?ref=${uid}`;
      navigator.clipboard.writeText(referralLink).then(() => {
        alert("Referral link copied! Share in groups to earn.");
      });
    }
  });
});
