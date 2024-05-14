import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill, BsBoxFill }
  from 'react-icons/bs'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line }
  from 'recharts';

function Home() {

  const [products, setProducts] = useState('');
  const [orders, setOrders] = useState('');
  const [cusromer, setCusromer] = useState('');
  const [categories, setCategories] = useState('');

  useEffect(() => {
    axios.get('http://localhost:8080/products')
      .then(function (response) {
        setProducts(response.data.length);
      })
      .catch(function (err) {
        console.log(err);
      })

    axios.get('http://localhost:8080/orders')
      .then(function (response) {
        setOrders(response.data.length);
      })
      .catch(function (err) {
        console.log(err);
      })

    axios.get('http://localhost:8080/customers')
      .then(function (response) {
        setCusromer(response.data.length);
      })
      .catch(function (err) {
        console.log(err);
      })

    axios.get('http://localhost:8080/categories')
      .then(function (response) {
        setCategories(response.data.length);
      })
      .catch(function (err) {
        console.log(err);
      })
  })



  const data = [
    {
      name: '2017',
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: '2018',
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: '2019',
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: '2020',
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: '2021',
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: '2022',
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: '2023',
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];


  return (
    <main className='main-container'>
      <div className='main-title'>
        <h3>DASHBOARD</h3>
      </div>

      <div className='main-cards'>
        <div className='card '>
          <div className='card-inner'>
            <h3>PRODUCTS</h3>
            <BsFillArchiveFill className='card_icon' />
          </div>
          <h1>{products}</h1>
        </div>
        <div className='card'>
          <div className='card-inner'>
            <h3>CATEGORIES</h3>
            <BsFillGrid3X3GapFill className='card_icon' />
          </div>
          <h1>{categories}</h1>
        </div>
        <div className='card'>
          <div className='card-inner'>
            <h3>ORDERS</h3>
            <BsBoxFill className='card_icon' />
          </div>
          <h1>{orders}</h1>
        </div>
        <div className='card'>
          <div className='card-inner'>
            <h3>Customers</h3>
            <BsPeopleFill className='card_icon' />
          </div>
          <h1>{cusromer}</h1>
        </div>
      </div>

      <div className='charts'>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            width={500}
            height={300}
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="pv" fill="#8884d8" />
            <Bar dataKey="uv" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>

        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            width={500}
            height={300}
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
            <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>

      </div>
    </main>
  )
}

export default Home