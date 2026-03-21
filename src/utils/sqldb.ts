import Expense from '../types/expense';
import getLocalDateString from '../utils/getLocalDateString';
import * as SQLite from 'expo-sqlite';

var db;
var sql;
const FULL_DAY_MS = 86_400_000;

export async function initDB() {
	if(!db) {
		db = await SQLite.openDatabaseAsync('transactions.db');
		sql = db.sql;
		await db.execAsync(`CREATE TABLE IF NOT EXISTS expenses (
			id          INTEGER PRIMARY KEY AUTOINCREMENT,
			amount      REAL NOT NULL CHECK (amount > 0),
			category    TEXT NOT NULL,
			description TEXT,
			createdAt   INTEGER,
			localDate   TEXT
		);`);
	}
}

export async function getExpensesFromPeriod(startDate: Date, endDate: Date): Promise<Expense[]> {
	const start = new Date(getLocalDateString(startDate)).getTime();
	const end = new Date(getLocalDateString(endDate)).getTime() + FULL_DAY_MS - 1;
	const result = await db.getAllAsync<Expense>(
		`SELECT * FROM expenses WHERE createdAt >= ? AND createdAt <= ? ORDER BY createdAt ASC`,
		[start, end]
	);
	return result;
}

export async function getPeriodSpendingData(startDate: Date, endDate: Date) {
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

export async function getDailyExpenses(date: Date) : Expense[] {
	const localDate = getLocalDateString(date);
	const result = 
		await sql<Expense>`SELECT * FROM expenses WHERE localDate=${localDate}`;
	return result;
}

export async function removeExpense(id: number) {
	const result = await db.runAsync(`DELETE FROM expenses WHERE id = ?`, [id]);
	return result.changes > 0;
}

export async function removeAllExpenses() {
	await db.runAsync('DELETE FROM expenses');
}

export async function addExpense(
	amount: number,
	category: string,
	description?: string
): Promise<Expense> {
	const now = new Date();
	const createdAt = now.getTime();
	const localDate = getLocalDateString(now);

	const statement = await db.prepareAsync(
		`INSERT INTO expenses (amount, category, description, createdAt, localDate)
		VALUES ($amount, $category, $description, $createdAt, $localDate)`);

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
