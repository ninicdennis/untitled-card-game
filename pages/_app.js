import '../styles/globals.css'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import "tailwindcss/tailwind.css";

function MyApp({ Component, pageProps }) {
  return <DndProvider backend={HTML5Backend}>
           <Component {...pageProps} />
         </DndProvider>
}

export default MyApp
