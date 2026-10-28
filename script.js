
const cards = [
  {
    name: "The High Priestess",
    roman: "II",
    symbol: "☾",
    keyword: "Listen inward",
    text: "The High Priestess invites stillness, intuition, and attention to what has not yet been spoken. What might you notice if you gave yourself a quieter moment?"
  },
  {
    name: "The Star",
    roman: "XVII",
    symbol: "✧",
    keyword: "Hope returns",
    text: "The Star speaks in the language of renewal and possibility. Consider what helps you feel restored, and what small act could bring you closer to that feeling."
  },
  {
    name: "The World",
    roman: "XXI",
    symbol: "◎",
    keyword: "A cycle completes",
    text: "The World traditionally represents completion, integration, and the threshold of a new cycle. What have you learned, and how might you honour the distance you have travelled?"
  },
  {
    name: "The Moon",
    roman: "XVIII",
    symbol: "☽",
    keyword: "Move gently",
    text: "The Moon asks you to make room for uncertainty and imagination. Not every answer is visible yet; distinguish what you know from what you fear or hope."
  },
  {
    name: "Strength",
    roman: "VIII",
    symbol: "♌",
    keyword: "Gentle courage",
    text: "Strength is often depicted as calm courage rather than force. Where could patience, compassion, or a steadier response serve you better than pressure?"
  },
  {
    name: "The Hermit",
    roman: "IX",
    symbol: "✦",
    keyword: "Seek your own light",
    text: "The Hermit suggests retreat, reflection, and the wisdom found in solitude. Which voices are truly helpful, and what do you hear when outside noise softens?"
  }
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
