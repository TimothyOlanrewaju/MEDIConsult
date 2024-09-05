import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function PlaceOrders({ baseURL }) {
  const [item, setItem] = useState("");
  const [itemList, setItemList] = useState([]);
  const [msg, setMsg] = useState("");
  const [states, setStates] = useState([]);
  const [selectedState, setSelectedState] = useState("");
  const [lgas, setLgas] = useState([]);
  const [selectedLga, setSelectedLga] = useState("");
  const [address, setAddress] = useState("");
  const accessToken = localStorage.getItem("access_token")
  const navigate = useNavigate()


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/data/abuja-nasarawa.json");
        const data = await response.json();
        setStates(data.states);
      } catch (error) {
        console.error("Error fetching the states and LGAs data:", error);
      }
    };

    fetchData();
  }, []);

  const handleStateChange = (e) => {
    setSelectedState(e.target.value);

    const selectedStateData = states.find(
      (state) => state.alias === e.target.value
    );
    setLgas(selectedStateData ? selectedStateData.lgas : []);
  };
  const handleLga = (e) => {
    setSelectedLga(e.target.value);
  };

  const handleAddItem = (e) => {
    e.preventDefault()
    if (item.trim()) {
      setItemList([...itemList, item]);
      setItem("");
    }
  };

  const handleDeleteItem = (index) => {
    const newList = itemList.filter((_, i) => i !== index);
    setItemList(newList);
  };

  const handleSubmitOrder = async (e) => {
    e.preventDefault()
    const order = {
      customer_id: localStorage.getItem('user_id')
    }
    const res = await axios.post(`${baseURL}/orders/create_order/`, order,{
      headers: {"Authorization": `FRISKY ${accessToken}`}
    })
    if (res.data){
      itemList.map((item)=>(
        axios.post(`${baseURL}/orders/create_order_detail/`, {item:item,order:res.data.id,quantity:1},{
          headers: {"Authorization": `FRISKY ${accessToken}`}
        })
      ))
    }
    setMsg("Your order has been successfully placed")
    setItem('')
    setItemList([])
    navigate('/orders')
  };

  return (
    <>
      <br />
      <br />
      <br />
      <h3 className="text-center" style={{color:"green"}}>{msg}</h3>
      <h2 className="text-center">Order Form</h2>
      <div className="container">
      <div className="container col-lg-12 mt-4 d-flex gap-3 justify-content-center align-items-center">
        <div className="row col-12">
        <div className="col-lg-6 col-md-6 col-sm-12">
          <form onSubmit={handleAddItem}>
            <div className="flex-1 d-flex gap-2 mb-3 h-10">
              <input
                type="text"
                className="form-control"
                placeholder="Add item"
                value={item}
                onChange={(e) => setItem(e.target.value)}
                style={{ height: "60px" }}
              />
              <button
                className="btn btn-primary"
                onClick={handleAddItem}
                style={{ height: "60px" }}
              >
                Add
              </button>
            </div>
          </form>

          <div className="container">
            <div className="flex-1 border rounded p-3">
              {itemList.length === 0 && (
                <p className="text-center">Start adding items...</p>
              )}
              <form onSubmit={handleSubmitOrder}>
                <ul className="list-group">
                  {itemList.map((item, index) => (
                    <li
                      key={index}
                      className="list-group-item d-flex justify-content-between align-items-center"
                    >
                      {item}
                      <button
                        type="button"
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDeleteItem(index)}
                      >
                        Delete
                      </button>
                    </li>
                  ))}
                </ul>
                <br />
                {/* {itemList.length > 0 && (
                  <button type="submit" className="btn btn-success w-100">
                    ORDER
                  </button>
                )} */}
              </form>
            </div>
          </div>
        </div>
        <div className="col-lg-6 col-md-6 col-sm-12">
        <div className="form-row mb-2 ">
            <div className="col">
              <label>State:</label>
              <select
                id="state"
                className="form-control"
                value={selectedState}
                onChange={handleStateChange} required
              >
                <option value="" disabled>Select state</option>
                {states.map((state) => (
                  <option key={state.alias} value={state.alias}>
                    {state.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="col">
              <label>LGA:</label>
              <select
                id="lga"
                className="form-control"
                disabled={!selectedState}
                onChange={handleLga} required
              >
                <option value="">{!selectedState ? `Select LGA` : `Select LGA in ${selectedState}`}</option>
                {lgas.map((lga, index) => (
                  <option key={index} value={lga}>
                    {lga}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="form-row mb-3 ">
            <div className="col">
              <label>Address:</label>
              <input
                type="text"
                id="address"
                className="form-control"
                value={address}
                onChange={(e) => setAddress(e.target.value)} required
                
              />
            </div>
          </div>
        </div>
        </div>
      </div>
        <button type="submit" className="btn btn-success w-100 mt-1">ORDER</button>
        </div>
      <br />
      <br />

    <div class="container mt-5">
        <div class="row">
            <div class="col-md-3 mb-4">
                <div class="column-header bg-primary text-white text-center">Doctors</div>
                <div class="column-item">🟢 Doctor 1</div>
                <div class="column-item">🟡 Doctor 2</div>
                <div class="column-item">Doctor 3</div>
            </div>
            <div class="col-md-3 mb-4">
                <div class="column-header bg-primary text-white text-center">Pharmacists</div>
                <div class="column-item">🟢 Pharmacist 1</div>
                <div class="column-item">🟡 Pharmacist 2</div>
                <div class="column-item">Pharmacist 3</div>
            </div>
            <div class="col-md-3 mb-4">
                <div class="column-header bg-primary text-white text-center">Medical Lab Scientists</div>
                <div class="column-item">🟢 MLS 1</div>
                <div class="column-item">🟡 MLS 2</div>
                <div class="column-item">MLS 3</div>
            </div>
            <div class="col-md-3 mb-4">
                <div class="column-header bg-primary text-white text-center">Nurses</div>
                <div class="column-item">🟢 Nurse 1</div>
                <div class="column-item">🟡 Nurse 2</div>
                <div class="column-item">Nurse 3</div>
            </div>
        </div>
    </div>

    </>
  );
}
