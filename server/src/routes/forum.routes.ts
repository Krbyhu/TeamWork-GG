import { Router } from 'express';
import { forumList, getID, newPost} from '../controllers/forum.controller';
import { tokenValidation } from '../lib/verifyToken';

const router = Router();

router.route('/')
    .get(tokenValidation,forumList)
router.route('/new')
    .get(tokenValidation, getID)
    .post(tokenValidation, newPost)
    
export default router;