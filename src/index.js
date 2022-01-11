import React, { memo } from 'react';
import ReactDOM from 'react-dom';
import './index.module.css';
import App from './app';
//import '@fortawesome/fontawesome-free/js/all.js';
import AuthService from './service/auth_service';
import ImageUploader from './service/image_uploader';
import ImageFileInput from './components/image_file_input/image_file_input';
import CardRepository from './service/card_repository';
import { HashRouter } from 'react-router-dom/cjs/react-router-dom.min';

const authService = new AuthService();
const cardRepository = new CardRepository();
const imageUploader = new ImageUploader();
const fileInput = memo((props) => (
  <ImageFileInput {...props} imageUploader={imageUploader} />
)); //  여기서 컴포넌트 만들어 전달하면 Dependency Injection 쉬움

ReactDOM.render(
  <React.StrictMode>
    <HashRouter>
      <App
        authService={authService}
        FileInput={fileInput} // 컴퍼넌트 prop인 경우는 대문자로 시작
        cardRepository={cardRepository}
      />
    </HashRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
