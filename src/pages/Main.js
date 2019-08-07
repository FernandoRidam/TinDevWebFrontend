import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import './Main.css';

import api from '../services/api';

import logo from '../assets/logo.svg';
import like from '../assets/like.svg';
import dislike from '../assets/dislike.svg';

export default function Main({ match }) {
  const [ devs, setDevs ] = useState([]);

  useEffect(() => {
    async function loadDevs() {
      const response = await api.get('devs', {
        headers: {
          user: match.params.id,
        }
      });

      setDevs( response.data );
    }

    loadDevs();
  }, [ match.params.id ]);

  async function handleLike( id ){
    await api.post(`/devs/${ id }/likes`, null, {
      headers: {
        user: match.params.id,
      }
    });

    setDevs( devs.filter( user => user._id !== id ));
  }

  async function handleDeslike( id ){
    await api.post(`/devs/${ id }/dislikes`, null, {
      headers: {
        user: match.params.id,
      }
    });

    setDevs( devs.filter( user => user._id !== id ));
  }

  return (
    <div className="main-container" >
      <Link to="/">
        <img src={ logo } alt="TinDev" />
      </Link>

      { devs.length > 0 ? (
        <ul>
        { devs.map( dev => (
          <li key={ dev._id }>
            <img src={ dev.avatar } alt={ dev.name }/>
            <footer>
                <strong>{ dev.name }</strong>
  
                <p>{ dev.bio }</p>
              </footer>
  
              <div className="buttons" >
                <button type="button" onClick={ () => handleDeslike( dev._id )}>
                  <img src={ dislike } alt="dislike" />
                </button>
  
                <button type="button" onClick={ () => handleLike( dev._id )}>
                  <img src={ like } alt="like" />
                </button>
              </div>
            </li>
          )) }
        </ul>
      ) : (
          <div className="empty">Acabou! :(</div>
      )}
    </div>
  );
};