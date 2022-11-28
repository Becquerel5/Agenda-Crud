import logo from './logo.svg';
import './App.css';
import './validation';
import { Link } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import Pagination from './components/Pagination';


import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CustomersApi from './services/AgendaApis';
import AgendaApis from './services/AgendaApis';

function App() {

  const[info,setInfo] = useState({
    subject:"",
    reponsable:"",
    objectives:"",
    namesparticipant:"",
    location:"",
    datestart:"",
    dateend:""
 });
 const[currentPage, setCurrentPage]=useState(1);
 const[search, setSearch] = useState("");
 const [agenda,setAgenda]= useState([]);

const handleChangePage = page =>{
  setCurrentPage(page);
};




/*
const PaginatedEmployees = Pagination.getData(
  filteredAgenda,currentPage,itemsPerPage
);
*/




  useEffect(() => {
    axios.get("http://localhost:8080/api/agenda/getall")
     //.then(response=>console.log(response.data));
    .then(response=>response.data)
    .then(data=>setAgenda(data));
   }, []);

   
 const handleChange =({currentTarget})=>{
  const {value,name} = currentTarget;
  setInfo({...info,[name]: value});
};


   /* const handleSubmit = async (event) =>{
    event.preventDefault();
    try {
      await axios.post("http://localhost:8080/api/agenda/save" ,info);
      setAgenda([...agenda,{info}]);
      toast.success("Agenda ajouter avec succes");
    } catch (error) {
      console.log(error.response);
      toast.error("Une erreur est parvenu");
    }
  }; */
  
  const handleSubmit = async event =>{
    event.preventDefault();
    try {
      await AgendaApis.create(info);
      setAgenda([...agenda,{info}]);
      toast.success("Agenda ajouter avec succes");
    } catch (error) {
      console.log(error.response);
      toast.error("Une erreur est parvenu");
    }
  };

  const handleDelete = async (id) =>{
    const originalAgenda = [...agenda];
    setAgenda(agenda.filter(agenda => agenda.id !== id));
    try{
      console.log(agenda);
        await AgendaApis.deleteAgenda(id);
        toast.success("L'Agenda a bien été supprimer");
     }catch(error){
         setAgenda(originalAgenda);
         toast.error("la suppression de L'Agenda n'as pas fonctionner");
       
     }

 };

 const handleSearch = event => {
  const value= event.currentTarget.value;
  setSearch(value);
  setCurrentPage(1);
}


 
 const itemsPerPage =5;

 const filteredAgenda = agenda.filter(
  e => 
  //e.name.subject.toLowerCase().includes(search.toLowerCase()) ||
  e.name.location.toLowerCase().includes(search.toLowerCase()) 
);
/*   const handleDelete = async (event,id) =>{
    event.preventDefault();
    try {
     const hi =await axios.delete("http://localhost:8080/api/agenda/", +id);
     console.log(hi); 
    } catch (error) {
      console.log(error.response);
      //toast
    }
  } */

 /*  const handleDelete = async (id) =>{
    const originalAgenda = [...agenda];
    setAgenda(agenda.filter(agenda => agenda.id !== id));
    try{
        await axios.delete("http://localhost:8080/api/agenda/", +id);
        toast.success("L'Agenda a bien été supprimer");
     }catch(error){
         setAgenda(originalAgenda);
         toast.error("la suppression de L'Agenda n'as pas fonctionner");
       
     }

 }; */
 const paginatedCustomers = Pagination.getData(filteredAgenda,currentPage,itemsPerPage);


  return (

    
    <div className="App">
      <h1><u>Welcome to Becquerel CRUD_REACT_SPRING</u></h1>
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
          
          <div className="col-md-4">
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
          </div>
          <div className="col-md-4 mt-9">
          <button type="submit" className="btn btn-success" >Submit</button>&nbsp;
            <button type="reset" className="btn btn-primary">Reset</button>
          </div>
        </form> 
        

        ////////
        <div className='form-group'>
            <input type="text"  onChange={handleSearch} value={search} className='form-control' placeholder='Rechercher...'/>
         </div>
        <div className='container'>
          <table className='table table-hover'>
                  <thead>
                      <tr>
                          <th className='text-danger text-64'>id</th>
                          <th>Subject</th> 
                          <th>Responsable</th>
                          <th>objectives</th>
                          <th>Name Of Participant</th>
                          <th>location</th>
                          <th>StartDate</th>
                          <th>EndDate</th>
                          <th className='text-center'>Action</th>
                          
                      </tr>
                  </thead>

                  <tbody>
                  {/* {paginatedCustomers.map(agenda=><tr key={agenda.id}> */}
                    {paginatedCustomers.map(agenda=>
                        <tr key={agenda.id}>
                        <td className='text-danger text-32'>{agenda.id}</td>
                        <td>{agenda.subject}</td>
                        <td>{agenda.reponsable}</td>
                        <td>{agenda.objectives}</td>
                        <td>{agenda.namesparticipant}</td>
                        <td>{agenda.location}</td>
                        <td>{agenda.datestart}</td>
                        <td>{agenda.dateend}</td>
                        <td>
                          {/* <button type='' onClick={()=> handleDelete(agenda.id)} className='btn btn-sm btn-danger'>supprimer</button>&nbsp; */}
                          <button
                        onClick={()=> handleDelete(agenda.id)}
                        
                         className='btn btn-sm btn-danger'>Supprimer
                         </button>
                          <button type="button" className="btn btn-sm btn-success" data-toggle="modal" data-target="#exampleModal">
                            Modifier
                          </button>
                          {/* <Link to={"/agenda/" +agenda.id} className="btn btn-sm btn-primary">Modifier</Link> */}
                        </td>
                          
                    </tr>)}
                    
                  </tbody>

                  <tfoot>
                      <tr>
                          <th className='text-danger text-64'>id</th>
                          <th>Subject</th> 
                          <th>Responsable</th>
                          <th>objectives</th>
                          <th>Name Of Participant</th>
                          <th>location</th>
                          <th>StartDate</th>
                          <th>EndDate</th>
                          <th className='text-center'>Action</th>
                          
                      </tr>
                  </tfoot>
            </table>
            {itemsPerPage < filteredAgenda.length && (
            <Pagination 
            currentPage={currentPage} 
            itemsPerPage={itemsPerPage} 
            length={filteredAgenda.length}
            onPageChanged={handleChangePage}  />
            )}
            {/* <Pagination currentPage={currentPage} 
            itemsPerPage={itemsPerPage} 
            length={agenda.length}
            onPageChanged={handleChangePage} /> */}
            
        </div>

    <ToastContainer position={toast.POSITION.TOP_RIGHT}/>
    </div>
  );

}

export default App;
