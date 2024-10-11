const axios = require('axios');
const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'nsfw',
    description: 'Menampilkan gambar NSFW.',
    async execute(message, args) {
        if (!message.channel.nsfw) {
            return message.channel.send('🚫 Channel ini tidak mendukung konten NSFW!');
        }

        try {
            const response = await axios.get('https://api.waifu.pics/nsfw/neko'); // Mengambil gambar NSFW
            const imageUrl = response.data.url; // Mendapatkan URL gambar

            const embed = new EmbedBuilder()
                .setColor('#FF69B4')
                .setTitle('✨ Gambar NSFW ✨')
                .setImage(imageUrl)
                .setFooter({ text: 'Nikmati! 💖' });

            await message.channel.send({ embeds: [embed] });
        } catch (error) {
            console.error('Error fetching NSFW image:', error);
            await message.channel.send('❌ Terjadi kesalahan saat mengambil gambar NSFW.');
        }
    },
};
