import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:3001');

interface Mensaje {
  texto: string;
}

function Chat() {
  const [mensaje, setMensaje] = useState('');
  const [mensajes, setMensajes] = useState<Mensaje[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    socket.on('connect_error', (err) => {
      setError('Error de conexión: ' + err.message);
    });

    socket.on('mensaje', (mensaje: string) => {
      setMensajes((prevMensajes) => [...prevMensajes, { texto: mensaje }]);
    });

    return () => {
      socket.off('connect_error');
      socket.off('mensaje');
      socket.disconnect();
    };
  }, []);

  const enviarMensaje = () => {
    if (mensaje.trim() === '') return;

    socket.emit('mensaje', mensaje, (response: { status: string }) => {
      if (response.status !== 'ok') {
        setError('Error al enviar el mensaje');
      }
    });
    setMensaje('');
  };

  return (
    <div style={{ padding: '20px', maxWidth: '400px', margin: '0 auto' }}>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <input
        type="text"
        value={mensaje}
        onChange={(e) => setMensaje(e.target.value)}
        style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
      />
      <button
        onClick={enviarMensaje}
        disabled={mensaje.trim() === ''}
        style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
      >
        Enviar
      </button>
      <ul style={{ listStyleType: 'none', padding: '0' }}>
        {mensajes.map((mensaje, index) => (
          <li key={index} style={{ padding: '10px', borderBottom: '1px solid #ccc' }}>
            {mensaje.texto}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Chat;