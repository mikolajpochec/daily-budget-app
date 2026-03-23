import * as formulas from '../src/utils/formulas';
import { calculateDailyBudget } from '../src/utils/formulas';
import Expense from '../src/types/expense';

const MONTHLY_BUDGET = 310;
const START_DATE = new Date(2026, 2, 1); // March 1

function makeExpense(localDate: string, amount: number): Expense {
	const [year, month, day] = localDate.split('-').map(Number);
	return {
		id: Math.random(),
		amount,
		category: 'food',
		createdAt: new Date(year, month - 1, day).getTime(),
		localDate,
	};
}

describe('calculateDailyBudget — subtract strategy', () => {
	// BASE = 310 / 31 = 10

	test('no expenses — returns base on day 1', () => {
		const ref = new Date(2026, 2, 1);
		const result = calculateDailyBudget(MONTHLY_BUDGET, START_DATE, [], 'subtract', ref);
		expect(result).toBeCloseTo(10, 1);
	});

	test('underspent yesterday — carries over surplus', () => {
		const expenses = [makeExpense('2026-03-01', 5)];
		const ref = new Date(2026, 2, 2);
		const result = calculateDailyBudget(MONTHLY_BUDGET, START_DATE, expenses, 'subtract', ref);
		expect(result).toBeCloseTo(15, 1);
	});

	test('overspent yesterday — deducts from today', () => {
		const expenses = [makeExpense('2026-03-01', 15)];
		const ref = new Date(2026, 2, 2);
		const result = calculateDailyBudget(MONTHLY_BUDGET, START_DATE, expenses, 'subtract', ref);
		expect(result).toBeCloseTo(5, 1);
	});

	test('exact spend — next day is base', () => {
		const expenses = [makeExpense('2026-03-01', 10)];
		const ref = new Date(2026, 2, 2);
		const result = calculateDailyBudget(MONTHLY_BUDGET, START_DATE, expenses, 'subtract', ref);
		expect(result).toBeCloseTo(10, 1);
	});

	test('multiple days carry over correctly', () => {
		const expenses = [
			makeExpense('2026-03-01', 5),
			makeExpense('2026-03-02', 5),
			makeExpense('2026-03-03', 20),
			makeExpense('2026-03-04', 15),
			makeExpense('2026-03-05', 0),
		];
		const ref = new Date(2026, 2, 6);
		const result = calculateDailyBudget(MONTHLY_BUDGET, START_DATE, expenses, 'subtract', ref);
		expect(result).toBeCloseTo(15, 1);
	});

	test('no expenses across multiple days — all surplus accumulates', () => {
		const ref = new Date(2026, 2, 6);
		const result = calculateDailyBudget(MONTHLY_BUDGET, START_DATE, [], 'subtract', ref);
		expect(result).toBeCloseTo(60, 1);
	});
});

describe('calculateDailyBudget — recalculate strategy', () => {
	test('no expenses — returns base on day 1', () => {
		const ref = new Date(2026, 2, 1);
		const result = calculateDailyBudget(MONTHLY_BUDGET, START_DATE, [], 'recalculate', ref);
		expect(result).toBeGreaterThan(0);
	});

	test('underspending redistributes remaining budget', () => {
		const expenses = [makeExpense('2026-03-01', 5)];
		const ref = new Date(2026, 2, 2);
		const result = calculateDailyBudget(MONTHLY_BUDGET, START_DATE, expenses, 'recalculate', ref);
		const daysRemaining = formulas.daysLeft(START_DATE.getDate());
		expect(result).toBeCloseTo((MONTHLY_BUDGET - 5) / daysRemaining, 1);
	});

	test('overspending reduces future daily budget', () => {
		const expenses = [makeExpense('2026-03-01', 50)];
		const ref = new Date(2026, 2, 2);
		const result = calculateDailyBudget(MONTHLY_BUDGET, START_DATE, expenses, 'recalculate', ref);
		const daysRemaining = formulas.daysLeft(START_DATE.getDate());
		expect(result).toBeCloseTo((MONTHLY_BUDGET - 50) / daysRemaining, 1);
	});

	test('never returns negative', () => {
		const expenses = [makeExpense('2026-03-01', 9999)];
		const ref = new Date(2026, 2, 2);
		const result = calculateDailyBudget(MONTHLY_BUDGET, START_DATE, expenses, 'recalculate', ref);
		expect(result).toBeGreaterThanOrEqual(0);
	});
});
