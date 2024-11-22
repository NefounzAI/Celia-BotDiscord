const axios = require('axios');
const { EmbedBuilder } = require('discord.js');

const cooldowns = new Map();

module.exports = {
    name: 'nsfw',
    description: 'Menampilkan gambar NSFW.',
    async execute(message, args) {
        const userId = message.author.id; 
        const cooldownTime = 8000; 

        if (!message.channel.nsfw) {
            return message.channel.send('🚫 Channel ini tidak mendukung konten NSFW! Pastikan kamu berada di channel yang tepat yang mendukung konten dewasa.');
        }

        if (cooldowns.has(userId)) {
            const expirationTime = cooldowns.get(userId) + cooldownTime;
            const currentTime = Date.now();

            if (currentTime < expirationTime) {
                const timeLeft = Math.ceil((expirationTime - currentTime) / 1000); 
                return message.channel.send(`❌ Mohon tunggu ${timeLeft} detik lagi sebelum menggunakan perintah ini.`);
            }
        }

        cooldowns.set(userId, Date.now());

        try {
            const response = await axios.get('https://api.waifu.pics/nsfw/neko'); 
            const imageUrl = response.data.url;

            
            const embed = new EmbedBuilder()
                .setColor('#FF1493') 
                .setTitle('✨ Gambar NSFW ✨')
                .setDescription('Nikmati gambar NSFW yang baru! 💖')
                .setImage(imageUrl)
                .setFooter({ text: 'Selalu bijak dalam mengakses konten dewasa.Jangan Keseringan  💭' })
                .setTimestamp()
                .setAuthor({
                    name: message.author.username,
                    iconURL: message.author.displayAvatarURL(),
                });

            await message.channel.send({ embeds: [embed] });
        } catch (error) {
            console.error('Error fetching NSFW image:', error);
            await message.channel.send('❌ Terjadi kesalahan saat mengambil gambar NSFW. Coba lagi nanti.');
        }
    },
};
