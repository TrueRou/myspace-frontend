const APIEntry = 'https://turou.nogu.dev/api/myspace/'
const API_LIVE_STATUS = APIEntry + 'live/status'
const API_LIVE_CREATE = APIEntry + 'live/create'
const API_LIVE_MESSAGE = APIEntry + 'live/message'
const API_USER_LOGIN = APIEntry + 'auth/jwt/login'
const API_USER_REGISTER = APIEntry + 'auth/register'
const API_USER_ME = APIEntry + 'users/me'
const API_CHATGPT_TOKEN = APIEntry + 'chatgpt/token'
const API_TRANSFER_ENTRIES = APIEntry + 'transfer/entries'

export default { API_LIVE_STATUS, API_USER_LOGIN, API_USER_REGISTER, API_LIVE_MESSAGE, API_LIVE_CREATE, API_TRANSFER_ENTRIES, API_USER_ME, API_CHATGPT_TOKEN }