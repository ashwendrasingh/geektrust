import React,{useEffect} from 'react'
import { Modal,Form,Button } from 'react-bootstrap'


export default function Update(props) {
 const [hello,setHello]=React.useState();


useEffect(() => {
  // eslint-disable-next-line no-undef
  if(props.post.map((e) =>(e.id)===props.id)){
    return{

    }
 
    alert('hhh')
  }else{
    alert('yyy')
  }

console.log(hello)
  debugger
  if(hello===props.id){
    console.log('sucess')
  }
},[]);

  return (
    <Modal show={props.show} 
    size="me">
    <Modal.Header >
    
      <Modal.Title>Modal heading</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <Form>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="name@example.com"
            autoFocus
          />
        </Form.Group>
        <Form.Group
          className="mb-3"
          controlId="exampleForm.ControlTextarea1"
        >
          <Form.Label>Example textarea</Form.Label>
          <Form.Control as="textarea" rows={3} />
        </Form.Group>
      </Form>
    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={props.handleClose}>
        Close
      </Button>
      <Button variant="primary" onClick={props.handleClose}>
        Save Changes
      </Button>
    </Modal.Footer>
  </Modal>
  )
}
