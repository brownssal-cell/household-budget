const formatWon = (n: number) => `${n.toLocaleString("ko-KR")}원`;

export default function SummaryCards({
  income,
  expense,
}: {
  income: number;
  expense: number;
}) {
  const balance = income - expense;

  return (
    <div className="grid grid-cols-3 gap-3">
      <div className="rounded-xl border border-black/10 dark:border-white/15 p-3">
        <p className="text-xs text-black/60 dark:text-white/60">수입</p>
        <p className="mt-1 font-semibold text-blue-600 dark:text-blue-400 text-sm sm:text-base">
          {formatWon(income)}
        </p>
      </div>
      <div className="rounded-xl border border-black/10 dark:border-white/15 p-3">
        <p className="text-xs text-black/60 dark:text-white/60">지출</p>
        <p className="mt-1 font-semibold text-red-500 dark:text-red-400 text-sm sm:text-base">
          {formatWon(expense)}
        </p>
      </div>
      <div className="rounded-xl border border-black/10 dark:border-white/15 p-3">
        <p className="text-xs text-black/60 dark:text-white/60">잔액</p>
        <p className="mt-1 font-semibold text-sm sm:text-base">
          {formatWon(balance)}
        </p>
      </div>
    </div>
  );
}
