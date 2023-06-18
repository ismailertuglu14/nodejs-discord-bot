const Mongoose = require("mongoose");
const MessageModel = require("./src/message_model");
const dotenv = require("dotenv");
dotenv.config();
const { Client, IntentsBitField } = require("discord.js");

const client = new Client({
  closeTimeout: 60000,
  waitGuildTimeout: 60000,
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ],
});
Mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

client.on("messageCreate", async (message) => {
  //   await MessageModel.create({
  //     messageId: message.id,
  //     content: message.content,
  //     username: message.author.username,
  //   });
});

client.on("messageDelete", async (message) => {
  console.log(message.content + " mesajı silindi, id: " + message.id);
  if (message.author.username === "hahmetulker") {
    message.channel.send(`
    ${message.author.username} adlı kullanıcı tarafından silinen mesaj: ${message.content}
    `);
    await MessageModel.findOneAndUpdate(
      {
        messageId: message.id,
      },
      {
        $set: {
          isDeleted: true,
          deletedAt: Date.now(),
        },
      }
    );
  }
});

client.login(process.env.SECRET_TOKEN);
