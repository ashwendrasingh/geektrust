import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { faTrashCan, faPenToSquare, faFloppyDisk } from '@fortawesome/free-regular-svg-icons'
const Posts = ({ posts, handleClick, handleEditFromChange, handleCancelClick, editId, editform, handleDeleteClick,handleEditFormSubmit }) => {
  return (
    <>
          {posts.map((contact) => {
                  return (
                    <>
                      {editId === contact.id ? (
                        <tr className="transiction" >
                          <td style={{ alignItems: 'center', paddingLeft: "10px" }}><input type='checkbox' checked={contact.checked} /></td>
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
                        <td style={{ alignItems: 'center', paddingLeft: "10px" }} ><input type='checkbox' checked={contact.checked} /></td>
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
    </>
  );
};
export default Posts;
