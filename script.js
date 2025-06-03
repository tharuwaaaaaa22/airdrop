console.log('Script loaded');

let uid = localStorage.getItem("uid");
if (!uid) {
  uid = "user_" + Math.random().toString(36).substr(2, 9);
  localStorage.setItem("uid", uid);
}

function updateTaskProgress() {
  fetch(`https://solid-bedecked-walrus.glitch.me/progress?uid=${uid}`)
    .then(res => res.json())
    .then(data => {
      for (let i = 1; i <= 3; i++) {
        const watched = data[`task${i}`] || 0;
        document.getElementById(`task${i}-count`).innerText = `Watch Ads & Earn Points (${watched}/10)`;
      }
    });
}

function showTab(tab) {
  document.getElementById("section-tasks").style.display = "none";
  document.getElementById("section-bot").style.display = "none";
  document.getElementById("section-withdraw").style.display = "none";
  document.getElementById("section-" + tab).style.display = "block";
}

function watchAd(taskNumber) {
  const adLinks = [
    "https://eminentcleaveproduces.com/iazf10b6e?key=a4310e34201efab95887ed33dac431e3",
    "https://eminentcleaveproduces.com/weuyspet?key=23520775c9e3e64f6e23c2d35cb98846",
    "https://eminentcleaveproduces.com/v87w7knk3?key=51ea037a331728f325991ab5e5b59ef4"
  ];
  const adUrl = adLinks[Math.floor(Math.random() * adLinks.length)];
  const a = document.createElement("a");
  a.href = adUrl;
  a.target = "_blank";
  a.rel = "noopener";
  document.body.appendChild(a);
  a.click();
  a.remove();

  fetch(`https://solid-bedecked-walrus.glitch.me/go?uid=${uid}&task=task${taskNumber}`)
    .then(() => updateTaskProgress());
}

function shareLink() {
  const referralLink = `${window.location.origin}?ref=${uid}`;
  navigator.clipboard.writeText(referralLink).then(() => {
    alert("Referral link copied! Share in groups to earn.");
  });
}

function loadPoints() {
  fetch(`https://solid-bedecked-walrus.glitch.me/points?uid=${uid}`)
    .then(res => res.text())
    .then(data => {
      document.getElementById("userPoints").innerText = data + " Points";
      document.getElementById("totalPoints").innerText = data + " Points";
    });
}

setTimeout(() => {
  loadPoints();
  updateTaskProgress();
}, 1000);
