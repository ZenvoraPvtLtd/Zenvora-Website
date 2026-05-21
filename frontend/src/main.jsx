// // import { StrictMode } from 'react'
// // import { createRoot } from 'react-dom/client'
// // import './index.css'
// // import App from './App.jsx'
// // import { GoogleOAuthProvider } from '@react-oauth/google'

// // const GOOGLE_CLIENT_ID = "486154300333-s0tfs13k3cefvgc147egcg4g2j0qo3u7s.apps.googleusercontent.com";

// // createRoot(document.getElementById('root')).render(
// //   <StrictMode>
// //     <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
// //       <App />
// //     </GoogleOAuthProvider>
// //   </StrictMode>,
// // )




// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import './index.css'
// import App from './App.jsx'

// import { GoogleOAuthProvider } from '@react-oauth/google'

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <GoogleOAuthProvider
//       clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}
//     >
//       <App />
//     </GoogleOAuthProvider>
//   </StrictMode>,
// )
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import { GoogleOAuthProvider } from '@react-oauth/google'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider
      clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}
    >
      <App />
    </GoogleOAuthProvider>
  </StrictMode>,
)