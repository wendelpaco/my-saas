export type TCheckoutData = {
  userId: string;
  userEmail: string;
  produtct: TProduct;
  firstName?: string;
  lastName?: string;
};

export type TProduct = {
  planId: string;
  title: string;
  description: string;
  quantity?: number;
  price?: number;
  currencyId?: string;
  categoryId?: string;
  highlighted?: boolean;
};

export type TUserSession = {
  user: TUser;
};

export type TUser = {
  email: string;
  name: string;
  role?: string;
  image?: string;
  isSuperAdmin?: boolean;
  password?: string;
};
