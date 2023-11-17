// Initiated by clicking the edit button on a post
const postId = document.querySelector('input[name="post-id"]').value.trim();

const editFormHandler = async function (event) {
    console.log('Form submitted')
    event.preventDefault();
// Collect values from the edit post form
    const title = document.querySelector('input[name="post-title"]').value;
    const content = document.querySelector('textarea[name="post-content"]').value;
// Send a PUT request to the '/api/post/:id' endpoint with the updated post data.
    await fetch(`/api/post/${postId}`, { 
        method: 'PUT',
        body: JSON.stringify({
            title,
            content,
        }),
        headers: {
            'Content-Type': 'application/json',
        },
    });

    document.location.replace('/dashboard');
};

document.querySelector('#edit-post-form').addEventListener('submit', editFormHandler);

// Initiated by clicking the delete button on a post

const deleteClickHandler = async function() {
    await fetch(`/api/post/${postId}`, {
        method: 'DELETE',
    });

    document.location.replace('/dashboard');
};

document
    .querySelector('#delete-btn')
    .addEventListener('click', deleteClickHandler);