/* GET 'about' page */
module.exports.about = function(req, res) {
    /*Render the view index and the second argument is */
    /* An object, it can be a Json object or an array*/
    /* Try to change the title or add some other information */
    res.render('index', {title: "About Page"});
};
