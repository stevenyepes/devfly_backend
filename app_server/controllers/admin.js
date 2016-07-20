/* GET 'administrator' page */
module.exports.admin = function(req, res) {
    /* Render the view admin and the second argument is
     * An object, it can be a Json object or an array
     * Try to change the title or add some other information */
    res.render('admin', {});
};
