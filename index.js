const fs = require('fs');
const { Client, GatewayIntentBits } = require('discord.js');
const cron = require('node-cron');
require('dotenv').config();

const TOKEN = process.env.DISCORD_TOKEN || '';
const CHANNEL_ID = process.env.CHANNEL_ID || '';

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

let lines = [];
let aktualniIndex;

function nacistJmena() {
    fs.readFile('jmena.txt', 'utf8', (err, data) => {
        if (err) {
            console.error('chyba pri nacitani souboru jmena.txt:', err);
            return;
        }
        lines = data.split('\n').map(line => line.trim()).filter(line => line.length > 0);
        console.log('jmena byla uspesne načtena.');
    });
}

function nacistIndex() {
    if (fs.existsSync('index.txt')) {
        const savedIndex = fs.readFileSync('index.txt', 'utf8').trim();
        if (!isNaN(savedIndex)) {
            aktualniIndex = parseInt(savedIndex, 10);
            console.log(`aktualni index nacten: ${aktualniIndex}`);
        } else {
            console.error('soubor index.txt obsahuje neplatna data.');
            throw new Error('neplatny obsah souboru index.txt');
        }
    } else {
        console.error('soubor index.txt neexistuje; vytvor ho s nejakym zacinajicim indexem');
        throw new Error('chybi soubor index.txt');
    }
}

function ulozitIndex() {
    fs.writeFile('index.txt', aktualniIndex.toString(), (err) => {
        if (err) {
            console.error('chyba pri ukladani indexu:', err);
        } else {
            console.log(`index ${aktualniIndex} byl uspesne ulozen.`);
        }
    });
}

function poslatZpravu() {
    const channel = client.channels.cache.get(CHANNEL_ID);
    if (!channel) {
        console.error('kanal nebyl nalezen.');
        return;
    }

    if (lines.length === 0) {
        console.error('zadna jmena nebyla nactena.');
        return;
    }

    const message = `Tento týden má službu __${lines[aktualniIndex]}__ :broom: :sponge:`;
    channel.send(message).catch(console.error);

    aktualniIndex = (aktualniIndex + 1) % lines.length;
    ulozitIndex();
}

client.once('ready', () => {
    console.log(`me jmeno neni negr, ale ${client.user.tag}`);

    nacistJmena();
    nacistIndex();

    cron.schedule('0 8 * * 1', poslatZpravu, {
        timezone: 'Europe/Prague'
    });
});

client.login(TOKEN);