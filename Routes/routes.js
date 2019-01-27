const router = require('express').Router();

router.use("/users", require("./users"));
router.use("/posts", require("./posts"));

router.get('/', (req, res) => {
	res.status(200).json({ message: 'Connected!'});
});

module.exports = router;