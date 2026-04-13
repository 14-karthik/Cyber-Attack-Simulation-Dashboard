// Login Page Handler with Role Selection Display
document.addEventListener('DOMContentLoaded', function() {
    if (window.AuthManager && AuthManager.isAuthenticated()) {
        window.location.href = 'index.html';
        return;
    }

    const loginForm = document.getElementById('loginForm');
    const errorAlert = document.getElementById('errorAlert');
    const loginBtn = document.getElementById('loginBtn');
    const usernameInput = document.getElementById('username');
    const roleHint = document.getElementById('roleHint');

    if (usernameInput) {
        usernameInput.addEventListener('input', function() {
            const username = this.value.toLowerCase();
            const users = AuthManager.getUsers();
            const user = users.find(u => u.username === username);
            
            if (user && roleHint) {
                roleHint.innerHTML = `
                    <div class="alert alert-info mt-2 small" style="background: #1e293b; border-color: #3b82f6;">
                        <i class="bi bi-person-badge"></i> 
                        <strong>${AuthManager.getRoleDisplayName(user.role)}</strong><br>
                        <small>${user.fullName} - ${user.department}</small>
                    </div>
                `;
            } else if (roleHint) {
                roleHint.innerHTML = '';
            }
        });
    }

    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            
            if (loginBtn) {
                loginBtn.disabled = true;
                loginBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Authenticating...';
            }
            
            setTimeout(() => {
                const success = AuthManager.login(username, password);
                
                if (success) {
                    const user = AuthManager.getCurrentUser();
                    errorAlert.style.display = 'none';
                    alert(`Welcome ${user.fullName}!\nRole: ${AuthManager.getRoleDisplayName(user.role)}\nRedirecting to dashboard...`);
                    window.location.href = 'index.html';
                } else {
                    errorAlert.style.display = 'block';
                    if (loginBtn) {
                        loginBtn.disabled = false;
                        loginBtn.innerHTML = '<i class="bi bi-shield-lock"></i> Login';
                    }
                    loginForm.classList.add('animate__animated', 'animate__shakeX');
                    setTimeout(() => {
                        loginForm.classList.remove('animate__animated', 'animate__shakeX');
                    }, 500);
                }
            }, 800);
        });
    }
});