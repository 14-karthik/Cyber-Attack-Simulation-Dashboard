// Authentication Core Module with Role-Based Access Control
const AUTH_KEY = 'cyber_session';
const USER_KEY = 'cyber_user';
const USERS_KEY = 'cyber_users';

// Pre-defined users with different roles
const DEFAULT_USERS = [
    {
        id: 1,
        username: 'admin',
        password: 'admin123',
        role: 'admin',
        fullName: 'Administrator',
        department: 'Security Operations',
        avatar: '👨‍💻',
        permissions: ['all']
    },
    {
        id: 2,
        username: 'analyst',
        password: 'analyst123',
        role: 'security_analyst',
        fullName: 'Sarah Johnson',
        department: 'Security Analysis',
        avatar: '👩‍💻',
        permissions: ['view_dashboard', 'view_logs', 'view_reports', 'view_map', 'export_reports']
    },
    {
        id: 3,
        username: 'viewer',
        password: 'viewer123',
        role: 'viewer',
        fullName: 'John Smith',
        department: 'Guest Access',
        avatar: '👤',
        permissions: ['view_dashboard', 'view_map']
    },
    {
        id: 4,
        username: 'responder',
        password: 'responder123',
        role: 'incident_responder',
        fullName: 'Mike Chen',
        department: 'Incident Response',
        avatar: '🛡️',
        permissions: ['view_dashboard', 'view_logs', 'view_map', 'update_alerts', 'block_ips']
    },
    {
        id: 5,
        username: 'auditor',
        password: 'auditor123',
        role: 'auditor',
        fullName: 'Lisa Wong',
        department: 'Security Audit',
        avatar: '📊',
        permissions: ['view_logs', 'view_reports', 'export_reports', 'view_settings']
    }
];

class AuthManager {
    static initUsers() {
        if (!localStorage.getItem(USERS_KEY)) {
            localStorage.setItem(USERS_KEY, JSON.stringify(DEFAULT_USERS));
        }
    }

    static getUsers() {
        this.initUsers();
        return JSON.parse(localStorage.getItem(USERS_KEY));
    }

    static login(username, password) {
        const users = this.getUsers();
        const user = users.find(u => u.username === username && u.password === password);
        
        if (user) {
            const { password, ...safeUser } = user;
            sessionStorage.setItem(AUTH_KEY, 'active');
            sessionStorage.setItem(USER_KEY, JSON.stringify({
                ...safeUser,
                lastLogin: new Date().toISOString(),
                sessionId: Math.random().toString(36).substr(2, 16)
            }));
            return true;
        }
        return false;
    }

    static logout() {
        sessionStorage.removeItem(AUTH_KEY);
        sessionStorage.removeItem(USER_KEY);
        window.location.href = 'login.html';
    }

    static getCurrentUser() {
        const user = sessionStorage.getItem(USER_KEY);
        return user ? JSON.parse(user) : null;
    }

    static isAuthenticated() {
        const session = sessionStorage.getItem(AUTH_KEY);
        return session === 'active';
    }

    static hasPermission(permission) {
        const user = this.getCurrentUser();
        if (!user) return false;
        if (user.role === 'admin') return true;
        return user.permissions.includes(permission) || user.permissions.includes('all');
    }

    static getRole() {
        const user = this.getCurrentUser();
        return user ? user.role : null;
    }

    static requireAuth() {
        if (!this.isAuthenticated()) {
            window.location.href = 'login.html';
            return false;
        }
        return true;
    }

    static requirePermission(permission) {
        if (!this.requireAuth()) return false;
        if (!this.hasPermission(permission)) {
            alert('Access Denied! You do not have permission to access this page.');
            window.location.href = 'index.html';
            return false;
        }
        return true;
    }

    static getRoleDisplayName(role) {
        const roles = {
            'admin': '👑 System Administrator',
            'security_analyst': '🔍 Security Analyst',
            'viewer': '👁️ Viewer',
            'incident_responder': '🛡️ Incident Responder',
            'auditor': '📋 Auditor'
        };
        return roles[role] || '👤 User';
    }

    static getPermissionsList() {
        return {
            'view_dashboard': 'View Dashboard',
            'view_logs': 'View Security Logs',
            'view_reports': 'View Reports',
            'view_map': 'View Threat Map',
            'view_settings': 'View Settings',
            'export_reports': 'Export Reports',
            'update_alerts': 'Update Alerts',
            'block_ips': 'Block IP Addresses',
            'manage_users': 'Manage Users'
        };
    }
}

AuthManager.initUsers();
window.AuthManager = AuthManager;