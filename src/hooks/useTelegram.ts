const useTelegram = () => {
  // Access the Telegram property using the type declaration
  const tg = window?.Telegram.WebApp;

  const onClose = () => {
    tg.close();
  };

  const onToggleButton = () => {
    if (tg.MainButton.isVisible) {
      tg.MainButton.hide();
    } else {
      tg.MainButton.show();
    }
  };

  return {
    tg,
    onClose,
    user: tg.initDataUnsafe?.user,
    queryId: tg.initDataUnsafe?.query_id,
    onToggleButton,
  };
};

export default useTelegram;
