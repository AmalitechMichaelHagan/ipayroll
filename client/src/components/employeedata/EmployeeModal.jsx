
import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";

function EmployeeModal() {
  const [showModal, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { register, handleSubmit } = useForm();
  const [data, setData] = useState("");


  return (
    <>
      <div
        className="d-flex align-items-center justify-content-center"
        style={{ height: "100vh" }}
      >
        <Button className="color" onClick={handleShow}>
          Loan Request
        </Button>
      </div>
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Input Loan Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <form onSubmit={handleSubmit((data) => setData(JSON.stringify(data)))}>  
        <input {...register("loanAmount")} placeholder="Loan Amount" className="inner-shadow" />
         <input type="date" {...register("month")} placeholder="Month" className="inner-shadow" />
              <p>{data}</p>
              </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            send
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default EmployeeModal;