import React, {useEffect, useState} from 'react';

import Link from "next/link";
import {getCategories} from "../services";

const Header = () => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        getCategories()
            .then((newCategories) => setCategories(newCategories));
    }, []);

    return (
        <div className="mx-auto px-10 mb-8 bg-red-800">
            <div className="border-b w-full inline-block border-black py-8">
                <img src="https://cdn-images-1.medium.com/max/600/1*0bahf7NKTyuD_5h0vW-LUA@2x.png" alt="Logo do site" className="h-16 w-16 float-left object-cover mr-8"/>
                <div className="md:float-left block">
                    <Link href="/">
                        <span className="cursor-pointer font-bold text-4xl text-white float-left mt-3">
                            Miséria da Razão
                        </span>
                    </Link>
                </div>
                <div className="hidden md:float-left md:contents">
                    {categories.map((category) => (
                        <Link key={category.slug} href={`/category/${category.slug}`}>
                            <span className="md:float-right mt-4 align-middle text-white ml-4 font-semibold cursor-pointer">
                                {category.nome}
                            </span>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Header;