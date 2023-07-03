import React, { useEffect } from "react";
import { useSelector } from "react-redux";

import Categories from "../components/Categories";
import PizzaBlock from "../components/PizzaBlock/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Skeleton";
import Sort from "../components/Sort";
import Pagination from "../Pagination/Pagination";

import { useAppDispatch } from "../redux/store";
import { selectFilter } from "../redux/slices/filter/selectors";
import { selectPizzaData } from "../redux/slices/pizza/selectors";
import { setCategoryId, setCurrentPage } from "../redux/slices/filter/slice";
import { fetchPizzas } from "../redux/slices/pizza/asyncActions";

const Home: React.FC = () => {
    const dispatch = useAppDispatch();

    const { categoryId, sort, currentPage, searchValue } =
        useSelector(selectFilter);
        
    const { items, status } = useSelector(selectPizzaData);

    const onChangeCategory = (idx: number) => {
        dispatch(setCategoryId(idx));
    };

    const onChangePage = (page: number) => {
        dispatch(setCurrentPage(page));
    };

    const getPizzas = async () => {
        const sortBy = sort.sortProperty.replace("-", "");
        const order = sort.sortProperty.includes("-") ? "asc" : "desc";
        const category = categoryId > 0 ? `category=${categoryId}` : "";
        const search = searchValue ? `$search=${searchValue}` : "";

        dispatch(
            fetchPizzas({
                sortBy,
                order,
                category,
                search,
                currentPage: String(currentPage),
            })
        );
        window.scrollTo(0, 0);
    };

    useEffect(() => {
        getPizzas();
    }, [categoryId, sort.sortProperty, searchValue, currentPage]);

    const pizzas = items.map((item: any) => <PizzaBlock key={item.id} {...item} />);

    const skeletons = [...new Array(6)].map((_, index) => (
        <Skeleton key={index} />
    ));

    return (
        <>
            <div className="content__top">
                <Categories
                    categoryValue={categoryId}
                    onChangeCategory={onChangeCategory}
                />
                <Sort value={sort}/>
            </div>
            <h2 className="content__title">Все пиццы</h2>
            {status === "error" ? (
                <div className="content__error-info">
                    {" "}
                    <h2>Произошла ошибка 😕</h2>{" "}
                    <p>Обновите страницу или вернитесь по позже.</p>
                </div>
            ) : (
                <div className="content__items">
                    {status === "loading" ? skeletons : pizzas}
                </div>
            )}

            <Pagination currentPage={currentPage} onChangePage={onChangePage} />
        </>
    );
};

export default Home;
