export interface AdminStats {
  totalOrders: number;
  totalUsers: number;
  totalProducts: number;
  totalRevenue: number;
  ordersByStatus: any[];
  dailySales: any[];
  monthlySales: any[];
  topProducts: any[];
  lowStockProducts: any[];
}

export interface UpdateUserRolePayload {
  role: "USER" | "ADMIN";
}
