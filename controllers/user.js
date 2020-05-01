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
  connection.query('SELECT * from user_info where id =?', [id], (error, rows, fields) => {
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

  connection.query(
    'UPDATE user_info SET first_name =?, last_name =? WHERE id =?',
    [first_name, last_name, id],
    (error, rows, fields) => {
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
    }
  );
};

//NOTE Delete User
const deleteUsers = (req, res) => {
  const id = req.params.id;
  connection.query('DELETE FROM user_info WHERE id=?', [id], (error, rows, fields) => {
    console.log(id);
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
