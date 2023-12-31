// Define an asynchronous function called 'signupFormHandler' to handle the submission of the signup form.
const signupFormHandler = async (event) => {
    // Prevent the default form submission behavior to handle it with JavaScript.
    event.preventDefault();
  
    // Collect values from the signup form
    const username = document.querySelector('#username-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();
  
    if (username && password) {
      // Send a POST request to the '/api/user' endpoint with the new user's data.
      const response = await fetch('/api/user', {
        method: 'POST',
        body: JSON.stringify({
          username,
          password
        }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      // Check if the response from the server is successful (HTTP status code 200).
      if (response.ok) {
        // If the user signup is successful, redirect the browser to the user's experiences page.
        document.location.replace('/dashboard');
      } else {
        // If there's an error in user signup, show an alert with the error message.
        alert(response.statusText);
      }
    }
  };
  
  // Add a submit event listener to the signup form to trigger the 'signupFormHandler' function.
  document
    .querySelector('.signup-form')
    .addEventListener('submit', signupFormHandler);  