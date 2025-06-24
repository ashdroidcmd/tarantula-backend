const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// POST
exports.createData = async (req, res) => {
  const { name, id, status, image } = req.body;

  // prisma.test.create is similar to   'INSERT INTO test (name,id,status,image) VALUES ($1,$2,$3,$4)';
  try {
    await prisma.test.create({ //
      data: { 
        id, 
        name, 
        status, 
        image 
      }
    });
    res.send("POSTED DATA");
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET all with pagination, sorting and limit
exports.getAllData = async (req, res) => {
  const { sortBy = "id", order = "asc", page = 1, limit = 9 } = req.query;

  const validSortFields = ["id", "name", "status"];
  const validOrder = ["asc", "desc"];

  if (!validSortFields.includes(sortBy.toLowerCase()) || !validOrder.includes(order.toLowerCase())) {
    return res.status(400).json({ error: "Invalid sort parameters" });
  }

  const skip = (parseInt(page) - 1) * parseInt(limit);

  // prisma.test.findMany is similar to "SELECT * FROM test
  try {
    const [data, total] = await Promise.all([
      prisma.test.findMany({
        skip,
        take: parseInt(limit),
        orderBy: { [sortBy]: order },
      }),
      prisma.test.count(),
    ]);

    res.json({
      data,
      total,
      page: parseInt(page),
      limit: parseInt(limit),
      totalPages: Math.ceil(total / limit),
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET by ID
exports.getDataById = async (req, res) => {
  const id = parseInt(req.params.id);

  // prisma.test.findUnique is similar to "SELECT * FROM test WHERE id = $1"
  try {
    const result = await prisma.test.findUnique({ where: { id } });
    if (!result) return res.status(404).json({ error: "Not found" });
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE
exports.updateData = async (req, res) => {
  const id = parseInt(req.params.id);
  const { name, status, image } = req.body;

  // prisma.test.update is similar to SQL "UPDATE test SET name = $1, status = $2, image = $3 WHERE id = $4";
  try {
    await prisma.test.update({ 
      where: { id },
      data: { name, status, image }
    });
    res.send("UPDATED");
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// SEARCH
exports.searchByName = async (req, res) => {
  const { q } = req.query;

  // prisma.test.findMany is similar to "SELECT * FROM test WHERE name ILIKE '%' || $1 || '%'",
  try {
    const result = await prisma.test.findMany({
      where: {
        name: {
          contains: q,
          mode: 'insensitive'
        }
      }
    });
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// DELETE
exports.deleteData = async (req, res) => {
  const id = parseInt(req.params.id);

  // prisma.test.delete is similar to "DELETE FROM test WHERE id = $1"
  try {
    await prisma.test.delete({ where: { id } });
    res.send("DELETED");
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
