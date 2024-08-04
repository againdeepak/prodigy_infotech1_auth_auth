function sendPostRequest() {
    // Create a form element
    const form = document.createElement('form');
    form.method = 'POST';
    form.action = '/logout';

    // Add any hidden input fields if necessary
    // For example, a CSRF token
    const hiddenField = document.createElement('input');
    hiddenField.type = 'hidden';
    hiddenField.name = 'csrfToken';
    hiddenField.value = 'your_csrf_token_here';
    form.appendChild(hiddenField);

    // Append the form to the body
    document.body.appendChild(form);

    // Submit the form
    form.submit();
}