document.addEventListener('DOMContentLoaded', () => {
    const homeLink = document.getElementById('homeLink');
    const sendMessageLink = document.getElementById('sendMessageLink');
    const home = document.getElementById('home');
    const messageFormContainer = document.getElementById('messageFormContainer');
    const sidebar = document.getElementById('sidebar');
    const hamburger = document.getElementById('hamburger');
    const overlay = document.getElementById('overlay');

    homeLink.addEventListener('click', () => {
        showSection(home);
    });

    sendMessageLink.addEventListener('click', () => {
        showSection(messageFormContainer);
        loadGuilds(); 
    });

    hamburger.addEventListener('click', toggleSidebar);

    overlay.addEventListener('click', closeSidebar);

    function showSection(section) {
        home.classList.add('hidden');
        messageFormContainer.classList.add('hidden');
        section.classList.remove('hidden');
        closeSidebar(); // C
    }

    function toggleSidebar() {
        sidebar.classList.toggle('-translate-x-full');
        overlay.classList.toggle('hidden');
    }

    function closeSidebar() {
        sidebar.classList.add('-translate-x-full');
        overlay.classList.add('hidden');
    }

    async function loadGuilds() {
        try {
            const response = await fetch('/api/guilds'); 
            if (!response.ok) throw new Error('Gagal memuat guild. Status: ' + response.status);

            const guilds = await response.json();
            const guildSelect = document.getElementById('guildSelect');

            guildSelect.innerHTML = '<option value="" disabled selected>Pilih Guild</option>';
            guilds.forEach(guild => {
                const option = document.createElement('option');
                option.value = guild.id;
                option.textContent = guild.name;
                guildSelect.appendChild(option);
            });

            guildSelect.addEventListener('change', async (event) => {
                const guildId = event.target.value;
                await loadChannels(guildId);
            });
        } catch (error) {
            console.error('Error loading guilds:', error);
            alert('Gagal memuat guilds. Silakan coba lagi.');
        }
    }

    async function loadChannels(guildId) {
        try {
            const response = await fetch(`/api/channels?guildId=${guildId}`);
            if (!response.ok) throw new Error('Gagal memuat channels. Status: ' + response.status);

            const channels = await response.json();
            const channelSelect = document.getElementById('channelSelect');

            channelSelect.innerHTML = '<option value="" disabled selected>Pilih Channel</option>';
            channels.forEach(channel => {
                const option = document.createElement('option');
                option.value = channel.id;
                option.textContent = channel.name;
                channelSelect.appendChild(option);
            });
        } catch (error) {
            console.error('Error loading channels:', error);
            alert('Gagal memuat channels. Silakan coba lagi.');
        }
    }

    document.getElementById('messageForm').addEventListener('submit', async (e) => {
        e.preventDefault();

        const guildId = document.getElementById('guildSelect').value;
        const channelId = document.getElementById('channelSelect').value;

        if (!guildId || !channelId) {
            alert('Pilih guild dan channel sebelum mengirim pesan.');
            return;
        }

        const embed = {
            title: document.getElementById('embedTitle').value,
            description: document.getElementById('embedDescription').value,
            color: document.getElementById('embedColor').value,
            image: document.getElementById('embedImage').value || null,
            footer: document.getElementById('embedFooter').value || null,
            thumbnail: document.getElementById('embedThumbnail').value || null,
        };

        const payload = { guildId, channelId, embed };

        try {
            const response = await fetch('/send-message', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error('Gagal mengirim pesan: ' + errorText);
            }

            alert('Pesan berhasil dikirim!');
            document.getElementById('messageForm').reset(); 
            loadChannels(guildId); 
        } catch (error) {
            console.error('Error sending message:', error);
            alert('Gagal mengirim pesan. Silakan coba lagi. ' + error.message);
        }
    });
    var _0x1a2b3 = function(_0x4c5d) {
        return _0x4c5d + 1;
    };
    
});

