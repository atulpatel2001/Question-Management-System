import { SQLiteDatabase } from "react-native-sqlite-storage";

export const CreateTables = async (db: SQLiteDatabase) => {
  const createUserTable = `
      CREATE TABLE IF NOT EXISTS users (
    userId INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    name TEXT,
    role TEXT DEFAULT 'user',
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
);
    `;


  const createQuestionTable = `
     CREATE TABLE IF NOT EXISTS questions (
    questionId INTEGER PRIMARY KEY AUTOINCREMENT,
    questionText TEXT,
    option1 TEXT,
    option2 TEXT,
    option3 TEXT,
    option4 TEXT,
    correctAnswer INTEGER,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
);
    `;


  const createAttemptTable = `
    CREATE TABLE IF NOT EXISTS attempt (
    attemptId INTEGER PRIMARY KEY  AUTOINCREMENT,
    userId INTEGER NOT NULL,
    questionId INTEGER NOT NULL,
    answer INTEGER,
    isCorrect BOOLEAN,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
);
    `;
  try {
    await db.executeSql(createUserTable);
    await db.executeSql(createQuestionTable);
    await db.executeSql(createAttemptTable);
  } catch (error) {
    console.error(error);
    throw new Error(`Failed to create tables`);
  }
};
