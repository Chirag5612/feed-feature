import { Router } from 'express';

import { authUser } from '../middleware/user-guard';

// import decMiddleware from "../helper/decryptData";

// Controllers
import profileService from '../controllers/users/profile';
import authUserService from '../controllers/users/auth';
import templateService from '../controllers/users/adminTemplate';
import cardsService from '../controllers/users/card';
import bookingVenueService from '../controllers/users/bookingVenue';
import venueService from '../controllers/users/venue';
import wishlistService from '../controllers/users/wishlist';
import reviewService from '../controllers/users/rating';
import userFeedService from '../controllers/users/feed';
import slotService from '../controllers/users/slotMange'
// Validation
import userAuthValidation from '../validation/user/auth-validation';
import cardValidation from '../validation/user/card-validation';
import commonValidation from '../validation/common-validation';
import stripe from '../controllers/admin/stripe';
import multer from 'multer';

// Constants
const userRouter = Router();

const upload = multer({ dest: 'uploads/' });

userRouter.get('/', (req: any, res: any) => {
  res.send('Hello World!123');
});

// user NoAuth Route Start
userRouter.post('/login', userAuthValidation.login, authUserService.login);
userRouter.post('/register', userAuthValidation.register, authUserService.register);
userRouter.post('/social-login', authUserService.socialLogin);
userRouter.post('/verify-phone', authUserService.verifyMobile);
userRouter.post('/verify-otp', userAuthValidation.verifyOtp, authUserService.verifyUser);
userRouter.post('/forget-password', userAuthValidation.emailValidation, authUserService.forgetPassword);
userRouter.post('/reset-password', userAuthValidation.resetPassword, authUserService.resetPassword);

// Protected Routes
userRouter.post('/change-password', userAuthValidation.changePassword, authUser, profileService.changePassword);
userRouter.post('/edit-profile', authUser, profileService.editProfile);
userRouter.post('/logout', authUser, profileService.logout);
userRouter.post('/deactivate', authUser, profileService.deactivateAccount);
userRouter.post('/checkExist', authUser, authUserService.checkEmailMobileExists);

// Admin Template GEt
userRouter.post('/admin-template', authUser, templateService.getTemplates);

userRouter.post('/notification-get', authUser, profileService.getNotification);
userRouter.post('/notification-status-change', authUser, profileService.notificationStatusChange);
userRouter.post('/notification-clear', authUser, profileService.clearNotification);
userRouter.post('/notification-read', authUser, profileService.readNotification);
userRouter.post('/notification-count', authUser, profileService.unReadNotification);
userRouter.post('/notification-demo', authUser, profileService.setNotification);

// Venue Routes
userRouter.post('/get-venues', authUser, venueService.get);
userRouter.post('/get-venues-filter', authUser, venueService.geWithFilter);
userRouter.post('/venue-details',authUser,venueService.getVenueDetail);

// Venue WishList Routes
userRouter.post('/add-whishlist', authUser, wishlistService.store);
userRouter.post('/get-whishlist',authUser, wishlistService.getAll)

// Card Method
userRouter.get('/card/get', authUser, cardsService.getAll);
userRouter.get('/card/get-by-id', authUser, commonValidation.idRequiredQuery, cardsService.getCard);
userRouter.post('/card/store', authUser, cardValidation.store, cardsService.store);
userRouter.delete('/card/delete', authUser, commonValidation.idRequiredQuery, cardsService.destroy);

// Booking Service
userRouter.post('/booking/remainder', authUser, bookingVenueService.sendRemainder);
userRouter.post('/booking-venue/store', authUser, bookingVenueService.store);
userRouter.post('/booking/get', authUser, bookingVenueService.getBookingBySlot);
userRouter.post('/schedule-get', authUser, bookingVenueService.getbyFilters);
userRouter.post('/booking-details', authUser, bookingVenueService.getDetails);
userRouter.post('/checkout',authUser,stripe.stripeCheckoutSession);
userRouter.get('/checkout-expire/:session_id',stripe.expireCheckoutSession);
userRouter.get('/order/success',stripe.handleCheckoutSuccess);

// Review Service
userRouter.post('/add-review', authUser, reviewService.store);
userRouter.post('/get-reviews',authUser,reviewService.getRatings);

//user-feed
userRouter.post('/add-feed',authUser,userFeedService.storeFeed);
userRouter.post('/get-feed',authUser,userFeedService.getFeed);

//user-feed-comment
userRouter.post('/add-feed-comment',authUser,userFeedService.storeComment);
userRouter.post('/get-feed-comment',authUser,userFeedService.getFeedComment);

//user feed like 
userRouter.post('/feed-like',authUser,userFeedService.getFeedLike);

//get slot 
userRouter.post('/checkout/slot-time', authUser, slotService.getSlotTimeAvailable);
userRouter.post('/checkout/slot-duration', authUser, slotService.getSlotDuration);
userRouter.post('/get-slot',authUser,slotService.getSlot);

// upload pdf
// userRouter.post('/upload', authUser, upload.any(), slotService.uploadPdf)

// Export default
export default userRouter;
