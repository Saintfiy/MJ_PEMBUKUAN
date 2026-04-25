import { supabase } from '@/lib/supabase';
import { Business } from '@/types';

export const businessService = {
  async createBusiness(
    ownerId: string,
    name: string,
    industry: string,
    country: string,
    currency: string
  ) {
    const { data, error } = await supabase
      .from('businesses')
      .insert([
        {
          owner_id: ownerId,
          name,
          industry,
          country,
          currency,
          business_health_score: 100,
        },
      ])
      .select();

    if (error) throw error;
    return data?.[0];
  },

  async getBusinesses(userId: string) {
    const { data, error } = await supabase
      .from('businesses')
      .select('*')
      .or(`owner_id.eq.${userId},id.in.(select business_id from users where id = ${userId})`);

    if (error) throw error;
    return data;
  },

  async getBusiness(businessId: string): Promise<Business | null> {
    const { data, error } = await supabase
      .from('businesses')
      .select('*')
      .eq('id', businessId)
      .single();

    if (error) return null;
    return data;
  },

  async updateBusiness(businessId: string, updates: Partial<Business>) {
    const { error } = await supabase
      .from('businesses')
      .update(updates)
      .eq('id', businessId);

    if (error) throw error;
  },

  async addBranch(businessId: string, name: string, location: string) {
    const { data, error } = await supabase
      .from('business_branches')
      .insert([
        {
          business_id: businessId,
          name,
          location,
        },
      ])
      .select();

    if (error) throw error;
    return data?.[0];
  },

  async getBranches(businessId: string) {
    const { data, error } = await supabase
      .from('business_branches')
      .select('*')
      .eq('business_id', businessId);

    if (error) throw error;
    return data;
  },

  async addTeamMember(
    businessId: string,
    email: string,
    role: 'admin' | 'staff'
  ) {
    const { data, error } = await supabase
      .from('users')
      .insert([
        {
          business_id: businessId,
          email,
          role,
        },
      ])
      .select();

    if (error) throw error;
    return data?.[0];
  },

  async getTeamMembers(businessId: string) {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('business_id', businessId);

    if (error) throw error;
    return data;
  },

  async updateBusinessHealthScore(businessId: string, score: number) {
    const { error } = await supabase
      .from('businesses')
      .update({ business_health_score: score })
      .eq('id', businessId);

    if (error) throw error;
  },
};
