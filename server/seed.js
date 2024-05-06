import Database from "better-sqlite3";

const db = new Database("database.db");

db.exec(`
create table if not exists
  blogUsers (id INTEGER PRIMARY KEY AUTOINCREMENT, name text);

create table if not exists
  blogPosts (id INTEGER PRIMARY KEY AUTOINCREMENT, postText text);

create table if not exists
  categories (id INTEGER PRIMARY KEY AUTOINCREMENT, category text);

create table if not exists
  blog_junction (
    blogUser_id int references blogUsers (id),
    blogPost_id int references blogPosts (id),
    category_id int references categories (id)
  );
`);

db.exec(`insert into
blogUsers (name)
values
('Isaac'),
('Krista'),
('Isaiah'),
('Henry'),
('Tyler');

insert into
blogPosts (postText)
values
('Hi I am Isaac'),
('Hi I am Krista'),
('hi am isaiah'),
('i love cheesecake'),
('i hate henry');

insert into
categories (category)
values
('Educational'),
('Community'),
('Appreciation'),
('Hatred');

insert into
blog_junction (blogUser_id, blogPost_id, category_id)
values
(1, 1, 2),
(2, 2, 2),
(3, 3, 2),
(4, 4, 3),
(5, 5, 4);`);
