import path from "path";
import * as url from "url";
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = url.fileURLToPath(new URL(".", import.meta.url))

const sqliteConfig = {
    client: "sqlite3",
    connection: { filename: path.resolve(__dirname, "../data/mydb.sqlite") },
    useNullAsDefault: true,
};

export default sqliteConfig;