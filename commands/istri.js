const axios = require('axios');
const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'istri',
    description: 'Menampilkan gambar istri kamu dari internet!',
    cooldown: 8,  
    async execute(message) {
        try {
            if (this.cooldowns && this.cooldowns.has(message.author.id)) {
                const expirationTime = this.cooldowns.get(message.author.id) + (this.cooldown * 1000); 
                if (Date.now() < expirationTime) {
                    const timeLeft = ((expirationTime - Date.now()) / 1000).toFixed(1);
                    return message.reply(`Mohon tunggu ${timeLeft} detik lagi sebelum menggunakan perintah ini!`);
                }
            }

            if (!this.cooldowns) {
                this.cooldowns = new Map();
            }
            this.cooldowns.set(message.author.id, Date.now()); 

            const response = await axios.get('https://nekos.life/api/v2/img/neko');
            const imageUrl = response.data.url;

            const embed = new EmbedBuilder()
                .setColor('#ff99cc')
                .setTitle('✨ Istrimu ✨')
                .setDescription('Ini adalah istri kamu! Semoga dia bisa membuat harimu lebih indah dan cerah! 💖')
                .setImage(imageUrl)
                .setFooter({ text: 'Sihlahkan di sex brutall 💫', iconURL: 'https://i.imgur.com/MoD3ml3.png' })
                .setTimestamp()
                .setAuthor({ name: message.author.username, iconURL: message.author.displayAvatarURL() });

            await message.channel.send({ embeds: [embed] });
        } catch (error) {
            console.error('Error fetching image:', error);
            message.channel.send('Oops! Terjadi kesalahan saat mengambil gambar. Coba lagi nanti! 😅');
        }
    },
};
