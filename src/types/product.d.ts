export interface IProduct {
  _id: string;
  id: string;
  img: string;
  name: string;
  price: number;
  compare_at_price: number;
  description: string;
  estimate_ship_date: string;
  tags: string;
  thumbnails: string[];
  images: string[];
  quantity: string;
  image: string;
}

export interface IComment {
  _id: string;
  userId: string;
  productId: string;
  rate: number;
  cmt: string;
  createdAt: string;
  updatedAt: string;
  fullname: string[];
  ingame: string[];
}

export interface ICart {
  cartDTO: {
    id: number;
    username: string;
  };

  items: ICartItem[];
}

export interface ICartItem {
  cartItemDTO: ICartItemDTO;

  productDTO: IProductDTO;

  images: ICartImages[];
}

export interface ICartItemDTO {
  id: number;
  cartId: number;
  productId: number;
  quantity: number;
}

export interface IProductDTO {
  id: number;
  name: string;
  description: string;
  price: number;
  compareAtPrice: number;
  image: string | null;
}

export interface ICartImages {
  id: number;
  url: string;
  productId: number;
}
