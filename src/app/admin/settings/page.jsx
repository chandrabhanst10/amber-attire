"use client"
import React, { useState } from 'react';
import { Box, Tabs, Tab, TextField, Button, Select, MenuItem, InputLabel, FormControl, Typography, Grid, Paper, Switch } from '@mui/material';
import WithAdminLayout from '@/app/HOC/WithAdminLayout';

const SettingsPage = () => {
    const [activeTab, setActiveTab] = useState(0);
    const [profileImage, setProfileImage] = useState(null);
    const [toggles, setToggles] = useState({
        1: true,
        2: true,
        3: true,
        4: false,
        5: false,
    });
    const [tabIndex, setTabIndex] = useState(2)
    const handleToggle = (id) => {
        setToggles((prev) => ({ ...prev, [id]: !prev[id] }));
    };
    const notificationSettings = [
        { id: 1, title: 'Personalized Offers', description: 'Receive offers made special for you' },
        { id: 2, title: 'Online Webinars', description: 'Get notified about upcoming webinars' },
        { id: 3, title: 'New Features', description: 'Updates about new features and product releases' },
        { id: 4, title: 'Security and Billing', description: 'Account security and notifications about billing' },
        { id: 5, title: 'Marketing', description: 'Receive marketing newsletters about our new products.' },
    ];
    const accountsSettings = [
        { title: 'Personalized Offers', description: 'Receive offers made special for you' },
        { title: 'Online Webinars', description: 'Get notified about upcoming webinars' },
        { title: 'New Features', description: 'Updates about new features and product releases' },
        { title: 'Security and Billing', description: 'Account security and notifications about billing' },
        { title: 'Marketing', description: 'Receive marketing newsletters about our new products.' },
    ];
    const settingsOptions = [
        { title: 'Personalized Offers', description: 'Receive offers made special for you' },
        { title: 'Online Webinars', description: 'Get notified about upcoming webinars' },
        { title: 'New Features', description: 'Updates about new features and product releases' },
        { title: 'Security and Billing', description: 'Account security and notifications about billing' },
        { title: 'Marketing', description: 'Receive marketing newsletters about our new products.' },
    ];
    const handleTabChange = (event, newValue) => {
        setActiveTab(newValue);
    };
    const handleFileChange = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            setProfileImage(e.target.files[0]);
        }
    };
    return (
        <Box sx={{ p: 4 }}>
                <Typography variant="h5" fontWeight="bold" mb={3}color='#fff'>
                    Settings
                </Typography>
            <Paper elevation={1} sx={{ p: 3, borderRadius: 2 }}>
                {/* Tabs */}
                <Tabs value={activeTab} onChange={handleTabChange} textColor="primary" indicatorColor="primary">
                    <Tab label="Profile" />
                    <Tab label="Notifications" />
                    <Tab label="Accounts" />
                    <Tab label="Security" />
                </Tabs>

                {activeTab === 0 && (
                    <Box mt={4}>
                        <Typography variant="subtitle1" fontWeight="bold" mb={1}>
                            Profile Details
                        </Typography>
                        <Typography variant="body2" color="text.secondary" mb={2}>
                            Enter your profile information
                        </Typography>

                        {/* Upload Section */}
                        <Box
                            sx={{
                                border: '2px dashed #ccc',
                                borderRadius: 2,
                                p: 4,
                                textAlign: 'center',
                                mb: 3,
                            }}
                        >
                            <Button variant="outlined" component="label">
                                Add File
                                <input hidden accept="image/*" type="file" onChange={handleFileChange} />
                            </Button>
                            <Typography variant="body2" color="text.secondary" mt={2}>
                                Or drag and drop files
                            </Typography>
                        </Box>

                        {/* Form Fields */}
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={6}>
                                <TextField fullWidth label="First Name" variant="outlined" />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField fullWidth label="Last Name" variant="outlined" />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField fullWidth label="Email Address" variant="outlined" />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField fullWidth label="Phone Number" variant="outlined" />
                            </Grid>
                        </Grid>

                        {/* Regional Settings */}
                        <Box mt={4}>
                            <Typography variant="subtitle1" fontWeight="bold" mb={1}>
                                Regional Settings
                            </Typography>
                            <Typography variant="body2" color="text.secondary" mb={2}>
                                Set your language and timezone
                            </Typography>

                            <Grid container spacing={2}>
                                <Grid item xs={12} md={6}>
                                    <FormControl fullWidth>
                                        <InputLabel>Language</InputLabel>
                                        <Select defaultValue="English" label="Language">
                                            <MenuItem value="English">English</MenuItem>
                                            <MenuItem value="Spanish">Spanish</MenuItem>
                                            <MenuItem value="French">French</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <FormControl fullWidth>
                                        <InputLabel>Timezone</InputLabel>
                                        <Select defaultValue="GMT +02:00" label="Timezone">
                                            <MenuItem value="GMT +02:00">GMT +02:00</MenuItem>
                                            <MenuItem value="GMT +05:30">GMT +05:30</MenuItem>
                                            <MenuItem value="GMT -04:00">GMT -04:00</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                )}
                {activeTab === 1 && (<Box>
                    <Box>
                        {notificationSettings.map((setting) => (
                            <Grid container alignItems="center" justifyContent="space-between" py={2} key={setting.id} borderBottom={1} borderColor="#f0f0f0">
                                <Grid item xs={8}>
                                    <Typography fontWeight="bold">{setting.title}</Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {setting.description}
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <Switch
                                        checked={toggles[setting.id]}
                                        onChange={() => handleToggle(setting.id)}
                                        color="primary"
                                    />
                                </Grid>
                            </Grid>
                        ))}
                    </Box>
                </Box>
                )}
                {activeTab === 2 && (<Box>
                    <Paper elevation={0} sx={{ p: 2 }}>
                        {accountsSettings.map((item, index) => (
                            <Grid container alignItems="center" justifyContent="space-between" key={index} sx={{ py: 2, borderBottom: index !== accountsSettings.length - 1 ? '1px solid #eee' : 'none' }}>
                                <Box>
                                    <Typography fontWeight="bold">{item.title}</Typography>
                                    <Typography variant="body2" color="text.secondary">{item.description}</Typography>
                                </Box>
                                <Switch
                                    checked={toggles[index]}
                                    onChange={() => handleToggle(index)}
                                    color="primary"
                                />
                            </Grid>
                        ))}
                    </Paper>
                </Box>
                )}
                {activeTab === 3 && (<Box>
                    <Paper elevation={0} sx={{ p: 2, borderRadius: 3 }}>
                        {settingsOptions.map((item, index) => (
                            <Grid container alignItems="center" justifyContent="space-between" key={index} sx={{ py: 2, borderBottom: index !== settingsOptions.length - 1 ? '1px solid #eee' : 'none' }}>
                                <Box>
                                    <Typography fontWeight="bold">{item.title}</Typography>
                                    <Typography variant="body2" color="text.secondary">{item.description}</Typography>
                                </Box>
                                <Switch
                                    checked={toggles[index]}
                                    onChange={() => handleToggle(index)}
                                    color="primary"
                                />
                            </Grid>
                        ))}
                    </Paper>
                </Box>
                )}
                 <Box display="flex" justifyContent="flex-end" gap={2} mt={4}>
                        <Button variant="outlined" color="primary">
                            Cancel
                        </Button>
                        <Button variant="contained" color="primary">
                            Save
                        </Button>
                    </Box>
            </Paper>
        </Box>
    );
};

export default WithAdminLayout(SettingsPage);
