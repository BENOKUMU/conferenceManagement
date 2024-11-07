import jwt from 'jsonwebtoken';

const generateToken = (userId, role) => {
  const payload = { userId, role };
  const secretKey = process.env.JWT_SECRET || 'your_secret_key';
  const options = { expiresIn: '1h' }; // Token expires in 1 hour
  return jwt.sign(payload, secretKey, options);
};

export default generateToken;