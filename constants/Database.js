import * as SQLite from "expo-sqlite";

// Open or create the database (db will be created if it doesn't exist)
const db = SQLite.openDatabase("feelio.db");

// Function to initialize the database (e.g., create tables)
const initializeDatabase = () => {
  db.transaction((tx) => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS diary (
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
            );`
    );
  });
};

// Function to insert a diary into the database
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
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "INSERT INTO diary (title, content, year, month, day,hour,minute,monthname,timestamp) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
        [title, content, year, month, day, hour, minute, monthname, timestamp],
        (_, results) => {
          resolve(results);
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });
};

const updateDiary = (id, title, content) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "UPDATE diary SET title=?,content=? WHERE id=?",
        [title, content, id],
        (_, results) => {
          resolve(results);
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });
};

// Function to query all diaries from the database
const getAllDiaries = (year, month) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM diary WHERE year=? AND monthname=? ORDER BY id DESC",
        [year, month],
        (_, results) => {
          const rows = results.rows;
          const diaries = [];
          for (let i = 0; i < rows.length; i++) {
            diaries.push(rows.item(i));
          }
          resolve(diaries);
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });
};

//getDiary
const getDiary = (id) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM diary WHERE id=?",
        [id],
        (_, results) => {
          const rows = results.rows;
          const diaries = [];
          for (let i = 0; i < rows.length; i++) {
            diaries.push(rows.item(i));
          }
          resolve(diaries);
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });
};

// Function to delete a diary from the database by ID
const deleteDiaryById = (id) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "DELETE FROM diary WHERE id = ?",
        [id],
        (_, results) => {
          resolve(results);
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });
};
const clearTable = (tableName) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `DELETE FROM ${tableName}`,
        [],
        (_, results) => {
          // Resolve the promise when the query is successful
          resolve(results);
        },
        (_, error) => {
          // Reject the promise if an error occurs
          reject(error);
        }
      );
    });
  });
};

// Export the functions for use in other files
export {
  initializeDatabase,
  insertDiary,
  getAllDiaries,
  deleteDiaryById,
  clearTable,
  getDiary,
  updateDiary,
};
