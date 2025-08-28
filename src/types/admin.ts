export interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'super_admin';
  status: 'active' | 'inactive' | 'pending';
  lastLogin?: string;
  createdAt: string;
  permissions: AdminPermission[];
}

export interface AdminPermission {
  id: string;
  name: string;
  description: string;
  category: 'users' | 'suppliers' | 'content' | 'system';
}

export interface CreateAdminUserData {
  email: string;
  name: string;
  role: 'admin' | 'super_admin';
  permissions: string[];
}

export interface AdminStats {
  totalUsers: number;
  totalSuppliers: number;
  totalSearches: number;
  activeUsers: number;
  pendingApprovals: number;
  systemHealth: 'good' | 'warning' | 'critical';
}

export interface AdminActivity {
  id: string;
  userId: string;
  userName: string;
  action: string;
  target: string;
  timestamp: string;
  details?: string;
}