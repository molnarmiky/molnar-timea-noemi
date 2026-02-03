import { supabase } from './client';
import bcrypt from 'bcryptjs';

export interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'editor';
  firstLogin: boolean;
}

/**
 * Login with email and password
 */
export async function loginAdmin(email: string, password: string): Promise<{ success: boolean; user?: AdminUser; error?: string }> {
  try {
    // Fetch user from database
    const { data: userData, error: fetchError } = await supabase
      .from('admin_users')
      .select('*')
      .eq('email', email)
      .single();

    if (fetchError || !userData) {
      return { success: false, error: 'Email sau parolă incorectă' };
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, userData.password_hash);
    
    if (!isPasswordValid) {
      return { success: false, error: 'Email sau parolă incorectă' };
    }

    // Return user data (without password hash)
    const user: AdminUser = {
      id: userData.id,
      email: userData.email,
      name: userData.name,
      role: userData.role,
      firstLogin: userData.first_login
    };

    return { success: true, user };
  } catch (error) {
    console.error('Login error:', error);
    return { success: false, error: 'Eroare la autentificare' };
  }
}

/**
 * Change password
 */
export async function changePassword(
  userId: string, 
  currentPassword: string, 
  newPassword: string
): Promise<{ success: boolean; error?: string }> {
  try {
    // Fetch current user
    const { data: userData, error: fetchError } = await supabase
      .from('admin_users')
      .select('password_hash')
      .eq('id', userId)
      .single();

    if (fetchError || !userData) {
      return { success: false, error: 'Utilizator negăsit' };
    }

    // Verify current password
    const isPasswordValid = await bcrypt.compare(currentPassword, userData.password_hash);
    
    if (!isPasswordValid) {
      return { success: false, error: 'Parola curentă este incorectă' };
    }

    // Hash new password
    const newPasswordHash = await bcrypt.hash(newPassword, 10);

    // Update password
    const { error: updateError } = await supabase
      .from('admin_users')
      .update({ 
        password_hash: newPasswordHash,
        first_login: false,
        updated_at: new Date().toISOString()
      })
      .eq('id', userId);

    if (updateError) {
      return { success: false, error: 'Eroare la actualizarea parolei' };
    }

    return { success: true };
  } catch (error) {
    console.error('Change password error:', error);
    return { success: false, error: 'Eroare la schimbarea parolei' };
  }
}

/**
 * Create initial admin user (only for setup)
 */
export async function createAdminUser(
  email: string, 
  password: string, 
  name: string, 
  role: 'admin' | 'editor' = 'admin'
): Promise<{ success: boolean; error?: string }> {
  try {
    // Hash password
    const passwordHash = await bcrypt.hash(password, 10);

    // Insert user
    const { error } = await supabase
      .from('admin_users')
      .insert({
        email,
        password_hash: passwordHash,
        name,
        role,
        first_login: true
      });

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (error) {
    console.error('Create admin user error:', error);
    return { success: false, error: 'Eroare la crearea utilizatorului' };
  }
}
