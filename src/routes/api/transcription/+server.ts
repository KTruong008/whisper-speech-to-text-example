import { json } from '@sveltejs/kit';
import fs from 'fs';
import { OPENAI_API_SECRET_KEY } from '$env/static/private';

export const POST = async (event) => {
  // parse formData
  const requestBody = await event.request.formData();

  console.log('requestBody: ', requestBody);

  const requestFile = requestBody.get('file');

  /**
   * Request config
   *
   * https://platform.openai.com/docs/api-reference/audio/create
   *
   * Below this line needs to be refactored
   *
   */
  const file = new Blob([requestFile], { type: 'video/mp4' });

  // const buffer = fs.readFileSync('static/the-great-dictator.mp4');
  // const file = new Blob([buffer]);

  const formData = new FormData();
  formData.append('file', file, 'test.wav');
  formData.append('model', 'whisper-1');
  formData.append('language', 'en');

  /**
   * https://platform.openai.com/docs/api-reference/audio/create?lang=node
   */
  const res = await fetch(`https://api.openai.com/v1/audio/transcriptions`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${OPENAI_API_SECRET_KEY}`,
      Accept: 'application/json'
    },
    body: formData
  });

  const data = await res.json();

  console.log('data: ', data);

  return json({});
};
