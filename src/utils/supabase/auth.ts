import { supabase } from './client';
import bcrypt from 'bcryptjs';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface ChangePasswordData {
  currentPassword: string;
  newPassword: string;
}

export interface AuthResponse {
  success: boolean;
  user?: any;
  isFirstLogin?: boolean;
  error?: string;
}

/**
 * Login admin user with email and password
 */
export async function loginAdmin(credentials: LoginCredentials): Promise<AuthResponse> {
  try {
    // Fetch admin user by email
    const { data: adminUser, error } = await supabase
      .from('admin_users')
      .select('*')
      .eq('email', credentials.email)
      .single();

    if (error || !adminUser) {
      return {
        success: false,
        error: 'Credențiale invalide. Verifică email-ul și parola.'
      };
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(
      credentials.password,
      adminUser.password_hash
    );

    if (!isPasswordValid) {
      return {
        success: false,
        error: 'Credențiale invalide. Verifică email-ul și parola.'
      };
    }

    // Store session in localStorage
    const session = {
      userId: adminUser.id,
      email: adminUser.email,
      fullName: adminUser.full_name,
      isFirstLogin: adminUser.is_first_login,
      timestamp: new Date().toISOString()
    };

    localStorage.setItem('admin_session', JSON.stringify(session));

    return {
      success: true,
      user: {
        id: adminUser.id,
        email: adminUser.email,
        fullName: adminUser.full_name
      },
      isFirstLogin: adminUser.is_first_login
    };
  } catch (error) {
    console.error('Login error:', error);
    return {
      success: false,
      error: 'A apărut o eroare la autentificare. Te rog încearcă din nou.'
    };
  }
}

/**
 * Change admin password
 */
export async function changeAdminPassword(
  userId: string,
  data: ChangePasswordData
): Promise<AuthResponse> {
  try {
    // Fetch admin user
    const { data: adminUser, error: fetchError } = await supabase
      .from('admin_users')
      .select('*')
      .eq('id', userId)
      .single();

    if (fetchError || !adminUser) {
      return {
        success: false,
        error: 'Utilizator nu a fost găsit.'
      };
    }

    // Verify current password
    const isCurrentPasswordValid = await bcrypt.compare(
      data.currentPassword,
      adminUser.password_hash
    );

    if (!isCurrentPasswordValid) {
      return {
        success: false,
        error: 'Parola curentă este incorectă.'
      };
    }

    // Hash new password
    const newPasswordHash = await bcrypt.hash(data.newPassword, 10);

    // Update password and set is_first_login to false
    const { error: updateError } = await supabase
      .from('admin_users')
      .update({
        password_hash: newPasswordHash,
        is_first_login: false,
        updated_at: new Date().toISOString()
      })
      .eq('id', userId);

    if (updateError) {
      return {
        success: false,
        error: 'Eroare la actualizarea parolei. Te rog încearcă din nou.'
      };
    }

    // Update session
    const session = JSON.parse(localStorage.getItem('admin_session') || '{}');
    session.isFirstLogin = false;
    localStorage.setItem('admin_session', JSON.stringify(session));

    return {
      success: true,
      user: {
        id: adminUser.id,
        email: adminUser.email,
        fullName: adminUser.full_name
      },
      isFirstLogin: false
    };
  } catch (error) {
    console.error('Change password error:', error);
    return {
      success: false,
      error: 'A apărut o eroare. Te rog încearcă din nou.'
    };
  }
}

/**
 * Get current admin session
 */
export function getAdminSession() {
  const sessionData = localStorage.getItem('admin_session');
  if (!sessionData) return null;

  try {
    const session = JSON.parse(sessionData);
    return session;
  } catch (error) {
    console.error('Error parsing session:', error);
    return null;
  }
}

/**
 * Logout admin user
 */
export function logoutAdmin() {
  localStorage.removeItem('admin_session');
  window.location.href = '/admin/login';
}

/**
 * Check if user is authenticated
 */
export function isAuthenticated(): boolean {
  const session = getAdminSession();
  if (!session) return false;

  // Check if session is expired (24 hours)
  const sessionTime = new Date(session.timestamp).getTime();
  const now = new Date().getTime();
  const hoursPassed = (now - sessionTime) / (1000 * 60 * 60);

  if (hoursPassed > 24) {
    logoutAdmin();
    return false;
  }

  return true;
}
