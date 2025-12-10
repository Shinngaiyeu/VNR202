import { initializeApp, getApps } from "firebase/app"
import { getDatabase } from "firebase/database"

// Cấu hình Firebase của bạn
const firebaseConfig = {
  apiKey: "AIzaSyD-c6ZxlovUauwb-D1xk9k7NDDAwt-Rwc4",
  authDomain: "movie-85cca.firebaseapp.com",
  databaseURL: "https://movie-85cca-default-rtdb.firebaseio.com",
  projectId: "movie-85cca",
  storageBucket: "movie-85cca.firebasestorage.app",
  messagingSenderId: "260419327254",
  appId: "1:260419327254:web:ab975e95251f7cd23d6c37",
  measurementId: "G-CDCN2LPC14",
}

// Khởi tạo Firebase (chỉ khởi tạo một lần)
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0]

// Khởi tạo Realtime Database
const database = getDatabase(app)

export { database }
