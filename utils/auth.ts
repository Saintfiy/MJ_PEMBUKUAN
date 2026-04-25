import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret-key';

export const generateToken = (payload: Record<string, any>) => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
};

export const verifyToken = (token: string) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return null;
  }
};

export const generateRefreshToken = (userId: string) => {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: '30d' });
};

export const mock2FA = (email: string) => {
  // Mock 2FA - generates a random 6-digit code
  const code = Math.floor(100000 + Math.random() * 900000).toString();
  console.log(`2FA Code for ${email}: ${code}`);
  return code;
};

export const verify2FACode = (code: string, storedCode: string) => {
  return code === storedCode;
};
