import { supabase } from '@/lib/supabase';
import { Customer } from '@/types';

export const crmService = {
  async createCustomer(
    businessId: string,
    name: string,
    email?: string,
    phone?: string
  ) {
    const { data, error } = await supabase
      .from('customers')
      .insert([
        {
          business_id: businessId,
          name,
          email,
          phone,
          total_purchased: 0,
          total_transactions: 0,
        },
      ])
      .select();

    if (error) throw error;
    return data?.[0];
  },

  async getCustomers(businessId: string) {
    const { data, error } = await supabase
      .from('customers')
      .select('*')
      .eq('business_id', businessId)
      .order('total_purchased', { ascending: false });

    if (error) throw error;
    return data;
  },

  async getCustomerById(id: string): Promise<Customer | null> {
    const { data, error } = await supabase
      .from('customers')
      .select('*')
      .eq('id', id)
      .single();

    if (error) return null;
    return data;
  },

  async updateCustomer(id: string, updates: Partial<Customer>) {
    const { error } = await supabase
      .from('customers')
      .update(updates)
      .eq('id', id);

    if (error) throw error;
  },

  async deleteCustomer(id: string) {
    const { error } = await supabase
      .from('customers')
      .delete()
      .eq('id', id);

    if (error) throw error;
  },

  async recordCustomerTransaction(
    customerId: string,
    amount: number,
    _transactionId: string
  ) {
    const customer = await this.getCustomerById(customerId);
    if (!customer) throw new Error('Customer not found');

    await this.updateCustomer(customerId, {
      total_purchased: customer.total_purchased + amount,
      total_transactions: customer.total_transactions + 1,
      last_transaction_date: new Date().toISOString(),
    });
  },

  async getCustomerHistory(customerId: string) {
    const { data, error } = await supabase
      .from('customer_transactions')
      .select('*')
      .eq('customer_id', customerId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  },

  async getTopCustomers(businessId: string, limit = 10) {
    const { data, error } = await supabase
      .from('customers')
      .select('*')
      .eq('business_id', businessId)
      .order('total_purchased', { ascending: false })
      .limit(limit);

    if (error) throw error;
    return data;
  },

  async searchCustomers(businessId: string, query: string) {
    const { data, error } = await supabase
      .from('customers')
      .select('*')
      .eq('business_id', businessId)
      .or(`name.ilike.%${query}%,email.ilike.%${query}%,phone.ilike.%${query}%`);

    if (error) throw error;
    return data;
  },

  async getCustomerMetrics(businessId: string) {
    const { data, error } = await supabase
      .from('customers')
      .select('total_purchased, total_transactions')
      .eq('business_id', businessId);

    if (error) throw error;

    const customers = data || [];
    const totalCustomers = customers.length;
    const avgPurchaseValue = totalCustomers > 0
      ? customers.reduce((sum: number, c: any) => sum + c.total_purchased, 0) / totalCustomers
      : 0;

    return {
      totalCustomers,
      avgPurchaseValue,
      totalRevenue: customers.reduce((sum: number, c: any) => sum + c.total_purchased, 0),
    };
  },
};
