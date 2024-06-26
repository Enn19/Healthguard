import axios from 'axios';
import { useContext, useState } from 'react';
import { Helmet } from 'react-helmet';
import { FallingLines, Puff } from 'react-loader-spinner';
import { useQuery } from 'react-query';
import { Link, useParams } from 'react-router-dom';
import { CartContext } from '../../context/cartContext';
import toast from 'react-hot-toast';
import { FaRegHeart } from "react-icons/fa";
import { FaHeart as SolidHeart } from 'react-icons/fa';

export default function ProductDetails() {
    const { addProduct, addProductToWishList, deleteItemFromWish, wishListStatus, setWishListStatus } = useContext(CartContext)
    const [cartLooder, setCartLooder] = useState(false)
    const [activeTab, setActiveTab] = useState('description');
    //  fucation that call add product to cart funcation from cart context 
    async function addProductToCart(id) {
        setCartLooder(true)
        const res = await addProduct(id)
        if (res && res.status === "success") {
            toast.success(res.message, {
                duration: 2000
            })
        } else {
            toast.error("Error Happened")
        }
        setCartLooder(false)
    }
    // funcation that call allproduct to add wish list
    async function ProductWishList(id) {
        if (!id) {
            console.error("Product id is not defined");
            return;
        }
        try {
            let res;
            if (wishListStatus[id]) {
                res = await deleteItemFromWish(id);
            } else {
                res = await addProductToWishList(id);
            }
            if (res.status === "success") {
                toast.success(res.message, { duration: 2000 });
                setWishListStatus(prevStatus => ({ ...prevStatus, [id]: !prevStatus[id] }));
                localStorage.setItem('wishlistStatus', JSON.stringify({ ...wishListStatus, [id]: !wishListStatus[id] }));
            } else {
                toast.error("Error occurred");
            }
        } catch (error) {
            console.error("Error:", error);
            toast.error("An error occurred");
        }
    }
    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };
    const { id } = useParams()
    //get product by id from api 
    function getProductDetails() {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
    }

    const { data, isLoading } = useQuery("productDetails", getProductDetails)
    //loading screen 
    if (isLoading) {
        return <div className="vh-100 d-flex justify-content-center align-items-center">
            <Puff
                visible={true}
                height="80"
                width="80"
                color="#0F969C"
                ariaLabel="puff-loading"
                wrapperStyle={{}}
                wrapperClass=""
            />
        </div>
    }

    return <>
        <Helmet>
            <title>{data.data.data.title}</title>
        </Helmet>

        <style>{`
        body {
          background: linear-gradient(to top, #072E33, #009578); 
          margin: 0;
          padding: 0; 
        }
      `}</style>
        <div className="container-fluid mt-5 p-5 col-lg-10 bg-light boreder rounded">
            <div className="row d-felx align-items-center  ">
                <div className="col-lg-6 col-12">
                    {/* {data.data.data.imageCover} */}
                    <img className="w-75" src={require('../../image/healthguard logo.jpeg')} alt={data.data.data.title} />
                </div>

                <div className="col-lg-6 col-12">
                    {/* {data.data.data.title} */}
                    <h3>Product name</h3>
                    {/* {data.data.data.description} */}
                    <p>description</p>
                    <div className='d-flex justify-content-between align-items-center'>
                        {/* {data.data.data.category.name} */}
                        <h5 className='text-main py-2'>category name</h5>
                        <Link><i

                        >{wishListStatus[id] ? (
                            <SolidHeart
                                onClick={() => ProductWishList(id)}
                                className="text-danger"
                                style={{ cursor: 'pointer' }}
                            />
                        ) : (
                            <FaRegHeart
                                onClick={() => ProductWishList(id)}
                                className="text-dark"
                                style={{ cursor: 'pointer' }}
                            />
                        )}</i></Link>
                    </div>
                    <div className='d-flex justify-content-between'>
                        {/* {data.data.data.price} EGP */}
                        <p className='logo'>price</p>
                        {/* {data.data.data.ratingsAverage} */}
                        <span> rate <i className="fa-solid fa-star text-warning"></i></span>
                    </div>
                    <button onClick={() => addProductToCart(data.data.data.id)} className='btn btn-outline-primary w-100 py-2 mt-5'>
                        {cartLooder ? <FallingLines
                            color="#fff"
                            width="30"
                            visible={true}
                            ariaLabel='falling-lines-loading'
                        /> : " +Add To Cart"}
                    </button>
                </div>

                <div>
                    <ul className="nav nav-underline justify-content-center">
                        <li className="nav-item">
                            <a
                                className={`nav-link logo fw-bold ${activeTab === 'description' ? 'active' : ''}`}
                                onClick={() => handleTabClick('description')}
                                href="#"
                            >
                                Description
                            </a>
                            {activeTab === 'description' && (
                                <p>
                                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quaerat atque, sit esse, ratione quo laudantium
                                    odio iusto voluptatibus in cum natus repellat laborum suscipit. Aspernatur quis, maiores reprehenderit
                                    minima excepturi at atque culpa deleniti harum minus commodi! Natus quo aspernatur maxime facere dicta eius
                                    nostrum saepe adipisci iure velit, asperiores alias dolorem, vel necessitatibus voluptas et cumque? Magnam,
                                    quas!
                                </p>
                            )}
                        </li>
                        <li className="nav-item">
                            <a
                                className={`nav-link logo fw-bold ${activeTab === 'reviews' ? 'active' : ''}`}
                                onClick={() => handleTabClick('reviews')}
                                href="#"
                            >
                                Reviews
                            </a>
                            {activeTab === 'reviews' && (
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempore, dolorum, repellat doloremque
                                    eveniet quam libero saepe rem aliquid nobis consectetur sit laborum soluta. Autem, laboriosam, quia
                                    odit veniam sequi beatae eos voluptate dolore eligendi. Quisquam, aperiam, velit culpa fugit
                                    eveniet ex quod ducimus voluptate autem molestiae temporibus, iusto vero.
                                </p>
                            )}
                        </li>
                    </ul>
                </div>
            </div>
        </div>

    </>
}