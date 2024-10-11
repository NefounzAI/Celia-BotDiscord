require('dotenv').config();
const fs = require('fs');
const { Client, GatewayIntentBits, Collection, ActivityType, EmbedBuilder } = require('discord.js');

// Inisialisasi client Discord
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.GuildMembers
    ]
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
    const channel = member.guild.channels.cache.find(channel => channel.name === 'welcome-masbro');
    if (!channel) return;

    const welcomeEmbed = new EmbedBuilder()
        .setColor('#00FF00') 
        .setTitle('🎉 Selamat Datang! 🎉')
        .setDescription(`Selamat datang di server, ${member}!`)
        .addFields(
            { name: '👋 Perkenalan', value: 'Kami harap kamu merasa betah di sini! Jangan ragu untuk memperkenalkan diri.' },
            { name: '📜 Aturan', value: 'Aturanya kamu sopan kami segan' },
            { name: '💬 Chat', value: 'Selamat bergabung, mari main bersama' }
        )
        .setTimestamp()
        .setFooter({ text: 'Kami senang kamu ada di sini!' });

    channel.send({ embeds: [welcomeEmbed] });
});

// Event untuk menangani anggota yang keluar
client.on('guildMemberRemove', member => {
    const channel = member.guild.channels.cache.find(channel => channel.name === 'welcome-masbro');
    if (!channel) return;

    const goodbyeEmbed = new EmbedBuilder()
        .setColor('#FF0000') // Warna merah
        .setTitle('👋 Selamat Tinggal!')
        .setDescription(`Selamat tinggal, ${member}!`)
        .addFields(
            { name: '😢 Kami akan merindukanmu!', value: 'Kami harap kamu kembali lagi!' }
        )
        .setTimestamp()
        .setFooter({ text: 'Sampai jumpa lagi!' });

    channel.send({ embeds: [goodbyeEmbed] });
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
