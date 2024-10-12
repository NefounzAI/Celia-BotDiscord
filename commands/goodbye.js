const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'goodbye',
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
        const goodbyeEmbed = new EmbedBuilder()
            .setColor('#FF4500') 
            .setTitle(`${member.user.username} 👋 Selamat Tinggal! 👋`) // Nama pengguna dengan pesan
            .setDescription(`Selamat tinggal, ${member.user.username}! Kami akan merindukanmu di server.`)
            .setThumbnail(member.user.displayAvatarURL({ dynamic: true, size: 1024 })) // Foto profil besar pengguna
            .setImage('https://example.com/path/to/your-background-image.png') // Tambahkan gambar latar (jika diperlukan)
            .setTimestamp()
            .setFooter({ text: 'Goodbye', iconURL: member.user.displayAvatarURL() }); // Tambahkan profil pengguna di footer

        // Mengirim embed ke channel
        channel.send({ embeds: [goodbyeEmbed] });
    },
};
