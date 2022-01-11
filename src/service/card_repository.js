import { firebaseDatabase } from './firebase'; // import 필수
import { ref, set, remove, onValue, off } from 'firebase/database';

class CardRepository {
  syncCards(userId, onUpdate) {
    const dbRef = ref(firebaseDatabase, `${userId}/cards`);
    onValue(dbRef, (snapshot) => {
      const value = snapshot.val();
      value && onUpdate(value);
    });
    return () => off(dbRef);
  }
  saveCard(userId, card) {
    set(ref(firebaseDatabase, `${userId}/cards/${card.id}`), card);
  }

  removeCard(userId, card) {
    remove(ref(firebaseDatabase, `${userId}/cards/${card.id}`));
  }
}

export default CardRepository;
