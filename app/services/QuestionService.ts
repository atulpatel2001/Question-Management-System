
/**
 * Qusetion Service Perform All CRUD operation
 */
import { SQLiteDatabase } from "react-native-sqlite-storage"
import { Question } from "../model/Question";

/**
 * add qusetion in table call insert query
 * @param db 
 * @param question 
 * @returns 
 */
export const addQuestion = async (db: SQLiteDatabase, question: Question): Promise<number> => {
    const insertQuery = `
        INSERT INTO questions (questionText, option1, option2, option3, option4, correctAnswer, createdAt, updatedAt)
        VALUES (?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
    `;
    const values = [
        question.questionText,
        question.option1,
        question.option2,
        question.option3,
        question.option4,
        question.correctAnswer,
    ];
    try {
        const [resultSet] = await db.executeSql(insertQuery, values);
        return resultSet.insertId;
    } catch (error) {
        console.error(error);
        throw new Error("Failed to add question");
    }
};


/**
 * Update Qusetion in databse fire update query
 * @param db 
 * @param question 
 * @returns 
 */
export const updateQuestion = async (db: SQLiteDatabase, question: Question): Promise<number> => {
    const updateQuery = `
        UPDATE questions
        SET questionText=?, option1=?, option2=?, option3=?, option4=?, correctAnswer=?, updatedAt=CURRENT_TIMESTAMP
        WHERE questionId = ?
    `;
    const values = [
        question.questionText,
        question.option1,
        question.option2,
        question.option3,
        question.option4,
        question.correctAnswer,
        question.questionId,
    ];
    try {
        const [resultSet] = await db.executeSql(updateQuery, values);
        return resultSet.rowsAffected;
    }

    catch (error) {
        console.error(error);
        throw new Error("Failed to update question");
    }
};




/**
 * Get Question By id
 * @param db 
 * @param questionId 
 * @returns 
 */
export const findQuestionById = async (db: SQLiteDatabase, questionId: number): Promise<Question | null> => {
    const query = `
        SELECT * FROM questions
        WHERE questionId = ?
    `;
    const values = [questionId];
    try {
        const [resultSet] = await db.executeSql(query, values);
        if (resultSet.rows.length > 0) {
            const questionData = resultSet.rows.item(0);
            const question: Question = {
                questionId: questionData.questionId,
                questionText: questionData.questionText,
                option1: questionData.option1,
                option2: questionData.option2,
                option3: questionData.option3,
                option4: questionData.option4,
                correctAnswer: questionData.correctAnswer,
                createdAt: questionData.createdAt,
                updatedAt: questionData.updatedAt,
            };
            return question;
        } else {
            return null;
        }
    } catch (error) {
        console.error(error);
        throw new Error("Failed to find question by ID");
    }
};


/**
 * Find All Question
 * @param db 
 * @returns 
 */
export const findAllQuestions = async (db: SQLiteDatabase): Promise<Question[]> => {
    const query = `
        SELECT * FROM questions
    `;
    try {
        const [resultSet] = await db.executeSql(query);
        const questions: Question[] = [];
        for (let i = 0; i < resultSet.rows.length; i++) {
            const questionData = resultSet.rows.item(i);
            const question: Question = {
                questionId: questionData.questionId,
                questionText: questionData.questionText,
                option1: questionData.option1,
                option2: questionData.option2,
                option3: questionData.option3,
                option4: questionData.option4,
                correctAnswer: questionData.correctAnswer,
                createdAt: questionData.createdAt,
                updatedAt: questionData.updatedAt,
            };
            questions.push(question);
        }
        return questions;
    } catch (error) {
        console.error(error);
        throw new Error("Failed to get all questions");
    }
};


