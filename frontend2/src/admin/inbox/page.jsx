"use client"
import React, { useState } from "react";
import {
    Box,
    Button,
    Avatar,
    Typography,
    TextField,
    InputAdornment,
    IconButton,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Paper,
} from "@mui/material";
import { Send, Search, Person, Settings } from "@mui/icons-material";

const conversations = [
    { name: "Tom Anderson", message: "Hello, I’m interested in this item...", time: "12:24 AM", unread: 8 },
    { name: "Luis Pittman", message: "Hi, can I ask if there is anything...", time: "10:50 AM", unread: 5 },
    { name: "Alisson Mack", message: "I want to complain about item", time: "Yesterday" },
    { name: "Barry George", message: "Is there any chance to get a refund...", time: "09:54 AM" },
    { name: "Jenny Lloyd", message: "I'm not sure if this is what I want", time: "Yesterday" },
    { name: "Andrew Larson", message: "Can you help me choose from t...", time: "Yesterday" },
];
const messages = [
    { sender: "other", text: "Hi, I wonder when if there is going to be anything new for spring?", time: "12:24 AM" },
    { sender: "me", text: "Hi Luis, can you please be more specific?", time: "12:31 AM" },
    { sender: "other", text: "Sure, I want to know when the new spring collection for men is coming", time: "12:35 AM" },
    { sender: "me", text: "Thank you for taking interest in our upcoming products. You can have a look at the upcoming collection in our blog post.", time: "12:45 AM" },
];
const Inbox = () => {
    const [selectedConversation, setSelectedConversation] = useState(1);
    const [inputValue, setInputValue] = useState("");
    const handleSend = () => {
        if (inputValue.trim() !== "") {
            setInputValue("");
        }
    };
    return (
        <Paper>
            <Box display="flex" height="90vh" overflow="hidden">
                <Box width="30%" borderRight="1px solid #e0e0e0" display="flex" flexDirection="column">
                    <Box p={2} display="flex" justifyContent="space-between" alignItems="center">
                        <Typography variant="h6" fontWeight="bold">
                            Inbox
                        </Typography>
                        <Button
                            variant="contained"
                            size="small"
                            sx={{ backgroundColor: "#1976d2", color: "#fff", textTransform: "none" }}
                        >
                            + New Message
                        </Button>
                    </Box>
                    <Box p={1}>
                        <TextField
                            size="small"
                            placeholder="Search..."
                            fullWidth
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Search />
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Box>
                    <List>
                        {conversations.map((conv, idx) => (
                            <ListItem
                                button
                                selected={selectedConversation === idx}
                                onClick={() => setSelectedConversation(idx)}
                                key={idx}
                            >
                                <ListItemAvatar>
                                    <Avatar />
                                </ListItemAvatar>
                                <ListItemText
                                    primary={
                                        <Box display="flex" justifyContent="space-between" alignItems="center">
                                            <Typography fontWeight="bold">{conv.name}</Typography>
                                            <Typography variant="caption" color="textSecondary">
                                                {conv.time}
                                            </Typography>
                                        </Box>
                                    }
                                    secondary={
                                        <Box display="flex" alignItems="center">
                                            <Typography variant="body2" color="textSecondary" noWrap>
                                                {conv.message}
                                            </Typography>
                                            {conv.unread && (
                                                <Box
                                                    ml={1}
                                                    bgcolor="#1976d2"
                                                    color="#fff"
                                                    borderRadius="50%"
                                                    width={20}
                                                    height={20}
                                                    display="flex"
                                                    alignItems="center"
                                                    justifyContent="center"
                                                    fontSize="12px"
                                                >
                                                    {conv.unread}
                                                </Box>
                                            )}
                                        </Box>
                                    }
                                />
                            </ListItem>
                        ))}
                    </List>
                </Box>
                <Box width="70%" display="flex" flexDirection="column">
                    <Box p={2} display="flex" justifyContent="space-between" alignItems="center" borderBottom="1px solid #e0e0e0">
                        <Box display="flex" alignItems="center" gap={1}>
                            <Avatar />
                            <Typography variant="subtitle1" fontWeight="bold">
                                Luis Pittman
                            </Typography>
                            <Box width={8} height={8} bgcolor="green" borderRadius="50%" ml={1} />
                        </Box>
                    </Box>
                    <Box flexGrow={1} p={3} overflow="auto" bgcolor="#f9fafb">
                        {messages.map((msg, idx) => (
                            <Box
                                key={idx}
                                display="flex"
                                flexDirection="column"
                                alignItems={msg.sender === "me" ? "flex-end" : "flex-start"}
                                mb={2}
                            >
                                <Paper
                                    sx={{
                                        p: 1.5,
                                        bgcolor: msg.sender === "me" ? "#f1f5f9" : "#1976d2",
                                        color: msg.sender === "me" ? "black" : "white",
                                        maxWidth: "70%",
                                    }}
                                >
                                    <Typography variant="body2">{msg.text}</Typography>
                                </Paper>
                                <Typography variant="caption" color="textSecondary" mt={0.5}>
                                    {msg.time}
                                </Typography>
                            </Box>
                        ))}

                        {/* Sample product images */}
                        <Box display="flex" gap={1} mt={2}>
                            <img src="https://via.placeholder.com/100x100.png?text=Item1" alt="item1" style={{ borderRadius: 8 }} />
                            <img src="https://via.placeholder.com/100x100.png?text=Item2" alt="item2" style={{ borderRadius: 8 }} />
                        </Box>
                    </Box>

                    {/* Input */}
                    <Box p={2} borderTop="1px solid #e0e0e0" display="flex" alignItems="center">
                        <TextField
                            placeholder="Your message..."
                            fullWidth
                            size="small"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyPress={(e) => e.key === "Enter" && handleSend()}
                        />
                        <IconButton color="primary" onClick={handleSend}>
                            <Send />
                        </IconButton>
                    </Box>
                </Box>
            </Box>
        </Paper>
    );
};

export default Inbox;
