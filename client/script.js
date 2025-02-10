const submitButton = document.getElementById("submitPost");
const titleInput = document.getElementById("title");
const contentInput = document.getElementById("content");
const categoryInput = document.getElementById("category");
const authorInput = document.getElementById("author");
const postsListDiv = document.getElementById("postsList");
const toggleThemeButton = document.getElementById("toggle-theme");

async function fetchPosts() {
  const response = await fetch("http://localhost:5000/api/posts");
  const posts = await response.json();
  const postsList = document.getElementById("postsList");
  postsList.innerHTML = "";

  posts.forEach((post) => {
    const postItem = document.createElement("li");
    postItem.innerHTML = `
      <h3>${post.title}</h3>
      <p>${post.content}</p>
      <small><i>Category: ${post.category}, Author: ${post.author}</i></small>
      <button onclick="editPost(${post.id})">Edit</button>
      <button onclick="deletePost(${post.id})">Delete</button>
    `;
    postsList.appendChild(postItem);
  });
}

async function createPost() {
  const newPost = {
    title: titleInput.value,
    content: contentInput.value,
    category: categoryInput.value,
    author: authorInput.value,
  };

  const response = await fetch("http://localhost:5000/api/posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newPost),
  });

  const createdPost = await response.json();
  fetchPosts();
}

async function editPost(id) {
  const updatedPost = {
    title: prompt("Enter new title:"),
    content: prompt("Enter new content:"),
    category: prompt("Enter new category:"),
  };

  await fetch(`http://localhost:5000/api/posts/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedPost),
  });

  fetchPosts();
}

async function deletePost(id) {
  await fetch(`http://localhost:5000/api/posts/${id}`, {
    method: "DELETE",
  });

  fetchPosts();
}

submitButton.addEventListener("click", createPost);

toggleThemeButton.addEventListener("click", () => {
  document.body.classList.toggle("light-mode");
});

fetchPosts();
