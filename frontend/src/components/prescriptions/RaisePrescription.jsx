import {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'

import api from '../../AxiosInstance';
import { useMessage } from "../contexts/MessageContext";

const RaisePrescription = ({ baseURL, usersList }) => {
    const {id} = useParams()
    const { showMessage } = useMessage();
    const accessToken = localStorage.getItem('access_token')
    const customer = usersList.filter(user => parseInt(user.id) === parseInt(id))[0]

    const [prescriptions, setPrescriptions] = useState([]);
    const [type, setType] = useState([]);
    const [selectedType, setSelectedType] = useState([]);
    const [prescriptionName, setPrescriptionName] = useState('');
    const [strength, setStrength] = useState('');
    const [frequency, setFrequency] = useState('');
    const [duration, setDuration] = useState('');

    const fetchDrugType = async () => {
      await api.get(`${baseURL}/prescriptions/drug_type/`).then(res=>{
        setType(res.data)
      })
    }

    useEffect(()=>{
      fetchDrugType()
    },[])

 
    const addPrescription = () => {
      // Ensure all required values are set (with correct variable names)
      if (selectedType && prescriptionName && strength && frequency && duration) {
        const newPrescription = {
          id: Date.now(),
          type: selectedType,
          item: prescriptionName, // use prescriptionName here (to match state variable)
          strength: strength,
          frequency: frequency,
          duration: duration
        };
        
        console.log('Adding new prescription:', newPrescription); // Debugging output
        
        // Add to prescriptions array
        setPrescriptions(prevPrescriptions => [
          ...prevPrescriptions,
          newPrescription
        ]);
        
        // Clear the input fields after adding
        setSelectedType('');
        setPrescriptionName('');
        setFrequency('');
        setDuration('');
        setStrength('');
      } else {
        showMessage("All fields are required!","error")
      }
    };
    

  const deletePrescription = (id) => {
    setPrescriptions(prescriptions.filter(p => p.id !== id));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const customer_data = {customer:parseInt(customer.id)}
      const res = await api.post(`${baseURL}/prescriptions/`, customer_data, {
        headers: { "Authorization": `FRISKY ${accessToken}` }
      })
      console.log(res.data)
      showMessage('Prescription Added, Details loading...', 'info')
      if (res.data) {
        prescriptions.map((p) => (
          api.post(`${baseURL}/prescriptions/prescription_detail/`, 
            { prescription: res.data.id, type:p.type, item: p.item, frequency: p.frequency, 
              duration:p.duration, strength:p.strength }, {
            headers: { "Authorization": `FRISKY ${accessToken}` }
          })
        ))
      }
      showMessage("Prescription successful!!",'success')
      setPrescriptions([])
  };

  return (
    <>
    <br />
    <div className="container">
      <h2 className="text-center">Prescription Form</h2><br />
      <h5>{customer.firstname} {customer.lastname}</h5> <br />
      <form className="row g-3 align-items-center">
        <div className="row mb-2">
        <div className="col-md-2">
        <label className="form-label">Drug Type</label>
        <select className="form-select" id="type"
         value={selectedType || ''} onChange={(e) => setSelectedType(e.target.value)} required>
          <option value="" disabled>Select Type</option>
          {type.map((drugType)=>(
            <option value={drugType.id}>{drugType.title}</option>
          ))}
        </select>
      </div>

      <div className="col-md-5">
        <label className="form-label">Prescription Name</label>
        <input type="text" className="form-control" id="prescriptionName"
        value={prescriptionName} onChange={(e) => setPrescriptionName(e.target.value)} required/>
      </div>

      <div className="col-md-1">
        <label className="form-label">Strength</label>
        <input type="text" className="form-control" id="strength"
         value={strength} onChange={(e) => setStrength(e.target.value)} required/>
      </div>

      <div className="col-md-2">
        <label className="form-label">Frequency</label>
        <select className="form-select" id="frequency"
        value={frequency} onChange={(e) => setFrequency(e.target.value)} required>
          <option value="" disabled>Select Frequency</option>
          <option>Once Daily</option>
          <option>Twice Daily</option>
          <option>Thrice Daily</option>
        </select>
      </div>

      <div className="col-md-1">
        <label className="form-label">Duration</label>
        <input type="text" className="form-control" id="duration"
        value={duration} onChange={(e) => setDuration(e.target.value)} required/>
      </div>

      <div className="col-md-1 d-flex align-items-end">
        <button type="button" className="btn btn-primary w-100" onClick={addPrescription}>Add</button>
      </div>
        </div>
        <div className="row mb-1">
        <div className="col-12">
            <div id="prescriptionList" className="border p-3" style={{minHeight: '200px'}}>
              {prescriptions.map((p) => (
                <div key={p.id} className="prescription-item d-flex justify-content-between align-items-center mb-2">
                  <span>{p.item}{" "}{p.strength}{" "} ({" "}{p.frequency},{" "}{p.duration})</span>
                  <button type="button" className="btn btn-danger btn-sm" onClick={() => deletePrescription(p.id)}>Delete</button>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <button onClick={handleSubmit} type='button' className="btn btn-success w-100">Submit</button>
          </div>
        </div>
      </form>
    </div>
    <br /><br />

    </>
  );
}

export default RaisePrescription