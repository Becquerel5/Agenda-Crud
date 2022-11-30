import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useParams, useNavigate } from 'react-router-dom'
import React, { useEffect, useState } from 'react'

import Pagination from '../components/Pagination';
import AgendaApis from '../services/AgendaApis';
import Header from '../components/Header';

const Create = props =>  {
    
    const { id = "new" } = useParams();
    console.log(id);

    const[info,setInfo] = useState({
        subject:"",
        reponsable:"",
        objectives:"",
        namesparticipant:"",
        location:"",
        datestart:"",
        dateend:""
     });
     const [agendas,setAgenda]= useState([]);
     const navigate = useNavigate();
     const[editing, setEditing] = useState(false);
    
       
     const handleChange =({currentTarget})=>{
      const {value,name} = currentTarget;
      setInfo({...info,[name]: value});
    };


 
 const fetchAgenda = async id => {
  try {
     const data =  await axios
     .get("http://localhost:8080/api/agenda/" +id)
     .then(response=>response.data);
      console.log(data);
       const { subject,reponsable,objectives,namesparticipant,location, datestart,dateend} = data;
     setInfo({subject,reponsable,objectives,namesparticipant,location, datestart,dateend});
     
     
  } catch (error) {
     console.log(error.response);
     
  }
 }

 const handleSubmit = async event =>{
  event.preventDefault();
  try {

      if(editing){
          const response = await AgendaApis.update(id,info);
          toast.success("Modified successfully");
          navigate('/agenda');
          console.log(response.data);

      }else{

        await AgendaApis.create(info);
        toast.success("Agenda ajouter avec succes");
        navigate('/agenda');
  }
   
  } catch (error) {
    console.log(error.response);
    toast.error("Une erreur est parvenu");
  }
};


 useEffect(() =>{
  if(id !== "new") {
      setEditing(true);
     fetchAgenda(id);
  }
},[id])


    return ( 
        <div className="list-group container">
            <div className="App">
                {!editing && <h1>Create An Event</h1> || <h1>Modify Your Event</h1>}
               
      
                <form className="row g-3 needs-validation"  onSubmit={handleSubmit}>
                <div className="col-md-4">
                    <label htmlFor="validationCustom01" className="form-label">Subject</label>
                    <input type="text" value={info.subject} className="form-control" name='subject' onChange={handleChange} id="validationCustom01" required/>
                    <div className="valid-feedback">
                    Looks good!
                    </div>
                </div>
                <div className="col-md-4">
                    <label htmlFor="validationCustom02" className="form-label">Responsible</label>
                    <input type="text"  id="validationCustom02" value={info.reponsable} className="form-control" name='reponsable' onChange={handleChange} required/>
                    <div className="valid-feedback">
                    Looks good!
                    </div>
                </div>
                <div className="col-md-4">
                    <label htmlFor="validationCustom02" className="form-label">objectives</label>
                    <input type="text"  id="validationCustom02" value={info.objectives} className="form-control" name='objectives' onChange={handleChange} required/>
                    <div className="valid-feedback">
                    Looks good!
                    </div>
                </div>
                <div className="col-md-4">
                    <label htmlFor="validationCustomUsername" className="form-label">Name of Participant</label>
                    <div className="input-group has-validation">
                    <span className="input-group-text" id="inputGroupPrepend">@</span>
                    <input type="text" value={info.namesparticipant} className="form-control" name='namesparticipant' onChange={handleChange} id="validationCustomUsername" aria-describedby="inputGroupPrepend" required/>
                    <div className="invalid-feedback">
                        Please choose a Participant.
                    </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <label htmlFor="validationCustom03" className="form-label">location</label>
                    <input type="text" value={info.location} className="form-control" name='location' onChange={handleChange} id="validationCustom03" required/>
                    <div className="invalid-feedback">
                    Please provide a location.
                    </div>
                </div>

                {!editing && 
                  <div className="col-md-4">
                      <div >
                        <label htmlFor="validationCustom04" className="form-label">StartDate</label>
                        <input type="datetime-local" value={info.datestart} className="form-control" name='datestart' onChange={handleChange} id="validationCustom04" required/>
                        <div className="invalid-feedback">
                          Please provide a valid StartDate.
                        </div>
                      </div>
                      <div className="">
                        <label htmlFor="validationCustom05" className="form-label">EndDate</label>

                        
                        <input type="datetime-local" value={info.dateend} className="form-control" name='dateend' onChange={handleChange} id="validationCustom05" required/>
                        <div className="invalid-feedback">
                        Please provide a valid EndDate.
                        </div>
                      </div>
                  </div>
               
                    
                    || 
                    <div  className="col-md-4">
                      <div>
                          <label htmlFor="validationCustom04" className="form-label">StartDate</label>
                          <input type="datetime-local" value={info.datestart} className="form-control" name='datestart' onChange={handleChange} id="validationCustom04" />
                          <div className="invalid-feedback">
                          Please provide a valid StartDate.
                          </div>
                      </div>
                      <div className="">
                          <label htmlFor="validationCustom05" className="form-label">EndDate</label>

                          
                          <input type="datetime-local" value={info.dateend} className="form-control" name='dateend' onChange={handleChange} id="validationCustom05" />
                          <div className="invalid-feedback">
                          Please provide a valid EndDate.
                          </div>
                      </div>
                    </div>
                    
                   
                    
                    }
                
                {/* <div className="col-md-4">
                    <label htmlFor="validationCustom04" className="form-label">StartDate</label>
                    <input type="datetime-local" value={info.datestart} className="form-control" name='datestart' onChange={handleChange} id="validationCustom04" required/>
                    <div className="invalid-feedback">
                    Please provide a valid StartDate.
                    </div>
                </div>
                <div className="col-md-4">
                    <label htmlFor="validationCustom05" className="form-label">EndDate</label>

                    
                    <input type="datetime-local" value={info.dateend} className="form-control" name='dateend' onChange={handleChange} id="validationCustom05" required/>
                    <div className="invalid-feedback">
                    Please provide a valid EndDate.
                    </div>
                </div> */}
                <div className="col-md-6">
                <button type="submit" className="btn btn-success" >Submit</button>&nbsp;
                   
                </div>
                </form> 
            

               

                <ToastContainer position={toast.POSITION.TOP_RIGHT}/>
            </div>
        </div>
     );
}
 
export default Create;