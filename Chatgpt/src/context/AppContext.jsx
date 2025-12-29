import { useEffect, useState } from "react";
import { dummyChats } from "../assets/assets";
import { AppContext } from "./AppContext";
import axios from "axios";

axios.defaults.baseURL = import.meta.env.VITE_SERVER_URL;
export const AppContextProvider = ({ children }) => {
    const [user, setUser] = useState();
    const [chats, setChats] = useState(dummyChats);
    const [messages, setMessages] = useState([])
    const [selectedChat, setSelectedChat] = useState(
        dummyChats.find(c => !(Array.isArray(c.messages) && c.messages.length))
        || dummyChats[0]
        || null
    )
    const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

    useEffect(() => {
        if (theme === "dark") {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
        localStorage.setItem("theme", theme)
    }, [theme])




    const value = {
        user,
        setUser,
        chats,
        setChats,
        selectedChat,
        setSelectedChat,
        messages,
        setMessages,
        theme,
        setTheme,
        createNewChat: () => {
            const newChat = {
                _id: Date.now().toString(),
                userId: user?._id || "guest",
                name: "New Chat",
                userName: user?.name || "Guest",
                messages: [],
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
            }
            setChats(prev => [newChat, ...prev])
            setSelectedChat(newChat)
        },
        toggleTheme: () => setTheme(prev => (prev === "dark" ? "light" : "dark")),
    }

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}

export default AppContextProvider
