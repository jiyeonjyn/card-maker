import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import firebaseApp from './firebase'; // import 필수

class AuthService {
  constructor() {
    this.auth = getAuth();
  }

  login(providerName) {
    const authProvider = this.getProvider(providerName);
    return signInWithPopup(this.auth, authProvider);
  }

  logout() {
    signOut(this.auth) //
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
      });
  }

  onAuthChange(onUserChanged) {
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
