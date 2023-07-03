import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import CartItem from "../components/CartItem";

import CardEmpty from "../components/CardEmpty";
import { selectCart } from "../redux/slices/cart/selectors";
import { clearItems } from "../redux/slices/cart/slice";

const Cart: React.FC = () => {
    const dispatch = useDispatch();
    const { items, totalPrice } = useSelector(selectCart);

    const totalCount = items.reduce((sum: number, item: any) => sum + item.count, 0);

    const onClickClear = () => {
        if (window.confirm("Вы хотите очистить корзиу?"))
            dispatch(clearItems());
    };

    if (!totalPrice) {
        return <CardEmpty />;
    }
    return (
        <div className="container container--cart">
            <div className="cart">
                <div className="cart__top">
                    <h2 className="content__title">
                        <svg
                            width="18"
                            height="18"
                            viewBox="0 0 18 18"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M6.33333 16.3333C7.06971 16.3333 7.66667 15.7364 7.66667 15C7.66667 14.2636 7.06971 13.6667 6.33333 13.6667C5.59695 13.6667 5 14.2636 5 15C5 15.7364 5.59695 16.3333 6.33333 16.3333Z"
                                stroke="white"
                                strokeWidth="1.8"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            ></path>{" "}
                        </svg>
                        Корзина
                    </h2>
                    <div onClick={onClickClear} className="cart__clear">
                        <span>Очистить корзину</span>
                    </div>
                </div>
                <div>
                    {items.map((item: any) => (
                        <CartItem key={item.id} {...item} />
                    ))}
                </div>

                <div className="cart__bottom">
                    <div className="cart__bottom-details">
                        <span>
                            {" "}
                            Всего пицц: <b>{totalCount} шт.</b>{" "}
                        </span>
                        <span>
                            {" "}
                            Сумма заказа: <b>{totalPrice} ₽</b>{" "}
                        </span>
                    </div>
                    <div className="cart__bottom-buttons">
                        <Link
                            to="/"
                            className="button button--outline button--add go-back-btn"
                        >
                            <span>Вернуться назад</span>
                        </Link>
                        <div className="button pay-btn">
                            <span>Оплатить сейчас</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
