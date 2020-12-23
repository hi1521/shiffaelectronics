import React, { Component } from 'react';

class TableRow extends Component {
    state = {  }
    render() {
        const { id, categories, products } = this.props
        return (
            <tr>
              <td>{id}</td>
              <td>{categories}</td>
              <td>{products}</td>
              <td>{}</td>
            </tr>
        );
    }
}
 
export default TableRow;