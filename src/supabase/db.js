import { supabase } from './config';

export const getUserData = async (uid) => {
  try {
    const { data, error } = await supabase
      .from('user_data')
      .select('data')
      .eq('id', uid)
      .maybeSingle();

    if (error) {
      console.error("Error reading user data from Supabase:", error);
      return null;
    }
    return data?.data || null;
  } catch (error) {
    console.error("Error reading user data from Supabase:", error);
    return null;
  }
};

export const saveUserData = async (uid, userData) => {
  try {
    const { error } = await supabase
      .from('user_data')
      .upsert({ 
        id: uid, 
        data: userData, 
        updated_at: new Date().toISOString() 
      }, { onConflict: 'id' });

    if (error) {
      console.error("Error saving user data to Supabase:", error);
    }
  } catch (error) {
    console.error("Error saving user data to Supabase:", error);
  }
};
