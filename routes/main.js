module.exports = function(app, shopData) {

    // Handle our routes
    // home page
    app.get('/',function(req,res){
        res.render('index.ejs', shopData)
    });
    //about page
    app.get('/about',function(req,res){
        res.render('about.ejs', shopData);
    });
    //search page
    app.get('/search',function(req,res){
        res.render("search.ejs", shopData);
    });
    //search result page
    // Construct the search term for the SQL LIKE query
    // By wrapping the keyword with % wildcards
    // It will match partial string matches 
    app.get('/search-result', function (req, res) {
        let keyword = req.query.keyword;
        let sql = "SELECT * FROM books WHERE name LIKE ?";
        let searchTerm = '%'+keyword+'%';
        db.query(sql, [searchTerm], (err, result) => {
            if (err) throw err;
            let searchData = Object.assign({}, shopData, {books: result});
            res.render("search-results.ejs", searchData);
        });
    });
    //register page
    app.get('/register', function (req,res) {
        res.render('register.ejs', shopData);                                                                     
    });
    //process registration                                                                                         
    app.post('/registered', function (req,res) {
        // saving data in database
        res.send(' Hello '+ req.body.first + ' '+ req.body.last +' you are now registered!  We will send an email to you at ' + req.body.email);                                                                              
    });
    // add book page
    app.get('/addbook', function (req,res) {
        res.render('addbook.ejs', shopData);                                                                     
    });
    //insert book into database                                                                                                 
    app.post('/bookadded', function (req,res) {
        // saving data in database
        let sqlquery = "INSERT INTO books (name, price) VALUES (?,?)";
        // execute sql query
        let newrecord = [req.body.name, req.body.price];
        db.query(sqlquery, newrecord, (err, result) => {
            if (err) {
                return console.error(err.message);
            }
            else {
                res.send(' This book is added to database, name: ' + req.body.name + ' price '+ req.body.price);
            }
        });
    }); 
    //list all books page   
    app.get('/list', function(req, res) {
        let sqlquery = "SELECT * FROM books"; // query database to get all the books
        // execute sql query
        db.query(sqlquery, (err, result) => {
            if (err) {
                res.redirect('./'); 
            }
            let newData = Object.assign({}, shopData, {availableBooks:result});
            console.log(newData)
            res.render("list.ejs", newData)
        });
    });
    //bargain books page
    // Code to query and display bargain books
    app.get('/bargainbooks', function(req, res) {
        let sql = "SELECT * FROM books WHERE price < 20"; // query database to get all the books under 20
        db.query(sql, (err, result) => {
            if (err) throw err;
            let bargainData = Object.assign({}, shopData, {bargainBooks:result});
            res.render("bargainbooks.ejs", bargainData);
        });
    });
}
