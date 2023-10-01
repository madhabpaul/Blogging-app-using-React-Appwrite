import conf from '../conf/conf.js'
import { Client, Account, ID } from "appwrite";

export class AuthService {
    client = new Client();
    account;

    constructor(){
        this.client.setEndpoint(conf.appwriteUrl).setProject(conf.appwritepProjectId);
        this.account = new Account(this.client);
    }

    async createAccount({email, password, name}){
        try{
            const userAccount =  await this.account.create(ID.unique, email, password, name);
            if (userAccount){
                //call another method
                return this.loginAccount({email, password});
            } else {
                return userAccount;
            }
        } catch(e){
            throw e;
        }
    }

    async loginAccount({email, password}){
        try{
            await this.account.createEmailSession(email, password);
        } catch(e){
            throw e;
        }
    }

    async logoutAccount(){
        try{
            await this.account.deleteSessions();
        } catch(e){
            throw e;
        }
    }

    async getCurrentUser(){
        try{
            await this.account.get();
        } catch(e){
            throw e;
        }
        return null;
    }
}

const authService = new AuthService();

export default authService;