const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoicUFZL2ZoVTRxb29HTng2MHhtUDg1ZXdUWWorTGhlVHlkWWlLdHNKclBtUT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoidVN0NEtxaFF5YUt2OWVjMUVVa3dabWhwbVBlbmZkNHJkZ1VPYkJZcXRHQT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJBSHEzQ0d6c0dOdzNxNXhjVmo2QUhva1VySzV3R1hEcytHNkkzSHVWcEZRPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI0V3ozUGpEV0tuME1qZ0VnUzVsWVNTd0daek5UV3JwbHNTT1M2QnQzMjJvPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InlLTjhKUWVlNHExeDdjd25MR3VXSzlhaForWVY5OU1iUXBMVEdYM1ZuMHM9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImEzSTJmNTNwWHFNUHl6YlNlcG1GOUxoODk4YjMwc3E0MFFDS2lzeTg5amM9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiMERFZko5YWMwbE5XU0ViWmdHa1RhYzFtb2pCLzRkUkpkYTA3dlQvZXExUT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoib01CU2M5ZVlzS3BacHBmM2d4VmpkRk9tNmhLUk5RSVZ0aFl1d2ZDWHgxYz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJGWmNjSzJZNjRjZGFuV081bEpIdTJBS0FKUmhrSWtkM3pnbHB5aFp4VWlpNzduWmFXQWpMaWllTnc3cHVQYmlKN3l5RVZrclIrMlhsdndJYjlGZ2l3PT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6OTMsImFkdlNlY3JldEtleSI6Ii9qUVRDeDR5YUtMcGh1Y0lTRkJYdkNLUXlPbGxaMDNKRndSOWh1UzJzY2M9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbXSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjAsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6IjhrVmtSME4yUzZpSFhJNmsxdm12LWciLCJwaG9uZUlkIjoiMzQ0OGE2YWUtNzBiNy00NDVmLWE5ZWUtYmFhMjIxM2JjNWUwIiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InlqSUxjT2l5K0d3SCt0UHNSZnZwYzBoR2hRRT0ifSwicmVnaXN0ZXJlZCI6dHJ1ZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJUeTcxS1c0akYwZmdTM3JKelFXSENiVmVSL0U9In0sInJlZ2lzdHJhdGlvbiI6e30sInBhaXJpbmdDb2RlIjoiUjU0NzJKNFAiLCJtZSI6eyJpZCI6IjkyMzEyNjUwNzM0MTo1MEBzLndoYXRzYXBwLm5ldCIsIm5hbWUiOiJzeWVkaGFtenU1MTIifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ1BMOTNia0VFS1RYaHJrR0dBb2dBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6IlNkZjRDOFpXaVlxa3ZiV3NYZzhSOUVmYk1LRy9Sa2ZnSVFiWGMxZ1RqVlE9IiwiYWNjb3VudFNpZ25hdHVyZSI6IlVxZDFZZ3lVRFNPUjV6Z1FqZzJuVGI4Qmg1blNybWlPS25wSUI0cE9JejRydEx2YkpHdDJkczZUMit4bmN4WHZuS2ZKUWRvTVplYkdIQUo4M05lWEJ3PT0iLCJkZXZpY2VTaWduYXR1cmUiOiI3SlZxYnhmMENlVDF1Z0tWc0ZBMkFQck16WTNzZHM0SytsMGVNUDNEQ3ZkbDQwM3pXV3g4eWNZeVNEcTdacTl5dWMzZHNXQXAyamp6MVlyUFVLaWpoQT09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjkyMzEyNjUwNzM0MTo1MEBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJVblgrQXZHVm9tS3BMMjFyRjRQRWZSSDJ6Q2h2MFpINENFRzEzTllFNDFVIn19XSwicGxhdGZvcm0iOiJzbWJhIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzMwMjU5ODg5LCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQU1XOSJ9',
    PREFIXE: process.env.PREFIX || "+",
    OWNER_NAME: process.env.OWNER_NAME || "Boniphace Tech",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "255716661569",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "non",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'non',
    BOT : process.env.BOT_NAME || 'BONIPHACE MD',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/5462ea7070b61eb790caa.jpg',
    MODE: process.env.PUBLIC_MODE || "no",
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    CHATBOT : process.env.PM_CHATBOT || 'no',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'yes',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
