-- Active: 1696860492120@@127.0.0.1@3306

CREATE TABLE users(
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    nickname TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    role TEXT NOT NULL,
    created_at TEXT DEFAULT(DATETIME()) NOT NULL 
);

CREATE TABLE posts(
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    creator_id TEXT NOT NULL,
    content TEXT NOT NULL,
    likes INTEGER DEFAULT (0) NOT NULL,
    dislikes INTEGER DEFAULT (0) NOT NULL,
    comments INTEGER DEFAULT (0) NOT NULL,
    created_at TEXT DEFAULT(DATETIME()) NOT NULL,
    updated_at TEXT DEFAULT(DATETIME()) NOT NULL,
    FOREIGN KEY (creator_id) REFERENCES users(id)
        ON UPDATE CASCADE
        ON DELETE CASCADE
);


CREATE TABLE comments(
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    id_post TEXT NOT NULL,
    creator_id TEXT NOT NULL,
    message TEXT NOT NULL,
    likes INTEGER DEFAULT (0) NOT NULL,
    dislikes INTEGER DEFAULT (0) NOT NULL,
    created_at TEXT DEFAULT(DATETIME()) NOT NULL,
    updated_at TEXT DEFAULT(DATETIME()) NOT NULL,
    FOREIGN KEY (id_post) REFERENCES posts(id)
        ON UPDATE CASCADE
        ON DELETE CASCADE
    FOREIGN KEY (creator_id) REFERENCES users(id)
        ON UPDATE CASCADE
        ON DELETE CASCADE
);


CREATE TABLE likes_dislikes(
    user_id TEXT NOT NULL,
    post_id TEXT NOT NULL,
    like INTEGER NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
        ON UPDATE CASCADE
        ON DELETE CASCADE,
    FOREIGN KEY (post_id) REFERENCES posts(id)
        ON UPDATE CASCADE
        ON DELETE CASCADE
);

INSERT INTO users (id, nickname, email, password, role)
VALUES 
    ('u01', '@fulaninha', 'fufu@email.com', '$2a$12$kYh8KFIG7LKB0tCa7QJTBOBOn8/I6zzNcgQ4X8hyTQI.2rgAffpWO', 'NORMAL'), /*123456*/
    ('u02', '@bel', 'bel@email.com', '$2a$12$VSFxFt8K6Wog542mH8psbuL.CaZDah2gGGtrxKrJ48ms5EgxhwN2y', 'ADMIN'),/*osaetij*/
    ('u03', '@si', 'sisi@email.com', '$2a$12$.CvvRUD4fsijWNla11m7/.xtwO3favDAvYix/HMx6KapkgkooR7pq', 'NORMAL');/*sisi123*/

INSERT INTO posts(id, creator_id, content)
VALUES
    ('p01', 'u02', 'Com o avanço da tecnologia, são muitas as opções de cursos e bootcamps que encontramos na internet, com diversos conteúdos e tecnologias pra serem aprendidas, Mas o que o mercado de trabalho mais tem pedido como experiência? O que mais vale a pena aprender, React, Angular, Vue...? Front ou backend?'),
    ('p02', 'u03', 'Muitas pessoas terminam um bootcamp de desenvolvimento web full-stack já sabendo que caminho vai seguir. Outras, ficam nessa dúvida. O que você acha? Deixem seus comentários!!');

INSERT INTO comments (id, id_post, creator_id, message)
VALUES
    ('c1', 'p02', 'u03', 'Escolhi aquilo para o qual estudei: full-stack! Foi um ano me dedicando a isso, não vejo sentido em ir só pra um ou só pra outro!'),
    ('c2', 'p02', 'u01', 'Já eu vejo sentido em escolher um dos três. Muitas pessoas se identificam mais com um do que com outro, seja por dificuldades/facilidades ou por gosto.');

SELECT * FROM posts;
SELECT * FROM users;
SELECT * FROM comments;
SELECT * FROM likes_dislikes;

DROP TABLE users;
DROP TABLE posts;
DROP TABLE comments;
DROP TABLE likes_dislikes;
    