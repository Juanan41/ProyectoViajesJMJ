const fs = require("fs");
const pathStr =
  "c:/Users/mgm22/Desktop/implementacion/ProyectoViajesJMJ-backend-actual/src/main/resources/data.sql";
let content = fs.readFileSync(pathStr, "utf8");

// Replace the columns
content = content.replace(
  /INSERT INTO destinos \(nombre, descripcion, precio, pais, continente_id\) VALUES/g,
  "INSERT INTO destinos (nombre, descripcion, precio, pais, imagen, continente_id) VALUES",
);

const imageUrls = [
  "https://images.unsplash.com/photo-1506744626753-1fa44df31c7f?q=80&w=2000",
  "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?q=80&w=2000",
  "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2000",
  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=2000",
  "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2000",
  "https://images.unsplash.com/photo-1501594907352-04cda38eb2f7?q=80&w=2000",
  "https://images.unsplash.com/photo-1518684079-3c830dcef090?q=80&w=2000",
];

function getRandomImage() {
  return imageUrls[Math.floor(Math.random() * imageUrls.length)];
}

const blocks = content.split(
  "INSERT INTO destinos (nombre, descripcion, precio, pais, imagen, continente_id) VALUES",
);
let newContent = blocks[0];

for (let i = 1; i < blocks.length; i++) {
  // blocks[i] contains tuples like:
  // ('name', 'desc', 99.9, 'country', 1),
  // ('name2', 'desc2', 99.9, 'country2', 1);
  let block = blocks[i];
  // stop processing this block if we see the end of the query (a semicolon)
  let regex = /\(([^;]+?)\)/g;
  let inQuery = true;

  // Actually simpler: just find all (..., continente_id) and insert the image URL before the last integer if followed by , or ;

  // A regex to match a tuple: ( '...', ..., ..., ..., <integer> )
  // The last value is the continente_id
  let parsedBlock = block.replace(
    /\n\s*\((.*?),\s*(\d+)\s*\)/g,
    (match, prefix, contId) => {
      let img = getRandomImage();
      return `\n    (${prefix}, '${img}', ${contId})`;
    },
  );

  newContent +=
    "INSERT INTO destinos (nombre, descripcion, precio, pais, imagen, continente_id) VALUES" +
    parsedBlock;
}

fs.writeFileSync(pathStr, newContent, "utf8");
console.log("Done modifying data.sql");
