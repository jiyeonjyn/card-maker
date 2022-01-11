import firebaseApp from './firebase'; // import 필수
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';

class AuthService {
  constructor() {
    this.auth = getAuth();
  }

  login(providerName) {
    const authProvider = this.getProvider(providerName);
    return signInWithPopup(this.auth, authProvider);
  }

  logout() {
    signOut(this.auth);
  }

  onAuthChange(onUserChanged) {
    // 로그인 된 유저가 있는지 확인
    onAuthStateChanged(this.auth, (user) => {
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
