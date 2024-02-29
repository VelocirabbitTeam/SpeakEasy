import React, { useState } from 'react';


export default function Socket() {
  const [initialized, setInitialized] = useState(false);

  async function initialize() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      console.log({ stream });

      if (!MediaRecorder.isTypeSupported('audio/webm')) {
        alert('Browser not supported');
        return;
      }

      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: 'audio/webm',
      });

      const socket = new WebSocket('wss://api.deepgram.com/v1/listen', [
        'token',
        process.env.DEEPGRAM_API_KEY_2
        // 'b109ea30839e89a632eca68067176336a2486e4d',
      ]);

      socket.onopen = () => {
        console.log({ event: 'onopen' });
        mediaRecorder.addEventListener('dataavailable', async (event) => {
          if (event.data.size > 0 && socket.readyState === 1) {
            socket.send(event.data);
          }
        });
        mediaRecorder.start(1000);
        setInitialized(true);
      };

      socket.onmessage = (message) => {
        const received = JSON.parse(message.data);
        const transcript = received.channel.alternatives[0].transcript;
        if (transcript && received.is_final) {
          console.log(transcript);
          document.querySelector('#transcript').textContent += transcript + ' ';
        }
      };

      socket.onclose = () => {
        console.log({ event: 'onclose' });
      };

      socket.onerror = (error) => {
        console.log({ event: 'onerror', error });
      };
    } catch (error) {
      console.error('Error initializing:', error);
    }
  }

  return (
    <div>
      <button onClick={initialize} disabled={initialized}>
        {initialized ? 'Initialized' : 'Initialize'}
      </button>
      <p id="status">{initialized ? 'Connected' : 'Not Connected'}</p>
      <p id="transcript"></p>
    </div>
  );
}

