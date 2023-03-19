const { Client, GatewayIntentBits, Partials } = require("discord.js");
const { readdirSync } = require("fs")
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMessageTyping,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.DirectMessageReactions,
    GatewayIntentBits.DirectMessageTyping,
    GatewayIntentBits.MessageContent
  ],
  shards: "auto",
  partials: [
    Partials.Message,
    Partials.Channel,
    Partials.GuildMember,
    Partials.Reaction,
    Partials.GuildScheduledEvent,
    Partials.User,
    Partials.ThreadMember
  ]
});

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("messageCreate", async (message) => {
  if (message.channel.id === "SOURCE_CHANNEL_ID") {
    const targetChannelIds = ["TARGET_CHANNEL_ID_1", "TARGET_CHANNEL_ID_2"];
    for (const channelId of targetChannelIds) {
      const channel = client.channels.cache.get(channelId);
      if (!channel) continue;
      try {
        await channel.send(`${message.content}`);
      } catch (err) {
        console.error(err);
      }
    }
  }
});

client.on("error", console.error);
client.login(process.env.token);
