
const cards = [
  { name:"The Fool", roman:"0", symbol:"✧", keyword:"Begin with wonder", text:"The Fool represents beginnings, openness, and the courage to step into the unknown. What first step can you take while remaining mindful of the path ahead?" },
  { name:"The Magician", roman:"I", symbol:"⚕", keyword:"Make it real", text:"The Magician brings attention to skill, intention, and the resources already within reach. What can you put into practice today?" },
  { name:"The High Priestess", roman:"II", symbol:"☾", keyword:"Listen inward", text:"The High Priestess invites stillness, intuition, and attention to what has not yet been spoken. What might you notice if you gave yourself a quieter moment?" },
  { name:"The Empress", roman:"III", symbol:"❀", keyword:"Nurture growth", text:"The Empress is associated with creativity, care, and abundance. What deserves patience, nourishment, and room to grow?" },
  { name:"The Emperor", roman:"IV", symbol:"♜", keyword:"Create structure", text:"The Emperor speaks to boundaries, responsibility, and stable foundations. Where would a clear plan or healthy boundary help?" },
  { name:"The Hierophant", roman:"V", symbol:"✥", keyword:"Learn from tradition", text:"The Hierophant points toward shared wisdom, teaching, and tradition. Which beliefs genuinely guide you, and which deserve fresh examination?" },
  { name:"The Lovers", roman:"VI", symbol:"♡", keyword:"Choose with care", text:"The Lovers concerns connection, values, and meaningful choices. What decision would better reflect what matters most to you?" },
  { name:"The Chariot", roman:"VII", symbol:"⚔", keyword:"Direct your will", text:"The Chariot represents direction, determination, and holding competing forces in balance. What deserves your focused effort?" },
  { name:"Strength", roman:"VIII", symbol:"♙ 🦁", keyword:"Gentle courage", text:"Strength traditionally shows a woman calmly tending a lion, with an infinity symbol above her head. It represents courage guided by compassion and self-command rather than force. Where could patience be more powerful than pressure?" },
  { name:"The Hermit", roman:"IX", symbol:"☼", keyword:"Seek your own light", text:"The Hermit suggests reflection and the wisdom found in solitude. What do you hear when outside noise softens?" },
  { name:"Wheel of Fortune", roman:"X", symbol:"☸", keyword:"Meet the turning", text:"The Wheel of Fortune represents cycles, change, and circumstances beyond complete control. What can you adapt to, and what remains within your influence?" },
  { name:"Justice", roman:"XI", symbol:"⚖", keyword:"Seek honest balance", text:"Justice invites fairness, accountability, and clear-eyed reflection. What would an honest and balanced response look like?" },
  { name:"The Hanged One", roman:"XII", symbol:"∞", keyword:"See differently", text:"The Hanged One suggests a pause and a change of perspective. What might become clearer if you stopped trying to force an immediate answer?" },
  { name:"Death", roman:"XIII", symbol:"☠", keyword:"Make room for change", text:"Death symbolises endings, transition, and renewal—not a literal prediction of death. What are you ready to release so something new can begin?" },
  { name:"Temperance", roman:"XIV", symbol:"⚗", keyword:"Find the middle way", text:"Temperance represents patience, integration, and measured adjustment. Where could a gentler pace or a thoughtful compromise help?" },
  { name:"The Devil", roman:"XV", symbol:"⛓", keyword:"Notice the chains", text:"The Devil invites awareness of habits, attachments, and patterns that limit freedom. What choice could help you reclaim agency without shame?" },
  { name:"The Tower", roman:"XVI", symbol:"ϟ", keyword:"Let truth break through", text:"The Tower represents disruption and the collapse of unstable structures. What truth needs attention, and what can be rebuilt on firmer ground?" },
  { name:"The Star", roman:"XVII", symbol:"✧", keyword:"Hope returns", text:"The Star speaks of renewal and possibility. What helps you feel restored, and what small act could bring you closer to that feeling?" },
  { name:"The Moon", roman:"XVIII", symbol:"☽", keyword:"Move gently", text:"The Moon asks you to make room for uncertainty and imagination. Distinguish what you know from what you fear or hope." },
  { name:"The Sun", roman:"XIX", symbol:"☀", keyword:"Welcome vitality", text:"The Sun is associated with clarity, warmth, and joyful presence. What is working well that deserves to be acknowledged?" },
  { name:"Judgement", roman:"XX", symbol:"♢", keyword:"Answer the call", text:"Judgement concerns reflection, awakening, and responding to a deeper sense of purpose. What lesson are you ready to act upon?" },
  { name:"The World", roman:"XXI", symbol:"◎", keyword:"Complete the circle", text:"The World represents completion, integration, and a threshold to a new cycle. What have you learned, and how might you honour the distance travelled?" }
];

function drawThreeCards() {
  const shuffled = [...cards];

  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return shuffled.slice(0, 3);
}

let drawOrder = drawThreeCards();
let revealed = 0;

const tarotButtons = document.querySelectorAll(".tarot-card");
const instruction = document.getElementById("spread-instruction");
const readingResult = document.getElementById("reading-result");

tarotButtons.forEach((button, index) => {
  button.addEventListener("click", () => {
    if (button.classList.contains("revealed")) return;

    const card = drawOrder[index];

    button.querySelector(".roman").textContent = card.roman;
    button.querySelector(".card-art").textContent = card.symbol;
    button.querySelector(".card-front strong").textContent = card.name;
    button.querySelector(".card-front small").textContent = card.keyword;

    button.classList.add("revealed");
    button.setAttribute("aria-label", card.name + " revealed");

    revealed++;

    instruction.textContent = revealed < 3
      ? `Card revealed. Choose ${3 - revealed} more to complete your spread.`
      : "Your spread is complete.";

    if (revealed === 3) {
      document.getElementById("reading-title").textContent =
        "A reflection across your journey";

      document.getElementById("reading-copy").textContent =
        drawOrder.map((card, index) => {
          const position = ["Past", "Present", "Possible future"][index];
          return `${position} — ${card.name}: ${card.text}`;
        }).join(" ");

      readingResult.hidden = false;
    }
  });
});

document.getElementById("reset-reading").addEventListener("click", () => {
  drawOrder = drawThreeCards();
  revealed = 0;

  tarotButtons.forEach((button) => {
    button.classList.remove("revealed");
    button.setAttribute("aria-label", "Reveal tarot card");
    button.querySelector(".roman").textContent = "";
    button.querySelector(".card-art").textContent = "";
    button.querySelector(".card-front strong").textContent = "";
    button.querySelector(".card-front small").textContent = "";
  });

  instruction.textContent = "Select each card to reveal your three-card spread.";
  readingResult.hidden = true;
});

// Crystal elemental filters
document.querySelectorAll(".filter-chip").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".filter-chip").forEach((chip) => {
      chip.classList.remove("active");
    });

    button.classList.add("active");

    document.querySelectorAll(".crystal-card").forEach((card) => {
      card.hidden =
        button.dataset.filter !== "all" &&
        card.dataset.element !== button.dataset.filter;
    });
  });
});

// Crystal Grimoire entries
const stoneLore = {
  "amethyst":
    "Colour: violet to purple. Mineral: quartz. Symbolic associations: contemplation, calm, and spiritual reflection. Traditional lore varies by culture and period.",

  "rose quartz":
    "Colour: pale to deep pink. Mineral: quartz. Symbolic associations: tenderness, affection, and compassion in many modern crystal traditions.",

  "labradorite":
    "Colour: grey to dark, often flashing blue or green. Mineral: feldspar. Symbolic associations: transformation, possibility, and thresholds in contemporary crystal lore.",

  "carnelian":
    "Colour: orange to reddish brown. Mineral: chalcedony. Symbolic associations: vitality, courage, and creative momentum in historical and modern traditions."
};

const dialog = document.getElementById("stone-dialog");

document.querySelectorAll(".stone-more").forEach((button) => {
  button.addEventListener("click", () => {
    const stone = button.dataset.stone;

    document.getElementById("dialog-title").textContent =
      stone.replace(/\b\w/g, (letter) => letter.toUpperCase());

    document.getElementById("dialog-copy").textContent =
      stoneLore[stone] || "More information about this stone will be added soon.";

    dialog.showModal();
  });
});

document.querySelector(".dialog-close").addEventListener("click", () => {
  dialog.close();
});

dialog.addEventListener("click", (event) => {
  if (event.target === dialog) dialog.close();
});

// Responsive mobile navigation
const menuToggle = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".nav-links");

menuToggle.addEventListener("click", () => {
  const isOpen = navigation.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    navigation.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

// Automatically update the footer year
document.getElementById("year").textContent = new Date().getFullYear();


// Private tarot journal: entries are saved only in this browser.
const journalForm = document.getElementById("journal-form");
const journalEntries = document.getElementById("journal-entries");
const journalStatus = document.getElementById("journal-status");
const JOURNAL_KEY = "saintStoneJournalEntries";

function loadJournal() {
  let entries = [];
  try { entries = JSON.parse(localStorage.getItem(JOURNAL_KEY) || "[]"); } catch (_) {}
  journalEntries.replaceChildren();
  entries.forEach((entry, index) => {
    const article = document.createElement("article");
    article.className = "journal-entry";
    const title = document.createElement("h3");
    title.textContent = entry.title;
    const date = document.createElement("p");
    date.className = "journal-date";
    date.textContent = entry.date;
    const body = document.createElement("p");
    body.textContent = entry.body;
    const remove = document.createElement("button");
    remove.className = "stone-more";
    remove.type = "button";
    remove.textContent = "Delete entry";
    remove.addEventListener("click", () => {
      entries.splice(index, 1);
      localStorage.setItem(JOURNAL_KEY, JSON.stringify(entries));
      loadJournal();
      journalStatus.textContent = "Entry deleted.";
    });
    article.append(title, date, body, remove);
    journalEntries.append(article);
  });
}

journalForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const title = document.getElementById("journal-title").value.trim();
  const body = document.getElementById("journal-entry").value.trim();
  if (!title || !body) return;
  let entries = [];
  try { entries = JSON.parse(localStorage.getItem(JOURNAL_KEY) || "[]"); } catch (_) {}
  entries.unshift({ title, body, date: new Date().toLocaleString() });
  try {
    localStorage.setItem(JOURNAL_KEY, JSON.stringify(entries));
    journalForm.reset();
    journalStatus.textContent = "Your entry has been saved in this browser.";
    loadJournal();
  } catch (_) {
    journalStatus.textContent = "Could not save this entry. Check your browser storage settings.";
  }
});

loadJournal();
