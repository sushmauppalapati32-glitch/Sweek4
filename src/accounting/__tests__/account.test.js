const { Account } = require('../index');

describe('Account Management System - Unit Tests', () => {
  let account;

  beforeEach(() => {
    account = new Account();
  });

  test('TC001: Verify initial account balance', () => {
    expect(account.getBalance()).toBe(1000.00);
  });

  test('TC002: Credit account with positive amount', () => {
    const newBalance = account.credit(500.00);
    expect(newBalance).toBe(1500.00);
    expect(account.getBalance()).toBe(1500.00);
  });

  test('TC003: Debit account with sufficient funds', () => {
    account.credit(500.00); // balance = 1500
    const newBalance = account.debit(300.00);
    expect(newBalance).toBe(1200.00);
    expect(account.getBalance()).toBe(1200.00);
  });

  test('TC004: Debit account with insufficient funds', () => {
    expect(() => {
      account.debit(1500.00);
    }).toThrow('Insufficient funds for this debit.');
    expect(account.getBalance()).toBe(1000.00); // balance unchanged
  });

  test('TC005: Debit account with exact balance amount', () => {
    const newBalance = account.debit(1000.00);
    expect(newBalance).toBe(0.00);
    expect(account.getBalance()).toBe(0.00);
  });

  test('TC006: Multiple credit operations', () => {
    account.credit(100.00);
    expect(account.getBalance()).toBe(1100.00);
    account.credit(200.00);
    expect(account.getBalance()).toBe(1300.00);
  });

  test('TC007: Multiple debit operations', () => {
    account.credit(300.00); // balance = 1300
    account.debit(50.00);
    expect(account.getBalance()).toBe(1250.00);
    account.debit(75.00);
    expect(account.getBalance()).toBe(1175.00);
  });

  test('TC009: Zero amount credit', () => {
    const newBalance = account.credit(0.00);
    expect(newBalance).toBe(1000.00);
    expect(account.getBalance()).toBe(1000.00);
  });

  test('TC010: Zero amount debit', () => {
    const newBalance = account.debit(0.00);
    expect(newBalance).toBe(1000.00);
    expect(account.getBalance()).toBe(1000.00);
  });

  test('TC011: Negative amount credit', () => {
    const newBalance = account.credit(-50.00);
    expect(newBalance).toBe(950.00);
    expect(account.getBalance()).toBe(950.00);
  });

  test('TC012: Negative amount debit', () => {
    const newBalance = account.debit(-25.00);
    expect(newBalance).toBe(1025.00);
    expect(account.getBalance()).toBe(1025.00);
  });

  test('TC013: Large amount credit', () => {
    const newBalance = account.credit(999999.99);
    expect(newBalance).toBe(1000999.99);
    expect(account.getBalance()).toBe(1000999.99);
  });

  test('Invalid amount credit (non-number)', () => {
    expect(() => {
      account.credit('invalid');
    }).toThrow('Invalid amount');
    expect(account.getBalance()).toBe(1000.00);
  });

  test('Invalid amount debit (non-number)', () => {
    expect(() => {
      account.debit('invalid');
    }).toThrow('Invalid amount');
    expect(account.getBalance()).toBe(1000.00);
  });

  test('Custom initial balance', () => {
    const customAccount = new Account(500.00);
    expect(customAccount.getBalance()).toBe(500.00);
  });
});