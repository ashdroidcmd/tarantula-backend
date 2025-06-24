const con = require('../config/db');

// POST
exports.createData = (req, res) => {
  const { name, id, status, image } = req.body;
  const insert_query = 'INSERT INTO test (name,id,status,image) VALUES ($1,$2,$3,$4)';
  con.query(insert_query, [name, id, status, image], (err) => {
    if (err) return res.status(500).send(err);
    res.send("POSTED DATA");
  });
};

// GET All Order By name, status, id. Limit to 9 cards per page
exports.getAllData = (req, res) => {
  const { sortBy = "id", order = "asc", page = 1, limit = 9 } = req.query;

  const validSortFields = ["id", "name", "status"];
  const validOrder = ["asc", "desc"];

  if (!validSortFields.includes(sortBy.toLowerCase()) || !validOrder.includes(order.toLowerCase())) {
    return res.status(400).json({ error: "Invalid sort parameters" });
  }

  const offset = (parseInt(page) - 1) * parseInt(limit);

  // Count total records
  const countQuery = "SELECT COUNT(*) FROM test";

  con.query(countQuery, (err, countResult) => {
    if (err) return res.status(500).send(err);

    const total = parseInt(countResult.rows[0].count);

    const query = `SELECT * FROM test ORDER BY ${sortBy} ${order.toUpperCase()} LIMIT $1 OFFSET $2`;

    con.query(query, [parseInt(limit), offset], (err, result) => {
      if (err) return res.status(500).send(err);

      res.json({
        data: result.rows,
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(total / limit)
      });
    });
  });
};


// GET by ID
exports.getDataById = (req, res) => {
  const id = req.params.id;
  con.query("SELECT * FROM test WHERE id = $1", [id], (err, result) => {
    if (err) return res.status(500).send(err);
    res.send(result.rows);
  });
};

// UPDATE
exports.updateData = (req, res) => {
  const id = req.params.id;
  const { name, status, image } = req.body;
  const update_query = "UPDATE test SET name = $1, status = $2, image = $3 WHERE id = $4";
  con.query(update_query, [name, status, image, id], (err) => {
    if (err) return res.status(500).send(err);
    res.send("UPDATED");
  });
};

// SEARCH
exports.searchByName = async (req, res) => {
  const { q } = req.query;
  try {
    const result = await con.query(
      "SELECT * FROM test WHERE name ILIKE '%' || $1 || '%'",
      [q]
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// DELETE
exports.deleteData = (req, res) => {
  const id = req.params.id;
  con.query("DELETE FROM test WHERE id = $1", [id], (err) => {
    if (err) return res.status(500).send(err);
    res.send("DELETED");
  });
};
