//API Controller for creating a new chat 

import Chat from "../models/Chat.js";

export const createChat = async (req, res, next) => {
    try {
        const userId = req.user._id

        const chatData = {
            userId,
            messages: [],
            name: "New Chat",
            userName: req.user.name
        }
        await Chat.create(chatData)
        res.json({success: true, messages: "Chat created"})

    } catch (error){
        res.json({success: false, message: error.message});
    }
}

//API controller for getting all chats

export const getChats = async (req, res, next) => {
    try {
        const userId = req.user._id

        const chats = await Chat.find({userId}).sort({ updatedAt: -1})
        
        res.json({success: true, chats})

    } catch (error){
        res.json({success: false, message: error.message});
    }
}

//API controller for deleting a chat 

export const deleteChat = async (req, res, next) => {
    try {
        const userId = req.user._id
        const {chatId} = req.body

        await Chat.deleteOne({_id: chatId, userId})
        
        res.json({success: true, messages: "Chat Deleted"})

    } catch (error){
        res.json({success: false, message: error.message});
    }
}