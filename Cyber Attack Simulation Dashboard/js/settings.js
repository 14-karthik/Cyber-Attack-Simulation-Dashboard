// Settings Module
function loadSettings() {
    const settings = JSON.parse(localStorage.getItem('cyber_settings')) || {
        notifications: true,
        autoRefresh: true,
        theme: 'dark',
        soundAlerts: false
    };
    
    document.getElementById('notificationsToggle')?.addEventListener('change', (e) => {
        settings.notifications = e.target.checked;
        localStorage.setItem('cyber_settings', JSON.stringify(settings));
    });
    
    document.getElementById('autoRefreshToggle')?.addEventListener('change', (e) => {
        settings.autoRefresh = e.target.checked;
        localStorage.setItem('cyber_settings', JSON.stringify(settings));
    });
}

document.addEventListener('DOMContentLoaded', loadSettings);