const connection = require('../connection');

// NOTE All users
const index = (req, res) => {
  connection.query('SELECT * from user_info', (error, rows, fields) => {
    if (error) {
      console.log(error);
      return res.status(500).json({
        status: 500,
        error: [{ message: 'Something went wrong! Please try again' }],
      });
    }
    res.json({
      status: 200,
      data: rows,
      requestedAt: new Date().toLocaleString(),
    });
  });
};

// NOTE ONE USER
const findUsers = (req, res) => {
  const id = req.params.id;
  connection.query('SELECT * from user_info where id_user =?', [id], (error, rows, fields) => {
    if (error) {
      console.log(error);
      return res.status(500).json({
        status: 500,
        error: [{ message: 'Something went wrong! Please try again' }],
      });
    }
    res.json({
      status: 200,
      data: rows,
      requestedAt: new Date().toLocaleString(),
    });
  });
};

// NOTE Create user
const createUsers = (req, res) => {
  const first_name = req.body.first_name;
  const last_name = req.body.last_name;

  connection.query(
    'INSERT INTO user_info (`first_name`, `last_name`) values(?,?)',
    [first_name, last_name],
    (err, rows, fields) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          status: 500,
          error: [{ message: 'Something went wrong! Please try again' }],
        });
      }
      res.json({
        status: 200,
        data: {
          first_name: first_name,
          last_name: last_name,
        },
        requestedAt: new Date().toLocaleString(),
      });
    }
  );
};

// NOTE Update user
const updateUsers = function (req, res) {
  const id = req.params.id;
  const first_name = req.body.first_name;
  const last_name = req.body.last_name;

  const fields = [first_name, last_name, id];

  const allowed_fields = ['first_name', 'last_name'];
  const set_field_strings = [];
  const replacements = [];

  for (const field_name in req.body) {
    if (!allowed_fields.includes(field_name)) {
      continue;
    }
    set_field_strings.push(field_name + ' = ?');
    replacements.push(req.body[field_name]);
  }

  connection.query(
    `UPDATE user_info SET ${set_field_strings.join(',')} WHERE id_user =?`,
    fields,
    (error, rows, fields) => {
      if (error) {
        console.log(error);
        return res.status(500).json({
          status: 500,
          data: { ...fields },
          error: [{ message: 'Something went wrong! Please try again' }],
        });
      }

      res.json({
        status: 200,
        requestedAt: new Date().toLocaleString(),
      });
    }
  );
};

//NOTE Delete User
const deleteUsers = (req, res) => {
  const id = req.params.id;
  connection.query('DELETE FROM user_info WHERE id_user =?', [id], (error, rows, fields) => {
    if (error) {
      console.log(error);
      return res.status(500).json({
        status: 500,
        error: [{ message: 'Something went wrong! Please try again' }],
      });
    }

    res.json({
      status: 200,
      data: rows,
      requestedAt: new Date().toLocaleString(),
    });
  });
};

module.exports = {
  index,
  findUsers,
  createUsers,
  updateUsers,
  deleteUsers,
};
