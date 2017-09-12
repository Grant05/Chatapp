export const submitChat = (message) => {
  console.log('SUBMIT CHAT ACTION ACTIONIZED')
  return {
    type: "CHAT_SUBMIT",
    payload: message
  }
}
