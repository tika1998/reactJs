import React from "react";
import {Button} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import Table from "react-bootstrap/Table";

const Archive = (props) => {

    const archiveRedux = useSelector(state => state.archive);

    const dispatch = useDispatch();

    const restoreArchive = (id) => {
        dispatch(props.restoreArchive(id));
    }

    return (
        <Table striped bordered hover>
            <thead>
            <tr>
                <th>#</th>
                <th>Name</th>
                <th>Action</th>
            </tr>
            </thead>
            <tbody>
            {archiveRedux.map(item => {
               return (
                   <tr key={item.id}>
                       <td>{item.id}</td>
                       <td>{item.name}</td>
                       <td>
                           <Button className='bg-success' onClick={() => restoreArchive(item.id)}><i className="fas fa-trash-restore"></i></Button>
                       </td>
                   </tr>
               )
            })}

            </tbody>
        </Table>
    )
}

export default Archive;