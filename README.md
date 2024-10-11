# Celia BotDiscord

Celia BotDiscord adalah bot Discord yang dirancang untuk memberikan berbagai fitur menarik kepada pengguna. Gunakan perintah `!help` untuk melihat daftar fitur yang tersedia.

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
   ```

   Gantilah `your_discord_bot_token` dengan token bot Discord Anda.

5. **Jalankan Bot:**

   Anda dapat menjalankan bot dengan perintah berikut:

   ```bash
   node index.js
   ```

   Pastikan Anda mengganti `index.js` dengan nama file yang sesuai jika berbeda.

## Dependencies

Berikut adalah package yang digunakan dalam proyek ini:

```json
{
  "dependencies": {
    "axios": "^1.7.7",
    "discord.js": "^14.16.3",
    "dotenv": "^16.4.5"
  }
}
```
