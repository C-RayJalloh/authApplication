import { ID, Account, Client } from 'appwrite'
// Importing necessary classes from the Appwrite SDK
// ID: Utility to generate unique IDs
// Account: Class to manage user accounts
// Client: Class to initialize the Appwrite client

import Config from 'react-native-config'
// Importing the configuration module to access the environment variables

import Snackbar from 'react-native-snackbar'
// Importing the Snackbar module for showing notifications in the app

const appwriteClient = new Client()
// Creating an instance of the Appwrite client

const APPWRITE_ENDPOINT: string = Config.API_ENDPOINT!;
// Defining a constant for the Appwrite endpoint URL from environment configuration

const APPWRITE_PROJECT_ID: string = Config.API_PROJECT_ID!;
// Defining a constant for the Appwrite project ID from environment configuration

// type definition for the user-account creation structure and for the login as well
type CreateUserAccount = {
    email: string;
    password: string;
    name: string;
}

type LoginUserAccount = {
    email: string;
    password: string;
}


// Declaring a class-level variable to hold the Account instance
class AppwriteService {
    account;

    // Configuring the Appwrite client with the endpoint and project ID
    constructor(){
        appwriteClient
        .setEndpoint(APPWRITE_ENDPOINT)
        .setProject(APPWRITE_PROJECT_ID)
        
        // Initializing the Account instance using the configured client
        this.account = new Account(appwriteClient)
    }

    // Method to create a new user account in Appwrite
    async createAccount({ email, password, name }: CreateUserAccount) {
        try {
            const userAccount = await this.account.create(
                ID.unique(),
                email,
                password,
                name
            )
            // Attempting to create a new user account with a unique ID, email, password, and name
            if (userAccount) {
                // If the account creation is successful, proceed to log the user in
                return this.login({ email, password })
            } else {
                // If the account creation failed, return the failed user account object
                return userAccount
            }
            // Show an error notification if account creation fails
        } catch (error) {
            Snackbar.show({
                text: String(error),
                // duration: Snackbar.LENGTH_LONG
            })

            // Log the error for debugging purposes
            console.log("Appwrite service :: createAccount() :: " + error);
        }
    }

    // Method to log in a user with their email and password
    async login({ email, password }: LoginUserAccount) {
        try {
            // Attempting to create an email session for user login
            return await this.account.createEmailPasswordSession(email, password)
            // Show an error notification if login fails
        } catch (error) {
            Snackbar.show({
                text: String(error),
                // duration: Snackbar.LENGTH_LONG
            })

            // Log the error for debugging purposes
            console.log("Appwrite service :: loginAccount() :: " + error);
        }
    }

    // Method to get the current logged-in user's details
    async getCurrentUser() {
        try {
            return await this.account.get()
            // Attempting to fetch the current logged-in user's details
        } catch (error) {
            console.log("Appwrite service :: getCurrentAccount() :: " + error);
            // Log the error if fetching the user details fails
        }
    }

    // Method to log out the current user
    async logout() {
        try {
            return await this.account.deleteSession('current')
            // Attempting to delete the current user's session (log out)
        } catch (error) {
            console.log("Appwrite service :: getCurrentAccount() :: " + error);
            // Log the error if logging out fails
        }
    }
}

export default AppwriteService
// Exporting the AppwriteService class as the default export of the module
