const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'welcome',
    description: 'Menyambut anggota baru di server.',
    execute(message) {
        // Cek apakah message tersebut dikirim di guild
        if (!message.guild) return;

        const member = message.mentions.members.first(); // Mengambil user yang di-mention
        if (!member) {
            return message.reply('Tolong mention anggota yang ingin disambut! Contoh: !welcome @username');
        }

        const channel = message.guild.channels.cache.find(channel => channel.name === 'welcome-masbro');
        if (!channel) return;

        // Membuat embed untuk selamat datang
        const welcomeEmbed = new EmbedBuilder()
            .setColor('#00FF00') 
            .setTitle(`${member.user.username} just joined the server`) // Nama pengguna dengan pesan
            .setDescription(`Selamat Datang Di Server TRY`)
            .setThumbnail(member.user.displayAvatarURL({ dynamic: true, size: 1024 })) // Foto profil besar pengguna
            .setImage('https://example.com/path/to/your-background-image.png') // Tambahkan gambar latar (jika diperlukan)
            .setTimestamp()
            .setFooter({ text: 'Welcome to the server!', iconURL: member.user.displayAvatarURL() }); // Tambahkan profil pengguna di footer

        // Mengirim embed ke channel
        channel.send({ embeds: [welcomeEmbed] });
    },
};
