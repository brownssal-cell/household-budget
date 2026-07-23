"use client";

import { useState } from "react";
import {
  EXPENSE_CATEGORIES,
  INCOME_CATEGORIES,
  Transaction,
  TransactionType,
} from "@/lib/types";

function today() {
  return new Date().toISOString().slice(0, 10);
}

export default function TransactionForm({
  onAdd,
}: {
  onAdd: (t: Omit<Transaction, "id">) => void;
}) {
  const [type, setType] = useState<TransactionType>("expense");
  const [date, setDate] = useState(today());
  const [category, setCategory] = useState<string>(EXPENSE_CATEGORIES[0]);
  const [amount, setAmount] = useState("");
  const [memo, setMemo] = useState("");

  const categories = type === "income" ? INCOME_CATEGORIES : EXPENSE_CATEGORIES;

  const handleTypeChange = (next: TransactionType) => {
    setType(next);
    setCategory(next === "income" ? INCOME_CATEGORIES[0] : EXPENSE_CATEGORIES[0]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const amountNum = Number(amount);
    if (!date || !amountNum || amountNum <= 0) return;

    onAdd({ date, type, category, amount: amountNum, memo: memo.trim() });
    setAmount("");
    setMemo("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-xl border border-black/10 dark:border-white/15 p-4 space-y-3"
    >
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => handleTypeChange("expense")}
          className={`flex-1 rounded-lg py-2 text-sm font-medium transition ${
            type === "expense"
              ? "bg-red-500 text-white"
              : "bg-black/5 dark:bg-white/10"
          }`}
        >
          지출
        </button>
        <button
          type="button"
          onClick={() => handleTypeChange("income")}
          className={`flex-1 rounded-lg py-2 text-sm font-medium transition ${
            type === "income"
              ? "bg-blue-500 text-white"
              : "bg-black/5 dark:bg-white/10"
          }`}
        >
          수입
        </button>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <label className="flex flex-col gap-1 text-sm">
          날짜
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            className="rounded-md border border-black/10 dark:border-white/15 bg-transparent px-2 py-1.5"
          />
        </label>

        <label className="flex flex-col gap-1 text-sm">
          카테고리
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="rounded-md border border-black/10 dark:border-white/15 bg-transparent px-2 py-1.5"
          >
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-1 text-sm">
          금액
          <input
            type="number"
            inputMode="numeric"
            min={1}
            placeholder="0"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
            className="rounded-md border border-black/10 dark:border-white/15 bg-transparent px-2 py-1.5"
          />
        </label>

        <label className="flex flex-col gap-1 text-sm">
          메모
          <input
            type="text"
            placeholder="선택"
            value={memo}
            onChange={(e) => setMemo(e.target.value)}
            className="rounded-md border border-black/10 dark:border-white/15 bg-transparent px-2 py-1.5"
          />
        </label>
      </div>

      <button
        type="submit"
        className="w-full rounded-lg bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 py-2 text-sm font-medium hover:opacity-90 transition"
      >
        추가하기
      </button>
    </form>
  );
}
