const axios = require('axios');
const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'nsfw',
    description: 'Menampilkan konten NSFW.',
    async execute(message) {
        if (!message.channel.nsfw) {
            return message.reply('Perintah ini hanya dapat digunakan di saluran NSFW!');
        }

        try {
            const response = await axios.get('https://nekos.life/api/v2/img/nsfw_neko'); // Ganti dengan API NSFW yang sesuai
            const imageUrl = response.data.url;

            const embed = new EmbedBuilder()
                .setColor('#FF69B4')
                .setTitle('🌶️ Konten NSFW 🌶️')
                .setImage(imageUrl)
                .setFooter({ text: 'Nikmati dengan bijak! 💖' });

            await message.channel.send({ embeds: [embed] });
        } catch (error) {
            console.error(error);
            message.channel.send('Oops! Terjadi kesalahan saat mengambil konten NSFW. Coba lagi nanti!'); 
        }
    },
};
