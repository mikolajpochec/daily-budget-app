import Expense from '../types/expense';
import getLocalDateString from '../utils/getLocalDateString';
import * as SQLite from 'expo-sqlite';

const FULL_DAY_MS = 86_400_000;

let dbPromise: Promise<SQLite.SQLiteDatabase> | null = null;

export async function initDB(): Promise<SQLite.SQLiteDatabase> {
	if (!dbPromise) {
		dbPromise = (async () => {
			const instance = await SQLite.openDatabaseAsync('transactions.db');
			await instance.execAsync(`CREATE TABLE IF NOT EXISTS expenses (
				id          INTEGER PRIMARY KEY AUTOINCREMENT,
				amount      REAL NOT NULL CHECK (amount > 0),
				category    TEXT NOT NULL,
				description TEXT,
				createdAt   INTEGER,
				localDate   TEXT
			);`);
			return instance;
		})();
	}
	return dbPromise;
}

export async function getExpensesFromPeriod(startDate: Date, endDate: Date): Promise<Expense[]> {
	const db = await initDB();
	const start = new Date(getLocalDateString(startDate)).getTime();
	const end = new Date(getLocalDateString(endDate)).getTime() + FULL_DAY_MS - 1;
	return db.getAllAsync<Expense>(
		`SELECT * FROM expenses WHERE createdAt >= ? AND createdAt <= ? ORDER BY createdAt ASC`,
		[start, end]
	);
}

export async function getPeriodSpendingData(startDate: Date, endDate: Date) {
	const db = await initDB();
	const start = new Date(getLocalDateString(startDate)).getTime();
	const end = new Date(getLocalDateString(endDate)).getTime() + FULL_DAY_MS - 1;
	const now = new Date();
	const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
	const startOfYesterday = startOfToday - FULL_DAY_MS;
	const result = await db.getFirstAsync<{
		spentYesterday: number | null;
		spentInPeriod:  number | null;
		spentToday:     number | null;
	}>(`
	   SELECT
	   SUM(amount) FILTER (WHERE createdAt >= ? AND createdAt < ?)  AS spentYesterday,
	   SUM(amount) FILTER (WHERE createdAt >= ? AND createdAt <= ?) AS spentInPeriod,
	   SUM(amount) FILTER (WHERE createdAt >= ?)                    AS spentToday
	   FROM expenses
	   WHERE createdAt >= ? AND createdAt <= ?
	`, [startOfYesterday, startOfToday, start, end, startOfToday, start, end]);
	return {
		spentYesterday: result?.spentYesterday ?? 0,
		spentInPeriod:  result?.spentInPeriod  ?? 0,
		spentToday:     result?.spentToday     ?? 0,
	};
}

export async function getDailyExpenses(date: Date): Promise<Expense[]> {
	const db = await initDB();
	const localDate = getLocalDateString(date);
	return db.getAllAsync<Expense>(
		`SELECT * FROM expenses WHERE localDate = ?`,
		[localDate]
	);
}

export async function removeExpense(id: number): Promise<boolean> {
	const db = await initDB();
	const result = await db.runAsync(`DELETE FROM expenses WHERE id = ?`, [id]);
	return result.changes > 0;
}

export async function removeAllExpenses(): Promise<void> {
	const db = await initDB();
	await db.runAsync('DELETE FROM expenses');
}

export async function addExpense(
	amount: number,
	category: string,
	description?: string,
	date?: Date
): Promise<Expense> {
	const db = await initDB();
	const now = date ?? new Date();
	const createdAt = now.getTime();
	const localDate = getLocalDateString(now);
	const statement = await db.prepareAsync(
		`INSERT INTO expenses (amount, category, description, createdAt, localDate)
		VALUES ($amount, $category, $description, $createdAt, $localDate)`
	);
	try {
		const result = await statement.executeAsync({
			$amount: amount,
			$category: category,
			$description: description || null,
			$createdAt: createdAt,
			$localDate: localDate,
		});
		return {
			id: result.lastInsertRowId,
			amount,
			category,
			description,
			createdAt,
			localDate,
		};
	} finally {
		await statement.finalizeAsync();
	}
}
