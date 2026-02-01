"use client"
import { Box, Button, ButtonGroup, Typography, Grid } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { styled } from '@mui/material/styles'
import { getProduct } from '../../../redux/slices/productSlice'
import Loader from '../../../Components/Loader'
import ProductDetailSkeleton from '../../../Components/skeletons/ProductDetailSkeleton'
import { ProductFallBackImage } from '../../../Assets'
import { addToCart, getCartData } from '../../../redux/slices/cartSlice'
import { toast } from 'react-toastify'
import axiosInstance from '../../../lib/axiosInstance'
import { createOrder, verifyPayment } from '../../../redux/slices/paymentSlice'
import { getCheckoutForSingleProduct } from "../../../redux/slices/checkout"
import { getAllAddresses } from "../../../redux/slices/addressSlice"
import UserLayout from '../../../layout'
import { IProduct, IColorVariant } from '../../../types/types';
import { RootState } from '../../../redux/store';

const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [productImages, setProductImages] = useState<string[]>([]);
  const [selectedImage, setSelectedImage] = useState<string>();
  const [selectedColor, setSelectedColor] = useState<string | number>();
  const [selectedSize, setSelectedSize] = useState<string>();
  const [productDetails, setProductDetails] = useState<Partial<IProduct>>({});
  const [quantity, setQuantity] = useState<number>(1);
  const productState = useSelector((state: RootState) => state.product);
  const paymentState = useSelector((state: RootState) => state.payment);
  const cartState = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch<any>();
  const navigation = useNavigate();
  const sizes = ["XS", "S", "M", "L", "XL", "XXL", "3XL"]
  const { user } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    fetchProductDetails();
  }, [])

  const [razorLoaded, setRazorLoaded] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => setRazorLoaded(true);
      document.body.appendChild(script);

      return () => {
        if (document.body.contains(script)) {
          document.body.removeChild(script);
        }
      }
    }
  }, []);

  const fetchProductDetails = async () => {
    if (!id) return;
    const response = await dispatch(getProduct(id)).unwrap();

    setProductImages(response?.data?.images);
    setSelectedImage(response?.data?.images && response?.data?.images[0]);
    setSelectedColor(0);
    setSelectedSize(response?.data?.sizes[0]);
    setProductDetails(response?.data)
  };

  const handleChangeImage = (image: string) => {
    setSelectedImage(image);
  };

  const handleColorSelect = (color: string | number) => {
    setSelectedColor(color)
  };

  const handleColorSize = (size: string) => {
    setSelectedSize(size)
  };

  const handleIncrease = () => setQuantity((prev) => prev + 1);

  const handleDecrease = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  const handleAddToCart = async () => {
    const response = await dispatch(addToCart({ productId: productDetails._id || "", quantity: quantity }));
    if (response.payload.success) {
      toast.success("Product added to cart");
      await dispatch(getCartData());
    } else {
      toast.error("Something went wrong");
    }
  };

  const handleBuyNow = async () => {
    if (!productDetails?.price || !productDetails?._id) {
      toast.error("Product details not available");
      return;
    }

    try {
      // 1. Fetch User Address
      const addressResult = await dispatch(getAllAddresses()).unwrap();
      const addresses = addressResult.addresses || [];

      if (addresses.length === 0) {
        toast.error("Please add a shipping address in your profile first.");
        return;
      }
      const defaultAddress = addresses[0];

      const orderPayload = {
        amount: productDetails.price * quantity,
        products: [{
          _id: productDetails._id,
          productName: productDetails.productName || "Unknown Product",
          price: productDetails.price,
          quantity: quantity,
          discountPrice: productDetails.discountPrice
        }]
      };

      const res = await dispatch(createOrder(orderPayload));
      const order = res.payload;

      if (!order) {
        toast.error("Failed to create order");
        return;
      }

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_SECRET || process.env.REACT_APP_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: "Aagan Attire",
        description: `Payment for ${productDetails.productName}`,
        order_id: order.orderId,
        handler: async function (response: any) {
          let response1 = await dispatch(verifyPayment({
            orderId: order.orderId,
            paymentId: response.razorpay_payment_id,
            signature: response.razorpay_signature,
            shippingAddress: defaultAddress,
            email: user?.email || "",
            phone: defaultAddress.phone || ""
          }));
          if (response1.payload?.success) {
            toast.success("Payment Successful!");
          } else {
            toast.error("Payment Failed!");
          }
        },
        theme: {
          color: "#3399cc",
        },
        method: {
          upi: true
        }
      };

      if (typeof (window as any).Razorpay === 'undefined') {
        toast.error("Razorpay SDK failed to load. Please check your connection.");
        return;
      }

      const rzp = new (window as any).Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Payment Error:", error);
      toast.error("Payment processing failed");
    }
  };
  if (productState.loading || cartState.loading || paymentState.loading) {
    return <ProductDetailSkeleton />
  }
  return (
    <UserLayout>
      <ProductDetailsContainer>
        <Grid container spacing={1}>
          <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
            <Box className="imageGalleryWrapper">
              <Box className="mainImageContainer">
                <Box className='productDetailsMainImage' component={"img"} src={selectedImage || ProductFallBackImage} />
              </Box>
              <Box className="thumbnailsContainer">
                {productImages?.length > 0 && productImages.map((item, index) => {
                  return (
                    <Box key={index} className="thumbnailItem">
                      <Box
                        className={selectedImage !== item ? "productSmallImageBlur" : "productSmallImage"}
                        component={"img"}
                        src={item || ProductFallBackImage}
                        onClick={() => handleChangeImage(item)}
                      />
                    </Box>
                  )
                })}
              </Box>
            </Box>
          </Grid>
          <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
            <Box className={"rightContainer"}>
              <Box>
                <Typography className='productName'>{productDetails?.productName && productDetails.productName.length > 50 ? productDetails.productName.slice(0, 150) + "..." : productDetails?.productName}</Typography>
                <Typography className='productPrice'>${productDetails?.price}</Typography>
                <Typography variant='subtitle2' className='productSubPrice'>MRP incl. of all taxes</Typography>
                <Typography className='productDetails'>{productDetails?.description}</Typography>
              </Box>
              <Box>
                <Typography className='productPrice'>COLORS</Typography>
                <Box className={"colorContainer"}>
                  {Array.isArray(productDetails?.colors) && productDetails?.colors.map((item: IColorVariant | string, index: number) => {
                    const colorHex = typeof item === 'string' ? item : item.hexCode || "";
                    if (!colorHex) return null;
                    return <Box className={selectedColor === colorHex ? "colorBoxActive" : "colorBox"} sx={{ backgroundColor: colorHex }} key={index} onClick={() => { handleColorSelect(colorHex) }} />
                  })}
                </Box>
              </Box>
              <Box>
                <Typography className='productPrice'>SIZES</Typography>
                <Box className={"colorContainer"}>
                  {sizes.map((item, index) => {
                    return <Box
                      className={!productDetails?.sizes?.includes(item as any) ? "sizeBoxDisabled" : selectedSize === item ? "sizeBoxActive" : "sizeBox"}
                      key={index}
                      onClick={() => productDetails?.sizes?.includes(item as any) && handleColorSize(item)}>
                      {item}
                    </Box>
                  })}
                </Box>
              </Box>
              <Box alignItems="center" gap={2}>
                <Typography className='productPrice'>Quantity</Typography>
                <ButtonGroup variant="outlined" size="small" aria-label="quantity selector">
                  <Button onClick={handleDecrease} disabled={quantity <= 1}>–</Button>
                  <Button>{quantity}</Button>
                  <Button onClick={handleIncrease}>+</Button>
                </ButtonGroup>
              </Box>
              <Box sx={{ marginTop: "20px", flexDirection: "column", display: "flex", gap: "10px" }}>
                <Button className='buyNowBtn' fullWidth onClick={() => handleBuyNow()}>Buy Now</Button>
                <Button variant='outlined' className='addToCartBtn' fullWidth onClick={handleAddToCart}>Add To Cart</Button>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </ProductDetailsContainer>
    </UserLayout>
  )
}

export default ProductDetails
const ProductDetailsContainer = styled(Box)(({ theme }) => ({
  "& .leftContainer": {
    height: "582px",
    display: "flex",
    justifyContent: "space-between",
    gap: "20px",
    border: "1px solid red",
    "@media (max-width: 599px)": {
      display: "flex",
      flexDirection: "column",
      height: "auto",
      padding: "0px 0px",
    },
  },
  "& .imageGalleryWrapper": {
    display: "flex",
    flexDirection: "row",
    gap: "12px",
    "@media (max-width: 599px)": {
      flexDirection: "column",
    },
  },
  "& .mainImageContainer": {
    flex: 1,
  },
  "& .productDetailsMainImage": {
    display: "block",
    borderRadius: "8px",
    width: "100%",
    // height: "auto", // Let aspect ratio decide or fix it
    height: "500px",
    objectFit: "cover", // Changed to cover for better quality
    "@media (max-width: 899px)": {
      height: "450px",
    },
    "@media (max-width: 599px)": {
      height: "auto",
      aspectRatio: "3/4", // Mobile friendly
    },
  },
  "& .thumbnailsContainer": {
    width: "80px", // Fixed width for vertical strip
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    height: "500px", // Match main image
    overflowY: "auto",
    "@media (max-width: 899px)": {
      height: "450px",
    },
    "@media (max-width: 599px)": {
      width: "100%",
      height: "auto",
      flexDirection: "row",
      overflowX: "auto",
      overflowY: "hidden",
    },
  },
  "& .thumbnailItem": {
    flexShrink: 0,
  },
  "& .productSmallImage , & .productSmallImageBlur": {
    width: "80px",
    height: "80px",
    borderRadius: "8px",
    cursor: "pointer",
    objectFit: "cover",
    transition: "all 0.2s",
    border: "2px solid transparent",
  },
  "& .productSmallImage": {
    border: `2px solid ${theme.palette.text.primary}`, // Adapt border color
  },
  "& .productSmallImageBlur": {
    opacity: 0.6,
    "&:hover": {
      opacity: 1,
    }
  },
  "& .productName": {
    fontSize: "26px",
    fontWeight: 400,
    color: theme.palette.text.primary, // Use theme text color
  },
  "& .productPrice": {
    fontSize: "22px",
    fontWeight: 300,
    color: theme.palette.text.secondary, // Use theme secondary text
  },
  "& .productSubPrice": {
    fontWeight: 300,
    color: theme.palette.text.disabled, // Use theme disabled text
  },
  "& .productDetails": {
    color: theme.palette.text.primary, // Ensure details are visible
  },
  "& .colorContainer": {
    display: "flex",
    gap: "5px"
  },
  "& .colorBox": {
    width: "40px",
    height: "40px",
    border: "1px solid transparent",
  },
  "& .colorBoxActive": {
    width: "40px",
    height: "40px",
    border: `1px solid ${theme.palette.text.primary}`,
  },
  "& .sizeBox": {
    color: theme.palette.text.secondary,
    width: "40px",
    height: "40px",
    border: `1px solid ${theme.palette.divider}`,
    display: "flex",
    justifyContent: 'center',
    alignItems: "center",
    cursor: "pointer", // Added cursor pointer
  },
  "& .sizeBoxActive": {
    color: theme.palette.background.default, // Invert for active
    backgroundColor: theme.palette.text.primary, // Active background
    width: "40px",
    height: "40px",
    border: `1px solid ${theme.palette.text.primary}`,
    display: "flex",
    justifyContent: 'center',
    alignItems: "center",
    cursor: "pointer",
  },
  "& .sizeBoxDisabled": {
    color: theme.palette.text.disabled,
    width: "40px",
    height: "40px",
    border: `1px dashed ${theme.palette.divider}`,
    display: "flex",
    justifyContent: 'center',
    alignItems: "center",
    cursor: "not-allowed",
  },
  "& .rightContainer": {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "column",
    height: "100%"
  },
  "& .buyNowBtn": {
    backgroundColor: theme.palette.text.primary, // Use primary text color for button bg (black in light, white in dark)
    color: theme.palette.background.default, // Use background color for text (white in light, black in dark)
    "&:hover": {
      backgroundColor: theme.palette.text.secondary,
    }
  }
}));