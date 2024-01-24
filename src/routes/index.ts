import { Router } from 'express';
import multer from 'multer';
import commonRouter from './common-router';
import userRouter from './user-router';
import ownerRouter from './owner-router';
import adminRouter from './admin-router';
import noAuthRouter from './no-auth-router';
import commonService from '../controllers/common/common';

// Export the base-router
const baseRouter = Router();
// Setup routers

const upload = multer({ dest: 'uploads/' });

// Routes for upload file & image related actions
baseRouter.post('/common/upload_image_multi', upload.array('files'), [commonService.uploadImageMulti]);
baseRouter.post('/common/upload_image', upload.array('files'), [commonService.uploadImage]);
baseRouter.post('/common/upload_video', upload.array('files'), [commonService.uploadVideo]);
baseRouter.post('/common/upload_file', upload.array('files'), [commonService.uploadFiles]);

// Routes for common operation related actions
baseRouter.use('/common', commonRouter);

// Routes for user-related actions
baseRouter.use('/user', userRouter);

// Routes for owner-related actions
baseRouter.use('/owner', ownerRouter);

// Routes for admin-related actions
baseRouter.use('/admin', adminRouter);

// Routes for no auth related actions
baseRouter.use('/', noAuthRouter);

// Export default.
export default baseRouter;
