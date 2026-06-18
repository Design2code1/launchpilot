import { supabase } from '@/lib/supabase';
import { UpdateProfilePayload, User } from '@/types/auth.types';

/**
 * User profile service.
 */
export const userService = {
  async getProfile(userId: string): Promise<User | null> {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();
    if (error) return null;
    return data as User;
  },

  async updateProfile(userId: string, payload: UpdateProfilePayload) {
    const { data, error } = await supabase
      .from('profiles')
      .update({ ...payload, updated_at: new Date().toISOString() })
      .eq('id', userId)
      .select()
      .single();
    if (error) throw new Error(error.message);
    return data as User;
  },

  async uploadAvatar(userId: string, uri: string): Promise<string> {
    const fileName = `${userId}/avatar-${Date.now()}.jpg`;
    const formData = new FormData();
    formData.append('file', { uri, name: fileName, type: 'image/jpeg' } as unknown as Blob);

    const { data, error } = await supabase.storage
      .from('avatars')
      .upload(fileName, formData, { upsert: true });

    if (error) throw new Error(error.message);
    const { data: urlData } = supabase.storage.from('avatars').getPublicUrl(data.path);
    return urlData.publicUrl;
  },

  async deleteAccount(userId: string) {
    const { error } = await supabase.from('profiles').delete().eq('id', userId);
    if (error) throw new Error(error.message);
    await supabase.auth.signOut();
  },
};
