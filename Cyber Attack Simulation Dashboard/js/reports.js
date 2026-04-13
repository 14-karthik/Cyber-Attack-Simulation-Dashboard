// Reports Module with Permission Check
let reportPieChart = null;

function checkReportsPermission() {
    if (!AuthManager.hasPermission('view_reports')) {
        const container = document.getElementById('reportsContainer');
        if (container) {
            container.innerHTML = `
                <div class="alert alert-danger text-center p-5">
                    <i class="bi bi-lock-fill" style="font-size: 3rem;"></i>
                    <h3 class="mt-3">Access Denied</h3>
                    <p>You need appropriate permissions to view reports.</p>
                    <a href="index.html" class="btn btn-cyber">Back to Dashboard</a>
                </div>
            `;
        }
        return false;
    }
    return true;
}

function generateReport() {
    const reportData = {
        date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
        time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
        totalAttacks: Math.floor(Math.random() * 500) + 200,
        blockedPercentage: (Math.random() * 30 + 65).toFixed(1),
        topAttack: ['DDoS Attack', 'SQL Injection', 'Phishing Campaign', 'Ransomware', 'MITM Attack'][Math.floor(Math.random() * 5)],
        criticalIncidents: Math.floor(Math.random() * 15) + 2,
        ddosCount: Math.floor(Math.random() * 100) + 50,
        sqlCount: Math.floor(Math.random() * 80) + 30,
        phishCount: Math.floor(Math.random() * 60) + 20,
        blockedCount: Math.floor(Math.random() * 300) + 150,
        activeThreats: Math.floor(Math.random() * 8) + 3
    };
    
    window.currentReportData = reportData;
    
    document.getElementById('reportDate').textContent = reportData.date;
    document.getElementById('reportTime').textContent = reportData.time;
    document.getElementById('totalAttacksReport').textContent = reportData.totalAttacks;
    document.getElementById('blockRate').textContent = reportData.blockedPercentage + '%';
    document.getElementById('topAttackType').textContent = reportData.topAttack;
    document.getElementById('criticalCount').textContent = reportData.criticalIncidents;
    document.getElementById('blockedCount').textContent = reportData.blockedCount;
    document.getElementById('activeThreatsCount').textContent = reportData.activeThreats;
    
    if (reportPieChart) {
        reportPieChart.data.datasets[0].data = [reportData.ddosCount, reportData.sqlCount, reportData.phishCount];
        reportPieChart.update();
    }
    
    document.getElementById('ddosCount').textContent = reportData.ddosCount;
    document.getElementById('sqlCount').textContent = reportData.sqlCount;
    document.getElementById('phishCount').textContent = reportData.phishCount;
    
    const riskLevel = document.getElementById('riskLevel');
    if (reportData.criticalIncidents > 10) {
        riskLevel.textContent = 'CRITICAL';
        riskLevel.className = 'badge bg-danger';
    } else if (reportData.criticalIncidents > 5) {
        riskLevel.textContent = 'HIGH';
        riskLevel.className = 'badge bg-warning';
    } else {
        riskLevel.textContent = 'MEDIUM';
        riskLevel.className = 'badge bg-info';
    }
}

function initReportPieChart() {
    const ctx = document.getElementById('reportPieChart')?.getContext('2d');
    if (!ctx) return;
    
    reportPieChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['DDoS Attacks', 'SQL Injection', 'Phishing'],
            datasets: [{
                data: [75, 50, 35],
                backgroundColor: ['#ef4444', '#f59e0b', '#8b5cf6'],
                borderColor: '#111827',
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: { position: 'bottom', labels: { color: '#f1f5f9' } }
            }
        }
    });
}

function downloadReport() {
    if (!AuthManager.hasPermission('export_reports')) {
        alert('Access Denied! You do not have permission to export reports.');
        return;
    }
    
    const data = window.currentReportData || {
        date: new Date().toLocaleDateString(),
        time: new Date().toLocaleTimeString(),
        totalAttacks: 'N/A',
        blockedPercentage: 'N/A',
        topAttack: 'N/A',
        criticalIncidents: 'N/A',
        blockedCount: 'N/A',
        activeThreats: 'N/A'
    };
    
    const user = AuthManager.getCurrentUser();
    const username = user ? user.fullName : 'Security Analyst';
    
    const pdfContent = `<!DOCTYPE html>
    <html>
    <head><meta charset="UTF-8"><title>CyberAttack Security Report</title>
    <style>
        body { font-family: Arial; padding: 40px; background: white; }
        h1 { color: #1e293b; }
        .stat-card { background: #f8fafc; padding: 20px; margin: 10px; border-radius: 10px; }
        table { width: 100%; border-collapse: collapse; }
        th, td { padding: 10px; text-align: left; border-bottom: 1px solid #e2e8f0; }
        .footer { margin-top: 30px; text-align: center; color: #64748b; }
    </style>
    </head>
    <body>
        <h1>🔒 CyberAttack Security Report</h1>
        <p>Generated by: ${username}<br>Date: ${data.date} at ${data.time}</p>
        <div style="display: flex; gap: 20px;">
            <div class="stat-card"><strong>Total Attacks</strong><br><h2>${data.totalAttacks}</h2></div>
            <div class="stat-card"><strong>Block Rate</strong><br><h2>${data.blockedPercentage}%</h2></div>
            <div class="stat-card"><strong>Critical Incidents</strong><br><h2>${data.criticalIncidents}</h2></div>
        </div>
        <h2>Attack Summary</h2>
        <table><tr><th>Metric</th><th>Value</th></tr>
        <tr><td>Top Attack Vector</td><td>${data.topAttack}</td></tr>
        <tr><td>Attacks Blocked</td><td>${data.blockedCount}</td></tr>
        <tr><td>Active Threats</td><td>${data.activeThreats}</td></tr>
        </table>
        <div class="footer"><p>CyberAttack Simulation Dashboard - Confidential Report</p></div>
    </body>
    </html>`;
    
    const blob = new Blob([pdfContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `CyberAttack_Report_${new Date().toISOString().slice(0, 19).replace(/:/g, '-')}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    alert('Report exported successfully!');
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('reportDate')) {
        if (checkReportsPermission()) {
            initReportPieChart();
            generateReport();
            document.getElementById('refreshReport')?.addEventListener('click', generateReport);
            document.getElementById('downloadReport')?.addEventListener('click', downloadReport);
        }
    }
});