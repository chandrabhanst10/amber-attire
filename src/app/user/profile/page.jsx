"use client"
import {
  Box,
  TextField,
  Button,
  Typography,
  Grid,
  Avatar,
  IconButton,
  Card,
  CardContent,
} from "@mui/material";
import { styled } from "@mui/system";
import { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import WithLayout from "@/app/HOC/WithLayout";

const UserProfile = () => {
  const [userData, setUserData] = useState({
    name: "Chandrabhan Singh Thakur",
    email: "chandrabhan@example.com",
    phone: "+91 9876543210",
    password: "",
  });
  const [billingAddress, setBillingAddress] = useState("123, Bhopal, India");
  const [shippingAddress, setShippingAddress] = useState("456, Mumbai, India");
  const [isEditing, setIsEditing] = useState(false);
  const [profilePic, setProfilePic] = useState(
    "https://via.placeholder.com/100"
  );
  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };
  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };
  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setProfilePic(imageURL);
    }
  };

  return (
    <ProfileContainer>
      <ProfileHeader>
        <Avatar src={profilePic} sx={{ width: 100, height: 100 }} />
        <IconButton component="label" sx={cameraIconStyle}>
          <CameraAltIcon />
          <input type="file" hidden accept="image/*" onChange={handleProfilePicChange} />
        </IconButton>
      </ProfileHeader>
      <Typography variant="h5" fontWeight="bold" align="center" margin={2}>
        My Profile
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <StyledTextField
            fullWidth
            label="Full Name"
            name="name"
            value={userData.name}
            onChange={handleChange}
            disabled={!isEditing}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <StyledTextField
            fullWidth
            label="Email Address"
            name="email"
            value={userData.email}
            onChange={handleChange}
            disabled={!isEditing}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <StyledTextField
            fullWidth
            label="Phone Number"
            name="phone"
            value={userData.phone}
            onChange={handleChange}
            disabled={!isEditing}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <StyledTextField
            fullWidth
            label="New Password"
            type="password"
            name="password"
            placeholder="Enter new password"
            onChange={handleChange}
            disabled={!isEditing}
          />
        </Grid>
      </Grid>
      <Typography variant="h6" fontWeight="bold" sx={{ mt: 3 }}>
        Address Details
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <StyledCard>
            <CardContent>
              <Typography variant="subtitle1" fontWeight="bold">Billing Address</Typography>
              <Typography color="gray">{billingAddress}</Typography>
              {isEditing && (
                <StyledTextField
                  fullWidth
                  label="Edit Billing Address"
                  defaultValue={billingAddress}
                  onChange={(e) => setBillingAddress(e.target.value)}
                />
              )}
            </CardContent>
          </StyledCard>
        </Grid>
        <Grid item xs={12} sm={6}>
          <StyledCard>
            <CardContent>
              <Typography variant="subtitle1" fontWeight="bold">Shipping Address</Typography>
              <Typography color="gray">{shippingAddress}</Typography>
              {isEditing && (
                <StyledTextField
                  fullWidth
                  label="Edit Shipping Address"
                  defaultValue={shippingAddress}
                  onChange={(e) => setShippingAddress(e.target.value)}
                />
              )}
            </CardContent>
          </StyledCard>
        </Grid>
      </Grid>
      <ActionButtons>
        {isEditing ? (
          <SaveButton variant="contained" startIcon={<SaveIcon />} onClick={toggleEdit}>
            Save Changes
          </SaveButton>
        ) : (
          <EditButton variant="outlined" startIcon={<EditIcon />} onClick={toggleEdit}>
            Edit Profile
          </EditButton>
        )}
      </ActionButtons>
    </ProfileContainer>
  );
};

export default WithLayout(UserProfile)
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
