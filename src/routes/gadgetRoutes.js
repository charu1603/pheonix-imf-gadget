const express = require('express');
const gadgetController = require('../controllers/gadgetController');
const authenticate = require('../middleware/authMiddleware');

const router = express.Router();

// GET --> /gadgets - Retrieve all gadgets
router.get('/gadgets', gadgetController.getAllGadgets);

// POST -->  /gadgets - It Adds a new gadget
router.post('/gadgets', authenticate, gadgetController.addGadget);

// PATCH --> /gadgets/:id - Update a gadget
router.patch('/gadgets/:id', authenticate, gadgetController.updateGadget);

// DELETE -->  /gadgets/:id - Decommission a gadget
router.delete('/gadgets/:id', authenticate, gadgetController.decommissionGadget);

// POST --> /gadgets/:id/self-destruct - Trigger self-destruct sequence
router.post('/gadgets/:id/self-destruct', authenticate, gadgetController.selfDestructGadget);

module.exports = router;