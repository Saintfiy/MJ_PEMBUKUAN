import { useEffect } from 'react';
import { supabase } from '@/lib/supabase';

interface RealtimePayload {
  new?: Record<string, any>;
  old?: Record<string, any>;
  eventType?: string;
  [key: string]: any;
}

export function useRealtimeSubscription(
  table: string,
  businessId: string,
  callback: (payload: any) => void
) {
  useEffect(() => {
    const subscription = supabase
      .channel(`${table}:${businessId}`)
      .on('postgres_changes', 
        { 
          event: '*', 
          schema: 'public', 
          table: table 
        }, 
        (payload: RealtimePayload) => {
          const newData = payload.new as Record<string, any> | undefined;
          const oldData = payload.old as Record<string, any> | undefined;
          if (newData?.business_id === businessId || oldData?.business_id === businessId) {
            callback(payload);
          }
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, [table, businessId, callback]);
}

export function useTransactionUpdates(businessId: string, callback: (data: any) => void) {
  useRealtimeSubscription('transactions', businessId, callback);
}

export function useInventoryUpdates(businessId: string, callback: (data: any) => void) {
  useRealtimeSubscription('inventory', businessId, callback);
}
