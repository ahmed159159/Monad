// بيانات الكروت: استبدل أسماء الصور داخل /images حسب صورك
const cards = [
  { id:1, name:"Fighter 1", img:"images/char1.jpg", power: 80, speed: 60, defense: 70 },
  { id:2, name:"Fighter 2", img:"images/char2.jpg", power: 75, speed: 85, defense: 65 },
  { id:3, name:"Fighter 3", img:"images/char3.jpg", power: 66, speed: 72, defense: 88 },
  { id:4, name:"Fighter 4", img:"images/char4.jpg", power: 90, speed: 54, defense: 60 },
  { id:5, name:"Fighter 5", img:"images/char5.jpg", power: 58, speed: 93, defense: 55 },
  { id:6, name:"Fighter 6", img:"images/char6.jpg", power: 70, speed: 70, defense: 70 }
];

const cardsArea = document.getElementById("cardsArea");
const battlePanel = document.getElementById("battlePanel");
const playerCardDiv = document.getElementById("playerCard");
const opponentCardDiv = document.getElementById("opponentCard");
const resultDiv = document.getElementById("result");
const playerScoreSpan = document.getElementById("playerScore");
const opponentScoreSpan = document.getElementById("opponentScore");
const nextRoundBtn = document.getElementById("nextRound");

let playerScore = 0;
let opponentScore = 0;
let playerSelection = null;
let opponentSelection = null;

// عرض كل الكروت لاختيار اللاعب
function renderCards() {
  cardsArea.innerHTML = "";
  cards.forEach(c => {
    const el = document.createElement("div");
    el.className = "card";
    el.innerHTML = `
      <img src="${c.img}" alt="${c.name}" onerror="this.style.filter='grayscale(100%)'; this.alt='Image not found'">
      <div class="meta">${c.name}</div>
      <div class="stats">
        <div title="Power">${c.power}</div>
        <div title="Speed">${c.speed}</div>
        <div title="Defense">${c.defense}</div>
      </div>
    `;
    el.addEventListener("click", () => selectPlayerCard(c));
    cardsArea.appendChild(el);
  });
}

// عندما يختار اللاعب كارت
function selectPlayerCard(card) {
  playerSelection = card;
  // خصم عشوائي لاختيار المنافس (يمكن تغييره ليوزع عشوائياً من الباقي)
  const pool = cards.filter(c => c.id !== card.id);
  opponentSelection = pool[Math.floor(Math.random()*pool.length)];

  showBattlePanel();
  renderCardDiv(playerCardDiv, playerSelection);
  renderCardDiv(opponentCardDiv, opponentSelection);
  resultDiv.textContent = "اختَر الخاصية للمقارنة (قوة / سرعة / دفاع)";
  nextRoundBtn.classList.add("hidden");
}

// عرض الكارت في الصندوق الكبير
function renderCardDiv(container, card) {
  container.innerHTML = `
    <img src="${card.img}" alt="${card.name}" onerror="this.style.filter='grayscale(100%)'; this.alt='Image not found'">
    <div class="meta">${card.name}</div>
    <div class="stats">
      <div>⚔️ ${card.power}</div>
      <div>💨 ${card.speed}</div>
      <div>🛡️ ${card.defense}</div>
    </div>
  `;
}

// إظهار لوحة القتال
function showBattlePanel() {
  battlePanel.classList.remove("hidden");
  // تمرير لنصبة المركز
  window.scrollTo({ top: battlePanel.offsetTop - 20, behavior: 'smooth' });
}

// منطق المقارنة على خاصية
function playAttribute(attr) {
  if (!playerSelection || !opponentSelection) return;
  const p = playerSelection[attr];
  const o = opponentSelection[attr];

  // مؤثر بصري بسيط
  resultDiv.innerHTML = `أنت: ${p} — الخصم: ${o}`;
  if (p > o) {
    resultDiv.innerHTML = `🔥 فزت! (${playerSelection.name} ${attr} ${p} > ${o})`;
    playerScore++;
  } else if (p < o) {
    resultDiv.innerHTML = `💀 خسرت! (${opponentSelection.name} ${attr} ${o} > ${p})`;
    opponentScore++;
  } else {
    resultDiv.innerHTML = `🤝 تعادل! (${p} = ${o})`;
  }
  updateScores();
  nextRoundBtn.classList.remove("hidden");
}

// تحديث لوحة النقاط
function updateScores(){
  playerScoreSpan.textContent = playerScore;
  opponentScoreSpan.textContent = opponentScore;
}

// حدث أزرار الخاصيات
document.querySelectorAll(".attrBtn").forEach(btn => {
  btn.addEventListener("click", () => {
    const attr = btn.dataset.attr;
    playAttribute(attr);
  });
});

// زر الجولة التانية
nextRoundBtn.addEventListener("click", () => {
  playerSelection = null;
  opponentSelection = null;
  battlePanel.classList.add("hidden");
  resultDiv.textContent = "";
  renderCards();
});

// البدء
renderCards();
