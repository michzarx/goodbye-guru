// Messages for each style
const messages = {
    mystical: [
        "The universe has bigger plans for me, and I'm ready to embrace them ✨",
        "My inner compass is pointing to new adventures, and I must follow its call 🧭",
        "The stars are aligning to guide me on a different path 🌟",
        "My spiritual journey is calling me to explore new horizons 🌅",
        "Like a phoenix, it's time for me to rise and transform 🔥",
        "The energy of change is too powerful to ignore 🌀",
        "My soul is yearning for a new chapter in this cosmic dance ⭐",
        "The mystic winds are whispering that it's time to move on 🍃",
        "Following the signs that lead to my next adventure 🔮",
        "Trust in the magic of new beginnings 🌙"
    ],
    growth: [
        "Ready to spread my wings and soar to new heights 🦋",
        "Like a seed, I need new soil to grow into something amazing 🌱",
        "Time to chase bigger dreams and bolder adventures 🚀",
        "Growing in different directions, but grateful for the memories 🌿",
        "My journey of growth is taking me down a new path 🛣️",
        "Embracing change as a chance to bloom and flourish 🌸",
        "Sometimes growth means letting go and moving forward 🍃",
        "Taking a leap of faith towards new opportunities 🦅",
        "Ready to write the next chapter of my story 📖",
        "Every ending is just a new beginning in disguise 🌅"
    ],
    timing: [
        "The perfect moment to start my next adventure is now ⏰",
        "Time to turn the page and begin a fresh chapter 📚",
        "The clock is ticking towards exciting new beginnings ⌛",
        "Like seasons, change comes at just the right moment 🍂",
        "My timeline is branching into new possibilities 🌿",
        "The moment feels right to embark on a new journey 🚶‍♂️",
        "Time to set sail towards new horizons 🚢",
        "Following the rhythm of life to my next destination 🎵",
        "The timing couldn't be better for a fresh start 🌅",
        "Life's calling me to new adventures, and I'm answering ☎️"
    ],
    fun: [
        "Time to update my life's playlist with some fresh tunes 🎵",
        "Plot twist: I'm off to star in my own adventure movie! 🎬",
        "Leveling up to the next exciting stage of life 🎮",
        "My Netflix queue is calling - time for a new show! 📺",
        "Pressing the refresh button on life's browser 🔄",
        "Like a DJ, I'm mixing up some new life beats 🎧",
        "Game over here, but I've got plenty of extra lives 🎲",
        "Time to dance to a different tune 💃",
        "Loading next awesome chapter... Please wait! ⌛",
        "Achievement unlocked: New life adventure! 🏆"
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
