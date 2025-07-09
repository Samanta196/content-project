import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
    const [events, setEvents] = useState([]);
    const [locale, setLocale] = useState('en');

    useEffect(() => {
        axios
            .get(`http://localhost:1337/api/event?populate=deep&locale=${locale}`)
            .then(res => setEvents(res.data.data))
            .catch(err => console.error(err));
    }, [locale]);

    return (
        <div style={{ padding: '2rem', fontFamily: 'Arial' }}>
            <h1>Upcoming Events</h1>

            <div style={{ marginBottom: '1rem' }}>
                <label htmlFor="locale">Select language: </label>
                <select
                    id="locale"
                    value={locale}
                    onChange={(e) => setLocale(e.target.value)}
                >
                    <option value="en">English</option>
                    <option value="de">Deutsch</option>
                    <option value="es">Español</option>
                </select>
            </div>

            <ul>
                {events.map((event) => {
                    const { id, attributes } = event;
                    const { name, description, date, image } = attributes;

                    const imageUrl = image?.data?.attributes?.url
                        ? `http://localhost:1337${image.data.attributes.url}`
                        : null;

                    return (
                        <li
                            key={id}
                            style={{
                                marginBottom: '2rem',
                                borderBottom: '1px solid #ccc',
                                paddingBottom: '1rem',
                            }}
                        >
                            <h2>{name}</h2>

                            {imageUrl && (
                                <img
                                    src={imageUrl}
                                    alt={name}
                                    style={{
                                        maxWidth: '300px',
                                        height: 'auto',
                                        display: 'block',
                                        marginBottom: '1rem',
                                    }}
                                />
                            )}

                            <p>
                                <strong>Date:</strong> {new Date(date).toLocaleDateString()}
                            </p>

                            <p>{description}</p>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}

export default App;