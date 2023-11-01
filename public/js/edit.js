// Initiated by clicking the edit button on a post
const postId = document.querySelector('input[name="post-id"]').value;

const editFormHandler = async function(event) {
    event.preventDefault();

    const title = document.querySelector('input[name="post-title"]').value;
    const body = document.querySelector('textarea[name="post-body"]').value;

    await fetch(`/api/posts/${postId}`, {
        method: 'PUT',
        body: JSON.stringify({
            title,
            body
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    document.location.replace('/dashboard');
};

// Initiated by clicking the delete button on a post

const deleteClickHandler = async function() {
    await fetch(`/api/posts/${postId}`, {
        method: 'DELETE',
    });

    document.location.replace('/dashboard');
};

document
    .querySelector('#edit-post-form')
    .addEventListener('submit', editFormHandler);

document
    .querySelector('#delete-btn')
    .addEventListener('click', deleteClickHandler);

// Initiated by clicking the delete button on a comment

const deleteCommentHandler = async function(event) {
    if (event.target.hasAttribute('data-id')) {
        const id = event.target.getAttribute('data-id');

        await fetch(`/api/comments/${id}`, {
            method: 'DELETE'
        });

        document.location.reload();
    }
};

document
    .querySelector('.comment-list')
    .addEventListener('click', deleteCommentHandler);



