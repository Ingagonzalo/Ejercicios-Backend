import { dirname, join } from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const users = ["Gonzalo"];

const serverLogin = (req, res) => {
    res.sendFile(join(__dirname, "../views/login.html"))
};

const login = (req, res) => {
    const { username } = req.body

    if (!users.includes(username)) { //si el nombre que yo recibo esta incluido en mi arreglo de users, la condicion se cumple
        res.send("Invalid credentials")
    }
    req.sessions.user = username;
    res.redirect("/welcome") //lo redirecciono a la ruta
}


const serverRegister = (req, res) => {
    res.sendFile(join(__dirname, "../views/register.html"))
};

const register = (req, res) => {
    const { username } = req.body

    if (users.includes(username)) { //si el nombre que yo recibo esta incluido en mi arreglo de users, la condicion se cumple
        return res.send("Username already in use")
    }
    users.push(username) //pusheo mi username al arreglo de users
    res.redirect("/login") //lo redirecciono a la ruta
}
const logout = (req, res) => {
    const username = req.session.user;
    req.session.destroy();

    res.render("logout", { username });
};

const serverWelcome = (req, res) => {
    const username = req.session.user;

    res.render("welcome", { username });
};


export const authController = { serverLogin, login, serverRegister, register, serverWelcome, logout }

