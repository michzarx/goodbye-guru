// Exit messages for each style
const messages = {
    mystical: [
        "The stars have whispered it's time for a new constellation ✨",
        "My crystal ball shows me walking a different path 🌙",
        "The universe is calling me to dance with new possibilities 🔮",
        "My spiritual journey needs me to explore different realms 🌟"
    ],
    growth: [
        "Time to plant new seeds in different gardens 🌱",
        "Ready to spread my wings and embrace transformation 🦋",
        "Growing in a new direction feels right for me 🌺",
        "Following my personal rainbow to the next adventure 🌈"
    ],
    timing: [
        "The sands of time are pointing to new horizons ⌛",
        "My internal clock says it's time for a fresh start 🕰️",
        "The calendar of life is turning to a new page 📅",
        "Like the moon, I must move through different phases 🌙"
    ],
    humor: [
        "My plants are getting jealous of all the attention I'm giving you 🪴",
        "My cat has been giving me judgmental looks about this situation 🐱",
        "My pizza delivery guy thinks we should see other people 🍕",
        "My magic 8 ball said 'time to bounce' 🔮"
    ]
};

// DOM elements
const styleButtons = document.querySelectorAll('.style-btn');
const message1 = document.getElementById('message-1');
const message2 = document.getElementById('message-2');
const refreshBtn = document.getElementById('refresh-btn');
const copyBtns = document.querySelectorAll('.copy-btn');

// Current style tracking
let currentStyle = 'humor';

// Style button click handlers
styleButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Update active button
        styleButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        // Update style and messages
        currentStyle = button.dataset.style;
        updateMessages();
    });
});

// Refresh button click handler
refreshBtn.addEventListener('click', updateMessages);

// Copy buttons click handlers
copyBtns.forEach(btn => {
    btn.addEventListener('click', async () => {
        const messageId = btn.dataset.message;
        const messageText = document.getElementById(`message-${messageId}`).textContent;
        
        try {
            await navigator.clipboard.writeText(messageText);
            
            // Visual feedback
            btn.classList.add('copied');
            
            setTimeout(() => {
                btn.classList.remove('copied');
            }, 2000);
        } catch (err) {
            console.error('Failed to copy text:', err);
        }
    });
});

// Get two random messages from current style
function getTwoRandomMessages() {
    const currentMessages = [...messages[currentStyle]];
    const result = [];
    
    for (let i = 0; i < 2; i++) {
        const randomIndex = Math.floor(Math.random() * currentMessages.length);
        result.push(currentMessages.splice(randomIndex, 1)[0]);
    }
    
    return result;
}

// Update messages function
function updateMessages() {
    const [msg1, msg2] = getTwoRandomMessages();
    
    // Fade out
    message1.style.opacity = '0';
    message2.style.opacity = '0';
    
    setTimeout(() => {
        message1.textContent = msg1;
        message2.textContent = msg2;
        
        // Fade in
        message1.style.opacity = '1';
        message2.style.opacity = '1';
    }, 200);
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    message1.style.transition = 'opacity 0.2s ease';
    message2.style.transition = 'opacity 0.2s ease';
    updateMessages(); // Show initial messages
});
