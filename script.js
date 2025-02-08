// Messages for each style
const messages = {
    mystical: [
        "Just checked our zodiac compatibility... looks like we're a cosmic mismatch ✨",
        "The stars whispered something about 'right person, wrong constellation' 🌟",
        "My crystal ball is showing separate paths (and better lighting elsewhere) 🔮",
        "Mercury isn't in retrograde, but our connection might be 🌠",
        "Checked my birth chart - apparently it's time for a plot twist 🌙",
        "The universe sent me a DM, and well... it's complicated 💫",
        "My tarot cards just pulled the 'thank u, next' card 🎴",
        "Seems our energies are on different spiritual podcasts 🧘‍♀️",
        "The cosmos called - they're requesting a realignment 🌌",
        "My aura reader suggested I try new wavelengths 🌈"
    ],
    growth: [
        "My plants are getting jealous of all the attention I'm giving you 🌿",
        "Need to repot myself into a different growth environment 🪴",
        "My personal development playlist needs a refresh 🎧",
        "This butterfly needs a different kind of garden 🦋",
        "Time to water some opportunities in new soil 🌱",
        "My growth mindset is calling for a location update 🚀",
        "Like my succulents, I need more space to flourish 🌵",
        "My self-improvement journey needs a new chapter 📖",
        "Evolution is calling, and I must answer 🦋",
        "Ready to bloom in a different botanical garden 🌺"
    ],
    timing: [
        "Actually swamped with work these days, might not be the best time for connections 🙏",
        "Just found out I'm relocating soon - timing's not ideal 🌍",
        "My calendar is having an existential crisis 📅",
        "Time zones are suggesting we sync differently ⏰",
        "My schedule is entering its villain era 🕰️",
        "The timing department called - they're filing for changes 📋",
        "Currently in a long-term relationship with my deadlines ⌛",
        "My Google Calendar is staging an intervention 📱",
        "Time management sent me a breakup note 🗓️",
        "Scheduling conflicts are my new personality trait ⏳"
    ],
    fun: [
        "I need some time to debug my personal algorithm 💻",
        "Looks like we're running on different operating systems 🤖",
        "My life's playlist needs a genre update 🎵",
        "Currently beta testing a new version of myself 🔄",
        "Error 404: Compatible future not found 🖥️",
        "Initiating graceful exit protocol... 🎮",
        "Plot twist: I'm the protagonist in a different story 🎬",
        "My character arc needs some creative direction 🎯",
        "Switching servers to find better ping 🌐",
        "Achievement unlocked: New chapter loading... 🏆"
    ]
};

// Track used messages to avoid repetition
const usedMessages = new Set();

// Get random message from current style
function getRandomMessage(style) {
    const currentMessages = messages[style];
    const availableMessages = currentMessages.filter(msg => !usedMessages.has(msg));
    
    // If we're running low on unused messages, reset the used messages
    if (availableMessages.length === 0) {
        usedMessages.clear();
        return currentMessages[Math.floor(Math.random() * currentMessages.length)];
    }
    
    const message = availableMessages[Math.floor(Math.random() * availableMessages.length)];
    usedMessages.add(message);
    return message;
}

// Update message function
function updateMessage() {
    const messageContainer = document.querySelector('.message-container');
    messageContainer.classList.remove('visible');
    
    setTimeout(() => {
        const style = document.querySelector('.style-btn.active').dataset.style;
        const message = getRandomMessage(style);
        
        const messageHtml = `
            <div class="message-card">
                <p class="message">${message}</p>
                <button class="copy-btn" onclick="copyMessage(this)">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                    </svg>
                    <span class="copy-text">Copied!</span>
                </button>
            </div>`;
        
        messageContainer.innerHTML = messageHtml;
        messageContainer.classList.add('visible');
    }, 300);
}

// Copy message function
async function copyMessage(button) {
    const message = button.parentNode.querySelector('.message').textContent;
    try {
        await navigator.clipboard.writeText(message);
        button.classList.add('copied');
        setTimeout(() => button.classList.remove('copied'), 2000);
    } catch (err) {
        console.error('Failed to copy text:', err);
    }
}

// Add click handlers to style buttons
document.querySelectorAll('.style-btn').forEach(button => {
    button.addEventListener('click', () => {
        document.querySelectorAll('.style-btn').forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        updateMessage();
    });
});

// Add click handler to refresh button
document.querySelector('.refresh-btn').addEventListener('click', updateMessage);

// Show initial message
updateMessage();
