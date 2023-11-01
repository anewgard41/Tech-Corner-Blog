const newFormHandler = async (event) => {
    event.preventDefault();
    // Collect values from the new post form
    const title = document.querySelector("input[name='post-title']").value;
    const body = document.querySelector("textarea[name='post-body']").value;
    // Send a POST request to the API endpoint. If successful, redirect to the dashboard page. Otherwise, display the error.
   if (title && body) {
       const response = await fetch(`/api/posts`, {
           method: 'POST',
           body: JSON.stringify({
               title,
               body
           }),
           headers: {
               'Content-Type': 'application/json'
           }
       });
       if (response.ok) {
           document.location.replace('/dashboard');
       } else {
           alert(response.statusText);
       }
   }
};

document
    .querySelector('.new-post-form')
    .addEventListener('submit', newFormHandler);