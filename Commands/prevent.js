module.exports = {
    name: 'prevent',
    description: 'Prevent servers of an event or update',
    usage: '/lmt prevent',
    execute(message, server, args, client, manager) {
        let channel = message.channel;
        channel.messages.fetch({ limit: 10 }).then(messages => {
            let lastMessage = Array.from(messages.keys())[1];
            manager.getServers().forEach(server => {
                console.log(server.getMainChannel())
                if(server.getMainChannel().id !== null){
                    let channel = server.getServerData().channels.cache.get(server.getMainChannel().id);
                    channel.send(messages.get(lastMessage).content);
                }
            });
            message.channel.send("All servers have been prevented !");
        })
        .catch(console.error);
    }
};