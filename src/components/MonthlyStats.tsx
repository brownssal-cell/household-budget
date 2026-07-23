import { useMemo } from "react";
import { Transaction } from "@/lib/types";

const formatWon = (n: number) => `${n.toLocaleString("ko-KR")}원`;

function monthLabel(ym: string) {
  const [y, m] = ym.split("-");
  return `${y}년 ${Number(m)}월`;
}

function Bar({
  label,
  value,
  max,
  color,
}: {
  label: string;
  value: number;
  max: number;
  color: string;
}) {
  const pct = max > 0 ? Math.round((value / max) * 100) : 0;
  return (
    <div className="flex items-center gap-2 text-xs">
      <span className="w-8 shrink-0 text-black/60 dark:text-white/60">
        {label}
      </span>
      <div className="h-2.5 flex-1 rounded-full bg-black/5 dark:bg-white/10">
        <div
          className={`h-full rounded-full ${color}`}
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="w-24 shrink-0 text-right tabular-nums">
        {formatWon(value)}
      </span>
    </div>
  );
}

export default function MonthlyStats({
  transactions,
}: {
  transactions: Transaction[];
}) {
  const stats = useMemo(() => {
    const map = new Map<string, { income: number; expense: number }>();
    for (const t of transactions) {
      const ym = t.date.slice(0, 7); // YYYY-MM
      if (ym.length !== 7) continue;
      const cur = map.get(ym) ?? { income: 0, expense: 0 };
      if (t.type === "income") cur.income += t.amount;
      else cur.expense += t.amount;
      map.set(ym, cur);
    }
    return [...map.entries()]
      .map(([month, v]) => ({ month, ...v, balance: v.income - v.expense }))
      .sort((a, b) => b.month.localeCompare(a.month));
  }, [transactions]);

  const max = useMemo(
    () => Math.max(1, ...stats.map((s) => Math.max(s.income, s.expense))),
    [stats]
  );

  if (stats.length === 0) {
    return (
      <p className="text-center text-sm text-black/50 dark:text-white/50 py-10">
        통계로 보여줄 내역이 없어요.
      </p>
    );
  }

  return (
    <ul className="flex flex-col gap-4">
      {stats.map((s) => (
        <li
          key={s.month}
          className="rounded-xl border border-black/10 dark:border-white/15 p-3"
        >
          <div className="mb-2 flex items-center justify-between">
            <span className="text-sm font-medium">{monthLabel(s.month)}</span>
            <span
              className={`text-sm font-semibold ${
                s.balance < 0 ? "text-red-500 dark:text-red-400" : ""
              }`}
            >
              잔액 {formatWon(s.balance)}
            </span>
          </div>
          <div className="space-y-1.5">
            <Bar label="수입" value={s.income} max={max} color="bg-blue-500" />
            <Bar label="지출" value={s.expense} max={max} color="bg-red-500" />
          </div>
        </li>
      ))}
    </ul>
  );
}
