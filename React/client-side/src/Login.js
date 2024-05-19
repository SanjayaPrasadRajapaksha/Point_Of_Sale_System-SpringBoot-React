import React from 'react'



function Login() {
    return (
        <section class="vh-100 gradient-custom bground">
            <div class="container h-100 ">
                <div class="row justify-content-center align-items-center h-100">
                    <div class="col-6">
                        <div class="card shadow-lg card-registration round formBackground" style={{borderRadius: '1rem', maxWidth: '500px'}}>
                            <div class="card-body p-4"  >

                                <h3 class="mb-3  pb-md-0 mb-md-4">Login Form</h3>


                                <form>
                                    <div class="row">
                                        <div class="col-md-12 mb-12" >

                                            <div class="form-outline">
                                                <label class="form-label" for="username">Email</label>
                                                <input type="text" id="username" class="form-control border-primary form-control-lg" />
                                            </div>

                                        </div>

                                    </div>

                                    <div class="row">
                                        <div class="col-md-12 mb-12">

                                            <div class="form-outline">
                                                <label class="form-label" for="email">Password</label>
                                                <input type="email" id="email" class="form-control border-primary form-control-lg" required  />

                                            </div>
                                            <br/>
                                            <div className='col-md-12 mb-12'>
                                            <button type='button' className='btn btn-primary'>login</button>
                                            </div>
                                           
                                       
                                        </div>


                                       

                                    </div>



                                </form>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Login