
/* GET 'home' page */
module.exports.homelist = function(req, res) {
    /* Render the view index and the second argument is
     * An object, it can be a Json object or an array
     * Try to change the title or add some other information */
    res.render('index', {title: "DevFly-production"});
};
