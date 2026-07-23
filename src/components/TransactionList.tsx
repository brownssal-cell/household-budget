import { Transaction } from "@/lib/types";

const formatWon = (n: number) => `${n.toLocaleString("ko-KR")}원`;

export default function TransactionList({
  transactions,
  onRemove,
}: {
  transactions: Transaction[];
  onRemove: (id: string) => void;
}) {
  if (transactions.length === 0) {
    return (
      <p className="text-center text-sm text-black/50 dark:text-white/50 py-10">
        아직 내역이 없어요. 위에서 추가해보세요.
      </p>
    );
  }

  return (
    <ul className="divide-y divide-black/10 dark:divide-white/15">
      {transactions.map((t) => (
        <li key={t.id} className="flex items-center justify-between py-3 gap-3">
          <div className="min-w-0">
            <div className="flex items-center gap-2 text-sm">
              <span className="text-black/50 dark:text-white/50">{t.date}</span>
              <span className="rounded-full bg-black/5 dark:bg-white/10 px-2 py-0.5 text-xs">
                {t.category}
              </span>
            </div>
            {t.memo && (
              <p className="text-sm text-black/60 dark:text-white/60 truncate mt-0.5">
                {t.memo}
              </p>
            )}
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <span
              className={`font-medium text-sm ${
                t.type === "income"
                  ? "text-blue-600 dark:text-blue-400"
                  : "text-red-500 dark:text-red-400"
              }`}
            >
              {t.type === "income" ? "+" : "-"}
              {formatWon(t.amount)}
            </span>
            <button
              onClick={() => onRemove(t.id)}
              aria-label="삭제"
              className="text-black/40 dark:text-white/40 hover:text-red-500 transition text-sm"
            >
              삭제
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
