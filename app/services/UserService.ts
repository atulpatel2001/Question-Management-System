/**
 * User Service And perfrom usertable crud
 */

import { SQLiteDatabase } from "react-native-sqlite-storage"
import { User } from "../model/User";

/**
 * Add User in db 
 * @param db 
 * @param user 
 * @returns 
 */
export const addUser = async (db: SQLiteDatabase, user: User): Promise<number> => {
    const insertQuery = `
        INSERT INTO users (username, password, name, role, createdAt, updatedAt)
        VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
    `;
    const values = [
        user.username,
        user.password,
        user.name ?? '',
        user.role ?? 'user',
    ];
    try {
        const [resultSet] = await db.executeSql(insertQuery, values);
        return resultSet.insertId;
    } catch (error) {
        console.error(error);
        throw new Error("Failed to add user");
    }
};




/**
 * Update user in db
 * @param db 
 * @param user 
 * @returns 
 */
export const updateUser = async (db: SQLiteDatabase, user: User): Promise<number> => {
    const updateQuery = `
        UPDATE users
        SET username=?, password=?, name=?, updatedAt=CURRENT_TIMESTAMP
        WHERE userId = ?
    `;
    const values = [
        user.username,
        user.password,
        user.name,
        user.userId,
    ];
    try {
        const [resultSet] = await db.executeSql(updateQuery, values);
        return resultSet.rowsAffected;
    } catch (error) {
        console.error(error);
        throw new Error("Failed to update user");
    }
};


/**
 * Delete user 
 * @param db 
 * @param userId 
 * @returns 
 */
export const deleteUser = async (db: SQLiteDatabase, userId: number): Promise<number> => {
    const deleteQuery = `
        DELETE FROM users
        WHERE userId = ?
    `;
    const values = [userId];
    try {
        const [resultSet] = await db.executeSql(deleteQuery, values);
        return resultSet.rowsAffected;
    } catch (error) {
        console.error(error);
        throw new Error("Failed to delete user");
    }
};



/**
 * get user by username and pasword
 * @param db 
 * @param username 
 * @param password 
 * @returns 
 */
export const findByUsernameAndPassword = async (db: SQLiteDatabase, username: string, password: string): Promise<User | null> => {
    const query = `
        SELECT * FROM users
        WHERE username = ? AND password = ?
    `;
    const values = [username, password];
    try {
        const [resultSet] = await db.executeSql(query, values);
        if (resultSet.rows.length > 0) {
            const userData = resultSet.rows.item(0);
            const user: User = {
                userId: userData.userId,
                username: userData.username,
                password: userData.password,
                name: userData.name,
                role: userData.role,
                createdAt: userData.createdAt,
                updatedAt: userData.updatedAt,
            };
            return user;
        } else {
            return null;
        }
    } catch (error) {
        console.error(error);
        throw new Error("Failed to find user by username and password");
    }
};


/**
 * Find by username
 * @param db 
 * @param username 
 * @returns 
 */
export const findByUsername = async (db: SQLiteDatabase, username: string): Promise<User | null> => {
    const query = `
        SELECT * FROM users
        WHERE username = ?
    `;
    const values = [username];
    try {
        const [resultSet] = await db.executeSql(query, values);
        if (resultSet.rows.length > 0) {
            const userData = resultSet.rows.item(0);
            const user: User = {
                userId: userData.userId,
                username: userData.username,
                password: userData.password,
                name: userData.name,
                role: userData.role,
                createdAt: userData.createdAt,
                updatedAt: userData.updatedAt,
            };
            return user;
        } else {
            return null; 
        }
    } catch (error) {
        console.error("Error in findByUsername:", error); // Log the error for debugging
        throw new Error("Failed to find user by username");
    }
};



/**
 * user find by userid
 * @param db 
 * @param userId 
 * @returns 
 */
export const findById = async (db: SQLiteDatabase, userId: number): Promise<User | null> => {
    const query = `
        SELECT * FROM users
        WHERE userId = ?
    `;
    const values = [userId];
    try {
        const [resultSet] = await db.executeSql(query, values);
        if (resultSet.rows.length > 0) {
            const userData = resultSet.rows.item(0);
            const user: User = {
                userId: userData.userId,
                username: userData.username,
                password: userData.password,
                name: userData.name,
                role: userData.role,
                createdAt: userData.createdAt,
                updatedAt: userData.updatedAt,
            };
            return user;
        } else {
            return null;
        }
    } catch (error) {
        console.error(error);
        throw new Error("Failed to find user by ID");
    }
};


/**
 * 
 * @param db Find All User
 * @returns 
 */
export const findAllUsers = async (db: SQLiteDatabase): Promise<User[]> => {
    const query = `
        SELECT * FROM users WHERE role = 'ROLE_USER' ORDER BY userId ASC;
    `;
    try {
        const [resultSet] = await db.executeSql(query);
        const users: User[] = [];
        for (let i = 0; i < resultSet.rows.length; i++) {
            const userData = resultSet.rows.item(i);
            const user: User = {
                userId: userData.userId,
                username: userData.username,
                password: userData.password,
                name: userData.name,
                role: userData.role,
                createdAt: userData.createdAt,
                updatedAt: userData.updatedAt,
            };
            users.push(user);
        }
        return users;
    } catch (error) {
        console.error(error);
        throw new Error("Failed to get all users");
    }
};
