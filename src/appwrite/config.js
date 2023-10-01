import { isAsyncThunkAction } from '@reduxjs/toolkit';
import conf from '../conf/conf.js'
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class DatabaseService{
    client = new Client();
    databases;
    storage;

    constructor(){
        this.client.setEndpoint(conf.appwriteUrl).setProject(conf.appwritepProjectId);
        this.databases = new Databases(this.client);
        this.storage = new Storage(this.client);
    }

    async createPost({title, slug, content, featuredImage, status, userId}){
        try{
            return await this.databases.createDocument(conf.appwriteDatabaseId, conf.appwriteCollectionId, slug, {
                title,
                content,
                featuredImage,
                status,
                userId
            })
        } catch(e){ 
            throw e;
        }
    }

    async updatePost(slug, {title, content, featuredImage, status}){
        try{
            return await this.databases.updateDocument(conf.appwriteDatabaseId, conf.appwriteCollectionId, slug, {
                title,
                content,
                featuredImage,
                status
            })
        } catch(e){ 
            throw e;
        }
    }

    async deletePost(slug){
        try{
            await this.databases.deleteDocument(conf.appwriteDatabaseId, conf.appwriteCollectionId, slug)
            return true;
        } catch(e){ 
            throw e;
        }
    }

    // list all article which have index 'status' value is equal to active
    async getPosts(queries = [Query.equal("status", "active")]){
        try{
            return await this.databases.listDocuments(conf.appwriteDatabaseId, conf.appwriteCollectionId, queries)
        } catch(e){ 
            throw e;
        }
    }

    async getPost(slug){
        try{
            return await this.databases.updateDocument(conf.appwriteDatabaseId, conf.appwriteCollectionId, slug)
        } catch(e){ 
            throw e;
        }
    }

    //upload file
    async uploadFile(file){
        try{
            return await this.storage.createFile(conf.appwriteStorageId, ID.unique, file)
        } catch(e){ 
            throw e;
        }
    }

    //delete file
    async deleteFile(fileID){
        try{
            await this.storage.deleteFile(conf.appwriteStorageId, fileID)
            return true;
        } catch(e){ 
            throw e;
        }
    }

    //get file (preview file does not use async)
    getFile(fileID){
        try{
            return this.storage.getFilePreview(conf.appwriteStorageId, fileID)
        } catch(e){ 
            throw e;
        }
    }

}

const databaseServices = new DatabaseService()

export default databaseServices