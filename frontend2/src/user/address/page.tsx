"use client"
import {
    Box,
    TextField,
    Button,
    Typography,
    Grid,
    Card,
    CardContent,
} from "@mui/material";
import { styled } from "@mui/system";
import { useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import { useDispatch, useSelector } from "react-redux";
import { UserProfileData } from "../../redux/slices/userSlice";
import { AppDispatch } from "../../redux/store";
import CustomButton from "../../Components/CustomButton";
import AddressSkeleton from "../../Components/skeletons/AddressSkeleton";
import ViewAddressModel, { AddressData } from "./components/ViewAddressModal";
import { addAddress, getAllAddresses, updateAddress } from "../../redux/slices/addressSlice";
import AddAddressModal from "./components/AddAddressModal";
import AddIcon from '@mui/icons-material/Add';
import UserLayout from "../../layout";
const Address = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { loading } = useSelector((state: any) => state.address);
    const [isEditing, setIsEditing] = useState(false);
    const [openViewAddressModal, setOpenViewAddressModal] = useState(false);
    const [openAddAddressModal, setOpenAddAddressModal] = useState(false);
    const [address, setAddress] = useState<any[]>([{
        name: "John Doe",
        phone: "1234567890",
        street: "123 Main St",
        city: "New York",
        state: "NY",
        zip: "10001",
        country: "USA",
    }]);
    const [editableAddress, setEditableAddress] = useState<AddressData>({
        _id: "",
        name: "",
        phone: "",
        street: "",
        city: "",
        state: "",
        zip: "",
        country: "",
    });
    // fetch addresses from backend on load
    useEffect(() => {
        getAllAddress();
    }, [dispatch]);

    const getAllAddress = async () => {
        let response = await dispatch(getAllAddresses());
    };
    const handleUpdateAddress = async (event: React.FormEvent<HTMLFormElement>, updatedAddress: any) => {
        event.preventDefault();
        await dispatch(updateAddress({ id: editableAddress._id, data: updatedAddress }));
        setOpenViewAddressModal(false);
    };
    const handleViewAddress = (address: AddressData) => {
        setEditableAddress(address)
        setOpenViewAddressModal(true)
    }
    const handleAddAddress = async (event: React.FormEvent<HTMLFormElement>, formData: any) => {
        event.preventDefault();
        await dispatch(addAddress(formData));
        setOpenAddAddressModal(false);
    };
    const handleAddAddressModal = () => {
        setOpenViewAddressModal(true)
    }
    return (
        <UserLayout>
            {loading ? <AddressSkeleton /> : (
                <ProfileContainer>
                    <Typography variant="h5" fontWeight="bold" align="center" margin={2}>
                        Manage Addresses
                    </Typography>
                    <Typography variant="h6" fontWeight="bold" sx={{ mt: 3 }}>
                        Address Details
                    </Typography>
                    <Grid container spacing={2}>
                        {address.map((address: AddressData, index: number) => (
                            <Grid key={index} size={{ xs: 12, sm: 6 }}>
                                <StyledCard onClick={() => handleViewAddress(address)}>
                                    <CardContent>
                                        <Typography variant="subtitle1" fontWeight="bold">{address.name}</Typography>
                                        <Typography variant="subtitle1" fontWeight="bold">{address.phone}</Typography>
                                        <Typography color="gray">{`${address.street}, ${address.city}, ${address.state}, ${address.zip}`}</Typography>
                                    </CardContent>
                                </StyledCard>
                            </Grid>
                        ))}
                    </Grid>
                    <ActionButtons>
                        {isEditing ? (
                            <Box sx={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                <CustomButton
                                    label="Cancel"
                                    onClick={() => setIsEditing(false)}
                                    fullWidth={true}
                                />
                                <SaveButton variant="contained" startIcon={<SaveIcon />} >
                                    Save Changes
                                </SaveButton>
                            </Box>
                        ) : (
                            <EditButton variant="outlined" startIcon={<AddIcon />} onClick={handleAddAddressModal}>
                                Add Address
                            </EditButton>
                        )}
                    </ActionButtons>
                    <ViewAddressModel
                        open={openViewAddressModal}
                        handleClose={() => setOpenViewAddressModal(false)}
                        addressData={editableAddress}
                        handleSave={handleUpdateAddress}
                    />
                    <AddAddressModal
                        open={openAddAddressModal}
                        handleClose={() => setOpenAddAddressModal(false)}
                        handleSave={handleAddAddress}
                    />
                </ProfileContainer>
            )}
        </UserLayout>
    );
};

export default Address
const ProfileContainer = styled(Box)(({ theme }) => ({
    maxWidth: "700px",
    margin: "auto",
    padding: "20px",
    background: "#fff",
    borderRadius: "8px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
    [theme.breakpoints.down("sm")]: {
        padding: "15px",
    },
}));

const ProfileHeader = styled(Box)({
    display: "flex",
    justifyContent: "center",
    position: "relative",
    marginBottom: "20px",
});

const cameraIconStyle = {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "white",
    borderRadius: "50%",
    padding: "5px",
    boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
};

const StyledTextField = styled(TextField)({
    "& .MuiOutlinedInput-root": {
        borderRadius: "8px",
    },
});

const StyledCard = styled(Card)({
    borderRadius: "10px",
    boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
    padding: "10px",
});

const ActionButtons = styled(Box)({
    display: "flex",
    justifyContent: "center",
    marginTop: "20px",
});

const EditButton = styled(Button)({
    borderColor: "black",
    color: "black",
    fontWeight: "bold",
    "&:hover": {
        backgroundColor: "#f0f0f0",
    },
});

const SaveButton = styled(Button)({
    backgroundColor: "black",
    color: "white",
    padding: "10px 20px",
    fontWeight: "bold",
    "&:hover": {
        backgroundColor: "#333",
    },
});
