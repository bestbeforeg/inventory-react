import React, { Component } from 'react';

const Collection = () => {
    return (
        <table className="collection highlight responsive-table">
            <thead>
            <tr>
                <th>Operation</th>
                <th>Document</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Date</th>
                <th>Company</th>
                <th>Total</th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td>ingoing</td>
                <td>doc1</td>
                <td>233 лв.</td>
                <td>2</td>
                <td>16-10-2018</td>
                <td>firma</td>
                <td>466 лв.</td>
            </tr>
            <tr>
                <td>ingoing</td>
                <td>doc1</td>
                <td>233 лв.</td>
                <td>2</td>
                <td>16-10-2018</td>
                <td>firma</td>
                <td>466 лв.</td>
            </tr>
            <tr>
                <td>ingoing</td>
                <td>doc1</td>
                <td>233 лв.</td>
                <td>2</td>
                <td>16-10-2018</td>
                <td>firma</td>
                <td>466 лв.</td>
            </tr>
            </tbody>
        </table>
    )
};

export default  Collection;