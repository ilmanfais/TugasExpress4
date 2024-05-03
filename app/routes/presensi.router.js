const presensiController = require("../controllers/presensi.controller");
const router = require("express").Router();

router.get("/", presensiController.index);
router.get("/:id", presensiController.show);
router.post("/", presensiController.create);
router.put("/:id", presensiController.update);
router.delete("/:id", presensiController.destroy);

router.get("/:id/Mhs", presensiController.Mhs);

module.exports = router;