const { Client, GatewayIntentBits } = require('discord.js');
const stringSimilarity = require('string-similarity');

const client = new Client({
    intents: [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMessages,
      GatewayIntentBits.MessageContent
    ]
  });

// Bot token - Replace 'YOUR_BOT_TOKEN' with your own bot token
const BOT_TOKEN = 'YOUR_BOT_TOKEN';

// Specific words to trigger the DM
const triggerWords = ['kirat bhaiya', 'kirat sir'];

// Event: Ready
client.on('ready', () => {
  console.log(`Bot logged in as ${client.user.tag}`);
});

// Event: Message
client.on('messageCreate', (message) => {
  // Ignore messages from the bot itself
  if (message.author.bot) return;

  // Check if the message contains any trigger words
  const content = message.content.toLowerCase();

    // Find the most similar trigger word
    const matches = stringSimilarity.findBestMatch(content, triggerWords);
    const bestMatch = matches.bestMatch;

    // Check if the similarity ratio exceeds a threshold
  if (bestMatch.rating >= 0.5) {
    const user = message.author;
    user.send(`${message.author} Call me Kirat`);
  }

});

// Login the bot to Discord
client.login(BOT_TOKEN);
