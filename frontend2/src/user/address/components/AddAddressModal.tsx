"use client";
import React, { useState } from "react";
import {
    Modal,
    Box,
    Typography,
    TextField,
    Button,
    IconButton,
    Grid,
} from "@mui/material";
import styled from "styled-components";
import CloseIcon from "@mui/icons-material/Close";
import { AddressData } from "../../../redux/slices/addressSlice";

interface AddAddressModalProps {
    open: boolean;
    handleClose: () => void;
    handleSave: (event: React.FormEvent<HTMLFormElement>, updatedAddress: AddressData) => void;
}

const AddAddressModal: React.FC<AddAddressModalProps> = ({
    open,
    handleClose,
    handleSave
}) => {
    const [formData, setFormData] = useState<AddressData>({
        fullName:"",
        phone: "",
        street: "",
        city: "",
        state: "",
        zipCode: "",
        country: "",
        _id: "",
        userId: "",
        createdAt: "",
        updatedAt: "",
        __v: 0
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    return (
        <Modal open={open} onClose={handleClose}>
            <StyledModalBox>
                <Header>
                    <Typography variant="h6">Add New Address</Typography>
                    <IconButton onClick={handleClose}>
                        <CloseIcon />
                    </IconButton>
                </Header>

                <form onSubmit={(event) => handleSave(event, formData)}>
                    <Grid container spacing={1}>
                        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
                            <FormField
                                required
                                label="Full Name"
                                name="fullName"
                                value={formData.fullName}
                                onChange={handleChange}
                                fullWidth
                            />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
                            <FormField
                                required
                                label="Phone"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                fullWidth
                            />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
                            <FormField
                                required
                                label="Street Address"
                                name="street"
                                value={formData.street}
                                onChange={handleChange}
                                fullWidth
                            />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
                            <FormField
                                required
                                label="City"
                                name="city"
                                value={formData.city}
                                onChange={handleChange}
                                fullWidth
                            />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
                            <FormField
                                required
                                label="State"
                                name="state"
                                value={formData.state}
                                onChange={handleChange}
                                fullWidth
                            />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
                            <FormField
                                required
                                label="ZIP Code"
                                name="zipCode"
                                value={formData.zipCode}
                                onChange={handleChange}
                                fullWidth
                            />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
                            <FormField
                                required
                                label="Country"
                                name="country"
                                value={formData.country}
                                onChange={handleChange}
                                fullWidth
                            />
                        </Grid>
                    </Grid>

                    <Footer>
                        <Button variant="outlined" onClick={handleClose}>
                            Cancel
                        </Button>
                        <Button type="submit" variant="contained" color="primary">
                            Save
                        </Button>
                    </Footer>
                </form>
            </StyledModalBox>
        </Modal>
    );
};

export default AddAddressModal;

// styled-components
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
