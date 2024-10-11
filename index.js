require('dotenv').config();
const fs = require('fs');
const express = require('express');
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
    // Mengatur status aktivitas bot
    client.user.setActivity('Melihat Dia Selingkuh', { type: ActivityType.Playing });
});

// Event untuk menangani anggota baru
client.on('guildMemberAdd', member => {
    const command = client.commands.get('welcome');
    if (command) {
        command.execute(member);
    }
});

// Event untuk menangani anggota yang keluar
client.on('guildMemberRemove', member => {
    const command = client.commands.get('goodbye');
    if (command) {
        command.execute(member);
    }
});

// Event untuk menangani pesan
client.on('messageCreate', async message => {
    const prefix = '!'; // Prefix untuk perintah

    // Cek apakah pesan dimulai dengan prefix dan bukan dari bot
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    // Cek apakah command ada di koleksi
    if (!client.commands.has(commandName)) return;

    const command = client.commands.get(commandName);
    try {
        await command.execute(message, args, client);
    } catch (error) {
        console.error(error);
        message.reply('Terjadi kesalahan saat mencoba mengeksekusi perintah itu!');
    }
});

// Setup Express untuk mengirim pesan ke Discord dari website
const app = express();
app.use(express.json()); // Middleware untuk parsing JSON

// Menyajikan file statis dari folder 'public'
app.use(express.static('public')); // Pastikan folder 'public' ada

// Rute dasar untuk menyajikan halaman HTML
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html'); // Pastikan 'index.html' ada di folder 'public'
});

// Endpoint untuk mengirim pesan ke Discord
app.post('/send-message', async (req, res) => {
    const { guildId, channelId, embed } = req.body;

    // Validasi input
    if (!guildId || !channelId || !embed) {
        return res.status(400).send('Guild ID, Channel ID, and Embed are required');
    }

    const guild = client.guilds.cache.get(guildId);
    if (!guild) return res.status(404).send('Guild not found');

    const channel = guild.channels.cache.get(channelId);
    if (!channel || !(channel instanceof TextChannel)) return res.status(404).send('Channel not found or not a text channel');

    try {
        // Validasi embed
        if (!embed.title || !embed.description) {
            return res.status(400).send('Embed title and description are required');
        }

        // Memastikan semua properti yang ada dalam embed valid
        const embedMessage = new EmbedBuilder()
            .setTitle(embed.title)
            .setDescription(embed.description)
            .setColor(embed.color); // Memastikan warna ada dalam embed

        // Mengirim pesan dengan embed
        await channel.send({ embeds: [embedMessage] });
        res.status(200).send('Message sent successfully');
    } catch (error) {
        console.error('Error sending message:', error);
        res.status(500).send('Failed to send message');
    }
});

// Listen on a port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// Login ke Discord
client.login(process.env.DISCORD_TOKEN).catch(err => {
    console.error('Failed to login:', err);
});
