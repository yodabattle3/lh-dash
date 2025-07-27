require('dotenv').config();
const express = require('express');
const { Client, GatewayIntentBits } = require('discord.js'); // Updated import
const path = require('path');

const app = express();
const bot = new Client({ 
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers
  ] 
});

// Serve static files from public folder
app.use(express.static(path.join(__dirname, 'public')));

// API endpoint to get guilds
app.get('/api/guilds', async (req, res) => {
  try {
    const guilds = bot.guilds.cache.map(guild => ({
      id: guild.id,
      name: guild.name,
      icon: guild.iconURL(),
      canManage: true
    }));
    res.json(guilds);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start bot and server
bot.login(process.env.BOT_TOKEN)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Server running on port ${process.env.PORT}`);
      console.log(`Bot logged in as ${bot.user.tag}`);
    });
  })
  .catch(console.error);