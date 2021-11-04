import { Dashboard } from './components/Dashboard';

import { Header } from './components/Header';
import { GlobalStyle } from './styles/global'
import { useState } from 'react';
import { NewTransactionModal } from './components/NewTransactionModal';

export function App() {
  const [isNewTransactionOpen, setIsNewTransactionOpen] = useState(false)

  function handleOpenNewTransactionModal () {
    setIsNewTransactionOpen(true)
  }

  function handleCloseNewTransactionModal () {
    setIsNewTransactionOpen(false)
  }

  return (
    <>
      <GlobalStyle />
      <Header  onOpenNewTransactionModal={handleOpenNewTransactionModal} />
      <NewTransactionModal
        isOpen={isNewTransactionOpen}
        onRequestClose={handleCloseNewTransactionModal}
      />
      <Dashboard />
    </>
  );
}
