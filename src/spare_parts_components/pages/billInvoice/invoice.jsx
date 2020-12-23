import React, {Component} from "react";

import {Document, Image, Page, StyleSheet, PDFViewer} from '@react-pdf/renderer';
import InvoiceTitle from "./invoiceTitle"
import BillTo from './BillTo'
import InvoiceNo from './InvoiceNo'
import InvoiceItemsTable from './InvoiceItemTable'
import InvoiceThankYouMsg from './InvoiceThankYouMsg'
import logo from '../../../logo.png'
import axios from "axios";


class Invoice extends Component {
    state = {}

    invoiceData = {
        id: "5f8920556ab6bcf247b2115c",
        invoice_no: "202007-31",
        balance: "$1,941.94",
        customerName: "",
        email: "haleyblake@voipa.com",
        phone: "+1 (830) 481-3846",
        address: "437 Manhattan Court, Babb, Mississippi, 7475",
        date: "2019-09-01",
        subTotal: 0,
        discount: 0,
        total: 0,
        items: []
    }

    styles = StyleSheet.create({
        page: {
            fontFamily: 'Helvetica',
            fontSize: 11,
            paddingTop: 30,
            paddingLeft: 60,
            paddingRight: 60,
            lineHeight: 1.5,
            flexDirection: 'column',
        },
        logo: {
            width: 74,
            height: 66,
            marginLeft: 'auto',
            marginRight: 'auto'
        }
    });

    // static getDerivedStateFromProps(_, state) {
    //     axios.post("http://localhost/spare_parts/session_checker.php")
    //         .then(value => {
    //             if (value.data === "no record found") return null;
    //             else if(value.data[0].status !== '1') {
    //                 this.props.history.push("/login");
    //             }
    //         })
    // }


    componentWillMount = async () => {
        await axios.post("http://localhost/spare_parts/session_checker.php")
            .then(value => {
                if (value.data === "no record found") return null;
                else if(value.data[0].status !== '1') {
                    this.props.history.push("/login");
                }
            })
    }

    componentDidMount = () => {
        axios.post("http://localhost/spare_parts/sales.php", this.props.location.data).then(value => console.log(value));
    }

    render() {
        let invoice  = this.invoiceData;
        const {data} = this.props.location;
        let {
            subTotal,
            discount,
            total,
            items,
            customerName,
            date,
            time,
        } = data;
        // console.log("Message ",this.props.location.data);
        invoice.items = items;
        invoice.subTotal = subTotal;
        invoice.discount = discount;
        invoice.total = total;
        invoice.customerName = customerName;
        invoice.date = date;

        return (
            <PDFViewer width="1900" height="1000" className="app" >
                <Document>
                    <Page size="A4" style={this.styles.page}>
                        <Image style={this.styles.logo} src={logo}/>
                        <InvoiceTitle title='Invoice'/>
                        <InvoiceNo invoice={invoice}/>
                        <BillTo invoice={invoice}/>
                        <InvoiceItemsTable invoice={invoice}/>
                        <InvoiceThankYouMsg/>
                    </Page>
                </Document>
            </PDFViewer>
        );
    }
}

export default Invoice;