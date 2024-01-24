## Feature

 - **Feed functionality:** 
Allows users to like/unlike a feed & add commnets on a feed

- user can view code functionality for
- how to create a feed  
- like/unlike a feed
- add commnets on a feed

# blok-backend


<br />
changes 
## Installation/Setup

- git clone https://github.com/hfxlabs/blok-backend.git
- cd blok-backend
- npm install
- Prepare the environment variables by generating .env file just as .env.sample file
- npm run start:dev

## Deployment/Production Setup

- npm run build
- npm run start

- Deploy the build with firebase hosting / vercel /Ec2

## Test Cases/Test Cases Setup

- npm run test
- npm run test:single

- Run test cases with jest

## [Environment Variables](#environment-variables)

The environment variables should be set in a '.env' file just as .env.sample file.



Follow .env.sample for making a .env file.

`BASE_URL:` !important

* Description: Base URL for the main application. 
* Mock Example: http://localhost:5005

`ADMIN_LINK:` !important

* Description:  Base URL for the admin Dashboard.. 
* Mock Example: http://localhost:5001

`NODE_ENV:` !important

* Description: Environment mode for the application (e.g., development, production, test).
* Mock Example: Mock Example: `development`

`APP_BASE_EMAIL_TEMP:`

* Description: Base path for email templates.
* Mock Example: `/views/templates/`

`APP_BASE_PATH:`

* Description: root path for the application.
* Mock Example: `/`

`DB_URI:` !important

* Description: MongoDB connection URI.
* Mock Example: `mongodb+srv://username:password@cluster-address/database`

`APP_NAME:`

* Description: Name of the application.
* Mock Example: `Blok App`

`PORT:`

* Description: Port number on which the application runs.
* Mock Example: `5005`

`algorithm`,`SecuritykeyEnc`,`SecuritykeyDec`,`initVectorEnc`,`algorithm`,`initVectorDec`

* Description: Encryption-related variables (algorithm, security keys, and initialization vectors).
* Mock Example: `you can get it from .env.smaple`

`JWT_SECRET:`

* Description: Secret key for JWT token generation and verification.
* Mock Example: `mysecretpassword`

`JWT_EXP:`

* Description: JWT token expiration time (in seconds).
* Mock Example: `3600 (for one hour)`

`REACT_APP_TINYMAC_KEY:`

* Description: API key for TinyMCE, a rich text editor for React applications.
* Mock Example:

`AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_S3_BUCKET_NAME::`

* Description: AWS credentials and S3 bucket name for file storage.
* Mock Example: `3600 (for one hour)`

`TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN:`

* Description: Twilio account credentials for SMS gateway.

`APP_SUCCESS_MESSAGE, APP_ERROR_MESSAGE, APP_DELETE_MESSAGE, APP_GET_MESSAGE, APP_CHANGE_STATUS_MESSAGE:`

* Description: Messages used in the application for various operations.
* Mock Example: `refer .env.sample`

`FIREBASE_TYPE`
* Description: account type used.

`FIREBASE_PROJECT_ID`
* Description: firebase project id.

`FIREBASE_PRIVATE_KEY_ID`
* Description: firebase private key id for notification.

`FIREBASE_CLIENT_EMAIL`
* Description: firebase client email address for notification.

`FIREBASE_CLIENT_ID`
* Description: firebase client id for notification.

`FIREBASE_AUTH_URI`
* Description: firebase auth url.

`FIREBASE_TOKEN_URI`
* Description: firebase token url for notification.

`FIREBASE_AUTH_PROVIDER_X509_CERT_URL`
* Description: firebase auth provider for notification.

`FIREBASE_CLIENT_X509_CERT_URL`
* Description: firebase client provider CERT url for notification.

`FIREBASE_UNIVERSE_DOMAIN`
* Description: firebase client universe domain for notification.

----

## List of 3rd party libraries and dependencies used in the project:

twilio:- to send generated OTP to the user
validatorjs:- API payload data validation
nodemailer-express-handlebars:- for mail template
multer: for image upload
morgan:- HTTP request logger middleware

### API Endpoints

- Documentation: [Link](https://documenter.getpostman.com/view/24182239/2s9XxsVGju)

### TODO
