require('dotenv').config();
const fs = require('fs');
const { Client, GatewayIntentBits, Collection, ActivityType } = require('discord.js');

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

// Login ke Discord
client.login(process.env.DISCORD_TOKEN).catch(err => {
    console.error('Failed to login:', err);
});
