module.exports = {
  USER_AGENT:
    "--user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.135 Safari/537.36 Edge/12.246",
  DOORDASH_URL:
    "https://identity.doordash.com/auth/user/signup?client_id=1666519390426295040&intl=en-US&layout=consumer_web&prompt=none&redirect_uri=https%3A%2F%2Fwww.doordash.com%2Fconsumer%2Finvite%2F&response_type=code&scope=%2A&state=%2Fhome%2Fen-US",
  SEARCH_ADDRESS_BUTTON: `/html/body/div[1]/div[1]/div[1]/div[2]/div/div[1]/div[2]`,
  FIRST_ADDRESS_BUTTON: `//*[@id="root"]/div[1]/div[4]/div[1]/div[2]/div/div[2]/div/div[2]/div/button[1]`,
  ADDRESS_INPUT: `/html/body/div[1]/div[1]/div[4]/div[1]/div[2]/div/div[2]/div/div[2]/div/div[1]/form/div/div/div/div/div[2]/input`,
  SCREEN: { width: 800, height: 600 },
};
