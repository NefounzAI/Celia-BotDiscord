require('dotenv').config();
const fs = require('fs');
const express = require('express');
const cors = require('cors');
const { Client, GatewayIntentBits, Collection, ActivityType, EmbedBuilder, TextChannel } = require('discord.js');

// Inisialisasi client Discord
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.GuildMembers,
    ],
});

// Inisialisasi collection untuk commands
client.commands = new Collection();

// Membaca command files dari folder 'commands' dan menambahkannya ke koleksi
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

// Event saat bot siap
client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    client.user.setActivity('Melihat Dia Selingkuh', { type: ActivityType.Playing });
});

// Event untuk menangani anggota baru
client.on('guildMemberAdd', member => {
    const command = client.commands.get('welcome');
    if (command) {
        try {
            command.execute(member);
        } catch (error) {
            console.error(`Error executing 'welcome' command:`, error);
        }
    }
});

// Event untuk menangani anggota yang keluar
client.on('guildMemberRemove', member => {
    const command = client.commands.get('goodbye');
    if (command) {
        try {
            command.execute(member);
        } catch (error) {
            console.error(`Error executing 'goodbye' command:`, error);
        }
    }
});

// Event untuk menangani pesan
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

// Setup Express untuk mengirim pesan ke Discord dari website
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('public')); // Pastikan folder 'public' ada

// Rute dasar untuk menyajikan halaman HTML
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html'); // Pastikan 'index.html' ada di folder 'public'
});

// Endpoint untuk mengirim pesan ke Discord
app.post('/send-message', async (req, res) => {
    const { guildId, channelId, embed } = req.body;

    // Validasi input
    if (!guildId || !channelId || !embed || !embed.title || !embed.description) {
        return res.status(400).send('Guild ID, Channel ID, and valid Embed are required');
    }

    const guild = client.guilds.cache.get(guildId);
    if (!guild) return res.status(404).send('Guild not found');

    const channel = guild.channels.cache.get(channelId);
    if (!channel || !(channel instanceof TextChannel)) {
        return res.status(404).send('Channel not found or not a text channel');
    }

    try {
        // Membuat embed message
        const embedMessage = new EmbedBuilder()
            .setTitle(embed.title)
            .setDescription(embed.description)
            .setColor(embed.color || '#000000');

        // Menambahkan optional fields ke embed
        if (embed.image && embed.image.url) {
            embedMessage.setImage(embed.image.url);
        }

        if (embed.footer && embed.footer.text) {
            embedMessage.setFooter({ text: embed.footer.text });
        }

        if (embed.thumbnail && embed.thumbnail.url) {
            embedMessage.setThumbnail(embed.thumbnail.url);
        }

        await channel.send({ embeds: [embedMessage] });
        res.status(200).send('Message sent successfully');
    } catch (error) {
        console.error('Error sending message:', error);
        res.status(500).send('Failed to send message');
    }
});

// Listen on a port
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || 'localhost'; // Default to localhost
app.listen(PORT, () => {
    console.log(`Server is running on http://${HOST}:${PORT}/`);
});

// Login ke Discord
if (!process.env.DISCORD_TOKEN) {
    console.error('DISCORD_TOKEN is not set in the environment variables!');
    process.exit(1);
}

client.login(process.env.DISCORD_TOKEN).catch(err => {
    console.error('Failed to login to Discord:', err);
});
