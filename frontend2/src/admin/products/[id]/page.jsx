"use client"
import React, { useEffect, useRef, useState } from "react";
import { Box, Grid, TextField, Typography, Button, Switch, Select, MenuItem, Chip, FormControlLabel, InputLabel, FormControl, Checkbox, ListItemText, OutlinedInput, IconButton } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProduct } from "../../../redux/slices/productSlice";
import Loader from "../../../Components/Loader";
import DeleteIcon from "@mui/icons-material/Delete";
const sizes = ["S", "M", "L", "XL", "XXL"];
const colors = [
  { name: "Red", hexCode: "#FF0000" },
  { name: "Blue", hexCode: "#0000FF" },
  { name: "Green", hexCode: "#00FF00" }
];
const fits = ["Regular", "Slim", "Loose", "Oversized"];
const sleeveTypes = ["Half Sleeve", "Full Sleeve", "Sleeveless"];
const neckTypes = ["Round Neck", "V Neck", "Collared"];
const fabrics = ["Cotton", "Polyester", "Linen"];
const materialCares = ["Machine wash", "Hand wash only"];

const ProductDetails = () => {
  const { id } = useParams(); // React Router hook
  const [images, setImages] = useState([]);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ tags: [], fits: [], sizes: [] });
  const { loading, currentProduct } = useSelector((state) => state.product);
  const dispatch = useDispatch();

  useEffect(() => {
    getIdProduct();
  }, [id]);

  // useEffect(() => {
  //   if (currentProduct) {
  //     setFormData(currentProduct);
  //   }
  // }, [currentProduct]);


  const getIdProduct = async () => {
    let result = await dispatch(getProduct(id))
    setFormData(result.payload.data.data)
  };

  const handleFiles = (event) => {
    const files = Array.from(event.target.files);
    setImages((prev) => [...prev, ...files]);
  };

  const handleBack = () => {
    navigate("/admin/products")
  };

  const handleOnchange = (event) => {
    setFormData((prev) => ({
      ...prev,
      [event.target.checked ? "category" : event.target.name]: event.target.checked ? event.target.name : event.target.value
    }))
  }

  const removeImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && formData.tag.trim() !== "") {
      e.preventDefault(); // prevent form submit

      if (!formData.tags.includes(formData.tag.trim())) {
        setFormData((prev) => ({
          ...prev,
          tags: [...prev.tags, prev.tag.trim()],
          tag: ""
        }));
      } else {
        setFormData((prev) => ({ ...prev, tag: "" }));
      }
    }
  };

  const handleDelete = (tagToDelete) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((t) => t !== tagToDelete),
    }));
  };

  const handleChange = (event, field) => {
    const value = event.target.value;
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  }

  return (
    <Box sx={{ p: 2 }}>
      {loading && <Loader />}
      {/* <Button variant="text" sx={{color: "#fff" }} onClick={handleBack}>
        &lt; Back
      </Button> */}
      <form onSubmit={handleSubmit}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Typography variant="h5" fontWeight="bold" color="#fff">
            Product Details
          </Typography>
          <Box display="flex" justifyContent="flex-end" mb={2} gap={2}>
            <Button variant="outlined" sx={{ color: "#fff", border: "1px solid #fff" }} onClick={handleBack}>
              Cancel
            </Button>
            <Button variant="outliend" type="submit" sx={{ color: "#fff", border: "1px solid #fff" }} onClick={handleSubmit}>
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
              <Grid container spacing={2}>
                <Grid item size={{ xs: 12, sm: 6, md: 3, lg: 3 }}>
                  <TextField slotProps={{ label: { shrink: true, } }} required fullWidth label="Product Name" placeholder="Summer T-Shirt" margin="normal" name={"productName"} value={formData.productName || ""} onChange={handleOnchange} />
                </Grid>
                <Grid item size={{ xs: 12, sm: 6, md: 3, lg: 3 }}>
                  <TextField slotProps={{ label: { shrink: true, } }} required fullWidth label="Slug" placeholder="slug" margin="normal" name={"slug"} value={formData.slug || ""} onChange={handleOnchange} />
                </Grid>
                <Grid item size={{ xs: 12, sm: 6, md: 3, lg: 3 }}>
                  <TextField
                    slotProps={{ label: { shrink: true, } }}
                    fullWidth
                    label="Product Description"
                    margin="normal"
                    placeholder="Product description"
                    value={formData.description || ""}
                    name="description"
                    onChange={handleOnchange}
                    required
                  />
                </Grid>
                <Grid item size={{ xs: 12, sm: 6, md: 3, lg: 3 }}>
                  <TextField
                    slotProps={{ label: { shrink: true, } }}
                    fullWidth
                    label="Short Description"
                    margin="normal"
                    placeholder="short description"
                    value={formData.shortDescription || ""}
                    name="shortDescription"
                    onChange={handleOnchange}
                    required
                  />
                </Grid>
                <Grid item size={{ xs: 12, sm: 6, md: 3, lg: 3 }}></Grid>
                <Grid item size={{ xs: 12, sm: 6, md: 3, lg: 3 }}></Grid>
              </Grid>
              <Grid container spacing={2}>
                <Grid item size={{ xs: 12, sm: 6, md: 6, lg: 6 }}>
                  <Typography variant="subtitle1" fontWeight="bold" mt={1} mb={2}>
                    Brand/Size
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item size={{ xs: 12, sm: 6, md: 6, lg: 6 }}>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Brand</InputLabel>
                        <Select
                          label="Brand"
                          value={formData.brand || ""}
                          name="brand"
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
                    <Grid item size={{ xs: 12, sm: 6, md: 6, lg: 6 }}>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Size</InputLabel>
                        <Select
                          labelId="sizes-label"
                          multiple
                          value={formData.sizes || ""}
                          onChange={(e) => handleChange(e, "sizes")}
                          input={<OutlinedInput label="Sizes" />}
                          renderValue={(selected) => selected.join(", ")}
                        >
                          {sizes.map((size) => (
                            <MenuItem key={size} value={size}>
                              <Checkbox checked={formData?.sizes?.indexOf(size) > -1} />
                              <ListItemText primary={size} />
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item size={{ xs: 12, sm: 6, md: 6, lg: 6 }}>
                  {/* Price */}
                  <Typography variant="subtitle1" fontWeight="bold" mt={1} mb={2}>
                    Price
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item size={{ xs: 12, sm: 6, md: 6, lg: 6 }}>
                      <TextField slotProps={{ label: { shrink: true, } }} required fullWidth label="Product Price" name="price" value={formData.price || ""} onChange={handleOnchange} />
                    </Grid>
                    <Grid item size={{ xs: 12, sm: 6, md: 6, lg: 6 }}>
                      <TextField slotProps={{ label: { shrink: true, } }} required fullWidth label="Discount Price" name="discountPrice" value={formData.discountPrice || ""} onChange={handleOnchange} />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid container spacing={2}>
                <Grid item size={{ xs: 12, sm: 12, md: 12, lg: 12 }}>
                  <Typography variant="subtitle1" fontWeight="bold" mt={1} mb={2}>
                    Variants for Clothing
                  </Typography>
                  <Grid container spacing={2}>
                    {/* Color */}
                    <Grid item size={{ xs: 12, sm: 6, md: 4, lg: 4 }}>
                      <FormControl fullWidth>
                        <InputLabel>Color</InputLabel>
                        <Select
                          label="Color"
                          name="color"
                          value={formData.color || ""}
                          onChange={handleOnchange}
                        >
                          {colors.map((c, i) => (
                            <MenuItem key={i} value={c.name}>
                              <Box display="flex" alignItems="center" gap={1}>
                                <span
                                  style={{
                                    display: "inline-block",
                                    width: 16,
                                    height: 16,
                                    backgroundColor: c.hexCode,
                                    borderRadius: "50%"
                                  }}
                                />
                                {c.name}
                              </Box>
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>

                    {/* Fit */}
                    <Grid item size={{ xs: 12, sm: 6, md: 4, lg: 4 }}>
                      <FormControl fullWidth>
                        <InputLabel>Fit</InputLabel>
                        <Select
                          labelId="fits-label"
                          multiple
                          value={formData.fits || ""}
                          onChange={(e) => handleChange(e, "fits")}
                          input={<OutlinedInput label="Fits" />}
                          renderValue={(selected) => selected.join(", ")}
                        >
                          {fits.map((fit) => (
                            <MenuItem key={fit} value={fit}>
                              <Checkbox checked={formData?.fits?.indexOf(fit) > -1} />
                              <ListItemText primary={fit} />
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>

                    {/* Sleeve Type */}
                    <Grid item size={{ xs: 12, sm: 6, md: 4, lg: 4 }}>
                      <FormControl fullWidth>
                        <InputLabel>Sleeve Type</InputLabel>
                        <Select
                          label="Sleeve Type"
                          name="sleeveType"
                          value={formData.sleeveType || ""}
                          onChange={handleOnchange}
                        >
                          {sleeveTypes.map((s, i) => (
                            <MenuItem key={i} value={s}>
                              {s}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>

                    {/* Neck Type */}
                    <Grid item size={{ xs: 12, sm: 6, md: 4, lg: 4 }}>
                      <FormControl fullWidth>
                        <InputLabel>Neck Type</InputLabel>
                        <Select
                          label="Neck Type"
                          name="neckType"
                          value={formData.neckType || ""}
                          onChange={handleOnchange}
                        >
                          {neckTypes.map((n, i) => (
                            <MenuItem key={i} value={n}>
                              {n}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>

                    {/* Fabric */}
                    <Grid item size={{ xs: 12, sm: 6, md: 4, lg: 4 }}>
                      <FormControl fullWidth>
                        <InputLabel>Fabric</InputLabel>
                        <Select
                          label="Fabric"
                          name="fabric"
                          value={formData.fabric || ""}
                          onChange={handleOnchange}
                        >
                          {fabrics.map((f, i) => (
                            <MenuItem key={i} value={f}>
                              {f}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>

                    {/* Material Care */}
                    <Grid item size={{ xs: 12, sm: 6, md: 4, lg: 4 }}>
                      <FormControl fullWidth>
                        <InputLabel>Material Care</InputLabel>
                        <Select
                          label="Material Care"
                          name="materialCare"
                          value={formData.materialCare || ""}
                          onChange={handleOnchange}
                        >
                          {materialCares.map((m, i) => (
                            <MenuItem key={i} value={m}>
                              {m}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              {/* Inventory */}
              <Typography variant="subtitle1" fontWeight="bold" mt={4} mb={2}>
                Inventory
              </Typography>
              <Grid container spacing={2}>
                <Grid item size={{ xs: 12, sm: 6, md: 3, lg: 3 }}>
                  <TextField slotProps={{ label: { shrink: true, } }} required fullWidth label="Stock" name="stock" value={formData.stock || ""} onChange={handleOnchange} type="number" />
                </Grid>
                <Grid item size={{ xs: 12, sm: 6, md: 3, lg: 3 }}>
                  <TextField slotProps={{ label: { shrink: true, } }} fullWidth label="Sku" name="sku" value={formData.sku || ""} onChange={handleOnchange} />
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
                  <FormControlLabel control={<Switch checked={formData.category === "shirt"} onChange={handleOnchange} name="shirt" />} label="Shirt" />
                  <FormControlLabel control={<Switch checked={formData.category === "kurta"} onChange={handleOnchange} name="kurta" />} label="Kurta" />
                </Box>
              </Grid>
              <Grid item>
                <Box p={2} borderRadius={2} bgcolor="#fff" boxShadow={2}>
                  <Typography variant="subtitle1" fontWeight="bold" mb={1}>
                    Tags
                  </Typography>
                  <TextField
                    required
                    fullWidth
                    label="Add Tag"
                    placeholder="Add Tag"
                    margin="normal"
                    name="tag"
                    value={formData.tag || ""}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, tag: e.target.value }))
                    }
                    onKeyDown={handleKeyDown}
                  />
                  <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", mt: 1 }}>
                    {Array.isArray(formData.tags) && formData.tags.map((t, i) => (
                      <Chip key={i} label={t} onDelete={() => handleDelete(t)} />
                    ))}
                  </Box>
                </Box>
              </Grid>
              <Grid item>
                <Box p={2} borderRadius={2} bgcolor="#fff" boxShadow={2}>
                  {/* Images */}
                  <Typography variant="subtitle1" fontWeight="bold" mt={1} mb={1}>
                    Images
                  </Typography>
                  <Button variant="contained" component="label" disabled={images.length === 4}>
                    Choose Images
                    <input
                      type="file"
                      hidden
                      accept="image/*"
                      multiple   // ✅ allow selecting multiple images
                      onChange={handleFiles}
                    />
                  </Button>

                  {/* Preview Images */}
                  <Grid container spacing={2} mt={2}>
                    {Array.isArray(formData.images) && formData.images.map((file, index) => (
                      <Grid item xs={6} sm={4} md={3} size={{ xs: 12, sm: 6, md: 3, lg: 3 }} key={index}>
                        <Box
                          sx={{
                            position: "relative",
                            border: "1px solid #ccc",
                            borderRadius: 2,
                            overflow: "hidden",
                          }}
                        >
                          <img
                            src={file}
                            alt={file.name}
                            style={{ width: "100%", height: 150, objectFit: "cover" }}
                          />
                          <IconButton
                            size="small"
                            sx={{ position: "absolute", top: 4, right: 4, bgcolor: "white" }}
                            onClick={() => removeImage(index)}
                          >
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        </Box>
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default ProductDetails;
