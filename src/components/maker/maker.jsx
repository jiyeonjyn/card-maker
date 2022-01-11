import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Preview from '../preview/preview';
import Editor from '../editor/editor';
import Footer from '../footer/footer';
import Header from '../header/header';
import styles from './maker.module.css';

const Maker = ({ authService, FileInput, cardRepository }) => {
  const history = useHistory();
  const historyState = history.location.state;
  const [cards, setCards] = useState({});
  const [userId, setUserId] = useState(historyState && historyState.id);

  const onLogout = () => {
    authService.logout();
  }; //로그아웃 되면 아래 useEffect에 의해 '/' 페이지로 이동
  useEffect(() => {
    authService.onAuthChange((user) => {
      if (user) {
        setUserId(user.uid); // 로그인 된 상태면 user.uid를 userId에 저장해서 card repository 이용
      } else {
        history.push('/'); //로그인 되지 않은 상태면 자동으로 '/' 페이지로 이동
      }
    });
  });
  useEffect(() => {
    if (!userId) {
      return;
    }
    const stopSync = cardRepository.syncCards(userId, (cards) => {
      setCards(cards);
    });
    return () => stopSync();
  }, [userId]);
  const createOrUpdateCard = (card) => {
    setCards((cards) => {
      const updated = { ...cards, [card.id]: card };
      return updated;
    });
    cardRepository.saveCard(userId, card);
  };
  // const createOrUpdateCard = (card) => {
  //   setCards((cards) => {
  //     const updated = { ...cards };
  //     updated[card.id] = card;
  //     return updated;
  //   }); // 콜백함수의 인자 cards는 setCards가 호출될 때의 cards를 의미함
  // };
  const deleteCard = (card) => {
    setCards((cards) => {
      const updated = { ...cards };
      delete updated[card.id];
      return updated;
    });
    cardRepository.removeCard(userId, card);
  };
  return (
    <section className={styles.maker}>
      <Header onLogout={onLogout} />
      <div className={styles.container}>
        <Editor
          FileInput={FileInput}
          cards={cards}
          addCard={createOrUpdateCard}
          updateCard={createOrUpdateCard}
          deleteCard={deleteCard}
        />
        <Preview cards={cards} />
      </div>
      <Footer />
    </section>
  );
};

export default Maker;
