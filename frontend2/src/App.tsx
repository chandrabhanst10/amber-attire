import React, { Suspense, lazy } from 'react'
import { Route, Routes } from 'react-router-dom'
import { UserProtectedRoute, AdminProtectedRoute, PublicOnlyRoute } from './Protect';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from './redux/store';
import { lightTheme, darkTheme } from './theme/themeController';

// Public / Shared
const HomePage = lazy(() => import('./user/home/Home'));
const Products = lazy(() => import('./user/products/page'));
const ProductDetails = lazy(() => import('./user/products/[id]/page')); // Added
const LazyNotFound = lazy(() => import('./Components/NotFound'));

// Auth
const SignIn = lazy(() => import('./auth/signin/page'));
const SignUp = lazy(() => import('./auth/signup/page'));
const VerifyOtpPage = lazy(() => import('./auth/verify-otp/page'));
const ForgotPassword = lazy(() => import('./auth/forgot-password/page')); // Added
const EmailVerification = lazy(() => import('./email-verification/[name]/[token]/page')); // Added

// User
const Cart = lazy(() => import('./user/cart/page'));
const Checkout = lazy(() => import('./user/checkout/page'));
const UserProfile = lazy(() => import('./user/profile/page'));
const UserAddress = lazy(() => import('./user/address/page')); // Added
const UserPayments = lazy(() => import('./user/payments/page')); // Added

// Admin
const AdminDashboard = lazy(() => import('./admin/page'));
const AdminLogin = lazy(() => import('./admin/login/page')); // Added
const AdminRegister = lazy(() => import('./admin/register/page')); // Added
const AdminProducts = lazy(() => import('./admin/products/page')); // Added
const AdminProductDetails = lazy(() => import('./admin/products/[id]/page')); // Added
const AdminAddProduct = lazy(() => import('./admin/add-product/page')); // Added
const AdminOrders = lazy(() => import('./admin/orders/page')); // Added
const AdminCustomers = lazy(() => import('./admin/customers/page')); // Added
const AdminCustomerDetails = lazy(() => import('./admin/customers/[id]/page')); // Added
const AdminAddCustomer = lazy(() => import('./admin/customers/add-customer/page')); // Added
const AdminCoupons = lazy(() => import('./admin/coupons/page')); // Added
const AdminAddCoupon = lazy(() => import('./admin/coupons/add-coupon/page')); // Added
const AdminSettings = lazy(() => import('./admin/settings/page')); // Added
const AdminInbox = lazy(() => import('./admin/inbox/page')); // Added


const App = () => {
  const themeMode = useSelector((state: RootState) => state.theme.mode);
  const currentTheme = themeMode === 'light' ? lightTheme : darkTheme;

  return (
    <ThemeProvider theme={currentTheme}>
      <CssBaseline />
      <div>
        <Suspense fallback={<div style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}>Loading...</div>}>
          <Routes>
            {/* Public Routes (Guest Available) */}
            <Route path='/' element={<HomePage />} />
            <Route path="/user/products" element={<Products />} />
            <Route path="/user/products/tag/:tag" element={<Products />} />
            <Route path="/user/products/:id" element={<ProductDetails />} />
            <Route path="/user/cart" element={<Cart />} />
            <Route path='/email-verification/:name/:token' element={<EmailVerification />} />

            {/* Guest Only Routes (Login/Register) */}
            <Route path='/sign-in' element={<PublicOnlyRoute><SignIn /></PublicOnlyRoute>} />
            <Route path='/sign-up' element={<PublicOnlyRoute><SignUp /></PublicOnlyRoute>} />
            <Route path='/verify-otp/:email' element={<VerifyOtpPage />} />
            <Route path='/forgot-password' element={<PublicOnlyRoute><ForgotPassword /></PublicOnlyRoute>} />

            <Route path="/admin/login" element={<PublicOnlyRoute><AdminLogin /></PublicOnlyRoute>} />
            <Route path="/admin/register" element={<PublicOnlyRoute><AdminRegister /></PublicOnlyRoute>} />


            {/* Protected User Routes */}
            <Route path="/user/checkout" element={<UserProtectedRoute><Checkout /></UserProtectedRoute>} />
            <Route path="/user/profile" element={<UserProtectedRoute><UserProfile /></UserProtectedRoute>} />
            <Route path="/user/address" element={<UserProtectedRoute><UserAddress /></UserProtectedRoute>} />
            <Route path="/user/payments" element={<UserProtectedRoute><UserPayments /></UserProtectedRoute>} />

            {/* Protected Admin Routes */}
            <Route path="/admin/dashboard" element={<AdminProtectedRoute><AdminDashboard /></AdminProtectedRoute>} />
            <Route path="/admin/products" element={<AdminProtectedRoute><AdminProducts /></AdminProtectedRoute>} />
            <Route path="/admin/products/:id" element={<AdminProtectedRoute><AdminProductDetails /></AdminProtectedRoute>} />
            <Route path="/admin/add-product" element={<AdminProtectedRoute><AdminAddProduct /></AdminProtectedRoute>} />
            <Route path="/admin/orders" element={<AdminProtectedRoute><AdminOrders /></AdminProtectedRoute>} />
            <Route path="/admin/customers" element={<AdminProtectedRoute><AdminCustomers /></AdminProtectedRoute>} />
            <Route path="/admin/customers/add" element={<AdminProtectedRoute><AdminAddCustomer /></AdminProtectedRoute>} />
            <Route path="/admin/customers/:id" element={<AdminProtectedRoute><AdminCustomerDetails /></AdminProtectedRoute>} />
            <Route path="/admin/coupons" element={<AdminProtectedRoute><AdminCoupons /></AdminProtectedRoute>} />
            <Route path="/admin/coupons/add" element={<AdminProtectedRoute><AdminAddCoupon /></AdminProtectedRoute>} />
            <Route path="/admin/settings" element={<AdminProtectedRoute><AdminSettings /></AdminProtectedRoute>} />
            <Route path="/admin/inbox" element={<AdminProtectedRoute><AdminInbox /></AdminProtectedRoute>} />

            {/* 404 */}
            <Route path="*" element={<div style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}>
              <React.Suspense fallback={<div>Loading...</div>}>
                <LazyNotFound />
              </React.Suspense>
            </div>} />
          </Routes>
        </Suspense>
      </div>
    </ThemeProvider>
  )
}
export default App