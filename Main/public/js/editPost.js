const postId = document.querySelector('input[name="post-id"]').value;

const editFormHandler = async function (event) {
  event.preventDefault();

  const title = document.querySelector('input[name="post-title"]').value.trim();
  const body = document.querySelector('textarea[name="post-body"]').value.trim();
  const author = document.querySelector('input[name="post-author"]').value.trim() || 'Anonymous';

  if (title && body) {
    try {
      const response = await fetch(`/api/posts/${postId}`, {
        method: 'PUT',
        body: JSON.stringify({
          title,
          body,
          author,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert('Failed to update post');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to update post');
    }
  } else {
    alert('Please fill out both the title and body fields');
  }
};

const deleteClickHandler = async function () {
  try {
    const response = await fetch(`/api/posts/${postId}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to delete post');
    }
  } catch (error) {
    console.error('Error:', error);
    alert('Failed to delete post');
  }
};

document
  .querySelector('#edit-post-form')
  .addEventListener('submit', editFormHandler);
document
  .querySelector('#delete-btn')
  .addEventListener('click', deleteClickHandler);
