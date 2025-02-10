const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

// In-memory store for blog posts (for simplicity, you can use a database later)
let blogPosts = [
  { id: 1, title: 'First Blog Post', content: 'This is the content of the first post.', category: 'Technology', author: 'Author1' },
  { id: 2, title: 'Second Blog Post', content: 'This is the content of the second post.', category: 'Lifestyle', author: 'Author2' }
];

// Get all blog posts
app.get('/api/posts', (req, res) => {
  res.json(blogPosts);
});

// Create a new blog post
app.post('/api/posts', (req, res) => {
  const { title, content, category, author } = req.body;
  const newPost = {
    id: blogPosts.length + 1,
    title,
    content,
    category,
    author
  };
  blogPosts.push(newPost);
  res.status(201).json(newPost);
});

// Edit an existing blog post
app.put('/api/posts/:id', (req, res) => {
  const { id } = req.params;
  const { title, content, category } = req.body;

  const post = blogPosts.find(p => p.id === parseInt(id));
  if (!post) return res.status(404).json({ error: 'Post not found' });

  post.title = title || post.title;
  post.content = content || post.content;
  post.category = category || post.category;

  res.json(post);
});

// Delete a blog post
app.delete('/api/posts/:id', (req, res) => {
  const { id } = req.params;
  blogPosts = blogPosts.filter(p => p.id !== parseInt(id));
  res.status(204).send();
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
