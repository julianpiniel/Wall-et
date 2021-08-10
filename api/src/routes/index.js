const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const {register} = require("../controllers/register.js");
const authRoutes = require("./auth");
const home = require('./home.routes');
const adminSearch = require('./searchUser.routes');
const resetPasswordRoutes = require('./resetPassword')

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);



router.use("/register", register);
router.use('/home', home);
router.use('/adminSearch', adminSearch);
router.use('/auth', authRoutes);
router.use('/resetPassword', resetPasswordRoutes);


module.exports = router;
