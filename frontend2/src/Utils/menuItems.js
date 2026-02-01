import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteIcon from '@mui/icons-material/Favorite';
import HistoryIcon from '@mui/icons-material/History';
import HelpIcon from '@mui/icons-material/Help';

const menuItems = [
  {
    label: 'My Profile',
    icon: <AccountCircleIcon />,
    path: '/user/profile',
    protected: true,
  },
  {
    label: 'Products',
    icon: <AccountCircleIcon />,
    path: '/user/products',
    protected: false,
  },
  {
    label: 'My Orders',
    icon: <HistoryIcon />,
    path: '/user/orders',
    protected: true,
  },
  {
    label: 'Wishlist',
    icon: <FavoriteIcon />,
    path: '/user/wishlist',
    protected: true,
  },
  {
    label: 'My Cart',
    icon: <ShoppingCartIcon />,
    path: '/user/cart',
    protected: true,
  },
  {
    label: 'Help & Support',
    icon: <HelpIcon />,
    path: '/user/help',
    protected: false,
  },
];

export default menuItems;
