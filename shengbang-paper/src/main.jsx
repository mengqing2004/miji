import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import "antd/dist/reset.css"
import {StyleProvider} from "@ant-design/cssinjs";
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <StyleProvider hashPriority={"high"}>
        <App />
    </StyleProvider>
  </React.StrictMode>,
)
