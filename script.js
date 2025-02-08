// Messages for each style
const messages = {
    mystical: [
        "My crystals told me it's time for a new adventure (they're usually right) ✨",
        "Mercury isn't even in retrograde, but I still gotta go 🌠",
        "Plot twist: my tarot cards say I'm the main character somewhere else 🔮",
        "Checking my cosmic calendar... yep, time for a change! 🌙",
        "My aura needs a change of scenery (and better lighting) 🌈",
        "The universe is my GPS, and it's recalculating my route 🧭",
        "My zodiac sign said 'thank u, next' 💫",
        "Manifesting new beginnings like it's my spiritual side hustle ⭐",
        "The full moon told me to level up, who am I to argue? 🌕",
        "Aligning my chakras with a different timezone 🧘‍♀️"
    ],
    growth: [
        "Like my houseplants, I need more room to grow (and better sunlight) 🌱",
        "Time to repot myself into a bigger adventure 🪴",
        "My comfort zone is getting a bit too comfy - time to stretch! 🦋",
        "Growing faster than my succulent collection 🌵",
        "My personal growth spurt needs more space than this office chair 🪑",
        "Leveling up like my sourdough starter - it's alive! 🍞",
        "My growth mindset is bigger than my current situation 🚀",
        "Like my favorite tree, I'm branching out 🌳",
        "This caterpillar is ready for its butterfly era 🦋",
        "Outgrowing this space like my overwatered monstera 🌿"
    ],
    timing: [
        "My calendar said it's time for the next episode 📅",
        "Setting my out-of-office reply to 'permanently seeking adventure' ⏰",
        "My watch says it's time for a life upgrade 🕰️",
        "Scheduling a plot twist in my career timeline ⌛",
        "My Google Calendar needs a whole new color code 📱",
        "Time to hit fast-forward on my next chapter 🎬",
        "My biological clock is ticking... for new adventures! 🕐",
        "Marking this as a turning point in my life's timeline ✨",
        "The clock struck 'follow your dreams' o'clock 🌟",
        "Setting my life's alarm to 'new beginnings' mode 🔔"
    ],
    fun: [
        "My Spotify wrapped is about to get way more interesting 🎵",
        "Upgrading my life's software to version 2.0 💻",
        "My Netflix algorithm needs new recommendations 🍿",
        "Speedrunning to my next adventure 🎮",
        "Going offline here to load new content elsewhere 🔄",
        "Time to shuffle my life's playlist 🎧",
        "Rage quitting this level for better gameplay 🎲",
        "My life's podcast needs a new season 🎙️",
        "Switching channels to find better content 📺",
        "Achievement unlocked: Freedom Seeker Mode 🏆"
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
