const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'help',
    description: 'Menampilkan daftar perintah yang tersedia.',
    execute(message, args, client) {
        const embed = new EmbedBuilder()
            .setColor('#00FF00')
            .setTitle('📚 Daftar Perintah')
            .setDescription('Berikut adalah perintah yang tersedia untuk digunakan:')
            .addFields(
                { name: '!help', value: 'Menampilkan daftar perintah yang tersedia.' },
                { name: '!istri', value: 'Menampilkan gambar istrimu.' },
                { name: '!avatar', value: 'Menampilkan avatarmu.' },
                { name: '!ping', value: 'Menampilkan latensi bot.' },
                { name: '!nsfw', value: 'Menampilkan konten nsfw.' },
            )
            .setFooter({ text: 'Gunakan perintah dengan prefix "!".' })
            .setTimestamp() // Menambahkan timestamp
            .setThumbnail('https://i.pinimg.com/736x/47/f4/64/47f464522a1a1a9a534b7936171a8796.jpg') // Ganti dengan URL thumbnail yang sesuai
            .setAuthor({ name: 'Nefounz', url: 'https://nefounz.my.id', iconURL: 'https://i.pinimg.com/736x/bb/5c/14/bb5c14a9533d80e8d08ebdc631b6d062.jpg' }); // Ganti dengan URL icon yang sesuai

        message.channel.send({ embeds: [embed] });
    }
};
