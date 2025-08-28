import { useState, useCallback } from 'react';
import { AdminUser, CreateAdminUserData, AdminStats, AdminActivity, AdminPermission } from '../types/admin';

// Mock data - replace with actual API calls
const mockAdminUsers: AdminUser[] = [
  {
    id: '1',
    email: 'admin@toptaklif.uz',
    name: 'System Administrator',
    role: 'super_admin',
    status: 'active',
    lastLogin: '2024-01-15T10:30:00Z',
    createdAt: '2024-01-01T00:00:00Z',
    permissions: [
      { id: '1', name: 'user_management', description: 'Manage users', category: 'users' },
      { id: '2', name: 'supplier_management', description: 'Manage suppliers', category: 'suppliers' },
      { id: '3', name: 'content_management', description: 'Manage content', category: 'content' },
      { id: '4', name: 'system_settings', description: 'System settings', category: 'system' }
    ]
  },
  {
    id: '2',
    email: 'moderator@toptaklif.uz',
    name: 'Content Moderator',
    role: 'admin',
    status: 'active',
    lastLogin: '2024-01-14T15:45:00Z',
    createdAt: '2024-01-05T00:00:00Z',
    permissions: [
      { id: '2', name: 'supplier_management', description: 'Manage suppliers', category: 'suppliers' },
      { id: '3', name: 'content_management', description: 'Manage content', category: 'content' }
    ]
  }
];

const mockStats: AdminStats = {
  totalUsers: 15247,
  totalSuppliers: 3421,
  totalSearches: 89234,
  activeUsers: 1234,
  pendingApprovals: 23,
  systemHealth: 'good'
};

const mockActivities: AdminActivity[] = [
  {
    id: '1',
    userId: '1',
    userName: 'System Administrator',
    action: 'Created admin user',
    target: 'moderator@toptaklif.uz',
    timestamp: '2024-01-15T10:30:00Z',
    details: 'Added new content moderator'
  },
  {
    id: '2',
    userId: '2',
    userName: 'Content Moderator',
    action: 'Approved supplier',
    target: 'Uzbekistan Steel Works',
    timestamp: '2024-01-15T09:15:00Z'
  },
  {
    id: '3',
    userId: '1',
    userName: 'System Administrator',
    action: 'Updated system settings',
    target: 'Email notifications',
    timestamp: '2024-01-14T16:20:00Z'
  }
];

const availablePermissions: AdminPermission[] = [
  { id: '1', name: 'user_management', description: 'Create, edit, and delete user accounts', category: 'users' },
  { id: '2', name: 'supplier_management', description: 'Manage supplier profiles and approvals', category: 'suppliers' },
  { id: '3', name: 'content_management', description: 'Manage content and moderation', category: 'content' },
  { id: '4', name: 'system_settings', description: 'Access system configuration', category: 'system' },
  { id: '5', name: 'analytics_view', description: 'View analytics and reports', category: 'system' },
  { id: '6', name: 'user_support', description: 'Handle user support requests', category: 'users' }
];

export const useAdmin = () => {
  const [adminUsers, setAdminUsers] = useState<AdminUser[]>(mockAdminUsers);
  const [stats] = useState<AdminStats>(mockStats);
  const [activities] = useState<AdminActivity[]>(mockActivities);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createAdminUser = useCallback(async (userData: CreateAdminUserData) => {
    setIsLoading(true);
    setError(null);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      const newUser: AdminUser = {
        id: Math.random().toString(36).substr(2, 9),
        email: userData.email,
        name: userData.name,
        role: userData.role,
        status: 'pending',
        createdAt: new Date().toISOString(),
        permissions: availablePermissions.filter(p => userData.permissions.includes(p.id))
      };

      setAdminUsers(prev => [...prev, newUser]);
      return { success: true, user: newUser };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to create admin user';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  }, []);

  const updateAdminUser = useCallback(async (userId: string, updates: Partial<AdminUser>) => {
    setIsLoading(true);
    setError(null);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));

      setAdminUsers(prev => prev.map(user => 
        user.id === userId ? { ...user, ...updates } : user
      ));

      return { success: true };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to update admin user';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  }, []);

  const deleteAdminUser = useCallback(async (userId: string) => {
    setIsLoading(true);
    setError(null);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 600));

      setAdminUsers(prev => prev.filter(user => user.id !== userId));
      return { success: true };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to delete admin user';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    adminUsers,
    stats,
    activities,
    availablePermissions,
    isLoading,
    error,
    createAdminUser,
    updateAdminUser,
    deleteAdminUser,
    clearError
  };
};