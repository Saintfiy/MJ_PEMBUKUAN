import { supabase } from '@/lib/supabase';
import { Transaction } from '@/types';

export const transactionService = {
  async createTransaction(
    businessId: string,
    type: 'income' | 'expense',
    category: string,
    amount: number,
    description: string,
    paymentMethod: string,
    createdBy: string,
    date = new Date().toISOString()
  ) {
    const { data, error } = await supabase
      .from('transactions')
      .insert([
        {
          business_id: businessId,
          type,
          category,
          amount,
          description,
          payment_method: paymentMethod,
          created_by: createdBy,
          date,
          synced_with_payment: false,
        },
      ])
      .select();

    if (error) throw error;
    return data?.[0];
  },

  async getTransactions(businessId: string, filters?: any) {
    let query = supabase
      .from('transactions')
      .select('*')
      .eq('business_id', businessId);

    if (filters?.type) query = query.eq('type', filters.type);
    if (filters?.category) query = query.eq('category', filters.category);
    if (filters?.dateFrom)
      query = query.gte('date', filters.dateFrom);
    if (filters?.dateTo) query = query.lte('date', filters.dateTo);

    const { data, error } = await query.order('date', { ascending: false });
    if (error) throw error;
    return data;
  },

  async getTransactionById(id: string): Promise<Transaction | null> {
    const { data, error } = await supabase
      .from('transactions')
      .select('*')
      .eq('id', id)
      .single();

    if (error) return null;
    return data;
  },

  async updateTransaction(id: string, updates: Partial<Transaction>) {
    const { error } = await supabase
      .from('transactions')
      .update(updates)
      .eq('id', id);

    if (error) throw error;
  },

  async deleteTransaction(id: string) {
    const { error } = await supabase
      .from('transactions')
      .delete()
      .eq('id', id);

    if (error) throw error;
  },

  async getTransactionSummary(businessId: string, _period: 'day' | 'week' | 'month' | 'year') {
    const { data, error } = await supabase
      .from('transactions')
      .select('type, amount')
      .eq('business_id', businessId);

    if (error) throw error;

    const summary = {
      totalIncome: 0,
      totalExpense: 0,
      profit: 0,
    };

    data?.forEach((tx: any) => {
      if (tx.type === 'income') {
        summary.totalIncome += tx.amount;
      } else {
        summary.totalExpense += tx.amount;
      }
    });

    summary.profit = summary.totalIncome - summary.totalExpense;
    return summary;
  },

  async syncWithPaymentGateway(transactionId: string, paymentGatewayRef: string) {
    const { error } = await supabase
      .from('transactions')
      .update({
        synced_with_payment: true,
        reference_number: paymentGatewayRef,
      })
      .eq('id', transactionId);

    if (error) throw error;
  },

  async uploadReceipt(transactionId: string, file: File) {
    const fileName = `receipts/${transactionId}/${Date.now()}`;
    const { error } = await supabase.storage
      .from('receipts')
      .upload(fileName, file);

    if (error) throw error;

    const { data } = supabase.storage
      .from('receipts')
      .getPublicUrl(fileName);

    await this.updateTransaction(transactionId, {
      receipt_url: data.publicUrl,
    });

    return data.publicUrl;
  },
};
