import React, { useState, } from "react";

import "./App.css";
import axios from "axios";

import Pagination from "./components/Pagination";
import Posts from "./components/Posts";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { faTrashCan, faPenToSquare, faFloppyDisk } from '@fortawesome/free-regular-svg-icons'
import { useMediaQuery } from "./components/UseMediaQuery";


const App = () => {
  
  const responsive = useMediaQuery('(min-width: 768px)')
  const data = React.useRef();
  const allCheck = React.useRef(false);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);
  const [editId, setEditId] = useState(null);
  const [editform, setEditform] = useState({
    name: '',
    email: '',
    role: ''
  }
  );
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstpost = indexOfLastPost - postsPerPage;
  const [currentPost, setCurrentPost] = useState([]);
  const [query, setQuery] = useState("")
  React.useEffect(() => {
    const fatchPost = async () => {
      const res = await axios.get(`https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json`);
      data.current = res.data;
      setPosts(res.data);
      setLoading(false);
    };
    fatchPost();
  }, []);
  React.useEffect(() => {
    setCurrentPost(posts.slice(indexOfFirstpost, indexOfLastPost))
  }, [posts, currentPage]);
  React.useEffect(() => {
    if (data.current) {
      let newPosts = data.current.filter(contact => {
        if (query === '') {
          return contact;
        } else if (contact.name.toLowerCase().includes(query.toLowerCase())) {
          return contact;
        }
        else if (contact.role.toLowerCase().includes(query.toLowerCase())) {
          return contact;
        }
        else if (contact.email.toLowerCase().includes(query.toLowerCase())) {
          return contact;
        }
      });
      setPosts(newPosts);
    }
  }, [query]);
  if (loading) {
    return <h2>Loading</h2>;
  }
  const paginate = pageNumber => setCurrentPage(pageNumber);
  const handleClick = (e, contact) => {
    e.preventDefault();
    setEditId(contact.id)
    const formValues = {
      name: contact.name,
      email: contact.email,
      role: contact.role,
    };
    setEditform(formValues);
  };

  const handleEditFromChange = event => {
    const fieldName = event.target.getAttribute('name');
    const fieldValue = event.target.value;
    const inplaceFormData = { ...editform };
    inplaceFormData[fieldName] = fieldValue;
    setEditform(inplaceFormData);
  };
  const handleEditFormSubmit = event => {
    event.preventDefault()
    const editedFields = {
      id: editId,
      name: editform.name,
      email: editform.email,
      role: editform.role,
    };



    const newTableRow = [...posts];
    const index = posts.findIndex(data => data.id === editId);
    newTableRow[index] = editedFields;
    setPosts(newTableRow);
    setEditform(newTableRow);
    setEditId(null);
  };

  const handleCancelClick = () => {
    setEditId(null);
  };
  const handleDeleteClick = (contactId) => {
    const newContacts = [...posts];
    const index = posts.findIndex((contact) => contact.id === contactId);
    newContacts.splice(index, 1);
    setPosts(newContacts);
  };
  return (
    <>
      <div  >
        <div className="main1" style={{ display: "flex", flexDirection: "column", }} >
          <form   style={{ display: "flex", flexDirection: "column", backgroundColor: 'white', borderRadius:15, fontSize: responsive ? 17 : 11, width: responsive ? 650 : '100%', padding: '10px 20px' }}  >
           
            <div className="bi bi-search" style={{  paddingTop: responsive ? 20 :50  }}>
              <input
                className="search-input"
                placeholder="search......"
                onChange={event => setQuery(event.target.value)}
              />
            </div>
            <table >
              <thead>
                <tr className="transiction" >
                  <th style={{ width: '40px', paddingLeft: '10px' }} ><input checked={allCheck.current} type='checkbox'  onChange={(e) => {
                    allCheck.current = e.target.checked;
                    let copy = currentPost.map((post) => {
                      let x = { ...post, checked: e.target.checked };
                      return x
                    })
                    setCurrentPost(copy);
                  }} /> </th>
                  <th style={{ width: '80px', textAlign: 'center' }}>S.no</th>
                  <th style={{ width: '200px', textAlign: 'center' }}>Name</th>
                  <th style={{ width: '300px', textAlign: 'center' }}>Email</th>
                  <th style={{ width: '100px', textAlign: 'center' }}>Role</th>
                  <th style={{ width: '90px', textAlign: 'center' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {/* <Posts 
            posts={(currentPost)} 
            handleClick={handleClick} 
            handleEditFromChange={handleEditFromChange} 
            handleDeleteClick={handleDeleteClick} 
            editId={editId} 
            handleCancelClick={handleCancelClick} 
            editform={editform}
            handleEditFormSubmit={handleEditFormSubmit} 
            /> */}
               
                {currentPost.map((contact) => {
                  return (
                    <>
                      {editId === contact.id ? (
                        <tr className="transiction" >
                          <td style={{ alignItems: 'center', paddingLeft: "10px" }}>
                            <input type='checkbox' checked={contact.checked}  />
                          </td>
                          <td style={{ textAlign: 'center' }} >{contact.id} </td>
                          <td style={{ textAlign: 'center' }}><input className="input" type='text' value={editform.name} name='name' onChange={handleEditFromChange} /></td>
                          <td style={{ textAlign: 'center' }} ><input className="input"  type='text' value={editform.email} name='email' onChange={handleEditFromChange} /></td>
                          <td style={{ textAlign: 'center' }} ><input  style={{ width: '100%', textAlign: 'center' }} type='text' value={editform.role} name='role' onChange={handleEditFromChange} /></td>
                          <td style={{ textAlign: 'center' }} >
                            <FontAwesomeIcon icon={faFloppyDisk}
                              onClick={handleEditFormSubmit}
                              style={{ cursor: "pointer", color: '#4e5450', paddingTop: '5px', height: "20px" }} />
                            <FontAwesomeIcon
                              style={{ cursor: "pointer", color: '#d9172a', paddingTop: '5px', height: "20px" }}
                              onClick={handleCancelClick} icon={faXmark} /> </td>

                        </tr>
                      ) : (<tr className="transiction" >
                        <td style={{ alignItems: 'center', paddingLeft: "10px" }} ><input type='checkbox' checked={contact.checked} onChange={(e)=>{
                            let post = [...currentPost];
                            let index = post.findIndex((p)=>p.id === contact.id);
                            if(index !== -1)
                            {
                              post[index].checked = e.target.checked;
                              setCurrentPost(post); 
                            }
                          }}/></td>
                        <td style={{ textAlign: 'center' }} >{contact.id} </td>
                        <td style={{ textAlign: 'center' }}>{contact.name}</td>
                        <td style={{ textAlign: 'center' }}>{contact.email}</td>
                        <td style={{ textAlign: 'center' }}>{contact.role}</td>
                        <td style={{ textAlign: 'center' }}>
                          <FontAwesomeIcon
                            style={{ cursor: "pointer", color: '#559fdf', paddingTop: '2px' }}
                            onClick={(e) => handleClick(e, contact)} icon={faPenToSquare} />
                          <FontAwesomeIcon
                            style={{ cursor: "pointer", color: '#f36e6e', paddingTop: '2px' }}
                            onClick={(e) => handleDeleteClick(contact.id)} icon={faTrashCan} />
                        </td>
                      </tr>)}
                    </>
                  )
                })}
              </tbody>
            </table>
            <div style={{marginTop:15}}>  {currentPost.some((p)=>p.checked) &&
            <><span style={{cursor: "pointer",border:'0px solid red' , borderRadius:'15px',backgroundColor:'#e16767',padding:6,fontSize:12,color:"#fff" }}
            onClick={() => {
              debugger
             const removedItems = currentPost.filter((contact) => {
               if(contact.checked)
                 return contact;
             });
             let remainingItems = posts.filter((p)=>{
               if(!removedItems.some((r)=>{return r.id === p.id}))
                 return p;
             })
             setPosts(remainingItems);
             allCheck.current = false;
           } }>
              Delete All
               <FontAwesomeIcon style={{  color: '#fff', height: '15px', }}  icon={faTrashCan} /> </span></>
            } <Pagination postsPerPage={postsPerPage} totalPosts={posts.length} paginate={paginate} />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
export default App;

