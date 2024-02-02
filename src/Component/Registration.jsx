import React, { useState } from 'react'
import { Button, Container, Form, Modal, Table } from 'react-bootstrap';
import './Registration.css';

function Registration()
{
    const[show, showset]=useState(false);
    const [allData, setData] = useState([{}]);
    const [deleteId, setDeleteId] = useState(false);
    const [index, setIndex] = useState(0);
    const [btnstate, setBtnstate] = useState(true);

    const [input, setInput] = useState({
        FirstName:"",
        LastName:" ",
        Password:" ",
        Mobilenumber:" ",
        // file:""
    });
    let temp={};
   const formgetdata=(e)=>
   {
         e.preventDefault();
        let form=e.target;
        // console.log(form);
        
        let formdata= new FormData(form);

        // console.log(formdata);

            for (let data of formdata)
            {
                let key=data[0];
                let value=data[1];
                console.log((data));                             

                if (typeof(value)=='object')
                {
                value=URL.createObjectURL(value);
                }
                temp[key]=value;
                // console.log(temp);
            }                   
    }

    function  getInputData(e)
    {
        let target = e.target;
        let value = target.value;
        let key = target.name;
        console.log(input);
        
        return(
            setInput((old)=>{
                return{...old,
                    [key]:value}
            })
        )
    }

    function editData(fdata){
        // console.log(item);
        return(
            showset(true),
            setInput(fdata),
            setBtnstate(false),
            setIndex(fdata.ind)
        )

    }
    function insertData(e){
        e.preventDefault();
        formgetdata(e);
        return (
            setData((old)=>{
            return[
                ...old,
                temp]
            }),
            showset(false),
                setInput({
                    FirstName:" ",
                    LastName:" ",
                    Password:" ",
                    Mobilenumber:" "
                  } ) 
            
            )         
    }

    function updateData(e){
        e.preventDefault();
        formgetdata(e);
        // console.log(e);
        // alert(index);
        const tempdata=[...allData];
        tempdata[index]=temp;
        return(
            showset(false),
            setData(tempdata)
        )

    }

    function deleteUser(index)
    {
        let tempdata=[...allData];
        tempdata.splice(index,1);
        {
            setData(tempdata) 
            setDeleteId(false)
        }
    } 
     function addButton()
     {
        return(         
            showset(true),
            setBtnstate(true)
            )
    }
    
     function Tr({fdata}) {
      return (
        <>
        <tr className='text-center' >
            <td>{fdata.ind+1}</td>
            <td><img src={fdata.file} alt="1" width={50} height={50} className='rounded-circle' /></td>
            <td>{fdata.FirstName}</td>
            <td>{fdata.LastName}</td>
            <td>{fdata.Mobilenumber}</td>
            <td><Button className='mx-1' onClick={()=>editData(fdata)}>
                <i className='fa fa-edit'></i></Button>
                <Button variant='danger' onClick={()=>{setDeleteId(true)}}>
                <i className='fa fa-trash'></i></Button>
            </td>
        </tr>  
         <Modal show={deleteId} >
          <Modal.Header closeButton>
              <Modal.Title>Delete Confirmation!</Modal.Title>
          </Modal.Header>
          <Modal.Body> Are sure you want to delete!</Modal.Body>
          <Modal.Footer>
          <Button variant="secondary" onClick={()=>setDeleteId(false)}>Close</Button>
          <Button variant="danger" onClick={()=>{deleteUser(fdata.ind)}}>Delete</Button>
        </Modal.Footer>
      </Modal>       
        </>
      )
    } 

  return (
    <>
    <h1 className='text-center'>Registration</h1>
    {/* <div><Button className='position-absolute end-0 mx-5 me-3 mb-3 rounded-circle'
            onClick={()=>{showset(true)}}>
    <i className='fa fa-plus'></i>    </Button></div> */}
    
    <Modal show={show}>
        <Modal.Header closeButton onClick={()=>{showset(false)}} >
            <Modal.Title>Regisreation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form onSubmit={btnstate? insertData:updateData}>
            <Form.Group>
                <Form.Label>First Name</Form.Label>
                <Form.Control 
                type='text' name='FirstName' placeholder='Enter your first name' 
                onChange={getInputData} value={input.FirstName}>
                </Form.Control>
            </Form.Group>

            <Form.Group>
                <Form.Label>Last Name</Form.Label>
                <Form.Control type='text' name='LastName' placeholder='Enter your Last name' 
                onChange={getInputData} value={input.LastName}>          
                </Form.Control>
            </Form.Group>   
            <Form.Group>
                <Form.Label>contact no</Form.Label>
                <Form.Control type='te' name='Mobilenumber' placeholder='Enter your mob no' 
                onChange={getInputData} value={input.Mobilenumber}>                    
                </Form.Control>
            </Form.Group>

            <Form.Group>
                <Form.Label>Password</Form.Label>
                <Form.Control type='password' name='Password' placeholder='Enter your password'
                 onChange={getInputData} value={input.Password}>

                </Form.Control>
            </Form.Group>

            <Form.Group>
                <Form.Label>Profie Pic</Form.Label>
                <Form.Control type='file' name='file' placeholder='Select your file'
                // onChange={getInputData} value={input.file}
                ></Form.Control>
            </Form.Group>
        
            <Form.Group>
                {
            btnstate ?<Button type='submit' variant='success' className='me-2 mt-3' >Submit</Button>:
            <Button type='submit' variant='success' className='me-2 mt-3' >Update</Button>
                }
                <Button variant='danger' className=' mt-3' onClick={()=>{showset(false)}} >
                <i className='fa fa-close'> Close</i>
               </Button>
            </Form.Group>

                {/* {JSON.stringify(input)} */}

            </Form>
        </Modal.Body>
            

    </Modal>

    {/* <h1> {JSON.stringify(allData)}</h1> */}
    <Container>
        <Table striped bordered hover>
            <thead>
            <tr className='right-0'>
            <th colSpan="6">
             <Button className="btn"onClick={addButton}>
             <i className='fa fa-plus me-2'></i>Add User</Button>

            </th>
            </tr>
            <tr className='text-center'>
                    <th>SR No</th>
                    <th>Profile Pic</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Contact No</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {
                    allData.map((item,ind)=>{
                        item['ind']=ind;
                        return<Tr fdata={item} key={ind}/>
                    })
                }
            </tbody>
        </Table>
    </Container>
    </>
  )
}

export default Registration;



// for (const data of formdata) 
// {
//     let key=data[0];
//     let value=data[1];
//     // console.log(value);  
//     //  console.log(typeof(value));         

//       if (typeof(value)=='object') 
//       {
//         value=URL.createObjectURL(value);
//       }
//         temp[key] = value;
//         console.log(temp);
// }
// return (setData(()=>
//          {
//             return[temp];
//          }),
//          showset(false)
//        )