const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Helper function to generate a random codename
const generateCodename = () => {
  const adjectives = ['Shadow', 'Silent', 'Golden', 'Iron', 'Crimson'];
  const nouns = ['Falcon', 'Phoenix', 'Wolf', 'Eagle', 'Serpent'];
  const randomAdjective = adjectives[Math.floor(Math.random() * adjectives.length)];
  const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];
  return `The ${randomAdjective} ${randomNoun}`;
};

// Helper function to generate a random success probability
const generateSuccessProbability = () => Math.floor(Math.random() * 100) + 1;

// GET --> /gadgets - It retrieves all the gadgets and also support filters the gadgets by status

const getAllGadgets = async (req, res) => {
    const { status } = req.query;
  
    try {
      const gadgets = await prisma.gadget.findMany({
        where: status ? { status } : {},
      });
      const gadgetsWithProbability = gadgets.map((gadget) => ({
        ...gadget,
        successProbability: `${generateSuccessProbability()}%`,
      }));
      res.status(200).json(gadgetsWithProbability);
    } catch (error) {
      res.status(500).json({ error: 'Error retrieving gadgets' });
    }
  };
  
// POST --> /gadgets - Add a new gadget
const addGadget = async (req, res) => {
  const { name } = req.body;

  try {
    const newGadget = await prisma.gadget.create({
      data: {
        name,
        codename: generateCodename(),
      },
    });
    res.status(201).json(newGadget);
  } catch (error) {
    res.status(500).json({ error: 'Error adding gadget' });
  }
};

// PATCH /gadgets/:id - Update a gadget
const updateGadget = async (req, res) => {
  const { id } = req.params;
  const { name, status } = req.body;

  try {
    const updatedGadget = await prisma.gadget.update({
      where: { id },
      data: { name, status },
    });
    res.status(200).json(updatedGadget);
  } catch (error) {
    res.status(500).json({ error: 'Error updating gadget' });
  }
};

// DELETE --> /gadgets/:id - Decommission a gadget
const decommissionGadget = async (req, res) => {
  const { id } = req.params;

  try {
    const decommissionedGadget = await prisma.gadget.update({
      where: { id },
      data: { status: 'Decommissioned', decommissionedAt: new Date() },
    });
    res.status(200).json(decommissionedGadget);
  } catch (error) {
    res.status(500).json({ error: 'Error decommissioning gadget' });
  }
};

// POST --> /gadgets/:id/self-destruct - It triggers a self-destruct sequence
const selfDestructGadget = async (req, res) => {
  const { id } = req.params;

  try {
    const gadget = await prisma.gadget.findUnique({ where: { id } });

    if (!gadget) {
      return res.status(404).json({ error: 'Gadget not found' });
    }

    if (gadget.status === 'Destroyed') {
      return res.status(400).json({ error: 'Gadget is already destroyed' });
    }

    // It generates a random confirmation code
    const confirmationCode = Math.floor(1000 + Math.random() * 9000);

    // It updates gadget status to "Destroyed"
    await prisma.gadget.update({
      where: { id },
      data: { status: 'Destroyed' },
    });

    res.status(200).json({
      message: 'Self-destruct sequence initiated',
      confirmationCode,
    });
  } catch (error) {
    res.status(500).json({ error: 'Error initiating self-destruct sequence' });
  }
};

module.exports = {
  getAllGadgets,
  addGadget,
  updateGadget,
  decommissionGadget,
  selfDestructGadget,
};