window.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');
    const id = params.get('id');
    const messageElement = document.getElementById('message');
    const verifyButton = document.getElementById('verifyButton');

    if (!token || !id) {
        messageElement.textContent = 'Invalid verification link';
        messageElement.classList.add('error');
        verifyButton.disabled = true;
        return;
    }

    verifyButton.addEventListener('click', async () => {
        try {
            verifyButton.disabled = true;
            messageElement.textContent = 'Verifying your email...';

            const response = await fetch('http://localhost:8000/auth/verify', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "id": id,
                    "token": token
                })
            });

            const data = await response.json();

            if (data.error) {
                throw new Error(data.error.message);
            }

            messageElement.textContent = data.result || "Email verified successfully!";
            messageElement.classList.add('success');
            verifyButton.style.display = 'none';

            setTimeout(() => {
                window.location.href = '/login';
            }, 3000);

        } catch (error) {
            messageElement.textContent = error.message || 'Failed to verify email';
            messageElement.classList.add('error');
            verifyButton.disabled = false;
        }
    });
});
