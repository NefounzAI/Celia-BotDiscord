module.exports = {
    name: 'autorole',
    description: 'Memberikan role kepada anggota baru.',
    async execute(member) {
        const roleName = 'Frends Rawrr😍'; 

        // Pastikan member dan guild ada
        if (!member || !member.guild) {
            console.error('Member or guild is undefined.');
            return;
        }

        // Cek jika guild memiliki roles
        if (!member.guild.roles.cache.size) {
            console.error('No roles found in this guild.');
            return;
        }

        const role = member.guild.roles.cache.find(role => role.name === roleName);

        if (role) {
            try {
                await member.roles.add(role);
                console.log(`Role ${roleName} berhasil diberikan kepada ${member.user.tag}`);
            } catch (error) {
                console.error(`Gagal memberikan role: ${error}`);
            }
        } else {
            console.error(`Role ${roleName} tidak ditemukan di server.`);
        }
    },
};
