## Feature

 - **Feed functionality:** 
Allows users to like/unlike a feed & add commnets on a feed

- user can view code functionality for
- how to create a feed  
- like/unlike a feed
- add commnets on a feed

# Installation/Setup

- git clone https://github.com/Chirag5612/feed-feature.git
- cd feed-feature
- npm install
- Prepare the environment variables by generating .env file just as .env.sample file
- npm run start:dev

## Deployment/Production Setup

- npm run build
- npm run start

- Deploy the build with firebase hosting / vercel /Ec2

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

`APP_SUCCESS_MESSAGE, APP_ERROR_MESSAGE, APP_DELETE_MESSAGE, APP_GET_MESSAGE, APP_CHANGE_STATUS_MESSAGE:`

* Description: Messages used in the application for various operations.
* Mock Example: `refer .env.sample`

----
