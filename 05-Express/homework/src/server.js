const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

let posts = [];

app.post('/posts', (req, res) => {
  const { title, contents } = req.body;

  if (!title || !contents) {
    return res.status(400).json({ error: "No se recibieron los parámetros necesarios para crear el Post" });
  }

  const id = Date.now();
  const newPost = {
    id,
    title,
    contents
  };

  posts.push(newPost);

  return res.json(newPost);
});

app.get('/posts', (req, res) => {
  const { term } = req.query;

  if (term) {
    const filteredPosts = posts.filter(post =>
      post.title.includes(term) || post.contents.includes(term)
    );
    return res.json(filteredPosts);
  }

  return res.json(posts);
});

app.put('/posts', (req, res) => {
  const { id, title, contents } = req.body;

  if (!id || !title || !contents) {
    return res.status(400).json({ error: "No se recibieron los parámetros necesarios para modificar el Post" });
  }

  const existingPost = posts.find(post => post.id === id);

  if (!existingPost) {
    return res.status(404).json({ error: "No existe un post con el ID proporcionado" });
  }

  existingPost.title = title;
  existingPost.contents = contents;

  return res.json(existingPost);
});

app.delete('/posts', (req, res) => {
  const { id } = req.body;

  if (!id) {
    return res.status(400).json({ error: "No se proporcionó un ID válido para eliminar el Post" });
  }

  const index = posts.findIndex(post => post.id === id);

  if (index === -1) {
    return res.status(404).json({ error: "No existe un post con el ID proporcionado" });
  }

  posts.splice(index, 1);

  return res.json({ success: true });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});


module.exports = { posts, server };
