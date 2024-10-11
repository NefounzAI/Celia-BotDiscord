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
                { name: '!ping', value: 'Menampilkan latensi bot.' }
            )
            .setFooter({ text: 'Gunakan perintah dengan prefix "!".' });

        message.channel.send({ embeds: [embed] });
    }
};
