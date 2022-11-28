import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useParams , useNavigate} from 'react-router-dom'
import React, { useEffect, useState } from 'react'

import Pagination from '../components/Pagination';
import AgendaApis from '../services/AgendaApis';
import Header from '../components/Header';
import { read, utils, writeFile } from 'xlsx';
import Loader from '../components/Loader';

function HomePage(){

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

     const[currentPage, setCurrentPage]=useState(1);
     const[search, setSearch] = useState("");
     const [agendas,setAgenda]= useState([]);
     const[loading, setLoading] =useState(true);
     const[editing, setEditing] = useState(false);
     const navigate = useNavigate();

      //handle imports
      const handleImport = ($event) => {
        const files = $event.target.files;
        if (files.length) {
            const file = files[0];
            const reader = new FileReader();
            reader.onload = (event) => {
                const wb = read(event.target.result);
                const sheets = wb.SheetNames;

                if (sheets.length) {
                    const rows = utils.sheet_to_json(wb.Sheets[sheets[0]]);
                    setInfo(rows)
                }
            }
            reader.readAsArrayBuffer(file);
            toast.success("successfull");
        }
    }
    

        // Handle exports
      const handleExport = () => {
            const headings = [[
                'ID',
                'Subject',
                'Responsable',
                'Objectives',
                'Nom du participant',
                'Emplacement',
                'Date du debut',
                'Date du fin'
            
            ]];
            const wb = utils.book_new();
            const ws = utils.json_to_sheet([]);
            utils.sheet_add_aoa(ws, headings);
            utils.sheet_add_json(ws, agendas, { origin: 'A2', skipHeader: true });
            utils.book_append_sheet(wb, ws, 'Report');
            writeFile(wb, 'AgendaReport.xlsx');
            toast.success("Exported Succesfully");
    }


     const fetchAgenda = async id => {
     try {
        const data =  await axios
        .get("http://localhost:8080/api/agenda/" +id)
        .then(response=>response.data);
        console.log(data);
        const { subject,reponsable,objectives,namesparticipant,location, datestart,dateend} = data;
        setAgenda({subject,reponsable,objectives,namesparticipant,location, datestart,dateend});
     } catch (error) {
        console.log(error.response);
        
     }
    }



     useEffect(() =>{
        if(id !== "new") {
            setEditing(true);
           fetchAgenda(id);
        }
     },[id])
    
    const handleChangePage = page =>{
      setCurrentPage(page);
    };

    const itemsPerPage = 5;

    useEffect(() => {
        axios.get("http://localhost:8080/api/agenda/getall")
        .then(response=>response.data)
        .then(data=>setAgenda(data));
         setLoading(false);
       }, []);
    
       
     const handleChange =({currentTarget})=>{
      const {value,name} = currentTarget;
      setInfo({...info,[name]: value});
    };

  const handleDelete = async (id) =>{
    const originalAgenda = [...agendas];
    setAgenda(agendas.filter(agendas => agendas.id !== id));
    try{
      console.log(agendas);
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


 


 const filteredAgenda = agendas.filter(
  e => 
  e.subject.toLowerCase().includes(search.toLowerCase()) ||
  e.reponsable.toLowerCase().includes(search.toLowerCase()) 
);

const paginatedCustomers = Pagination.getData(filteredAgenda,currentPage,itemsPerPage);











    
    return ( 
        <div className="list-group ">
            <div className="App">
                {/* <Header/> */}

                <div className=''>
                    <nav className="navbar navbar-expand-lg navbar-light bg-light">
                        <div className="container-fluid">
                            <a className="navbar-brand" href="#">
                                <Link to={"/create"} className="btn btn-sm btn-primary">Create Agenda</Link>
                            </a>
                            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>
                            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                    <li className="nav-item">
                                        <a className="nav-link active" onClick={handleExport} aria-current="page" href="#">Export CSV</a>
                                    </li>                        
                                    <li className="nav-item">
                                        <input type="file" name="file" className="custom-file-input" id="inputGroupFile" required onChange={handleImport}
                                            accept=".xlsx, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"/>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </nav>
                </div>
                
                <div className='form-group '>
                    <input type="text"  onChange={handleSearch} value={search} className='form-control' placeholder='Rechercher...'/>
                </div>
                <div className=''>
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

                            {!loading && ( <tbody>
                           
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
                                    
                                    <button
                                    onClick={()=> handleDelete(agenda.id)}
                                    
                                    className='btn btn-sm btn-danger'>Supprimer
                                    </button>
                                    <Link to={"/agenda/" +agenda.id} className="btn btn-sm btn-primary">Modifier</Link>
                                    </td>
                                    
                                </tr>)}
                                
                            </tbody> )}

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
                    {loading && <Loader/>}
                    <Pagination 
                    currentPage={currentPage} 
                    itemsPerPage={itemsPerPage} 
                    length={agendas.length}
                    onPageChanged={handleChangePage} 
                    />
                    
                </div>

                <ToastContainer position={toast.POSITION.TOP_RIGHT}/>
            </div>





       
        </div>
     );
}
 
export default HomePage;