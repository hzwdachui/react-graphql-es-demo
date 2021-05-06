import React, { Component } from 'react';

import { Query } from "react-apollo";
import gql from "graphql-tag";

// export default class AppComponent extends Component {
//     render() {

//         const body = `{
//                         rates(currency: "UAH") {
//                           currency
//                           rate
//                         }
//                     }`;

//         return (
//             <Query query={gql`${body}`}>
//                         {({ loading, error, data }) => {
//                             if (loading) return <p>Loading...</p>;
//                             if (error) return <p>Error :(</p>;

//                             return data.rates
//                                 .filter(
//                                     ({ currency }) =>
//                                         currency !== this.props.currency &&
//                                         ["USD", "BTC", "LTC", "EUR", "JPY", "ETH"].includes(currency)
//                                 )
//                                 .map(({ currency, rate }) => (
//                                     <li key={currency}>
//                                         <span>{`${currency}: ${rate}`}</span>
//                                     </li>
//                                 ));
//                         }}
//                 </Query>
//         );
//     }
// }


const PRODUCTS = gql`{
  products {
    name
  }
}`;

export default class AppComponent extends Component {
  render() {
    return (
      <Query query={PRODUCTS}>
        {
          ({ loading, error, data }) => (
            loading 
              ? (<>Loading...</>) 
              : (
                <ul>{
                  data.products && _.map(data.products, (item, i) =>{
                    return (
                      <li key={i}>{
                        _.map(_.keys(item), (key, j) =>
                          key !== '__typename' && <span>{item[key]}<br /></span>
                        )
                      }</li>
                    );
                  })
                }</ul>
              )
          )
        }
      </Query>
    );
  }
}