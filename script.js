// Message categories
const messages = {
    mystical: [
        "The stars have whispered that our paths must diverge ",
        "The cosmic winds are calling me to new adventures ",
        "My crystal ball shows different roads ahead for us ",
        "The universe has other plans for our journeys ",
        "The mystic forces are guiding me elsewhere ",
        "The alignment of planets suggests it's time for change ",
        "The spiritual realm beckons me to a new path ",
        "The ancient runes have spoken of this parting ",
        "The energy between us seeks new channels ",
        "The celestial signs point to new beginnings ",
        "The oracle has revealed it's time to move on ",
        "The sacred geometry of life is shifting ",
        "The ethereal winds whisper of change ",
        "The cosmic dance leads us in different directions ",
        "The mystical tides are pulling me away ",
        "The spiritual compass points to new horizons ",
        "The astral plane shows separate destinies ",
        "The metaphysical realms call for transformation ",
        "The divine timing suggests a new chapter ",
        "The karmic cycle brings natural endings "
    ],
    growth: [
        "My plants are getting jealous of all the attention I'm giving you ",
        "Time to water different gardens and grow in new directions ",
        "Like a tree, I need to branch out ",
        "My personal growth needs more space to flourish ",
        "It's time to plant new seeds of opportunity ",
        "My roots are seeking different soil ",
        "Growing pains are calling for changes ",
        "Like a sunflower, I must follow my light ",
        "The season of change is blooming ",
        "My growth mindset requires new challenges ",
        "Time to prune away what no longer serves growth ",
        "Like bamboo, I need room to reach new heights ",
        "The garden of life calls for new cultivation ",
        "My potential needs fresh ground to expand ",
        "Growth requires stepping into new territories ",
        "Like a vine, I must climb different walls ",
        "The ecosystem of growth demands change ",
        "My personal development needs new nutrients ",
        "Time to transplant myself to fresh soil ",
        "The journey of growth leads to new gardens "
    ],
    timing: [
        "The sands of time are pointing to new horizons ",
        "The calendar of life is turning to a new page ",
        "The clock strikes the hour of change ",
        "Time whispers that our season has passed ",
        "The pendulum swings toward new beginnings ",
        "The hourglass shows it's time to move on ",
        "The rhythm of time calls for change ",
        "The timeline branches in different directions ",
        "The moment has come for new adventures ",
        "Time's compass points to different paths ",
        "The chronology of life suggests changes ahead ",
        "The temporal winds blow toward tomorrow ",
        "The sundial casts shadows on new directions ",
        "Time's river flows to different shores ",
        "The chapters of time turn to new stories ",
        "The cycles of seasons bring natural change ",
        "Time's melody plays a farewell tune ",
        "The cosmic clock ticks toward transition ",
        "The timeline spirals to new beginnings ",
        "Time's tapestry weaves separate paths "
    ],
    fun: [
        "My cat has been giving me judgmental looks about this situation ",
        "My Netflix queue is feeling neglected ",
        "My gaming character needs some serious leveling up ",
        "My pizza delivery guy misses our daily chats ",
        "My bed is demanding more quality time together ",
        "My yoga mat is getting dusty from neglect ",
        "My memes folder needs urgent attention ",
        "My guitar is getting jealous of all this typing ",
        "My running shoes are plotting an escape ",
        "My coffee machine feels abandoned ",
        "My houseplants formed a union for better care ",
        "My bookshelf is staging an intervention ",
        "My bicycle thinks we need to see other people ",
        "My kitchen utensils are feeling underutilized ",
        "My art supplies are throwing a creativity crisis ",
        "My camera roll needs new adventures ",
        "My playlist demands fresh dance moves ",
        "My snack drawer requires immediate attention ",
        "My passport is getting restless for stamps ",
        "My workout routine is filing for divorce "
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
let usedMessages = new Set(); // Track used messages to prevent duplicates

// Style button click handlers
styleButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Update active button
        styleButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        // Update style and messages
        currentStyle = button.dataset.style;
        usedMessages.clear(); // Clear used messages when changing styles
        updateMessages();
    });
});

// Refresh button click handler
refreshBtn.addEventListener('click', () => {
    updateMessages();
});

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
    const currentMessages = messages[currentStyle];
    const availableMessages = currentMessages.filter(msg => !usedMessages.has(msg));
    
    // If we're running low on unused messages, reset the used messages
    if (availableMessages.length < 2) {
        usedMessages.clear();
    }
    
    const result = [];
    const tempAvailable = [...availableMessages];
    
    for (let i = 0; i < 2; i++) {
        const randomIndex = Math.floor(Math.random() * tempAvailable.length);
        const selectedMessage = tempAvailable.splice(randomIndex, 1)[0];
        result.push(selectedMessage);
        usedMessages.add(selectedMessage);
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
