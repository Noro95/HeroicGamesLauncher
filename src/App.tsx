import React, { useEffect } from 'react'

import './App.css'
import './themes.css'
import { HashRouter, Route, Routes } from 'react-router-dom'
import Login from './screens/Login'
import WebView from './screens/WebView'
import { GamePage } from './screens/Game'
import Library from './screens/Library'
import WineManager from './screens/WineManager'
import Sidebar from 'src/components/UI/Sidebar'
import Settings from './screens/Settings'
import { IpcRenderer } from 'electron/renderer'
import { css, cx } from '@emotion/css'
interface ElectronProps {
  ipcRenderer: IpcRenderer
}

const { ipcRenderer } = window.require('electron') as ElectronProps

function App() {
  const [userTheme, setUserTheme] = React.useState('')

  useEffect(() => {
    ipcRenderer
      .invoke('getThemes')
      .then(({ themes, css }: { themes: string[]; css: string }) => {
        console.log({ themes, css })
        setUserTheme(css)
      })
  }, [])

  return (
    <div
      className={cx(
        'App',
        css`
          ${userTheme}
        `
      )}
    >
      <HashRouter>
        <Sidebar />
        <main className="content">
          <Routes>
            <Route path="/" element={<Library />} />
            <Route path="login" element={<Login />} />
            <Route path="epicstore" element={<WebView />} />
            <Route path="gogstore" element={<WebView />} />
            <Route path="wiki" element={<WebView />} />
            <Route path="gamepage">
              <Route path=":appName" element={<GamePage />} />
            </Route>
            <Route path="/store-page" element={<WebView />} />
            <Route path="loginweb">
              <Route path=":runner" element={<WebView />} />
            </Route>
            <Route path="settings">
              <Route path=":appName">
                <Route path=":type" element={<Settings />} />
              </Route>
            </Route>
            <Route path="/wine-manager" element={<WineManager />} />
          </Routes>
        </main>
      </HashRouter>
    </div>
  )
}

export default App
