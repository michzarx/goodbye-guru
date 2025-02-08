// Messages for each style
const messages = {
    mystical: [
        "You know how the universe works in mysterious ways? Well, it's telling me it's time for a new adventure ✨",
        "My spiritual guide says our paths are meant to diverge here, but I'm grateful for our journey together 🌟",
        "The energy between us has taught me so much, but my soul is calling me elsewhere now 🔮",
        "I've been meditating on this, and my inner compass is pointing to a new direction 🧘‍♀️",
        "The stars have been whispering to me lately... they say it's time for me to explore new constellations ⭐",
        "My tarot cards have been super clear about this - it's time for both of us to write new stories 🎴",
        "Like the phases of the moon, all things must change. Our chapter together is completing its cycle 🌙",
        "The universe has this amazing way of guiding us, and right now it's guiding me to new horizons 🌌",
        "My crystals have been extra chatty lately, saying it's time for a soul-level transition 💎",
        "Just as the phoenix transforms, I feel it's time for my own metamorphosis 🦅"
    ],
    growth: [
        "You've helped me grow so much, but I need to spread my wings and try flying solo now 🦋",
        "Like a plant reaching for sunlight, I need to grow in a different direction 🌱",
        "We've had an amazing run, but my personal growth is calling me to explore new territories 🌿",
        "I've learned so much from our time together, but now I need to apply these lessons somewhere new 📚",
        "Just like seasons change, I feel it's time for my next chapter of growth 🍃",
        "You know how sometimes you outgrow even your favorite sweater? That's kind of what's happening here 🧥",
        "This isn't goodbye forever, it's just me taking a different path in my journey 🛣️",
        "Remember how we talked about personal growth? Well, I'm taking that leap we discussed 🦘",
        "Like a tree growing new branches, I need to expand in different directions 🌳",
        "You've been an amazing part of my journey, but my growth path is leading me elsewhere now 🌺"
    ],
    timing: [
        "You know that feeling when the timing just feels right? That's what my gut is telling me now ⏰",
        "Life has a funny way of telling us when it's time to move on, and I'm feeling that now 🎯",
        "They say timing is everything, and my inner clock is saying it's time for a change ⌛",
        "Remember how we always said we'd know when it's time? Well, that time has come 🕰️",
        "Like the perfect sunset, some things are beautiful because they don't last forever 🌅",
        "Just as one chapter ends, another begins - and I'm feeling ready to turn the page 📖",
        "My internal compass is pointing to 'time for change' - I've learned to trust it 🧭",
        "Sometimes the hardest part is knowing when to say goodbye, and that moment is here 🌠",
        "Life's rhythm is telling me it's time to dance to a different beat 💃",
        "Like the changing of seasons, I feel it's time for my next chapter 🍂"
    ],
    fun: [
        "My Netflix queue is giving me the side-eye for all the shows I've been neglecting 📺",
        "My gaming character is stuck at level 1 and honestly, they're pretty mad about it 🎮",
        "My houseplants formed a union and are demanding better work-life balance 🪴",
        "My yoga mat filed a missing person report - time to reconnect with it! 🧘‍♀️",
        "My passport is threatening to expire from boredom - gotta make some changes! ✈️",
        "My guitar is getting jealous of all the time I spend typing emails 🎸",
        "My running shoes are plotting an escape - better take them on new adventures! 👟",
        "My art supplies are staging an intervention for my neglected creative side 🎨",
        "My bed and I need to spend more quality time together - it's not you, it's my sleep schedule 😴",
        "My coffee machine and I need to rekindle our morning romance ☕"
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
