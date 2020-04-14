import Transaction from '../models/Transaction';

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const income = this.transactions
      .map(transaction =>
        transaction.type === 'income' ? transaction.value : 0,
      )
      .reduce((total, currentValue) => total + currentValue, 0);

    const outcome = this.transactions
      .map(transaction =>
        transaction.type === 'outcome' ? transaction.value : 0,
      )
      .reduce((total, currentValue) => total + currentValue, 0);

    // const incomeMap = this.transactions.map(transaction =>
    //   transaction.type === 'income' ? transaction.value : 0,
    // );

    // if (incomeMap.length !== 0) {
    //   income = incomeMap.reduce((total, currentValue) => total + currentValue);
    // } else {
    //   income = 0;
    // }

    // const outcomeMap = this.transactions.map(transaction =>
    //   transaction.type === 'outcome' ? transaction.value : 0,
    // );

    // if (outcomeMap.length !== 0) {
    //   outcome = outcomeMap.reduce(
    //     (total, currentValue) => total + currentValue,
    //   );
    // } else {
    //   outcome = 0;
    // }

    const total = income - outcome;

    return { income, outcome, total };
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
