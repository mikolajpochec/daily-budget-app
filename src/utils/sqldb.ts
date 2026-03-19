import Expense from '../types/expense';
import * as SQLite from 'expo-sqlite';

var db;
var sql;

function getLocalDateString(date: Date) {
	return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
}

export async function initDB() {
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

export async function getPeriodSpendingData(startDate: Date, endDate: Date) {

	const query = `
	SELECT
	SUM(amount) FILTER (WHERE createdAt >= $2 AND createdAt < $3)   AS spentYesterday,
	SUM(amount) FILTER (WHERE createdAt < $3)                   	AS spentBeforeToday,
	SUM(amount) FILTER (WHERE createdAt >= $3)                      AS spentToday
	FROM expenses WHERE createdAt >= $1 AND createdAt <= $2  
	`
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
