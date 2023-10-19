import dotenv from "dotenv"
dotenv.config()
const { DISCORD_TOKEN, MONGO_URL } = process.env;

if (!DISCORD_TOKEN) {
    throw new Error("Missing environment variables")
}

const config: Record <string, string> = {
    DISCORD_TOKEN,
    MONGO_URL
}

export default config;