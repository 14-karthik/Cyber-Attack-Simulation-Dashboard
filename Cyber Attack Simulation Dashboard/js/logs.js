// Logs Viewer Module with Permission Check
let logsData = [];

function checkLogsPermission() {
    if (!AuthManager.hasPermission('view_logs')) {
        const container = document.getElementById('logsContainer');
        if (container) {
            container.innerHTML = `
                <div class="alert alert-danger text-center p-5">
                    <i class="bi bi-lock-fill" style="font-size: 3rem;"></i>
                    <h3 class="mt-3">Access Denied</h3>
                    <p>You need Security Analyst or higher role to view logs.</p>
                    <a href="index.html" class="btn btn-cyber">Back to Dashboard</a>
                </div>
            `;
        }
        return false;
    }
    return true;
}

function generateLogs() {
    const attackTypes = ['SQL Injection', 'XSS Attempt', 'DDoS Flood', 'Ransomware', 'Phishing', 'Zero-Day Exploit', 'MITM Attack', 'Brute Force', 'Port Scan', 'Malware Download'];
    const sources = ['192.168.1.1', '10.0.0.45', '172.16.0.23', '45.33.22.1', '103.56.78.90', '88.120.55.100', '185.130.5.77', '202.54.12.34', '67.89.45.12'];
    
    logsData = [];
    for (let i = 0; i < 50; i++) {
        logsData.push({
            id: i,
            timestamp: new Date(Date.now() - Math.random() * 86400000).toLocaleString(),
            attack: attackTypes[Math.floor(Math.random() * attackTypes.length)],
            source: sources[Math.floor(Math.random() * sources.length)],
            severity: ['Low', 'Medium', 'High', 'Critical'][Math.floor(Math.random() * 4)],
            status: ['Blocked', 'Monitored', 'Contained', 'Investigating'][Math.floor(Math.random() * 4)]
        });
    }
    renderLogs();
}

function renderLogs() {
    const tbody = document.getElementById('logsTableBody');
    if (!tbody) return;
    
    tbody.innerHTML = logsData.map(log => `
        <tr>
            <td>${log.timestamp}</td>
            <td><span class="badge ${getSeverityBadge(log.severity)}">${log.attack}</span></td>
            <td><code>${log.source}</code></td>
            <td><span class="threat-level threat-${log.severity.toLowerCase()}"></span> ${log.severity}</td>
            <td><span class="badge bg-secondary">${log.status}</span></td>
        </tr>
    `).join('');
}

function getSeverityBadge(severity) {
    const map = { 'Critical': 'bg-danger', 'High': 'bg-warning', 'Medium': 'bg-info', 'Low': 'bg-success' };
    return map[severity] || 'bg-secondary';
}

function filterLogs() {
    const search = document.getElementById('logSearch')?.value.toLowerCase();
    const severityFilter = document.getElementById('severityFilter')?.value;
    
    const filtered = logsData.filter(log => {
        const matchSearch = log.attack.toLowerCase().includes(search) || log.source.includes(search) || (search && log.timestamp.toLowerCase().includes(search));
        const matchSeverity = !severityFilter || log.severity === severityFilter;
        return matchSearch && matchSeverity;
    });
    
    const tbody = document.getElementById('logsTableBody');
    if (tbody) {
        tbody.innerHTML = filtered.map(log => `
            <tr>
                <td>${log.timestamp}</td>
                <td><span class="badge ${getSeverityBadge(log.severity)}">${log.attack}</span></td>
                <td><code>${log.source}</code></td>
                <td><span class="threat-level threat-${log.severity.toLowerCase()}"></span> ${log.severity}</td>
                <td><span class="badge bg-secondary">${log.status}</span></td>
            </tr>
        `).join('');
    }
}

function exportLogs() {
    if (!AuthManager.hasPermission('export_reports')) {
        alert('Access Denied! You do not have permission to export logs.');
        return;
    }
    
    let csvContent = "Timestamp,Attack Type,Source IP,Severity,Status\n";
    logsData.forEach(log => {
        csvContent += `${log.timestamp},${log.attack},${log.source},${log.severity},${log.status}\n`;
    });
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `security_logs_${new Date().toISOString().slice(0, 19)}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    alert('Logs exported successfully!');
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('logsTableBody')) {
        if (checkLogsPermission()) {
            generateLogs();
            document.getElementById('logSearch')?.addEventListener('input', filterLogs);
            document.getElementById('severityFilter')?.addEventListener('change', filterLogs);
        }
    }
});