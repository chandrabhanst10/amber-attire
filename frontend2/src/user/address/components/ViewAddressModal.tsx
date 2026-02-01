"use client"
import React, { useState, useEffect } from "react";
import { Modal, Box, Typography, TextField, Button, IconButton, Grid } from "@mui/material";
import styled from "styled-components";
import CloseIcon from "@mui/icons-material/Close";

export interface AddressData {
    _id: string;
    name: string;
    phone: string;
    street: string;
    city: string;
    state: string;
    zip: string;
    country: string;
}

// Props for modal
interface EditAddressModalProps {
    open: boolean;
    handleClose: () => void;
    addressData: AddressData;
    handleSave: (event: React.FormEvent<HTMLFormElement>, updatedAddress: AddressData) => void;
}

const ViewAddressModel: React.FC<EditAddressModalProps> = ({
    open,
    handleClose,
    addressData,
    handleSave,
}) => {
    const [formData, setFormData] = useState<AddressData>({
        _id: "",
        name: "",
        phone: "",
        street: "",
        city: "",
        state: "",
        zip: "",
        country: "",
    });

    useEffect(() => {
        if (addressData) {
            setFormData(addressData);
        }
    }, [addressData]);

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData((prev: any) => ({ ...prev, [name]: value }));
    };

    const onSave = (event: React.FormEvent<HTMLFormElement>) => {
        handleSave(event, formData);
    };

    return (
        <Modal open={open} onClose={handleClose}>
            <StyledModalBox>
                <Header>
                    <Typography variant="h6">Edit Address</Typography>
                    <IconButton onClick={handleClose}>
                        <CloseIcon />
                    </IconButton>
                </Header>

                <form onSubmit={onSave}>
                    <Grid container spacing={1}>
                        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
                            <FormField
                                required
                                label="Full Name"
                                name="name"
                                value={formData?.name}
                                onChange={handleChange}
                                fullWidth
                            />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
                            <FormField
                                required
                                label="Phone"
                                name="phone"
                                value={formData?.phone}
                                onChange={handleChange}
                                fullWidth
                            />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
                            <FormField
                                required
                                label="Street Address"
                                name="street"
                                value={formData?.street}
                                onChange={handleChange}
                                fullWidth
                            />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
                            <FormField
                                required
                                label="City"
                                name="city"
                                value={formData?.city}
                                onChange={handleChange}
                                fullWidth
                            />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
                            <FormField
                                required
                                label="State"
                                name="state"
                                value={formData?.state}
                                onChange={handleChange}
                                fullWidth
                            />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
                            <FormField
                                required
                                label="ZIP Code"
                                name="zip"
                                value={formData?.zip}
                                onChange={handleChange}
                                fullWidth
                            />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
                            <FormField
                                required
                                label="Country"
                                name="country"
                                value={formData?.country}
                                onChange={handleChange}
                                fullWidth
                                disabled
                            /></Grid>
                    </Grid>
                    <Footer>
                        <Button variant="outlined" onClick={handleClose}>
                            Cancel
                        </Button>
                        <Button type="submit" variant="contained" color="primary" >
                            Save
                        </Button>
                    </Footer>
                </form>


            </StyledModalBox>
        </Modal>
    );
}

export default ViewAddressModel
const StyledModalBox = styled(Box)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 500px;
  background-color: #fff;
  border-radius: 10px;
  padding: 30px;
  outline: none;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.2);

  @media (max-width: 600px) {
    width: 90%;
    padding: 20px;
  }
`;

const Header = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const Footer = styled(Box)`
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
  gap: 10px;
`;

const FormField = styled(TextField)`
  margin-bottom: 15px !important;
`;