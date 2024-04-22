import { getAuth, onAuthStateChanged, User } from "firebase/auth"
import { createContext, useEffect, useState, PropsWithChildren } from "react"

export const AuthContext = createContext<User | null>(null)

export const AuthContextProvider = ({ children }: PropsWithChildren) => {
   const auth = getAuth();
   const [user, setUser] = useState<User | null>(null);

   useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
         setUser(currentUser)
         if (currentUser) {
            localStorage.setItem('user', JSON.stringify(currentUser))
         } else {
            localStorage.removeItem('user')
         }
      })
      return () => {
         if(unsubscribe) unsubscribe();
      }
   }, [auth])
      
   return <AuthContext.Provider value={user}>
      { children }
   </AuthContext.Provider>
}
