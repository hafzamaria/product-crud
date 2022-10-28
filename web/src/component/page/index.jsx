import axios from "axios";
import { useEffect, useState } from "react";
import './index.css'
import { Link } from "react-router-dom";


function Page() {
  const [products, setProducts] = useState([]);
  const [toggleRefresh, setToggleRefresh] = useState(true);
  const [cart , setCart]= useState(null);


  useEffect(() => {
    let getAllProducts = async () => {
      let response =await axios.get ("http://localhost:5000/products")
      // let response = await axios.get("https://crud--crud-app.herokuapp.com/products");
      setProducts(response.data.data.reverse());
    };
    getAllProducts();
  }, [toggleRefresh]);

  


  return (
    <>
    <h1>i am single product page</h1>
    
   

       <div className="result">
        <div className="map1">
          {products.map((eachProduct) => (
            <div className="key1" key={eachProduct._id}>
              <div className="img1">
                <img className="pic" width='200px' src={eachProduct.profilePicture} alt="" />
              </div>
              <div className="detail">
                <p className="name1">{eachProduct.name}</p>
                <br />
                <div>{eachProduct.description}</div>
                <br />
             
                <br />
                {/* <div className="price">{eachProduct.price}</div> */}
                <br />
                <div>{eachProduct.code}</div>
                <button onClick={() => {
                setCart({
                    _id: eachProduct._id,
                    name: eachProduct?.name,
                    // price: eachProduct?.price,
                    description: eachProduct?.description,
                    code: eachProduct?.code
                })
            }}><Link to="/Proceed">Proceed to cart</Link></button>

         
          
             
             </div>
            </div>
          ))}
           
        </div>
      </div> 

   

    



    </>
  );
}
export default Page;