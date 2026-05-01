export const getStarsArray = (avgRating: number, maxStars: number = 5): ("full" | "half" | "empty")[] => {
    const stars: ("full" | "half" | "empty")[] = [];

    for (let i = 1; i <= maxStars; i++) {
        if (avgRating >= i) {
            stars.push("full");
        } else if (avgRating >= i - 0.5) {
            stars.push("half");
        } else {
            stars.push("empty");
        }
    }

    return stars;
};

export const getStockPercent = (stock: number, sold: number): number => {
    const total = stock + sold;
    if (total === 0) return 0;
    const percent = (stock / total) * 100;
    return Math.max(0, Math.min(100, percent));
};