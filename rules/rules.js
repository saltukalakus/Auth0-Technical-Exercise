function (user, context, callback) {
    if(context.clientID  !== 'exCXuPFOoJhVPlGTWaIAkHJgpVJeSKrF'){
      return callback(null, user, context);
    }

    var whitelist = [ 't.h.aia@outlook.com' ]; //authorized users
    var userHasAccess = whitelist.some(
      function (email) {
        return email === user.email;
      });

    if (!userHasAccess) {
      return callback(new UnauthorizedError('Access denied.'));
    }

    callback(null, user, context);
}