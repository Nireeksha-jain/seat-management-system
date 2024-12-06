import User from '../models/User.js';
import bcrypt from 'bcrypt';

const basicAuth = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).send('Access Denied');
  }

  const base64Credentials = authHeader.split(' ')[1];
  const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
  const [email, password] = credentials.split(':');

  const user = await User.findOne({ email });
  if (user && (await bcrypt.compare(password, user.password))) {
    req.user = user;
    next();
  } else {
    res.status(401).send('Invalid Credentials');
  }
};

export default basicAuth;