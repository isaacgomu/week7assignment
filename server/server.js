import express from "express";
import cors from "cors";
import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const connectionString = process.env.DATABASE_URL;
const db = new pg.Pool({ connectionString: connectionString });

app.get("/", (request, response) => {
  response.json("Root Route.");
});

app.get("/blog", async (request, response) => {
  const result = await db.query(`
  SELECT
  blogUsers.name,
  blogPosts.postText,
  ARRAY_AGG(DISTINCT categories.category) AS categories
FROM
  blogUsers
JOIN
  blog_junction ON blogUsers.id = blog_junction.blogUser_id
JOIN
  blogPosts ON blog_junction.blogPost_id = blogPosts.id
JOIN
  categories ON blog_junction.category_id = categories.id
GROUP BY
  blogUsers.name, blogPosts.postText;
  `);
  response.json(result.rows);
});

app.post("/blog", async (request, response) => {
  const { name, message, category } = request.body;
  const userQuery = await db.query(
    `INSERT INTO blogUsers (name) VALUES ($1) RETURNING id`,
    [name]
  );
  const userId = userQuery.rows[0].id;
  const postQuery = await db.query(
    `INSERT INTO blogPosts (postText) VALUES ($1) RETURNING id`,
    [message]
  );
  const postId = postQuery.rows[0].id;
  const categoryQuery = await db.query(
    `SELECT id FROM categories WHERE category = $1 LIMIT 1`,
    [category]
  );
  const categoryId = categoryQuery.rows[0].id;

  await db.query(
    `INSERT INTO blog_junction (blogUser_id, blogPost_id, category_id) VALUES ($1, $2, $3)`,
    [userId, postId, categoryId]
  );

  response.json({ success: true });
});

app.listen(8080, () => console.log("I am running on 8080"));
