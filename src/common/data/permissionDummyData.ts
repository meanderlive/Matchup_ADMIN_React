type Role = "super_admin" | "admin" | "finance_admin" | "service_admin";

type Permission = {
  menu: string;
  roles: Role[];
};

const permissions: Permission[] = [
//   { menu: "Admin Login | Logout", roles: ["super_admin", "admin", "finance_admin", "service_admin"] },
//   { menu: "Forgot | Reset Password", roles: ["super_admin", "admin", "finance_admin", "service_admin"] },
//   { menu: "Admin Permissions (ACL)", roles: ["super_admin"] },
//   { menu: "Dashboard", roles: ["super_admin", "admin", "finance_admin", "service_admin"] },
//   { menu: "Admin Menu (Navigation) | Header | Footer", roles: ["super_admin", "admin", "finance_admin", "service_admin"] },
//   { menu: "Admins (Internal Admin Users)", roles: ["super_admin"] },
  { menu: "Customers", roles: ["super_admin", "admin"] },
  { menu: "Providers", roles: ["super_admin", "admin"] },
  { menu: "Drivers", roles: ["super_admin", "admin"] },
  { menu: "Services", roles: ["super_admin", "admin", "service_admin"] },
  { menu: "Offerings", roles: ["super_admin", "admin", "finance_admin", "service_admin"] },
  { menu: "Bookings", roles: ["super_admin", "admin", "finance_admin", "service_admin"] },
  { menu: "Transactions", roles: ["super_admin", "admin", "finance_admin"] },
  { menu: "Inventories", roles: ["super_admin", "admin"] },
  { menu: "Reviews", roles: ["super_admin", "admin", "finance_admin", "service_admin"] },
  { menu: "Preferences", roles: ["super_admin", "admin", "finance_admin", "service_admin"] },
  { menu: "Settings", roles: ["super_admin", "admin", "finance_admin", "service_admin"] },
  { menu: "Plans", roles: ["super_admin", "admin", "finance_admin", "service_admin"] },
  { menu: "Subscriptions", roles: ["super_admin", "admin", "finance_admin", "service_admin"] },
  { menu: "Reports - Customer Loyalty", roles: ["super_admin", "admin", "finance_admin", "service_admin"] },
];

export default permissions;
