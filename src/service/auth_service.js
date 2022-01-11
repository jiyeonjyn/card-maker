import { firebaseAuth } from './firebase'; // import 필수
import {
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';

class AuthService {
  login(providerName) {
    const authProvider = this.getProvider(providerName);
    return signInWithPopup(firebaseAuth, authProvider);
  }

  logout() {
    signOut(firebaseAuth);
  }

  onAuthChange(onUserChanged) {
    // 로그인 된 유저가 있는지 확인
    onAuthStateChanged(firebaseAuth, (user) => {
      onUserChanged(user);
    });
  }

  getProvider(providerName) {
    switch (providerName) {
      case 'Google':
        return new GoogleAuthProvider();
      case 'Github':
        return new GithubAuthProvider();
      default:
        throw new Error(`not supported provider: ${providerName}`);
    }
  }
}

export default AuthService;
