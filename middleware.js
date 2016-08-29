module.exports = function (db) {
	
	// middleware is run before regular route handler,
	// when next is called, it moves into thr route handler function
	// If next isn't called, private code is never run
	return {
		requireAuthentication: function (req, res, next) {
			var token = req.get('Auth');

			db.user.findByToken(token).then(function (user) {
				req.user = user;
				next();
			}, function (e) {
				// Incorrect security details
				res.status(401).send();
			});
		}
	}
}