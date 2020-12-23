import React, {Component} from 'react';
import {View, StyleSheet } from '@react-pdf/renderer';
import InvoiceTableHeader from './InvoiceTableHeader'
import InvoiceTableRow from './InvoiceTableRow'
import InvoiceTableBlankSpace from './InvoiceTableBlankSpace'
import InvoiceTableFooter from './InvoiceTableFooter'



class InvoiceItemsTable extends Component {
    state = {}

    tableRowsCount = 6;

    styles = StyleSheet.create({
        tableContainer: {
            flexDirection: 'row',
            flexWrap: 'wrap',
            marginTop: 24,
            borderWidth: 1,
            borderColor: '#bff0fd',
        },
    });


    render() {
        const { invoice } = this.props;
        return (
            <View style={this.styles.tableContainer}>
                <InvoiceTableHeader />
                <InvoiceTableRow items={invoice.items} />
                <InvoiceTableBlankSpace rowsCount={1} />
                <InvoiceTableFooter text="SUBTOTAL" value={invoice.subTotal} />
                <InvoiceTableFooter text="DISCOUNT" value={invoice.discount} />
                <InvoiceTableFooter text="TOTAL" value={invoice.total} />
            </View>
        );
    }
}

export default InvoiceItemsTable