export interface IItem {
  id: string;
  name: string;
  image: string;
}

export interface ISubCategory {
  id: string;
  name: string;
  items: IItem[];
}

export interface ICategory {
  id: string;
  name: string;
  icon: string;
  subCategories: ISubCategory[];
}

export interface ICategoryResponse {
  success: boolean;
  message: string;
  data: ICategory[] | null;
}


