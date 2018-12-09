const sql = {
  insert: 'INSERT INTO student(name, age, sex) VALUES(?,?,?)',
  getAll: 'SELECT * FROM student',
  getStuByName: 'SELECT * FROM student WHERE name LIKE ?',
  getStuById: 'SELECT * FROM student WHERE id = ?',
  update: 'UPDATE student SET name=?,age=?,sex=? WHERE id = ?',
  delete: 'DELETE FROM student WHERE id = ?'
}

module.exports = sql
