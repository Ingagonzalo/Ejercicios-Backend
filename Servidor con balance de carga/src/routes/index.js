import { Router } from 'express';
import passport from "passport";
import { authController } from "../controllers/index.js";
import generateFaker from '../faker.js';

const router = Router()

router
    .route('/login')
    .get(authController.getLogin)
    .post(
        passport.authenticate("login", { failureRedirect: "/fail-login" }),
        authController.getLogin
    );

router
    .route("/register")
    .get(authController.getRegister)
    .post(
        passport.authenticate("register", { failureRedirect: "/fail-register" }),
        authController.getLogin
    );

router.get("/fail-login", authController.getLoginFailiure);
router.get("/fail-register", authController.getRegisterFailiure);

router.get("/logout", authController.logOut);

router.get('/login/productos', (req, res) => {
    const { user } = req.session;
    if (!user) res.redirect('/login')
    res.render('form', { user })
})

router.route('/api/productos-test').get((req, res) => {
    res.render('test', { items: generateFaker() })
})

router.get("/info", authController.info)

router.get("/api/random", authController.getRandom)

export default router;