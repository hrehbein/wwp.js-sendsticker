const fs = require("fs");
const path = require('path');
const { Client, LocalAuth, MessageMedia } = require("whatsapp-web.js");
const qrcode = require("qrcode-terminal");
const client = new Client({ authStrategy: new LocalAuth() });
client.on("qr", (qr) => {
  qrcode.generate(qr, { small: true });
});
client.on("ready", () => {
  console.log("Client is ready!");
  sendStickers();
});

async function sendStickers() {
  const files = fs.readdirSync('./stickers');

  for (const file of files) {
    const filePath = path.join('./stickers', file);
    const media = MessageMedia.fromFilePath(filePath);

    // ID_SERIAL CONTATO OU GRUPO
    const chatId = "";

    await client.sendMessage(chatId, media, { sendMediaAsSticker: true });
    console.log(`Figurinha enviada: ${file}`);
  }

  console.log('Todas as figurinhas foram enviadas!');
}
client.initialize();