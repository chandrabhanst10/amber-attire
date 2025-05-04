// components/MobileFilterDrawer.js
"use client";

import React, { useState } from "react";
import {
    Drawer,
    Checkbox,
    FormControlLabel,
    Button,
    Typography,
    IconButton,
    Tabs,
    Tab,
    Box,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { ClothingFilters } from "../Utils/ClothingFilterData.js";
import { styled } from "@mui/material/styles";

const MobileFilterDrawer = ({ open, onClose, onApply }) => {
    const [selectedFilters, setSelectedFilters] = useState({});
    const [activeTab, setActiveTab] = useState(0);

    const handleToggle = (category, value) => {
        setSelectedFilters((prev) => {
            const currentValues = prev[category] || [];
            const newValues = currentValues.includes(value)
                ? currentValues.filter((v) => v !== value)
                : [...currentValues, value];
            return { ...prev, [category]: newValues };
        });
    };

    const handleApply = () => {
        onApply(selectedFilters);
        onClose();
    };

    const handleClear = () => {
        setSelectedFilters({});
    };

    const activeFilter = ClothingFilters[activeTab];
    return (
        <Drawer 
        anchor="bottom" 
        open={open} 
        onClose={onClose}
        swipeAreaWidth={56}
        disableSwipeToOpen={false}
        keepMounted
        >
            <Styled className="drawerContent">
                <Box className="header">
                    <Typography variant="h6">Filters</Typography>
                    <IconButton onClick={onClose}>
                        <CloseIcon />
                    </IconButton>
                </Box>
                <Box className="clearAllBtn">
                    <Button onClick={handleClear} size="small" color="secondary" >
                        Clear All
                    </Button>
                </Box>
                <Box className="contentWrapper">
                    <Box sx={{ borderRight: 1, borderColor: "divider" }}>
                        <Tabs
                            orientation="vertical"
                            value={activeTab}
                            onChange={(e, newValue) => setActiveTab(newValue)}
                            variant="scrollable"
                            sx={{ minWidth: 120 }}
                        >
                            {ClothingFilters.map((filter, index) => (
                                <Tab
                                    key={filter.key}
                                    label={filter.title}
                                    className="tab"
                                />
                            ))}
                        </Tabs>
                    </Box>
                    <Box className="tabContent">
                        {activeFilter?.options.map((option) => (
                            <FormControlLabel
                                key={option.value}
                                control={
                                    <Checkbox
                                        checked={(selectedFilters[activeFilter.key] || []).includes(option.value)}
                                        onChange={() => handleToggle(activeFilter.key, option.value)}
                                    />
                                }
                                label={option.label}
                            />
                        ))}
                    </Box>
                </Box>
                <Box mt={2}>
                    <Button fullWidth variant="contained" onClick={handleApply}>
                        Apply Filters
                    </Button>
                </Box>
            </Styled>
        </Drawer>
    );
};

export default MobileFilterDrawer;

const Styled = styled(Box)(({ theme }) => ({
    "&.drawerContent": {
        padding: theme.spacing(2),
        maxHeight: "90vh",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
    },
    "& .header": {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: theme.spacing(2),
    },
    "& .contentWrapper": {
        display: "flex",
        flex: 1,
        overflow: "hidden",
        marginTop: theme.spacing(2),
    },
    "& .tabContent": {
        width: "100%",
        padding: "0px 20px",
        overflowY: "auto",
    },
    "& .tab": {
        alignItems: "flex-start",
        textAlign: "left",
        justifyContent: "flex-start",
        borderRadius: theme.shape.borderRadius,
        padding: theme.spacing(1.5, 2),
        backgroundColor: "transparent",
        "&.Mui-selected": {
            backgroundColor: "#f5f5f5",
            color: theme.palette.text.primary,
        },
    },
    "& .clearAllBtn": {
        display:"flex",
        justifyContent:"flex-end",
        alignItems:"center"
    },
}));
