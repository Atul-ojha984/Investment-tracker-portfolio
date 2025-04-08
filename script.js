// // API Configuration using Yahoo Finance
// const YAHOO_FINANCE_URL = "https://query1.finance.yahoo.com/v8/finance/chart/";
// const FALLBACK_STOCK_DATA = {
//     'AAPL': 175.50,
//     'MSFT': 325.75,
//     'GOOGL': 145.20,
//     'AMZN': 185.30
// };

// // Portfolio Data Structure
// let portfolio = {
//     holdings: [],
//     cashBalance: 10000 // Starting balance
// };

// // DOM Elements
// const chatContainer = document.getElementById('chat-container');
// const userInput = document.getElementById('user-input');
// const sendBtn = document.getElementById('send-btn');
// const portfolioTable = document.getElementById('portfolio-table');

// // Initialize the app
// document.addEventListener('DOMContentLoaded', () => {
//     sendBtn.addEventListener('click', handleUserInput);
//     userInput.addEventListener('keypress', (e) => {
//         if (e.key === 'Enter') handleUserInput();
//     });
//     updatePortfolioDisplay();
// });

// // Handle user input
// async function handleUserInput() {
//     const message = userInput.value.trim();
//     if (!message) return;

//     // Add user message to chat
//     addMessageToChat(message, 'user');
//     userInput.value = '';

//     try {
//         // Disable input during processing
//         userInput.disabled = true;
//         sendBtn.disabled = true;
        
//         const response = processMessage(message);
//         addMessageToChat(response, 'bot');
//     } catch (error) {
//         console.error('Chat Error:', error);
//         addMessageToChat("I'm having trouble processing that request. Please try a different question.", 'bot');
//     } finally {
//         // Re-enable input
//         userInput.disabled = false;
//         sendBtn.disabled = false;
//         userInput.focus();
//     }
// }

// // Process user messages locally
// function processMessage(prompt) {
//     if (prompt.toLowerCase().includes('portfolio value') || 
//         prompt.toLowerCase().includes('total value')) {
//         const total = calculatePortfolioValue();
//         return `Current portfolio value: $${total.toFixed(2)}`;
//     }
//     else if (prompt.toLowerCase().includes('price') || 
//              prompt.toLowerCase().includes('value of')) {
//         const symbolMatch = prompt.match(/(AAPL|MSFT|GOOGL|AMZN)/i);
//         if (symbolMatch) {
//             const symbol = symbolMatch[0].toUpperCase();
//             return `${symbol} current price: $${FALLBACK_STOCK_DATA[symbol]?.toFixed(2) || 'N/A'}`;
//         }
//     }
//     return "I can help with portfolio value and stock prices for AAPL, MSFT, GOOGL, and AMZN.";
// }

// // Add message to chat UI
// function addMessageToChat(message, sender) {
//     const messageDiv = document.createElement('div');
//     messageDiv.className = `chat-message ${sender} ${sender === 'user' ? 'bg-blue-100' : 'bg-gray-100'} p-3 rounded mb-2`;
//     messageDiv.textContent = message;
//     chatContainer.appendChild(messageDiv);
//     chatContainer.scrollTop = chatContainer.scrollHeight;
// }

// // Update portfolio display
// function updatePortfolioDisplay() {
//     portfolioTable.innerHTML = '';
    
//     portfolio.holdings.forEach(holding => {
//         const row = document.createElement('tr');
//         row.className = 'border-b';
//         row.innerHTML = `
//             <td class="p-2">${holding.symbol}</td>
//             <td class="p-2">${holding.quantity}</td>
//             <td class="p-2">$${holding.currentPrice?.toFixed(2) || 'N/A'}</td>
//             <td class="p-2">$${(holding.quantity * (holding.currentPrice || 0)).toFixed(2)}</td>
//         `;
//         portfolioTable.appendChild(row);
//     });

//     // Add total row
//     const totalRow = document.createElement('tr');
//     totalRow.className = 'bg-gray-100 font-semibold';
//     totalRow.innerHTML = `
//         <td class="p-2" colspan="3">Total Value</td>
//         <td class="p-2">$${calculatePortfolioValue().toFixed(2)}</td>
//     `;
//     portfolioTable.appendChild(totalRow);
// }

// // Calculate total portfolio value
// function calculatePortfolioValue() {
//     return portfolio.holdings.reduce((total, holding) => {
//         return total + (holding.quantity * (holding.currentPrice || 0));
//     }, 0);
// }

// // Example function to add a holding
// function addHolding(symbol, quantity, price) {
//     portfolio.holdings.push({
//         symbol,
//         quantity,
//         purchasePrice: price,
//         currentPrice: price // Will be updated later
//     });
//     updatePortfolioDisplay();
// }

// // Get stock price from Yahoo Finance
// async function getStockPrice(symbol) {
//     try {
//         const response = await fetch(`${YAHOO_FINANCE_URL}${symbol}`);
//         const data = await response.json();
//         return data.chart.result[0].meta.regularMarketPrice;
//     } catch (error) {
//         console.error('Failed to fetch stock price:', error);
//         return FALLBACK_STOCK_DATA[symbol] || 0;
//     }
// }

// // Example function to update prices (would be called periodically)
// async function updateStockPrices() {
//     for (const holding of portfolio.holdings) {
//         try {
//             const price = await getStockPrice(holding.symbol);
//             holding.currentPrice = price;
//         } catch (error) {
//             console.error(`Failed to update price for ${holding.symbol}:`, error);
//         }
//     }
//     updatePortfolioDisplay();
// }

// // Initialize with some example holdings
// addHolding('AAPL', 10, 150);
// addHolding('MSFT', 5, 250);
// API Configuration using Yahoo Finance
const YAHOO_FINANCE_URL = "https://query1.finance.yahoo.com/v8/finance/chart/";
const FALLBACK_STOCK_DATA = {
    'AAPL': 175.50,
    'MSFT': 325.75,
    'GOOGL': 145.20,
    'AMZN': 185.30
};

// Portfolio Data Structure
let portfolio = {
    holdings: [],
    cashBalance: 10000 // Starting balance
};

// DOM Elements
const chatContainer = document.getElementById('chat-container');
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');
const portfolioTable = document.getElementById('portfolio-table');

// Initialize the app
document.addEventListener('DOMContentLoaded', () => {
    sendBtn.addEventListener('click', handleUserInput);
    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleUserInput();
    });
    updatePortfolioDisplay();
});

// Handle user input
async function handleUserInput() {
    const message = userInput.value.trim();
    if (!message) return;

    // Add user message to chat
    addMessageToChat(message, 'user');
    userInput.value = '';

    try {
        // Disable input during processing
        userInput.disabled = true;
        sendBtn.disabled = true;
        
        const response = processMessage(message);
        addMessageToChat(response, 'bot');
    } catch (error) {
        console.error('Chat Error:', error);
        addMessageToChat("I'm having trouble processing that request. Please try a different question.", 'bot');
    } finally {
        // Re-enable input
        userInput.disabled = false;
        sendBtn.disabled = false;
        userInput.focus();
    }
}

// Process user messages locally
function processMessage(prompt) {
    if (prompt.toLowerCase().includes('portfolio value') || 
        prompt.toLowerCase().includes('total value')) {
        const total = calculatePortfolioValue();
        return `Current portfolio value: $${total.toFixed(2)}`;
    }
    else if (prompt.toLowerCase().includes('price') || 
             prompt.toLowerCase().includes('value of')) {
        const symbolMatch = prompt.match(/(AAPL|MSFT|GOOGL|AMZN)/i);
        if (symbolMatch) {
            const symbol = symbolMatch[0].toUpperCase();
            return `${symbol} current price: $${FALLBACK_STOCK_DATA[symbol]?.toFixed(2) || 'N/A'}`;
        }
    }
    return "I can help with portfolio value and stock prices for AAPL, MSFT, GOOGL, and AMZN.";
}

// Add message to chat UI
function addMessageToChat(message, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `chat-message ${sender} ${sender === 'user' ? 'bg-blue-100' : 'bg-gray-100'} p-3 rounded mb-2`;
    messageDiv.textContent = message;
    chatContainer.appendChild(messageDiv);
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

// Update portfolio display
function updatePortfolioDisplay() {
    portfolioTable.innerHTML = '';
    
    portfolio.holdings.forEach(holding => {
        const row = document.createElement('tr');
        row.className = 'border-b';
        row.innerHTML = `
            <td class="p-2">${holding.symbol}</td>
            <td class="p-2">${holding.quantity}</td>
            <td class="p-2">$${holding.currentPrice?.toFixed(2) || 'N/A'}</td>
            <td class="p-2">$${(holding.quantity * (holding.currentPrice || 0)).toFixed(2)}</td>
        `;
        portfolioTable.appendChild(row);
    });

    // Add total row
    const totalRow = document.createElement('tr');
    totalRow.className = 'bg-gray-100 font-semibold';
    totalRow.innerHTML = `
        <td class="p-2" colspan="3">Total Value</td>
        <td class="p-2">$${calculatePortfolioValue().toFixed(2)}</td>
    `;
    portfolioTable.appendChild(totalRow);
}

// Calculate total portfolio value
function calculatePortfolioValue() {
    return portfolio.holdings.reduce((total, holding) => {
        return total + (holding.quantity * (holding.currentPrice || 0));
    }, 0);
}

// Example function to add a holding
function addHolding(symbol, quantity, price) {
    portfolio.holdings.push({
        symbol,
        quantity,
        purchasePrice: price,
        currentPrice: price // Will be updated later
    });
    updatePortfolioDisplay();
}

// Get stock price from Yahoo Finance
async function getStockPrice(symbol) {
    try {
        const response = await fetch(`${YAHOO_FINANCE_URL}${symbol}`);
        const data = await response.json();
        return data.chart.result[0].meta.regularMarketPrice;
    } catch (error) {
        console.error('Failed to fetch stock price:', error);
        return FALLBACK_STOCK_DATA[symbol] || 0;
    }
}

// Example function to update prices (would be called periodically)
async function updateStockPrices() {
    for (const holding of portfolio.holdings) {
        try {
            const price = await getStockPrice(holding.symbol);
            holding.currentPrice = price;
        } catch (error) {
            console.error(`Failed to update price for ${holding.symbol}:`, error);
        }
    }
    updatePortfolioDisplay();
}

// Initialize with some example holdings
addHolding('AAPL', 10, 150);
addHolding('MSFT', 5, 250);