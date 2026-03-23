import Expense from '../types/expense';
import getLocalDateString from '../utils/getLocalDateString';

export function daysBetween(date1: Date, date2: Date): number {
	const toMidnight = (d: Date) =>
	Date.UTC(d.getFullYear(), d.getMonth(), d.getDate());

	const diffMs = Math.abs(toMidnight(date2) - toMidnight(date1));
	return diffMs / (1000 * 60 * 60 * 24);
}

export function daysLeft(startDay: number): number {
	const now = new Date();
	const currentDay = now.getDate();

	const month = startDay <= currentDay ? now.getMonth() + 1 : now.getMonth();
	const next = new Date(now.getFullYear(), month, startDay);

	return daysBetween(now, next);
}

export function getCurrentPeriodStart(startDay: number): Date {
	const now = new Date();
	const currentDay = now.getDate();

	const month = startDay > currentDay ? now.getMonth() - 1 : now.getMonth();
	return new Date(now.getFullYear(), month, startDay);
}

export function calculateDailyBudget(
	monthlyBudget: number,
	startDate: Date,
	expensesInCurrentPeriod: Expense[],
	strategy: 'subtract' | 'recalculate',
	referenceDate: Date = new Date()
): number  {
	const todayMidnight = new Date(getLocalDateString(referenceDate));
	const endDate = new Date(startDate.getFullYear(), startDate.getMonth() + 1, startDate.getDate());
	const base = monthlyBudget / daysBetween(startDate, endDate);

	if (strategy === 'recalculate') {
		const spentBeforeToday = expensesInCurrentPeriod
		.filter(e => e.createdAt < todayMidnight.getTime())
		.reduce((sum, e) => sum + e.amount, 0);
		return Math.max(0, (monthlyBudget - spentBeforeToday) / daysLeft(startDate.getDate()));
	}

	const expensesByDay = new Map<string, number>();
	for (const expense of expensesInCurrentPeriod) {
		expensesByDay.set(
			expense.localDate, 
			(expensesByDay.get(expense.localDate) ?? 0) + expense.amount
		);
	}

	const day = new Date(getLocalDateString(startDate));
	let budget = base;
	while (day.getTime() < todayMidnight.getTime()) {
		const spent = expensesByDay.get(getLocalDateString(day)) ?? 0;
		budget = base + (budget - spent);
		day.setDate(day.getDate() + 1);
	}

	return budget;
}

export function round2(n: number) {
	return parseFloat(n?.toFixed(2));
}
