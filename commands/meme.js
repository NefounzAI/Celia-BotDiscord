const axios = require('axios');  // Menggunakan axios untuk mengambil data dari API luar

module.exports = {
    name: 'meme',
    description: 'Menampilkan meme yang lucu.',
    async execute(message) {
        try {
            // Mengambil meme acak dari API menggunakan axios
            const response = await axios.get('https://candaan-api.vercel.app/api/image/random');
            const imageUrl = response.data.data.url; // Mendapatkan URL gambar dari data yang diterima
            
            // Mengirim gambar langsung ke channel
            await message.channel.send(imageUrl);
        } catch (error) {
            console.error('Error fetching meme:', error);
            message.channel.send('❌ Terjadi kesalahan saat mengambil meme. Coba lagi nanti!');
        }
    },
};
