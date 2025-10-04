function authMiddleware(req, res, next){
    // console.log('Auth middle');
    // next();
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];
    console.log(token);
}

module.exports = authMiddleware;