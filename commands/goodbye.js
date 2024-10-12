const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'goodbye',
    description: 'Menyambut anggota yang keluar dari server.',
    execute(member) {
        // Cek apakah member dan guild ada
        if (!member || !member.guild) {
            console.error('Member or guild is undefined.');
            return;
        }

        const channel = member.guild.channels.cache.find(channel => channel.name === 'welcome-masbro');
        if (!channel) {
            console.error('Channel welcome-masbro tidak ditemukan.');
            return;
        }

        // Membuat embed untuk selamat tinggal
        const goodbyeEmbed = new EmbedBuilder()
            .setColor('#FF4500') 
            .setTitle(`${member.user.username} 👋 Selamat Tinggal! 👋`) // Nama pengguna dengan pesan
            .setDescription(`Selamat tinggal, ${member.user.username}! Kami akan merindukanmu di server.`)
            .setThumbnail(member.user.displayAvatarURL({ dynamic: true, size: 1024 })) // Foto profil besar pengguna
            .setImage('https://example.com/path/to/your-background-image.png') // Tambahkan gambar latar (jika diperlukan)
            .setTimestamp()
            .setFooter({ text: 'Goodbye', iconURL: member.user.displayAvatarURL() }); // Tambahkan profil pengguna di footer

        // Mengirim embed ke channel
        try {
            channel.send({ embeds: [goodbyeEmbed] });
        } catch (error) {
            console.error('Gagal mengirim pesan goodbye:', error);
        }
    },
};
