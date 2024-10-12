const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'welcome',
    description: 'Menyambut anggota baru di server.',
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

        // Membuat embed untuk selamat datang
        const welcomeEmbed = new EmbedBuilder()
            .setColor('#00FF00') 
            .setTitle(`${member.user.username} just joined the server`) // Nama pengguna dengan pesan
            .setDescription('Selamat Datang Di Server TRY!')
            .setThumbnail(member.user.displayAvatarURL({ dynamic: true, size: 1024 })) // Foto profil besar pengguna
            .setImage('https://example.com/path/to/your-background-image.png') // Tambahkan gambar latar (jika diperlukan)
            .setTimestamp()
            .setFooter({ text: 'Welcome to the server!', iconURL: member.user.displayAvatarURL() }); // Tambahkan profil pengguna di footer

        // Mengirim embed ke channel
        try {
            channel.send({ embeds: [welcomeEmbed] });
        } catch (error) {
            console.error('Gagal mengirim pesan welcome:', error);
        }
    },
};
