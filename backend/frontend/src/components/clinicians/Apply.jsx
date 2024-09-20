import { useEffect, useState } from 'react'
import api from '../../AxiosInstance'

const Apply = ({ baseURL }) => {
    const [msg, setMsg] = useState("")
    const [categories, setCategories] = useState([])
    const [selectedCat, setSelectedCat] = useState('')
    const [body, setBody] = useState('')
    const [licenceExpDate, setLicenceExpDate] = useState('')
    const [licenceImage, setLicenceImage] = useState('')

    const token = localStorage.getItem('access_token')

    useEffect(()=>{
        api.get(`${baseURL}/clinicians/category/`)
        .then(response => {
            setCategories(response.data);
          })
          .catch(error => {
            console.error('There was an error fetching the category options!', error);
          });
    }, [])

    const handleSelect = (e) => {
        setSelectedCat(e.target.value)
    }

    const handleImage = (e) => {
        setLicenceImage(e.target.files[0]);
    }

    const appData = {
        applicant:parseInt(localStorage.getItem('user_id')),
        category:selectedCat, body:body, licence_expiry_date:licenceExpDate,
        licence_image:licenceImage
    }

    const handleApplication = (e) => {
        e.preventDefault()
        console.log(appData)
        api.post(`${baseURL}/clinicians/apply/`, appData, {
            headers: {
                "Authorization": `FRISKY ${token}`,
                'Content-Type': 'multipart/form-data',
            }
        })
        .then(() => {
            setMsg('Application successful');
          })
        .catch(error => {
            console.error('There was an error fetching the options!', error)
            setMsg('Application Failed')
          });
        setBody('')
        // setCategories('')
        setLicenceExpDate('')
        setLicenceImage('')
    }

  return (
    <> <br />
        <div className="container-fluid about py-5">
            <div className="container py-12">
                <div className="row g-1 align-items">
                    <div style={{color:"darkblue"}} className="col-lg-4">
                        <h5 className="section-about-title pe-3">WORK WITH US</h5>
                        <br /><br />
                        <span style={{fontSize:"x-large"}}>
                        Here's an opportunity to work with us. Are you a seasoned Clinician, kindly resgister
                        with us to consult patients online.
                        </span>
                    </div>
                    <div className="col-lg-1"></div>
                    <div className="col-lg-7">
                        <h4 style={{color:"green"}}>{msg}</h4>
                        <h5 className="section-about-title pe-3">APPLICATION PAGE</h5>
                        {/* <h1 className="mb-4">{firstname} {lastname} <span className="text-primary">Travela</span></h1> */}
                        <div className="row gy-2 gx-4 mb-4">
                            <div className="col-sm-4">
                                <p className="mb-0">Select your Profession</p>
                                <select value={selectedCat} onChange={handleSelect} className='form-control' required>
                                    <option value="">Select an option</option>
                                    {categories.map(category=>(
                                        <option key={category.id} value={category.id}>
                                            {category.title}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="col-sm-4">
                                <p className="mb-0">Licence Expiry Date</p>
                                <input type="date" className='form-control' required
                                    value={licenceExpDate}
                                    onChange={e=>setLicenceExpDate(e.target.value)}
                                />
                            </div>
                            <div className="col-sm-4">
                                <p className="mb-0">Upload Your Licence</p>
                                <input type="file" accept="image/*" className='form-control' required 
                                    onChange={handleImage}
                                />
                            </div>
                        </div>
                        <div className="row gy-1 gx-4 mb-4">
                            <div className="col-sm-12">
                                <p className="mb-0">Why do you want to work with? </p>
                                <textarea name='' id='' className='form-control' placeholder='Enter your application here'
                                    value={body}
                                    onChange={e=>setBody(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                        <button onClick={handleApplication} className="btn btn-primary rounded-pill py-3 px-5 mt-2" >
                            Apply Now
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default Apply