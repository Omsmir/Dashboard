import { motion } from "framer-motion";
import { Button,Toolbar ,Column,DataTable,Dialog,Panel} from 'primereact';
import React, { useState } from "react";
import { DrawerItem } from "./ListComponent";
import { Col, Container, Row } from "react-bootstrap";
import '../../css/Invoice.css';
import { useMediaQuery } from "@mui/material";
import "../../css/userProfile.css";

const Invoice = () => {
    return ( 
        <motion.section
      className="Account"
      id="Account"
      initial="hidden"
      animate="visible"
      exit={{ opacity: 0, transition: { duration: 1 } }}
      variants={{ visible: { transition: { staggerChildren: 0.3 } } }}
    >
      <DrawerItem Id={3} component={<PrintInvoice />} />
    </motion.section>
     );
}

const InvoiceTemplate = ({ invoiceData }) => {
  const [visible, setVisible] = useState(false);

  const printInvoice = () => {
    window.print();
  };


  return (
    <Container fluid className="invoice-template">
        <Row>
            <Col className="col-12">
            <Toolbar className="p-mb-4">
        <div className="p-toolbar-group-left">
          <Button label="Print" icon="pi pi-print" className="p-button-success" onClick={printInvoice} />
          <Button label="Preview" icon="pi pi-eye" className="p-button-info" onClick={() => setVisible(true)} />
        </div>
      </Toolbar>

            </Col>
  
  <Panel header="Invoice" className="invoice-panel">
        <div className="invoice-header">
          <h2>{invoiceData.companyName}</h2>
          <p>{invoiceData.companyAddress}</p>
        </div>

        <div className="invoice-details">
          <div>
            <p><strong>Invoice Number:</strong> {invoiceData.invoiceNumber}</p>
            <p><strong>Date:</strong> {invoiceData.date}</p>
          </div>
          <div>
            <p><strong>Bill To:</strong></p>
            <p>{invoiceData.customerName}</p>
            <p>{invoiceData.customerAddress}</p>
          </div>
        </div>

        <DataTable value={invoiceData.items} className="invoice-table" responsiveLayout="scroll">
          <Column field="description" header="Description"></Column>
          <Column field="quantity" header="Quantity"></Column>
          <Column field="price" header="Price"></Column>
          <Column body={(rowData) => (rowData.quantity * rowData.price).toFixed(2)} header="Total"></Column>
        </DataTable>

        <div className="invoice-footer">
          <p><strong>Total:</strong> {invoiceData.items.reduce((acc, item) => acc + (item.quantity * item.price), 0).toFixed(2)}</p>
        </div>
      </Panel>
    

<Dialog header="Invoice Preview" visible={visible} style={{ width: '80vw' }} onHide={() => setVisible(false)}>
        <Panel header="Invoice Preview" className="invoice-panel">
          <div className="invoice-header">
            <h2>{invoiceData.companyName}</h2>
            <p>{invoiceData.companyAddress}</p>
          </div>

          <div className="invoice-details">
            <div>
              <p><strong>Invoice Number:</strong> {invoiceData.invoiceNumber}</p>
              <p><strong>Date:</strong> {invoiceData.date}</p>
            </div>
            <div>
              <p><strong>Bill To:</strong></p>
              <p>{invoiceData.customerName}</p>
              <p>{invoiceData.customerAddress}</p>
            </div>
          </div>

          <DataTable value={invoiceData.items} className="invoice-table" responsiveLayout="scroll">
            <Column field="description" header="Description"></Column>
            <Column field="quantity" header="Quantity"></Column>
            <Column field="price" header="Price"></Column>
            <Column body={(rowData) => (rowData.quantity * rowData.price).toFixed(2)} header="Total"></Column>
          </DataTable>

          <div className="invoice-footer">
            <p><strong>Total:</strong> {invoiceData.items.reduce((acc, item) => acc + (item.quantity * item.price), 0).toFixed(2)}</p>
          </div>
        </Panel>
      </Dialog>
      <div className="print-button-container">
        <Button label="Print" icon="pi pi-print" className="p-button-primary" onClick={printInvoice} />
        <Button label="Preview" icon="pi pi-eye" onClick={() => setVisible(true)} />
      </div>
     
      </Row>
      </Container>
  );
};

const PrintInvoice = () => {
    const invoiceData = {
      companyName: "Xeon Store",
      companyAddress: "14 Heliopleas",
      invoiceNumber: "12345",
      date: new Date().toDateString(),
      customerName: "Customer Name",
      customerAddress: "Customer Address",
      items: [
        { description: "Item 1", quantity: 2, price: 10.00 },
        { description: "Item 2", quantity: 1, price: 15.00 },
      ],
    };
  
      const visible = {
        opacity: 1,
        y: 0,
        transition: { type: "spring", duration: 1 },
      };
    
    return (
        <motion.div variants={{ hidden: { opacity: 0, y: -50 }, visible }} className="container-fluid invoice-parent">
        <InvoiceTemplate invoiceData={invoiceData} />
      </motion.div>

    );
  };
export default Invoice;