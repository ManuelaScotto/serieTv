import React from 'react'

const Serie = ({ serie, toggleImportance, deleteSerie }) => { ////////////////////// passo le props
    return (
        <li className='collection-item' style={{ borderBottom: '1px solid #dadada', padding: 20, display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ lineHeight: 2.2, fontWeight: 'bold' }}>{serie.name}</span>
            <span>
                <button className='btn waves-effect waves-light scale-transition light-blue' style={{ marginRight: 30 }} onClick={toggleImportance}>{serie.important ? <i className="material-icons ">star</i> : <i className="material-icons">sentiment_very_dissatisfied</i>}</button>
                <button style={{ marginLeft: '5px' }} className='btn-floating btn-small waves-effect waves-light red' onClick={deleteSerie}> <i className="material-icons">delete</i></button>
            </span>
        </li>
    );
}
/* const Serie = ({ props }) => { ////////////////////// passo le props
    return (
        <li className='collection-item' style={{ borderBottom: '1px solid #dadada', padding: 20, display: 'flex', justifyContent: 'space-between' }}>
            <span className='title' style={{ lineHeight: 2.2, fontWeight: 'bold' }}>{props.serie.name}</span>
            <span className="secondary-content">
                <button className=' btn waves-effect waves-light scale-transition light-blue' style={{ marginRight: 30 }} onClick={props.toggleImportance}>{serie.important ? <i className="material-icons ">star</i> : <i className="material-icons">sentiment_very_dissatisfied</i>}</button>
                <button style={{ marginLeft: '5px' }} className='btn-floating btn-small waves-effect waves-light red' onClick={props.deleteSerie}> <i className="material-icons">delete</i></button>
            </span>
        </li>
    );
} */

export default Serie;