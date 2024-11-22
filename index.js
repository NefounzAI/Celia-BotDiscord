require('dotenv').config();
const fs = require('fs');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { Client, GatewayIntentBits, Collection, ActivityType, EmbedBuilder, TextChannel, ChannelType, Events } = require('discord.js'); // Add Events here

const app = express(); // Declare 'app' here

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public')); // Ensure the 'public' folder exists

// Discord Client Initialization
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.GuildMembers,
    ],
});

// Initialize Collection for commands
client.commands = new Collection();

// Read command files from 'commands' folder and add them to the collection
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

// Event when the bot is ready
client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    client.user.setActivity('create by founzz | !help', { type: ActivityType.Listening });
});

// Event for new members
client.on('guildMemberAdd', member => {
    console.log(`Member joined: ${member.user.tag}`); // Log anggota yang bergabung

    const welcomeCommand = client.commands.get('welcome');
    const autoroleCommand = client.commands.get('autorole');

    // Execute welcome command
    if (welcomeCommand) {
        try {
            console.log('Executing welcome command...'); // Log sebelum eksekusi
            welcomeCommand.execute(member);
            console.log('Welcome command executed successfully.'); // Log setelah eksekusi
        } catch (error) {
            console.error(`Error executing 'welcome' command:`, error);
        }
    } else {
        console.warn('Welcome command not found.'); // Log jika command tidak ditemukan
    }

    // Execute autorole command
    if (autoroleCommand) {
        try {
            console.log('Executing autorole command...'); // Log sebelum eksekusi
            autoroleCommand.execute(member);
            console.log('Autorole command executed successfully.'); // Log setelah eksekusi
        } catch (error) {
            console.error(`Error executing 'autorole' command:`, error);
        }
    } else {
        console.warn('Autorole command not found.'); // Log jika command tidak ditemukan
    }
});

// Event for member removal
// Event for member removal
client.on('guildMemberRemove', member => {
    console.log(`Member removed: ${member.user.tag}`); // Log anggota yang keluar

    // Cek apakah command goodbye tersedia
    const goodbyeCommand = client.commands.get('goodbye');
    if (!goodbyeCommand) {
        console.error('Command goodbye tidak ditemukan.');
        return;
    }

    // Eksekusi command goodbye ketika anggota keluar
    try {
        console.log('Executing goodbye command...'); // Log sebelum eksekusi
        goodbyeCommand.execute(member);
        console.log('Goodbye command executed successfully.'); // Log setelah eksekusi
    } catch (error) {
        console.error('Error executing goodbye command:', error);
    }
});


// Event for message creation
client.on('messageCreate', async message => {
    const prefix = '!';

    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    if (!client.commands.has(commandName)) return;

    const command = client.commands.get(commandName);
    try {
        await command.execute(message, args, client);
    } catch (error) {
        console.error(`Error executing command '${commandName}':`, error);
        message.reply('Terjadi kesalahan saat mencoba mengeksekusi perintah itu!');
    }
});


// Base route to serve HTML page
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html'); // Ensure 'index.html' exists in 'public'
});

// Endpoint to get the list of guilds
app.get('/api/guilds', (req, res) => {
    const guilds = client.guilds.cache.map(guild => ({
        id: guild.id,
        name: guild.name
    }));
    res.json(guilds);
});

// Endpoint to get the list of channels by guild ID
app.get('/api/channels', (req, res) => {
    const guildId = req.query.guildId;

    if (!guildId) {
        return res.status(400).send('Guild ID diperlukan');
    }

    const guild = client.guilds.cache.get(guildId);
    if (!guild) {
        return res.status(404).send('Guild tidak ditemukan');
    }

    console.log(`Guild ditemukan: ${guild.name}`);

    const channels = guild.channels.cache
        .filter(channel => channel.type === ChannelType.GuildText)
        .map(channel => ({
            id: channel.id,
            name: channel.name
        }));

    console.log(`Channels ditemukan: ${JSON.stringify(channels)}`);

    if (channels.length === 0) {
        return res.status(404).send('Tidak ada channel teks ditemukan di guild ini');
    }

    res.json(channels);
});

// Endpoint to send messages to Discord
app.post('/send-message', async (req, res) => {
    const { guildId, channelId, embed } = req.body;

    console.log('Request Data:', { guildId, channelId, embed });

    // Validate input
    if (!guildId || !channelId || !embed || !embed.title || !embed.description) {
        console.log('Validation Failed: Missing required fields');
        return res.status(400).send('Guild ID, Channel ID, Embed Title, and Embed Description are required');
    }

    // Create embed message
    const embedMessage = new EmbedBuilder()
        .setTitle(embed.title)
        .setDescription(embed.description)
        .setColor(embed.color || '#ffffff');

    if (embed.image) embedMessage.setImage(embed.image);
    if (embed.footer) embedMessage.setFooter({ text: embed.footer });
    if (embed.thumbnail) embedMessage.setThumbnail(embed.thumbnail);

    const channel = client.channels.cache.get(channelId);
    if (!channel) {
        console.log(`Channel ${channelId} not found`);
        return res.status(404).send('Channel not found');
    }

    if (!(channel instanceof TextChannel)) {
        console.log(`Channel ${channelId} is not a text channel`);
        return res.status(400).send('Channel is not a text channel');
    }

    try {
        await channel.send({ embeds: [embedMessage] });
        console.log('Message sent successfully');
        res.status(200).send('Message sent successfully');
    } catch (error) {
        console.log('Failed to send message:', error);
        res.status(500).send('Failed to send message: ' + error.message);
    }
});

// Listen on a port
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || 'localhost'; // Default to localhost
app.listen(PORT, () => {
    console.log(`Server is running on http://${HOST}:${PORT}/`);
});

// Login to Discord
if (!process.env.DISCORD_TOKEN) {
    console.error('DISCORD_TOKEN is not set in the environment variables!');
    process.exit(1);
}

console.log(`
    
    _____     _ _       ____        _   
   / ____|   | (_)     |  _ \\      | |  
  | |     ___| |_  __ _| |_) | ___ | |_ 
  | |    / _ \\ | |/ _\` |  _ < / _ \\| __|
  | |___|  __/ | | (_| | |_) | (_) | |_ 
   \\_____\\___|_|_|\\__,_|____/ \\___/ \\__|
                                        
                                        
 
     `);

     client.login(process.env.DISCORD_TOKEN)
     .then(() => {
         console.log('\x1b[32m%s\x1b[0m', 'Bot berhasil login ke Discord');
     })
     .catch(err => {
         console.error('\x1b[31m%s\x1b[0m', 'Failed to login to Discord:', err);
     });
