import React, {Component} from "react";
import {Text, View, StyleSheet } from '@react-pdf/renderer';

class InvoiceTitle extends Component{
    state = {}

    styles = StyleSheet.create({

        titleContainer:{
            flexDirection: 'row',
            marginTop: 24,
        },
        reportTitle:{
            color: '#61dafb',
            letterSpacing: 4,
            fontSize: 25,
            textAlign: 'center',
            textTransform: 'uppercase',
        }
    });

    render() {
        const { title } = this.props;
        return (
            <View style={this.styles.titleContainer}>
                <Text style={this.styles.reportTitle}>{title}</Text>
            </View>
        );
    }
}

export default InvoiceTitle;