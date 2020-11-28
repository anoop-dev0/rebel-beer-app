import React from 'react';

export default (props) => {
    return (
        <tr>
            <td>{props.details.id}</td>
            <td><img src={props.imageSrc?props.imageSrc.image:''} alt={props.details.name} height="50px" width="50px" className="img-thumbnail" /></td>
            <td>{props.details.name}</td>
            <td>{props.details.style}</td>
            <td>{props.details.abv}</td>
            <td>{props.details.ibu}</td>
            <td>{props.details.ounces}</td>
        </tr>
    )
}
