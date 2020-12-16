import { Router } from 'express';
import { signup, signin, profile, profileUpdate } from '../controllers/user.controller';
import { tokenValidation } from '../lib/verifyToken';

const router = Router();

router.route('/')
    .post(signin);
router.route('/register')
    .post(signup);
router.route('/profile/:id')
    .get(tokenValidation, profile)
    .put(tokenValidation, profileUpdate)


export default router;