// Messages for each style
const messages = {
    mystical: [
        "The metaphysical realms call for transformation",
        "Your aura suggests it's time for a new chapter",
        "The stars align with your decision",
        "The universe conspires in your favor",
        "A spiritual journey awaits",
        "The cosmic winds whisper of change",
        "Your energy seeks new horizons",
        "The mystic path leads elsewhere",
        "Your spirit yearns for new adventures",
        "The ethereal planes beckon"
    ],
    growth: [
        "Every ending nurtures new beginnings",
        "Growth often requires letting go",
        "Your potential blooms in new soil",
        "Time to spread your wings",
        "Your journey has only just begun",
        "Plant seeds of change, harvest growth",
        "Evolution calls for bold moves",
        "Transform challenges into opportunities",
        "Embrace the winds of change",
        "Your growth story continues elsewhere"
    ],
    timing: [
        "The clock strikes change o'clock",
        "Perfect timing for a plot twist",
        "Time to flip to the next chapter",
        "The hour of transformation is here",
        "Your timeline seeks new adventures",
        "The moment ripens for change",
        "Time flows toward new horizons",
        "The hands of time point to goodbye",
        "A new season beckons",
        "Your time here has beautifully concluded"
    ],
    fun: [
        "My playlist demands fresh dance moves",
        "Time to make like a banana and split",
        "Plot twist: I'm off to new adventures!",
        "Switching channels to a new show",
        "Level up: Unlocking new challenges",
        "Game over, but I've got extra lives",
        "Time to press the refresh button",
        "Ctrl + Alt + Delete on this chapter",
        "Loading next exciting episode...",
        "Achievement unlocked: New beginnings!"
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
