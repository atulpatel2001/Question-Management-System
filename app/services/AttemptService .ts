import { SQLiteDatabase } from 'react-native-sqlite-storage';
import { Attempt } from '../model/Attempt';


export async function addAttempt(db: SQLiteDatabase, attempt: Attempt): Promise<number> {
    const insertQuery = `
            INSERT INTO attempt (userId, questionId, answer, isCorrect, createdAt, updatedAt)
            VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
        `;
    const values = [
        attempt.userId,
        attempt.questionId,
        attempt.answer,
        attempt.isCorrect ? 1 : 0
    ];
    try {
        const [resultSet] = await db.executeSql(insertQuery, values);
        return resultSet.insertId;
    } catch (error) {
        console.error('Error inserting attempt:', error);
        throw new Error('Failed to insert attempt');
    }
}


export async function updateAttempt(db: SQLiteDatabase, attempt: Attempt): Promise<number> {
    if (!attempt.attemptId) {
        throw new Error('Attempt ID is required for update');
    }
    const updateQuery = `
            UPDATE attempt
            SET userId=?, questionId=?, answer=?, isCorrect=?, updatedAt=CURRENT_TIMESTAMP
            WHERE attemptId=?
        `;
    const values = [
        attempt.userId,
        attempt.questionId,
        attempt.answer,
        attempt.isCorrect ? 1 : 0,
        attempt.attemptId
    ];
    try {
        const [resultSet] = await db.executeSql(updateQuery, values);
        return resultSet.rowsAffected;
    } catch (error) {
        console.error('Error updating attempt:', error);
        throw new Error('Failed to update attempt');
    }
}

export async function deleteAttempt(db: SQLiteDatabase, attemptId: number): Promise<number> {
    const deleteQuery = `
            DELETE FROM attempt
            WHERE attemptId = ?
        `;
    const values = [attemptId];
    try {
        const [resultSet] = await db.executeSql(deleteQuery, values);
        return resultSet.rowsAffected;
    } catch (error) {
        console.error('Error deleting attempt:', error);
        throw new Error('Failed to delete attempt');
    }
}

export async function getAttemptById(db: SQLiteDatabase, attemptId: number): Promise<Attempt | null> {
    const query = `
            SELECT * FROM attempt
            WHERE attemptId = ?
        `;
    const values = [attemptId];
    try {
        const [resultSet] = await db.executeSql(query, values);
        if (resultSet.rows.length > 0) {
            const attemptData = resultSet.rows.item(0);
            return {
                attemptId: attemptData.attemptId,
                userId: attemptData.userId,
                questionId: attemptData.questionId,
                answer: attemptData.answer,
                isCorrect: attemptData.isCorrect === 1,
                createdAt: attemptData.createdAt,
                updatedAt: attemptData.updatedAt,
            };
        } else {
            return null;
        }
    } catch (error) {
        console.error('Error fetching attempt by ID:', error);
        throw new Error('Failed to fetch attempt by ID');
    }
}

export async function getAttemptsByUserId(db: SQLiteDatabase, userId: number): Promise<Attempt[]> {
    const query = `
            SELECT * FROM attempt
            WHERE userId = ?
        `;
    const values = [userId];
    try {
        const [resultSet] = await db.executeSql(query, values);
        const attempts: Attempt[] = [];
        for (let i = 0; i < resultSet.rows.length; i++) {
            const attemptData = resultSet.rows.item(i);
            const attempt: Attempt = {
                attemptId: attemptData.attemptId,
                userId: attemptData.userId,
                questionId: attemptData.questionId,
                answer: attemptData.answer,
                isCorrect: attemptData.isCorrect === 1,
                createdAt: attemptData.createdAt,
                updatedAt: attemptData.updatedAt,
            };
            attempts.push(attempt);
        }
        return attempts;
    } catch (error) {
        console.error('Error fetching attempts by userId:', error);
        throw new Error('Failed to fetch attempts by userId');
    }
}



export async function getAttemptsByUserIdAndQuestionId(db: SQLiteDatabase, userId: number, questionId: number): Promise<Attempt | null> {
    const query = `
            SELECT * FROM attempt
            WHERE userId = ? And  questionId =?

        `;
    const values = [userId, questionId];
    try {
        const [resultSet] = await db.executeSql(query, values);
        if (resultSet.rows.length > 0) {
            const attemptData = resultSet.rows.item(0);
            return {
                attemptId: attemptData.attemptId,
                userId: attemptData.userId,
                questionId: attemptData.questionId,
                answer: attemptData.answer,
                isCorrect: attemptData.isCorrect === 1,
                createdAt: attemptData.createdAt,
                updatedAt: attemptData.updatedAt,
            };
        } else {
            return null;
        }
    }catch (error) {
        console.error('Error fetching attempts by userId And questionId:', error);
        throw new Error('Failed to fetch attempts by userId And questionId');
    }
}
export async function getAllAttempts(db: SQLiteDatabase,): Promise<Attempt[]> {
    const query = `
            SELECT * FROM attempt
        `;
    try {
        const [resultSet] = await db.executeSql(query);
        const attempts: Attempt[] = [];
        for (let i = 0; i < resultSet.rows.length; i++) {
            const attemptData = resultSet.rows.item(i);
            const attempt: Attempt = {
                attemptId: attemptData.attemptId,
                userId: attemptData.userId,
                questionId: attemptData.questionId,
                answer: attemptData.answer,
                isCorrect: attemptData.isCorrect === 1,
                createdAt: attemptData.createdAt,
                updatedAt: attemptData.updatedAt,
            };
            attempts.push(attempt);
        }
        return attempts;
    } catch (error) {
        console.error('Error fetching all attempts:', error);
        throw new Error('Failed to fetch all attempts');
    }
}



export const deleteAllAttempts = async (db: SQLiteDatabase): Promise<number> => {
    const deleteQuery = `
            DELETE FROM attempt;
        `;
    try {
        const [resultSet] = await db.executeSql(deleteQuery);
        return resultSet.rowsAffected;
    } catch (error) {
        console.error('Error deleting data:', error);
        throw new Error('Failed to delete data from attempts table');
    }
};
