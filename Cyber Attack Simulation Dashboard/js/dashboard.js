// Dashboard Core Module with Role-Based Access
let attackChart = null;

// Check permissions before loading dashboard
function initDashboard() {
    // Check if user has permission to view dashboard
    if (!AuthManager.hasPermission('view_dashboard')) {
        document.getElementById('dashboardContent').innerHTML = `
            <div class="alert alert-danger text-center p-5">
                <i class="bi bi-lock-fill" style="font-size: 3rem;"></i>
                <h3 class="mt-3">Access Denied</h3>
                <p>You don't have permission to view the dashboard.</p>
                <a href="login.html" class="btn btn-cyber">Go to Login</a>
            </div>
        `;
        return;
    }
    
    // Display user info
    displayUserInfo();
    updateStats();
    initAttackChart();
    loadRecentAlerts();
    startSimulationUpdates();
}

function displayUserInfo() {
    const user = AuthManager.getCurrentUser();
    if (user) {
        const userNameSpan = document.getElementById('userNameDisplay');
        const userRoleSpan = document.getElementById('userRoleBadge');
        const userPermissionsSpan = document.getElementById('userPermissions');
        
        if (userNameSpan) userNameSpan.innerHTML = `${user.avatar} ${user.fullName}`;
        if (userRoleSpan) userRoleSpan.innerHTML = AuthManager.getRoleDisplayName(user.role);
        if (userPermissionsSpan) userPermissionsSpan.innerHTML = `<i class="bi bi-key"></i> ${user.permissions.length} permissions`;
    }
}

function updateStats() {
    // Simulated real-time stats
    const stats = {
        attacks: Math.floor(Math.random() * 50) + 120,
        blocked: Math.floor(Math.random() * 30) + 85,
        critical: Math.floor(Math.random() * 5) + 2,
        activeThreats: Math.floor(Math.random() * 8) + 3
    };
    
    animateNumber('totalAttacks', stats.attacks);
    animateNumber('blockedAttacks', stats.blocked);
    animateNumber('criticalAlerts', stats.critical);
    animateNumber('activeThreats', stats.activeThreats);
}

function animateNumber(elementId, target) {
    const element = document.getElementById(elementId);
    if (!element) return;
    const numSpan = element.querySelector('.stat-number') || element;
    let current = 0;
    const increment = target / 30;
    const interval = setInterval(() => {
        current += increment;
        if (current >= target) {
            numSpan.textContent = target;
            clearInterval(interval);
        } else {
            numSpan.textContent = Math.floor(current);
        }
    }, 20);
}

function initAttackChart() {
    const ctx = document.getElementById('attackChart')?.getContext('2d');
    if (!ctx) return;
    
    attackChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00', 'Now'],
            datasets: [{
                label: 'Attack Intensity',
                data: [12, 19, 25, 42, 38, 55, 47],
                borderColor: '#ef4444',
                backgroundColor: 'rgba(239, 68, 68, 0.1)',
                tension: 0.4,
                fill: true,
                pointBackgroundColor: '#06b6d4',
                pointBorderColor: '#fff',
                pointRadius: 5
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { labels: { color: '#94a3b8' } }
            },
            scales: {
                y: { grid: { color: '#1f2a4a' }, ticks: { color: '#94a3b8' } },
                x: { grid: { color: '#1f2a4a' }, ticks: { color: '#94a3b8' } }
            }
        }
    });
}

function loadRecentAlerts() {
    const alerts = [
        { time: '2s ago', type: 'DDoS Attack', src: '192.168.1.45', severity: 'critical' },
        { time: '15s ago', type: 'Port Scan', src: '45.33.22.11', severity: 'high' },
        { time: '1m ago', type: 'Malware Payload', src: '103.45.67.89', severity: 'critical' },
        { time: '3m ago', type: 'Brute Force', src: '88.120.55.3', severity: 'medium' },
        { time: '5m ago', type: 'Phishing Domain', src: 'evil.com', severity: 'high' }
    ];
    
    const container = document.getElementById('recentAlertsList');
    if (!container) return;
    
    container.innerHTML = alerts.map(alert => `
        <div class="alert-item">
            <div class="d-flex justify-content-between align-items-center">
                <div>
                    <span class="threat-level threat-${alert.severity}"></span>
                    <strong style="color: white;">${alert.type}</strong>
                    <small class="text-muted ms-2" style="color: #cbd5e1;">${alert.src}</small>
                </div>
                <span class="badge bg-dark" style="color: white;">${alert.time}</span>
            </div>
        </div>
    `).join('');
}

function startSimulationUpdates() {
    setInterval(() => {
        updateStats();
        if (attackChart) {
            const newData = Math.floor(Math.random() * 40) + 30;
            attackChart.data.datasets[0].data.shift();
            attackChart.data.datasets[0].data.push(newData);
            attackChart.update();
        }
        loadRecentAlerts();
    }, 8000);
}

// Initialize when DOM is ready
if (document.getElementById('attackChart')) {
    document.addEventListener('DOMContentLoaded', initDashboard);
}