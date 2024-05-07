import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';

function EditProduct() {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [quantity, setQuantity] = useState("");
    const [category_id, setCategory_id] = useState("");
    const [category, setCategory] = useState('');




    const { id } = useParams();

    useEffect(() => {

        axios.get(`http://localhost:8080/product/${id}`)
            .then(response => {
                setName(response.data.name);
                setPrice(response.data.price);
                setQuantity(response.data.quantity);
                setCategory_id(response.data.category?.category_id);

            })
            .catch(error => {
                console.log(error);
            });

        axios.get('http://localhost:8080/categories')
            .then(response => {
                setCategory(response.data);

            }).catch(error => {
                console.log(error);
            });

    }, [id]);


    function clearProduct() {
        setName("");
        setPrice("");
        setQuantity("");
        setCategory_id("");
    }

    function updateProduct(event) {
        event.preventDefault();

        const data = {
            name: name,
            price: price,
            quantity: quantity,
            category_id: category_id,
        }

        axios.put(`http://localhost:8080/product/${id}`, data)
            .then(response => {
                if (response.request.status === 200) {
                    alert("Product Edit Successfully");
                    clearProduct();
                }
            })
            .catch(error => {
                alert("Product Edit Fail");
                clearProduct();
            });
    }

    const handleName = (event) => {
        setName(event.target.value);
    };

    const handlePrice = (event) => {
        setPrice(event.target.value);
    };

    const handleQuantity = (event) => {
        setQuantity(event.target.value);
    };

    const handleCategory = (event) => {
        setCategory_id(event.target.value);
    };
    return (
        <div>
            <section class="vh-100 gradient-custom  bg-secondary bg-gradient">
                <div class="container py-2 h-100">
                    <div class="row justify-content-center align-items-center h-100">
                        <div class="col-12 col-lg-9 col-xl-7">
                            <div class="card shadow-2-strong card-registration round" >
                                <div class="card-body p-4 p-md-5">
                                    <h3 class="mb-4 pb-2 pb-md-0 mb-md-5">Edit Product Form</h3>
                                    <form onSubmit={updateProduct} id='updateProduct'>

                                        <div class="row">
                                            <div class="col-md-6 mb-4">

                                                <div class="form-outline">
                                                    <label class="form-label" for="name">Name</label>
                                                    <input type="text" id="name" class="form-control form-control-lg" required onChange={handleName} value={name} />
                                                </div>

                                            </div>
                                            <div class="col-md-6 mb-4">

                                                <div class="form-outline">
                                                    <label class="form-label" for="price">Price</label>
                                                    <input type="text" id="price" class="form-control form-control-lg" required onChange={handlePrice} value={price} />

                                                </div>

                                            </div>
                                        </div>

                                        <div class="row">
                                            <div class="col-md-6 mb-4">

                                                <div class="form-outline">
                                                    <label class="form-label" for="quantity">Quantity</label>
                                                    <input type="text" id="quantity" class="form-control form-control-lg" required onChange={handleQuantity} value={quantity} />

                                                </div>

                                            </div>
                                            <div class="col-md-6 mb-4">
                                                <label class="form-label select-label">Category</label>
                                                <select class="select form-control-lg" onChange={handleCategory} required>
                                                <option value="1" disabled>Choose your option</option>

                                                    {category && category.map(category => {
                                                        return (
                                                            <option key={category.category_id} value={category.category_id} selected={category_id === category.category_id}>{category.category_name}</option>
                                                        )
                                                    })

                                                    }

                                                </select>


                                            </div>
                                        </div>

                                        <div class="mt-2 pt-2 ">
                                            <button class="btn btn-primary btn-lg" type="submit" >Submit</button>
                                            &nbsp;&nbsp;&nbsp;&nbsp;
                                            <button class="btn btn-dark btn-lg" type="buttton" onClick={() => {
                                                clearProduct();
                                            }} required >Reset</button>
                                            <br />
                                            <br />
                                            <Link to='/products' class='back'>Back</Link>
                                        </div>

                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default EditProduct