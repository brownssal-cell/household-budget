"use client";

import { useEffect, useState } from "react";
import { supabase } from "./supabase";
import { Transaction } from "./types";

export function useTransactions() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let active = true;
    (async () => {
      const { data, error } = await supabase
        .from("transactions")
        .select("id, date, type, category, amount, memo")
        .order("date", { ascending: false })
        .order("created_at", { ascending: false });

      if (!active) return;
      if (error) {
        console.error("거래 내역을 불러오지 못했습니다:", error.message);
      } else if (data) {
        setTransactions(data as Transaction[]);
      }
      setLoaded(true);
    })();

    return () => {
      active = false;
    };
  }, []);

  const addTransaction = async (t: Omit<Transaction, "id">) => {
    const { data, error } = await supabase
      .from("transactions")
      .insert(t)
      .select("id, date, type, category, amount, memo")
      .single();

    if (error) {
      console.error("저장에 실패했습니다:", error.message);
      return;
    }
    if (data) {
      setTransactions((prev) => [data as Transaction, ...prev]);
    }
  };

  const removeTransaction = async (id: string) => {
    const prev = transactions;
    setTransactions((cur) => cur.filter((t) => t.id !== id));

    const { error } = await supabase.from("transactions").delete().eq("id", id);
    if (error) {
      console.error("삭제에 실패했습니다:", error.message);
      setTransactions(prev); // 실패 시 롤백
    }
  };

  return { transactions, addTransaction, removeTransaction, loaded };
}
