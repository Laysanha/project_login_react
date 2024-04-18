import { getAuth, onAuthStateChanged, User } from "firebase/auth"
import { createContext, useEffect, useState, PropsWithChildren } from "react"

export const AuthContext = createContext<User | null>(null)

export const AuthContextProvider   = ({ children }: PropsWithChildren) => {
   const auth = getAuth();
   const [user, setUser] = useState<User | null>(null);
   // const [loading, setLoading] = useState(true)

   useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
         // setLoading(false)
         if(currentUser) setUser(currentUser)
          else{setUser(null)}
      });
         return () => {
          if(unsubscribe) unsubscribe();
       }
   })
      
   return <AuthContext.Provider value={user}>
      { 
      //!loading && 
         children 
      }
   </AuthContext.Provider>
}
