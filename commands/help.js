const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'help',
    description: 'Menampilkan daftar perintah yang tersedia.',
    execute(message, args, client) {
        const embed = new EmbedBuilder()
            .setColor('#3498db') // Warna biru modern
            .setTitle('📚 Daftar Perintah Bot') // Menambahkan judul yang menarik
            .setDescription('Berikut adalah beberapa perintah yang dapat kamu gunakan untuk berinteraksi dengan bot:')
            .addFields(
                { name: '``!help``', value: 'Menampilkan daftar perintah yang tersedia.', inline: true },
                { name: '``!istri``', value: 'Menampilkan gambar istrimu.', inline: true },
                { name: '``!avatar``', value: 'Menampilkan avatarmu.', inline: true },
                { name: '``!ping``', value: 'Menampilkan latensi bot.', inline: true },
                { name: '``!nsfw``', value: 'Menampilkan konten NSFW.', inline: true }
            )
            .setFooter({ text: 'Gunakan perintah dengan prefix "!".', iconURL: 'https://i.pinimg.com/736x/47/f4/64/47f464522a1a1a9a534b7936171a8796.jpg' })
            .setTimestamp()
            .setThumbnail('https://i.pinimg.com/736x/47/f4/64/47f464522a1a1a9a534b7936171a8796.jpg') // Thumbnail yang menarik
            .setAuthor({
                name: 'Nefounz Bot',
                url: 'https://nefounz.my.id',
                iconURL: 'https://i.pinimg.com/736x/bb/5c/14/bb5c14a9533d80e8d08ebdc631b6d062.jpg',
            })
            .setImage('https://i.pinimg.com/originals/ff/9d/8d/ff9d8d348b7b36b0ec5fe9e44a1b198b.jpg'); // Menambahkan gambar utama yang sesuai

        message.channel.send({ embeds: [embed] });
    }
};
