"use client"
import { Box, Button, List, ListItem, Radio, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import styled from 'styled-components'
import WithLayout from '@/app/HOC/WithLayout';
const Payments = () => {
    const [selectedMethod, setSelectedMethod] = useState("credit");
    const paymentMethods = [
        { id: "credit", label: "Credit Card" },
        { id: "debit", label: "Debit Card" },
        { id: "upi", label: "UPI" },
    ];
    return <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        <Box sx={{ width: { xs: "100%", lg: "50%" } }}>
            <OrderCardContainer>
                <Box className="order-info">
                    <Typography className="order-id">
                        Order <b>#1646988613_694623663</b>
                    </Typography>
                    <Box className="price">
                        69 <Typography className="currency">$</Typography>
                    </Box>
                </Box>
                <Box className="description">
                    <Typography className="description-title">Description</Typography>
                    <Typography variant="body2">Order description</Typography>
                </Box>
            </OrderCardContainer>
            <PaymentContainer>
                <Typography className="payment-title">Select a payment method:</Typography>
                <List className="payment-list">
                    {paymentMethods.map(({ id, label }) => (
                        <Box key={id}>
                            <ListItem
                                className="payment-option"
                                onClick={() => setSelectedMethod(id === selectedMethod ? null : id)}
                            >
                                <Radio checked={selectedMethod === id} />
                                <Typography>{label}</Typography>
                            </ListItem>
                            {selectedMethod === id && (
                                <Box className="payment-form">
                                    {id === "upi" ? (
                                        <TextField
                                            fullWidth
                                            label="Enter UPI ID"
                                            variant="outlined"
                                            className="input-field"
                                        />
                                    ) : (
                                        <>
                                            <TextField
                                                fullWidth
                                                label="Card Number"
                                                variant="outlined"
                                                className="input-field"
                                            />
                                            <Box display="flex" gap={2}>
                                                <TextField
                                                    fullWidth
                                                    label="MM / YY"
                                                    variant="outlined"
                                                    className="input-field"
                                                />
                                                <TextField
                                                    fullWidth
                                                    label="CVV"
                                                    variant="outlined"
                                                    className="input-field"
                                                />
                                            </Box>
                                            <Typography variant="body2">
                                                Data is protected under PCI DSS. We do not store your data.
                                            </Typography>
                                        </>
                                    )}
                                    <Button fullWidth className="pay-button">
                                        Pay
                                    </Button>
                                </Box>
                            )}
                        </Box>
                    ))}
                </List>
            </PaymentContainer>
        </Box>
    </Box>
}
export default WithLayout(Payments)
const OrderCardContainer = styled(Box)({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    // width: "100%",
    padding: "16px",
    borderRadius: "12px",
    border: "1px solid #DDE2E5",

    "& .order-info": {
        display: "flex",
        flexDirection: "column",
    },

    "& .order-id": {
        fontSize: "16px",
    },

    "& .price": {
        display: "flex",
        alignItems: "center",
        fontSize: "32px",
        fontWeight: "bold",
        color: "#1A1A1A",
    },

    "& .currency": {
        fontSize: "24px",
        fontWeight: "500",
        color: "#6B7280",
        marginLeft: "4px",
    },

    "& .description": {
        textAlign: "right",
    },

    "& .description-title": {
        fontWeight: "bold",
    },
});
const PaymentContainer = styled(Box)({
    padding: "16px",
    borderRadius: "12px",
    border: "1px solid #DDE2E5",
    background: "#fff",
    marginTop: "50px",
    "& .payment-title": {
        fontSize: "20px",
        fontWeight: "bold",
        marginBottom: "16px",
    },

    "& .payment-list": {
        borderBottom: "1px solid #DDE2E5",
    },

    "& .payment-option": {
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        padding: "12px",
        cursor: "pointer",
    },

    "& .payment-form": {
        marginTop: "8px",
        padding: "16px",
        borderRadius: "8px",
        background: "#F9FAFB",
    },

    "& .input-field": {
        marginBottom: "12px",
    },

    "& .pay-button": {
        marginTop: "12px",
        background: "#FFD700",
        color: "#000",
        fontWeight: "bold",
        "&:hover": {
            background: "#FFC107",
        },
    },
});