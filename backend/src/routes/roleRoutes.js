const express = require("express");
const router = express.Router();

// Dummy controller stubs
router.get("/", (req, res) => res.json([]));
router.post("/", (req, res) => res.json({ message: "Role created" }));
router.put("/:id", (req, res) => res.json({ message: "Role updated" }));
router.delete("/:id", (req, res) => res.json({ message: "Role deleted" }));

module.exports = router;
