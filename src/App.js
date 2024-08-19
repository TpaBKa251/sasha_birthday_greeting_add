import React, { useState } from 'react';
import './App.css';

function App() {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [image, setImage] = useState(null);
  const [video, setVideo] = useState(null);
  const [imageName, setImageName] = useState('Изображение');
  const [videoName, setVideoName] = useState('Видео');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('message', message);
    if (image) formData.append('image', image);
    if (video) formData.append('video', video);

    // Отладка: выведем содержимое FormData в консоль
    for (let [key, value] of formData.entries()) {
      console.log(`${key}:`, value); // Проверьте, что файлы здесь отображаются
    }

    try {
      const response = await fetch('https://sasha-birthday-social-network.onrender.com/sasha/birthday/social/network', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        alert('Поздравление отправлено');
        setName('');
        setMessage('');
        setImageName('Choose an image');
        setVideoName('Choose a video');
        setImage(null);
        setVideo(null);
      } else {
        const errorText = await response.text();
        alert(`Че то не получилось: ${errorText}`);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Поломалося. Попробуй еще раз');
    }

    window.location.reload();
  };
  return (
      <div className="app-container">
        <h1 className="title">Напишите поздравление Саше</h1>
        <h2>Необходимо написать имя, поздравление и пожелания, фото и видео - по желанию</h2>
        <form className="greeting-form" onSubmit={handleSubmit}>
          <input
              type="text"
              placeholder="Имя"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="input-field"
          />
          <textarea
              placeholder="Поздравление и пожелания"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              className="textarea-field"
          />
          <div className="file-input-container">
            <label htmlFor="image-input" className="custom-file-label">
              {imageName}
            </label>
            <input
                id="image-input"
                type="file"
                accept="image/*"
                onChange={(e) => {
                  setImage(e.target.files[0]);
                  setImageName(e.target.files[0] ? e.target.files[0].name : 'Choose an image');
                }}
                className="file-input"
            />
          </div>

          <div className="file-input-container">
            <label htmlFor="video-input" className="custom-file-label">
              {videoName}
            </label>
            <input
                id="video-input"
                type="file"
                accept="video/*"
                onChange={(e) => {
                  setVideo(e.target.files[0]);
                  setVideoName(e.target.files[0] ? e.target.files[0].name : 'Choose a video');
                }}
                className="file-input"
            />
          </div>
          <button type="submit" className="submit-button">Отправить</button>
        </form>
      </div>
  );
}

export default App;
