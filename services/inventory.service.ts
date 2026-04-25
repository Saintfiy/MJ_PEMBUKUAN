import { supabase } from '@/lib/supabase';
import { InventoryItem } from '@/types';

export const inventoryService = {
  async createItem(
    businessId: string,
    name: string,
    sku: string,
    quantity: number,
    unitPrice: number,
    reorderLevel: number
  ) {
    const { data, error } = await supabase
      .from('inventory')
      .insert([
        {
          business_id: businessId,
          name,
          sku,
          quantity,
          unit_price: unitPrice,
          reorder_level: reorderLevel,
        },
      ])
      .select();

    if (error) throw error;
    return data?.[0];
  },

  async getItems(businessId: string) {
    const { data, error } = await supabase
      .from('inventory')
      .select('*')
      .eq('business_id', businessId);

    if (error) throw error;
    return data;
  },

  async getItemById(id: string): Promise<InventoryItem | null> {
    const { data, error } = await supabase
      .from('inventory')
      .select('*')
      .eq('id', id)
      .single();

    if (error) return null;
    return data;
  },

  async updateItem(id: string, updates: Partial<InventoryItem>) {
    const { error } = await supabase
      .from('inventory')
      .update(updates)
      .eq('id', id);

    if (error) throw error;
  },

  async deleteItem(id: string) {
    const { error } = await supabase
      .from('inventory')
      .delete()
      .eq('id', id);

    if (error) throw error;
  },

  async adjustQuantity(id: string, quantity: number, type: 'add' | 'subtract') {
    const item = await this.getItemById(id);
    if (!item) throw new Error('Item not found');

    const newQuantity =
      type === 'add' ? item.quantity + quantity : item.quantity - quantity;

    await this.updateItem(id, { quantity: newQuantity });
  },

  async getLowStockItems(businessId: string) {
    const { data, error } = await supabase
      .from('inventory')
      .select('*')
      .eq('business_id', businessId)
      .lt('quantity', 'reorder_level');

    if (error) throw error;
    return data;
  },

  async getRestockRecommendations(businessId: string) {
    const lowStockItems = await this.getLowStockItems(businessId);
    return lowStockItems?.map((item: any) => ({
      ...item,
      recommendedQuantity: item.reorder_level * 2 - item.quantity,
    })) || [];
  },

  async forecastStockLevel(id: string, daysAhead: number = 30) {
    // Mock stock forecasting using simple trend analysis
    const item = await this.getItemById(id);
    if (!item) throw new Error('Item not found');

    // In production, analyze historical transaction data
    const dailySalesAverage = 2; // Mock value
    const projectedLevel = item.quantity - dailySalesAverage * daysAhead;

    return {
      itemId: id,
      currentLevel: item.quantity,
      projectedLevel: Math.max(0, projectedLevel),
      daysUntilStockout: Math.max(0, projectedLevel <= 0 ? daysAhead : item.quantity / dailySalesAverage),
    };
  },

  async getInventoryValue(businessId: string) {
    const items = await this.getItems(businessId);
    return items?.reduce((total, item: any) => {
      return total + item.quantity * item.unit_price;
    }, 0) || 0;
  },

  async getTurnoverMetrics(businessId: string) {
    const { data: items } = await supabase
      .from('inventory')
      .select('id, quantity, unit_price')
      .eq('business_id', businessId);

    const totalValue = items?.reduce((sum, item: any) => {
      return sum + item.quantity * item.unit_price;
    }, 0) || 0;

    const avgItemValue = items && items.length > 0 ? totalValue / items.length : 0;

    return {
      totalInventoryValue: totalValue,
      itemCount: items?.length || 0,
      avgItemValue,
    };
  },
};
