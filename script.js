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
  fetch("https://solid-bedecked-walrus.glitch.me/withdraw", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ uid, amount: selectedAmount, address: binance })  // ✅ FIXED: 'binance' key changed to 'address'
  })
  .then(res => res.json())  // ✅ Changed to JSON to show status
  .then(msg => {
    if (msg.status === "success") {
      document.getElementById("withdrawStatus").innerText = "✅ Withdrawal request submitted!";
    } else {
      document.getElementById("withdrawStatus").innerText = "❌ " + (msg.message || "Error");
    }
    loadPoints();
  })
  .catch(() => {
    document.getElementById("withdrawStatus").innerText = "❌ Network error!";
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

// ✅ FIX: Add event listeners *after* DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".task button").forEach((btn, index) => {
    btn.addEventListener("click", () => {
      if (index < 3) {
        const url = `https://solid-bedecked-walrus.glitch.me/go?uid=${uid}&task=task${index+1}`;
        
        // 👇 Fix: use direct link open here
        const adLink = `https://solid-bedecked-walrus.glitch.me/go?uid=${uid}&task=task${index+1}`;
        const a = document.createElement('a');
        a.href = adLink;
        a.target = '_blank';
        a.rel = 'noopener noreferrer';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);


        // ✅ Fallback alert if popup blocked
        if (!newWindow || newWindow.closed || typeof newWindow.closed === 'undefined') {
          alert("Please allow popups or disable Brave Shields for this site.");
        }
      } else {
        const referralLink = `${window.location.origin}?ref=${uid}`;
        navigator.clipboard.writeText(referralLink).then(() => {
          alert("Referral link copied! Share in groups to earn.");
        });
      }
    });
  });
});
