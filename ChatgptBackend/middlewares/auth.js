import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const protect = async (req, res, next)=> {
    let token = req.headers.authorization;

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        const userId = decoded.id;

        const user = await User.findById(userId);

        if(!user){
            return res.status(401).json({message: "Unauthorized access"});
        }
        req.user = user;
        next();
        }
    
    catch(err) {
        return res.status(401).json({
            success: false,
            message: err.message || 'Unauthorized access'
        });
    }
}
