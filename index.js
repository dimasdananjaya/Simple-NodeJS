const express = require("express");
const mysql = require("mysql");
//use path module
const path = require("path");
//use ejs view engine
const hbs = require("hbs");
//use bodyParser middleware
const bodyParser = require("body-parser");

const app = express();

//connection

const database = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "simplenodemysql",
  multipleStatements: true
});

//Connect
database.connect(err => {
  if (err) {
    throw err;
  }
  console.log("MySQL Terhubung");
});

//set views file
app.set("views", path.join(__dirname, "views"));
//set view engine
app.set("view engine", "hbs");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//set public folder as static folder for static file
app.use("/public", express.static(__dirname + "/public"));

//////////////// ROUTING ///////////////////////////////////////////////////////////

//route for home page
app.get("/home", (req, res) => {
  let sql = "select * from product";
  let query = database.query(sql, (err, results) => {
    if (err) throw err;
    res.render("product_view", {
      results: results
    });
  });
});

//route for user product
app.get("/user_product", (req, res) => {
  let sql = "select * from product";
  let query = database.query(sql, (err, results) => {
    if (err) throw err;
    res.render("user_product", {
      results: results
    });
  });
});

//ini untuk foreach kalau mau 2 tabel dalam 1 page pakai array dan multiplestatement (liat atas)
app.get("/manage_users", (req, res) => {
  let sql = "select * from users";
  let query = database.query(sql, (err, results) => {
    if (err) throw err;
    res.render("manage_users", {
      data_user: results
      //data_produk: results[1]
    });
  });
});

//////////////// END ROUTING ///////////////////////////////////////////////////////////
//route for insert new user

app.post("/save_user", (req, res) => {
  let data = {
    username: req.body.username,
    password: req.body.password,
    role: req.body.role,
    status: "active"
  };

  let sql = "INSERT INTO users SET?";
  let query = database.query(sql, data, (err, results) => {
    if (err) throw err;
    res.redirect("/manage_users");
  });
});

//route for update user data
app.post("/update_user", (req, res) => {
  let sql =
    "UPDATE users SET username='" +
    req.body.username +
    "', password='" +
    req.body.password +
    "', role='" +
    req.body.role +
    "', status='" +
    req.body.status +
    "' WHERE id_user=" +
    req.body.id_user;
  let query = database.query(sql, (err, results) => {
    if (err) throw err;
    res.redirect("/manage_users");
  });
});

//route for delete data users
app.post("/delete_user", (req, res) => {
  let sql = "DELETE FROM users WHERE id_user=" + req.body.id_user;
  let query = database.query(sql, (err, results) => {
    if (err) throw err;
    res.redirect("/manage_users");
  });
});

//////////////// CRUD PRODUCT ///////////////////////////////////////////////////////////
//route for insert product data
app.post("/save", (req, res) => {
  let data = {
    product_name: req.body.product_name,
    product_price: req.body.product_price,
    product_desc: req.body.product_desc
  };
  let sql = "INSERT INTO product SET ?";
  let query = database.query(sql, data, (err, results) => {
    if (err) throw err;
    res.redirect("/home");
  });
});

//route for update data
app.post("/update", (req, res) => {
  let sql =
    "UPDATE product SET product_name='" +
    req.body.product_name +
    "', product_price='" +
    req.body.product_price +
    "', product_desc='" +
    req.body.product_desc +
    "' WHERE id_product=" +
    req.body.id_product;
  let query = database.query(sql, (err, results) => {
    if (err) throw err;
    res.redirect("/home");
  });
});

//route for delete data
app.post("/delete", (req, res) => {
  let sql = "DELETE FROM product WHERE id_product=" + req.body.id_product;
  let query = database.query(sql, (err, results) => {
    if (err) throw err;
    res.redirect("/home");
  });
});

app.listen("3000", () => {
  console.log("Server Started On Port 3000");
});

//////////////// END CRUD PRODUCT ///////////////////////////////////////////////////////////

//////////////// CRUD USERS ///////////////////////////////////////////////////////////

//////////////// END CRUD PRODUCT ///////////////////////////////////////////////////////////

/**ignore

app.get("/tambahMahasiswa1", (req, res) => {
  let dataMahasiswa = {
    NIM: 1,
    nama: "Dimas",
    jurusan: "Sistem Informasi",
    konsentrasi: "Information System Developer"
  };
  let sql = "INSERT INTO mahasiswa set ?";
  let query = database.query(sql, dataMahasiswa, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("data tersimpan");
  });
});

app.get("/tambahMahasiswa2", (req, res) => {
  let dataMahasiswa = {
    NIM: 2,
    nama: "Dimas",
    jurusan: "Sistem Informasi",
    konsentrasi: "Information System Developer"
  };
  let sql = "INSERT INTO mahasiswa set ?";
  let query = database.query(sql, dataMahasiswa, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("data tersimpan");
  });
});

app.get("/hapusMahasiswa", (req, res) => {
  let sql = "Delete from mahasiswa where NIM='1'";
  let query = database.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("data terhapus");
  });
});

//get mahasiswas
app.get('/getMahasiswa', (req, res) => {
  let sql = 'select * from mahasiswa';
  let query = database.query(sql, (err, result) => {
    if (err) throw err;
    console.log(results); //pake s karena banyak
    res.send('Data Mahasiswa Diambil');
  });
});


//select mahasiswa

app.get('/selectMahasiswa/:NIM', (req, res) => {
  const id = req.params.NIM;
  let sql = 'SELECT * FROM mahasiswa WHERE NIM = ' + id;
  let query = database.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send('1 Data Mahasiswa Diambil');
  });
});

app.get("/test", (req, res) => {

  res.send("success");

});


 */
//test

//create dataMahasiswa
