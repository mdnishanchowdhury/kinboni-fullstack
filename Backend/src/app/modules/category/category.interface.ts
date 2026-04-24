interface IItem {
    name: string;
    image?: string;
}

interface ISubCategory {
    name: string;
    items: IItem[];
}

interface ICategoryPayload {
    name: string;
    icon?: string;
    subCategories: ISubCategory[];
}
