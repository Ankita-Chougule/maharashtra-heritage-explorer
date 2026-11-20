// Persistent user profile backed by localStorage
export interface UserProfile {
  name: string;
  email: string;
  role: string;
  phone?: string;
  licenseOrInstitute?: string;
}

const KEY = 'mhe_user_profile';

export function saveUserProfile(profile: UserProfile): void {
  localStorage.setItem(KEY, JSON.stringify(profile));
}

export function getUserProfile(): UserProfile | null {
  const d = localStorage.getItem(KEY);
  return d ? (JSON.parse(d) as UserProfile) : null;
}

export function clearUserProfile(): void {
  localStorage.removeItem(KEY);
}
