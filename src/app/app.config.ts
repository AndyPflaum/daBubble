import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getAuth, provideAuth } from '@angular/fire/auth'; 
import { provideStorage, getStorage } from '@angular/fire/storage';
import { routes } from './app.routes';
import { provideDatabase, getDatabase } from '@angular/fire/database';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimations(),
    provideFirebaseApp(() => initializeApp({ 
      apiKey: "AIzaSyBDWFBd5a4SJXTn8Gbh1JPFG5KNAiC7UBw",
      authDomain: "my-dabubble-fae78.firebaseapp.com",
      projectId: "my-dabubble-fae78",
      storageBucket: "my-dabubble-fae78.appspot.com",
      messagingSenderId: "596751755759",
      appId: "1:596751755759:web:9710a04b61b47557a5ae1a",
      databaseURL: "https://my-dabubble-fae78-default-rtdb.europe-west1.firebasedatabase.app/",
    })),
    provideAuth(() => getAuth()), 
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage()),
    provideDatabase(() => getDatabase())
  ]
};
