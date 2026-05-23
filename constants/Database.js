import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabaseSync("feelio.db");

const initializeDatabase = () => {
  db.execSync(`
    CREATE TABLE IF NOT EXISTS diary (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT,
      content TEXT,
      year INTEGER,
      month INTEGER,
      day INTEGER,
      hour INTEGER,
      minute INTEGER,
      monthname TEXT,
      timestamp TEXT
    );
  `);
};

const insertDiary = (
  title,
  content,
  year,
  month,
  day,
  hour,
  minute,
  monthname,
  timestamp
) => {
  return db.runAsync(
    "INSERT INTO diary (title, content, year, month, day, hour, minute, monthname, timestamp) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
    [title, content, year, month, day, hour, minute, monthname, timestamp]
  );
};

const updateDiary = (id, title, content) => {
  return db.runAsync("UPDATE diary SET title=?, content=? WHERE id=?", [
    title,
    content,
    id,
  ]);
};

const getAllDiaries = (year, month) => {
  return db.getAllAsync(
    "SELECT * FROM diary WHERE year=? AND monthname=? ORDER BY id DESC",
    [year, month]
  );
};

const getDiary = (id) => {
  return db.getAllAsync("SELECT * FROM diary WHERE id=?", [id]);
};

const deleteDiaryById = (id) => {
  return db.runAsync("DELETE FROM diary WHERE id = ?", [id]);
};

const clearTable = (tableName) => {
  return db.runAsync(`DELETE FROM ${tableName}`);
};

export {
  initializeDatabase,
  insertDiary,
  getAllDiaries,
  deleteDiaryById,
  clearTable,
  getDiary,
  updateDiary,
};
