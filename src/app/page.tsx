"use client";

import { useMemo, useState } from "react";
import TransactionForm from "@/components/TransactionForm";
import TransactionList from "@/components/TransactionList";
import SummaryCards from "@/components/SummaryCards";
import { useTransactions } from "@/lib/useTransactions";

function currentMonth() {
  return new Date().toISOString().slice(0, 7); // YYYY-MM
}

export default function Home() {
  const { transactions, addTransaction, removeTransaction, loaded } =
    useTransactions();
  const [month, setMonth] = useState(currentMonth());

  const filtered = useMemo(
    () => transactions.filter((t) => t.date.startsWith(month)),
    [transactions, month]
  );

  const { income, expense } = useMemo(() => {
    return filtered.reduce(
      (acc, t) => {
        if (t.type === "income") acc.income += t.amount;
        else acc.expense += t.amount;
        return acc;
      },
      { income: 0, expense: 0 }
    );
  }, [filtered]);

  return (
    <div className="mx-auto w-full max-w-md px-4 py-8 flex flex-col gap-6">
      <header className="flex items-center justify-between">
        <h1 className="text-xl font-bold">간단 가계부</h1>
        <input
          type="month"
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          className="rounded-md border border-black/10 dark:border-white/15 bg-transparent px-2 py-1 text-sm"
        />
      </header>

      <SummaryCards income={income} expense={expense} />

      <TransactionForm onAdd={addTransaction} />

      <section>
        <h2 className="text-sm font-medium text-black/60 dark:text-white/60 mb-1">
          내역
        </h2>
        {loaded && (
          <TransactionList transactions={filtered} onRemove={removeTransaction} />
        )}
      </section>
    </div>
  );
}
