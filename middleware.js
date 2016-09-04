var cryptojs = require('crypto-js');
module.exports = function(db) {

	// middleware is run before regular route handler,
	// when next is called, it moves into thr route handler function
	// If next isn't called, private code is never run
	return {
		requireAuthentication: function(req, res, next) {
			var token = req.get('Auth') || '';

			db.token.findOne({
				where: {
					tokenHash: cryptojs.MD5(token).toString()
				}
			}).then(function(tokenInstance) {
				if (!tokenInstance) {
					throw new Error();
				}

				req.token = tokenInstance;
				return db.user.findByToken(token);
			}).then(function(user) {
				req.user = user;
				next();
			}).catch(function function_name(e) {
				res.status(401).send();
			});
		}
	}
}