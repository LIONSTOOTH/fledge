# Fledge

A job application tracker for the fledgling professional.

Try it out at: https://fledge.herokuapp.com/

## To Get Started

#### 1. Fork/clone this repo

#### 2. Set up your environment variables
Create .env file in the root of the directory containing the following:

GOOGLE_CLIENT_ID={YOUR CLIENT ID}
GOOGLE_CLIENT_SECRET={YOUR CLIENT SECRET}
LOCAL_GOOGLE_REDIRECT=http://127.0.0.1:2000/auth/google/callback

##### Google API
* Create a Google API key
* Enable Google Drive API
* Enable Google Calendar API
* Enable Google+ API
* Enable Google Picker API

##### OAuth 2.0 client ID
This is necessary to enable Google sign-in

Create a client ID from console.developers.google.com for OAuth 2.0 client IDs (https://developers.google.com/identity/sign-in/web/devconsole-project is a helpful tutorial), and add your new GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, and LOCAL_GOOGLE_REDIRECT variables to your .env file.

Inside Credentials, select the OAuth 2.0 client ID.
Under 'Authorized JavaScript origins', enter:
```http://127.0.0.1:2000```
Under 'Authorized redirect URIs', enter:
```http://127.0.0.1:2000/auth/google/callback```


To add (optional) restrictions to your Google API key:
From Credentials, select the api key.
Select HTTP referrers (web sites), under Application Restrictions
add the following urls to accept requests from these HTTP referrers:
```127.0.0.1:2000```

#### 3. Run the following from within the cloned repo:

``` npm install ```

Start your mongo database, server, and webpack

```mongod```

```npm start```

```npm run wp```

The app will run on http://127.0.0.1:2000
