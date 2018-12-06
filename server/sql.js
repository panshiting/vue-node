const sql = {
  insert: 'INSERT INTO student(name, age, sex) VALUES(?,?,?)',
  getAll: 'SELECT * FROM student',
  getStuByName: 'SELECT * FROM student WHERE name LIKE ?'
}

module.exports = sql
