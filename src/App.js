import React, { useState, useEffect } from 'react';
import Serie from './components/Serie';
import serieService from './service/serieService';

const App = () => {

  // creo le costanti per i cambio di stato 
  const [series, setSeries] = useState([]) //la stampa delle serie
  const [newSerie, setNewSerie] = useState('') //la creazione delle nuove serie
  const [showAll, setShowAll] = useState(true) //la modifica della serie

  ///////////////////////////////////////////////////////////////////////////////////
  // LETTURA
  ///////////////////////////////////////////////////////////////////////////////////

  useEffect(() => {
    serieService.getAll() ////////////////////// GETALL metodo creato in serieService.js che mi recupera i dati dal json
      .then(getSeries => {
        setSeries(getSeries)
      })
  }, [])

  ///////////////////////////////////////////////////////////////////////////////////
  // AGGIUNTA di un nuovo oggetto
  ///////////////////////////////////////////////////////////////////////////////////

  const addSerie = e => {
    e.preventDefault();
    const serieObject = { //////////////////////creo nuovo oggetto(Newserie)
      name: newSerie,
      important: Math.random() > 0.5, ////////////////////// se il numero random è > 0.5 important + true, altrimenti false
      id: series.lenght + 1 //////////////////////creo l'id
    }
    serieService.create(serieObject)////////////////////// CREATE metodo creato in serieService.js che mi aggiunge i nuovi dati dal json
      .then(createSerie => {
        setSeries(series.concat(createSerie)) ////////////////////// .concat mi concatena gli array
        setNewSerie('') ////////////////////// svuota il campo dell'input
      })
    let y = window.outerHeight
    window.scrollTo(0, y + 1000) ////////////////////// per scendere con lo scroll al click su invio
  }
  const handleSerie = e => { //////////////////////recupera il value dall'input e lo inserisce tramite il setNewSerie
    setNewSerie(e.target.value)
  }

  ///////////////////////////////////////////////////////////////////////////////////
  // MODIFICA
  ///////////////////////////////////////////////////////////////////////////////////

  const toggleImportanceOf = id => {  ////////////////////// ogni serie riceve la propria funzione univoca (id)
    const serie = series.find(n => n.id === id) ////////////////////// metodo find serve per trovare la serie che vogliamo modificare tramite id
    const changedSerie = { ...serie, important: !serie.important } ////////////////////// creo un nuovo oggetto che è la copia esatta di quello precedente modificando solo la proprietà important
    serieService.update(id, changedSerie) ////////////////////// UPDATE metodo creato in serieService.js, eseguo richiesta PUT per andare a sostituire il vecchio oggetto
      .then(change => {
        setSeries(series.map(serie => serie.id !== id ? serie : change))//////////////////////se l'id è diverso copio il vecchio array altrimenti lo modifico (changedSerie)
      })
      .catch(error => { ////////////////////// Inserisco l'errore nel caso in cui non trovasse l'id della serie perchè inesistente
        alert(
          ` la serie ${serie.name} non esiste`
        )
        setSeries(series.filter(h => h.id !== id))
      })
  }

  ///////////////////////////////////////////////////////////////////////////////////
  // CANCELLA quella serie
  ///////////////////////////////////////////////////////////////////////////////////

  const deleteSerie = (id, name) => {
    const r = window.confirm(` Sei sicuro di voler eliminare la serie ${name} ?`)
    if (r === false) {
      return
    } else {
      series.filter(h => h.id === id)
      console.log(id);
      serieService.deleteSerie(id) ////////////////////// DELETESERIE metodo creato in serieService.js per cancellare quell'elemento recuperato con l'id
      window.location.reload()  //////////////////////per ricaricare la pagina ed eliminare anche a vista la seria cancellata
    }
  }

  ///////////////////////////////////////////////////////////////////////////////////
  // FILTRA le serie (visualizza le serie più importanti oppure tutte)
  ///////////////////////////////////////////////////////////////////////////////////

  const seriesToShow = showAll ? series : series.filter(serie => serie.important === true)

  ///////////////////////////////////////////////////////////////////////////////////
  // RETURN
  ///////////////////////////////////////////////////////////////////////////////////

  return (
    <div className="container">
      <h1 className='center-align'>Serie TV</h1>
      <form onSubmit={addSerie} className='col s6 z-depth-4 valign-wrapper' style={{ marginTop: 20, marginBottom: 20 }}>
        <div className="input-field col s11">
          <input
            style={{ width: 500, marginLeft: 20, marginRight: 20 }}
            type="text"
            value={newSerie}
            onChange={handleSerie}
            required  //il campo deve essere riempito per dare l'ok
          />
          <label style={{ marginLeft: 10 }}>Aggiungi SerieTv</label>
        </div>
        <button className='btn-floating btn-small light-blue pulse' type='submit'><i className="material-icons">add</i></button> {/* aggiungo icona materialize */}
      </form>
      <div className="row">
        <button className='waves-effect waves-light light-blue btn-small ' style={{ marginBottom: 20 }} onClick={() => setShowAll(!showAll)}>
          show{showAll ? ' the best' : ' all'}
        </button>
        <ul className='collection z-depth-4' >
          {seriesToShow.map(serie => (
            <Serie
              key={serie.id}
              serie={serie}
              toggleImportance={() => toggleImportanceOf(serie.id)} //////////////////////modifica l'importanza del film con un click
              deleteSerie={() => deleteSerie(serie.id, serie.name)} //////////////////////cancella la serie con un click 
            >
            </Serie>)
          )}
        </ul>
      </div>
    </div>
  );
}

export default App;
