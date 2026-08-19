const messages = document.getElementById("messages");
const form = document.getElementById("chat-form");
const input = document.getElementById("message-input");
const typing = document.getElementById("typing");
const newSessionButton = document.getElementById("new-session");

let sessionId = crypto.randomUUID();

function addMessage(text, role) {
  const wrapper = document.createElement("div");
  wrapper.className = `message ${role}`;

  const bubble = document.createElement("div");
  bubble.className = "bubble";
  bubble.textContent = text;

  wrapper.appendChild(bubble);
  messages.appendChild(wrapper);
  messages.scrollTop = messages.scrollHeight;
}

function resetChat() {
  sessionId = crypto.randomUUID();
  messages.innerHTML = "";
  addMessage(
    'Hello! I can help you place a car order. Say "I want to buy a car" to begin.',
    "bot"
  );
  input.focus();
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const text = input.value.trim();
  if (!text) return;

  addMessage(text, "user");
  input.value = "";
  input.disabled = true;
  typing.classList.remove("hidden");

  try {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        message: text,
        sessionId
      })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.details || data.error || "Request failed");
    }

    if (data.sessionId) {
      sessionId = data.sessionId;
    }

    if (data.messages?.length) {
      data.messages.forEach((message) => addMessage(message, "bot"));
    } else {
      addMessage("Lex returned no text response.", "bot");
    }
  } catch (error) {
    console.error(error);
    addMessage(`Error: ${error.message}`, "bot");
  } finally {
    typing.classList.add("hidden");
    input.disabled = false;
    input.focus();
  }
});

newSessionButton.addEventListener("click", resetChat);
