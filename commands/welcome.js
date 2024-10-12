const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'welcome', // Event name
    execute(member) {
        // Check if the guild exists
        if (!member.guild) return;

        // Find the 'welcome-masbro' channel
        const channel = member.guild.channels.cache.find(channel => channel.name === 'welcome-masbro');
        if (!channel) return;

        // Create the welcome embed
        const welcomeEmbed = new EmbedBuilder()
            .setColor('#00FF00')
            .setTitle(`${member.user.username} just joined the server!`)
            .setDescription(`Selamat Datang Di Server TRY!`)
            .setThumbnail(member.user.displayAvatarURL({ dynamic: true, size: 1024 }))
            .setImage('https://example.com/path/to/banner-image.png') // Replace with a valid image URL
            .setTimestamp()
            .setFooter({ text: 'Welcome to the server!' });

        // Send the embed message to the channel
        channel.send({ embeds: [welcomeEmbed] });
    },
};
