import React from 'react';
import CardEditForm from '../card_edit_form/card_edit_form';
import styles from './editor.module.css';

const Editor = ({ cards }) => (
  <section className={styles.editor}>
    <h1 className={styles.title}>Card Maker</h1>
    <ul className={styles.forms}>
      {cards.map((card) => (
        <CardEditForm key={card.id} card={card} />
      ))}
    </ul>
  </section>
);

export default Editor;
