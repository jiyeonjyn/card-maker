import firebaseApp from './firebase'; // import 필수
import { getDatabase, ref, set, remove, onValue, off } from 'firebase/database';

class CardRepository {
  constructor() {
    this.db = getDatabase();
  }

  syncCards(userId, onUpdate) {
    const dbRef = ref(this.db, `${userId}/cards`);
    onValue(dbRef, (snapshot) => {
      const value = snapshot.val();
      value && onUpdate(value);
    });
    return () => off(dbRef);
  }
  saveCard(userId, card) {
    set(ref(this.db, `${userId}/cards/${card.id}`), card);
  }

  removeCard(userId, card) {
    remove(ref(this.db, `${userId}/cards/${card.id}`));
  }
}

export default CardRepository;
