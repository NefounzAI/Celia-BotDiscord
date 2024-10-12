# Celia BotDiscord

![Celia BotDiscord](https://i.pinimg.com/736x/47/f4/64/47f464522a1a1a9a534b7936171a8796.jpg)

Celia BotDiscord adalah bot Discord yang dirancang untuk memberikan berbagai fitur menarik kepada pengguna. Gunakan perintah `!help` untuk melihat daftar fitur yang tersedia.

## Screenshot

![Bot Screenshot](https://cdn.discordapp.com/attachments/1294204975840366632/1294210676130185298/image.png?ex=670a2f1e&is=6708dd9e&hm=c51865030a5cb079ec0d2ea739a641b96694d90e215f8cd8aa241c287f306e84&)

## Cara Install Bot

1. **Clone repositori ini dari GitHub:**

   ```bash
   git clone https://github.com/username/Celia-BotDiscord.git
   ```

   (Gantilah `username` dengan nama pengguna GitHub Anda.)

2. **Masuk ke direktori bot:**

   ```bash
   cd Celia-BotDiscord
   ```

3. **Install dependencies:**

   Pastikan Anda telah menginstal Node.js, lalu jalankan perintah berikut untuk menginstal paket yang diperlukan:

   ```bash
   npm install
   ```

4. **Konfigurasi Bot:**

   Buat file `.env` di direktori utama dan tambahkan token bot Anda:

   ```plaintext
   DISCORD_TOKEN=your_discord_bot_token
   HOST=localhost
   PORT=yourport
   ```

   Gantilah `your_discord_bot_token` dengan token bot Discord Anda.
   Gantilah `yourport` dengan port anda mau.

6. **Jalankan Bot:**

   Anda dapat menjalankan bot dengan perintah berikut:

   ```bash
   node index.js
   or
   node .
   ```

   Pastikan Anda mengganti `index.js` dengan nama file yang sesuai jika berbeda.

## Dependencies

Berikut adalah package yang digunakan dalam proyek ini:

```json
{
  "dependencies": {
    "axios": "^1.7.7",
    "cors": "^2.8.5",
    "discord.js": "^14.16.3",
    "dotenv": "^16.4.5",
    "express": "^4.17.1"
  }
}

```

