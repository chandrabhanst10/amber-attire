"use client"
import React, { useRef, useState } from "react";
import { Box, Grid, TextField, Typography, Button, Switch, Select, MenuItem, Chip, FormControlLabel, InputLabel, FormControl, OutlinedInput, Modal } from "@mui/material";
import WithAdminLayout from "@/app/HOC/WithAdminLayout";
import { useRouter } from "next/navigation";

const sizes = ["S", "M", "L", "XL"];

const AddProduct = () => {
  const [images, setImages] = useState([]);
  const fileInputRef = useRef();
  const router = useRouter();
  const [formData, setFormData] = useState({});
  
  const handleFiles = (files) => {
    const validImages = Array.from(files).filter(file =>
      file.type.startsWith('image/')
    );
    setImages(prev => [...prev, ...validImages]);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    handleFiles(e.dataTransfer.files);
  };

  const handleChange = (e) => {
    handleFiles(e.target.files);
  };

  const handleClick = (e) => {
    e.stopPropagation();
    fileInputRef.current.click();
  };
  const handleBack = () => {
    router.push("/admin/products")
  };
  const handleOnchange = (event) => {
    setFormData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value
    }))
  }
  const handleSubmit=(event)=>{
    event.preventDefault();
    console.log("@@@@@@@@@@",formData)
  }
  
  return (
    <Box sx={{ p: 2 }}>
      {/* <Button variant="text" sx={{color: "#fff" }} onClick={handleBack}>
        &lt; Back
      </Button> */}
      <form onSubmit={handleSubmit}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Typography variant="h5" fontWeight="bold" color="#fff">
          Add Product
        </Typography>
        <Box display="flex" justifyContent="flex-end" mb={2} gap={2}>
          <Button variant="outlined" sx={{ color: "#fff", border: "1px solid #fff" }} onClick={handleBack}>
            Cancel
          </Button>
          <Button variant="outliend" type="submit" sx={{ color: "#fff", border: "1px solid #fff" }}>
            Save
          </Button>
        </Box>
      </Box>
        <Grid container spacing={2}>
          <Grid item size={{ xs: 12, md: 8 }}>
            <Box p={2} borderRadius={2} bgcolor="#fff" boxShadow={2}>
              <Typography variant="subtitle1" fontWeight="bold" mb={1}>
                Information
              </Typography>
              <TextField required fullWidth label="Product Name" placeholder="Summer T-Shirt" margin="normal" name={"productName"} value={formData.productName} onChange={handleOnchange} />
              <TextField
                fullWidth
                label="Product Description"
                multiline
                rows={4}
                margin="normal"
                placeholder="Product description"
                value={formData.productDescription}
                name="productDescription"
                onChange={handleOnchange}
                required
              />

              {/* Images */}
              <Typography variant="subtitle1" fontWeight="bold" mt={1} mb={1}>
                Images
              </Typography>
              <Box
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleDrop}
                onClick={handleClick}
                sx={{
                  border: '2px dashed #ccc',
                  borderRadius: 2,
                  textAlign: 'center',
                  p: 4,
                  cursor: 'pointer',
                  bgcolor: '#fafafa',
                }}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleChange}
                  style={{ display: 'none' }}
                  name="productImages"
                />

                <Button
                  variant="contained"
                  onClick={handleClick}
                  sx={{ mb: 2 }}
                >
                  ADD FILE
                </Button>

                <Typography variant="body1" color="textSecondary">
                  Or drag and drop files
                </Typography>

                {images.length > 0 && (
                  <Stack direction="row" spacing={2} mt={3} flexWrap="wrap" justifyContent="center">
                    {images.map((file, index) => (
                      <Box
                        key={index}
                        component="img"
                        src={URL.createObjectURL(file)}
                        alt={`preview-${index}`}
                        sx={{
                          width: 100,
                          height: 100,
                          objectFit: 'cover',
                          borderRadius: 1,
                          border: '1px solid #ccc',
                        }}
                      />
                    ))}
                  </Stack>
                )}
              </Box>

              {/* Price */}
              <Typography variant="subtitle1" fontWeight="bold" mt={4} mb={2}>
                Price
              </Typography>
              <Grid container spacing={2}>
                <Grid item size={{ xs: 12, sm: 6, md: 4, lg: 4 }}>
                  <TextField required fullWidth label="Product Price" name="productPrice" value={formData.productPrice} onChange={handleOnchange} />
                </Grid>
                <Grid item size={{ xs: 12, sm: 6, md: 4, lg: 4 }}>
                  <TextField required fullWidth label="Discount Price" name="productDiscountPrice" value={formData.productDiscountPrice} onChange={handleOnchange} />
                </Grid>
                <Grid item size={{ xs: 12, sm: 6, md: 4, lg: 4 }}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Size</InputLabel>
                    <Select
                      label="Size"
                      value={formData.productSize}
                      name="productSize"
                      onChange={handleOnchange}
                      required
                    >
                      {sizes.map((size) => (
                        <MenuItem key={size} value={size}>
                          {size}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </Box>
          </Grid>
          <Grid item size={{ xs: 12, md: 4 }}>
            <Grid container direction="column" spacing={2}>
              {/* Categories */}
              <Grid item>
                <Box p={2} borderRadius={2} bgcolor="#fff" boxShadow={2}>
                  <Typography variant="subtitle1" fontWeight="bold" mb={2}>
                    Categories
                  </Typography>
                  <FormControlLabel control={<Switch />} label="Women" />
                  <FormControlLabel control={<Switch />} label="Men" />
                  <FormControlLabel control={<Switch />} label="T-Shirt" />
                  <FormControlLabel control={<Switch />} label="Hoodie" />
                  <FormControlLabel control={<Switch />} label="Dress" />
                  <Button variant="text" sx={{ mt: 1 }}>
                    Create New
                  </Button>
                </Box>
              </Grid>
              <Grid item>
                <Box p={2} borderRadius={2} bgcolor="#fff" boxShadow={2}>
                  <Typography variant="subtitle1" fontWeight="bold" mb={2}>
                    Tags
                  </Typography>
                  <TextField fullWidth label="Add Tags" margin="normal" />
                  <Box mt={1} display="flex" flexWrap="wrap" gap={1}>
                    <Chip label="T-Shirt" />
                    <Chip label="Men Clothes" />
                    <Chip label="Summer Collection" />
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default WithAdminLayout(AddProduct);
