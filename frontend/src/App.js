import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:1337/api/events?populate=deep')
        .then(res => setEvents(res.data.data))
        .catch(err => console.error(err));
  }, []);

  return (
      <div style={{ padding: '2rem', fontFamily: 'Arial' }}>
        <h1>Upcoming Events</h1>
        <ul>
          {events.map(event => (
              <li key={event.id}>
                <strong>{event.attributes.name}</strong>
              </li>
          ))}
        </ul>
      </div>
  );
}

export default App;
