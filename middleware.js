var cryptojs = require('crypto-js');
module.exports = function(db) {

	// middleware is run before regular route handler,
	// when next is called, it moves into thr route handler function
	// If next isn't called, private code is never run
	return {
		requireAuthentication: function(req, res, next) {
			var token = req.get('Auth') || '';

			//token table is basically for users currently logged in
			//First we look to see if the token is valid
			//Then we check to see if the token is linked to a user 
			db.token.findOne({
				where: {
					tokenHash: cryptojs.SHA1(token).toString()
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