import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

function CreateProduct() {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [quantity, setQuantity] = useState("");
    const [category_id, setCategory_id] = useState("");
    const [categories, setCategories] = useState("");

    useEffect(() => {
        axios.get("http://localhost:8080/categories")
            .then(response => {
                setCategories(response.data);
                console.log(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    })
    function createProduct(event) {
        event.preventDefault();

        const data = {
            name: name,
            price: price,
            quantity: quantity,
            category_id: category_id
        }

        axios.post("http://localhost:8080/product", data)
            .then(response => {
                if (response.request.status === 201) {
                    alert("Product Create Successfully");
                    document.getElementById('createProduct').reset()
                }
            })
            .catch(error => {
                alert("Product Create Fail");
                document.getElementById('createProduct').reset()
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
                <div class="container py-2 h-100 ">
                    <div class="row justify-content-center align-items-center h-100 ">
                        <div class="col-12 col-lg-9 col-xl-7">
                            <div class="card shadow-2-strong card-registration round" >
                                <div class="card-body p-4 p-md-5">
                                    <h3 class="mb-4 pb-2 pb-md-0 mb-md-5">Create Product Form</h3>
                                    <form onSubmit={createProduct} id='createProduct'>

                                        <div class="row">
                                            <div class="col-md-6 mb-4">

                                                <div class="form-outline">
                                                    <label class="form-label" for="name">Name</label>
                                                    <input type="text" id="name" class="form-control form-control-lg" required onChange={handleName} />
                                                </div>

                                            </div>
                                            <div class="col-md-6 mb-4">

                                                <div class="form-outline">
                                                    <label class="form-label" for="price">Price</label>
                                                    <input type="text" id="price" class="form-control form-control-lg" required onChange={handlePrice} />

                                                </div>

                                            </div>
                                        </div>

                                        <div class="row">
                                            <div class="col-md-6 mb-4">

                                                <div class="form-outline">
                                                    <label class="form-label" for="quantity">Quantity</label>
                                                    <input type="text" id="quantity" class="form-control form-control-lg" required onChange={handleQuantity} />

                                                </div>

                                            </div>
                                            <div class="col-md-6 mb-4">
                                                <label class="form-label select-label">Choose option</label>
                                                <select class="select form-control-lg" onChange={handleCategory} required>
                                                    <option value="1" disabled>Choose your option</option>

                                                    {
                                                        categories && categories.map(category => {
                                                            return (
                                                                <option key={category.category_id} value={category.category_id}>{category.category_name}</option>
                                                            )
                                                        })
                                                    }

                                                </select>


                                            </div>
                                        </div>


                                        <div class="mt-2 pt-2">
                                            <input class="btn btn-primary btn-lg" type="submit" value="Submit" required />
                                            &nbsp;&nbsp;&nbsp;&nbsp;
                                            <input class="btn btn-dark btn-lg" type="reset" value="Reset" required />
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

export default CreateProduct