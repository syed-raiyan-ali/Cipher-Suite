import { supabase } from './supabaseClient';

export async function addCloudHistory(entry, user) {
  const { data, error } = await supabase
    .from('history')
    .insert([{
      user_id: user.uid,
      email: user.email,
      cipher: entry.cipher,
      mode: entry.mode,
      input: entry.input,
      key: entry.key,
      output: entry.output,
      timestamp: entry.timestamp,
      ip: entry.ip || null
    }])
    .select();
  if (error) {
    console.error("Supabase history insert error:", error);
    return undefined;
  } else {
    console.log("Supabase history insert result:", data);
    return data; // <-- just add this line
  }
}

export async function getCloudHistory(user, days = 30) {
  const cutoff = new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString();
  const { data, error } = await supabase
    .from('history')
    .select('*')
    .eq('user_id', user.uid)
    .gt('timestamp', cutoff)
    .order('timestamp', { ascending: false });
  if (error) {
    console.error("Supabase get history error:", error);
  }
  return { data, error };
}

export async function deleteOldHistory(user, days = 30) {
  const cutoff = new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString();
  const { data, error } = await supabase
    .from('history')
    .delete()
    .eq('user_id', user.uid)
    .lt('timestamp', cutoff);
  if (error) {
    console.error("Supabase delete history error:", error);
  }
}