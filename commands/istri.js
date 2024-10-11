const axios = require('axios');
const { EmbedBuilder } = require('discord.js'); 
module.exports = {
    name: 'istri',
    description: 'Ini adalah istri kamu!',
    async execute(message) {
        try {
            const response = await axios.get('https://nekos.life/api/v2/img/neko'); 
            const imageUrl = response.data.url;

            const embed = new EmbedBuilder() 
                .setColor('#14e9d6') 
                .setTitle('✨ Istrimu ✨')
                .setDescription('Ini adalah istri kamu! Semoga dia membuat harimu lebih cerah! 🌸') 
                .setImage(imageUrl) 
                .setFooter({ text: 'Nikmati! 💖' }); 

          
            await message.channel.send({ embeds: [embed] }); 
        } catch (error) {
            console.error(error);
            message.channel.send('Oops! Terjadi kesalahan saat mengambil gambar. Coba lagi nanti!'); 
        }
    },
};
