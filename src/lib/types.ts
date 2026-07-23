export type TransactionType = "income" | "expense";

export interface Transaction {
  id: string;
  date: string; // YYYY-MM-DD
  type: TransactionType;
  category: string;
  amount: number;
  memo: string;
}

export const INCOME_CATEGORIES = ["급여", "용돈", "부수입", "기타"] as const;
export const EXPENSE_CATEGORIES = [
  "식비",
  "교통",
  "주거",
  "쇼핑",
  "의료",
  "문화/여가",
  "기타",
] as const;
