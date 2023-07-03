import React from "react";

type CategoriesProps = {
    categoryValue: number;
    onChangeCategory: (index: number) => void;
}

const Categories: React.FC<CategoriesProps> = React.memo(({ categoryValue, onChangeCategory }) => {
    const categories = [
        "Все",
        "Мясные",
        "Вегетарианская",
        "Гриль",
        "Острые",
        "Закрытые",
    ];

    return (
        <div className="categories">
            <ul>
                {categories.map((categoryName, index) => (
                    <li
                        key={index}
                        onClick={() => onChangeCategory(index)}
                        className={categoryValue === index ? "active" : ""}
                    >
                        {categoryName}
                    </li>
                ))}
            </ul>
        </div>
    );
});

export default Categories;
