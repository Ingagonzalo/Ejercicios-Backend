const authMiddleware = (req, res, next) => {
    const user = req.session.user;

    if (user) {
        return next();
    }

    res.redirect("/login");
};

const checkNotLogged = (req, res, next) => {
    const user = req.session.user;

    if (!user) {
        return next();
    }

    res.redirect("/welcome");
};

export const authMiddlewares = { checkNotLogged, authMiddleware };