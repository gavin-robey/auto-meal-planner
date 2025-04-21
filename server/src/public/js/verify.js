window.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');
    const id = params.get('id');
    const messageElement = document.getElementById('message');
    const verifyButton = document.getElementById('verifyButton');

    if (!token || !id) {
        messageElement.textContent = 'Invalid verification link';
        verifyButton.disabled = true;
        return;
    }

    verifyButton.addEventListener('click', async () => {
        try {
            verifyButton.disabled = true;
            messageElement.textContent = 'Verifying your email...';

            const response = await fetch('http://localhost:8000/auth.verify', {
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

            messageElement.textContent = "Email verified successfully!";
            verifyButton.style.display = 'none';

        } catch (error) {
            messageElement.textContent = 'Failed to verify email';
            verifyButton.disabled = false;
        }
    });
});
