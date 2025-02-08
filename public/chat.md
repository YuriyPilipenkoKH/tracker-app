logs
here logs i see in console 
help me figure out whats going on
why LoginForm unmounted & mounted several times

logs:
data {email: 'log@n.com', password: 'a000'} — loginform
Login function called with: {email: 'log@n.com', password: 'a000'} — useauthstore
LoginForm unmounted — loginform
POST http://localhost:5500/api/auth/login 400 (Bad Request)— useauthstore
Login error caught: AxiosError {message: 'Request failed with status code 400', name: 'AxiosError', code: 'ERR_BAD_REQUEST', config: {…}, request: XMLHttpRequest, …} — useauthstore
Invalid credentials — useauthstore
Login function finished execution — useauthstore
LoginForm mounted — loginform
logError Invalid credentials — loginform
LoginForm unmounted — loginform
LoginForm mounted — loginform
logError Invalid credentials — loginform


4. Confirm There’s No Full Page Reload
Even though event.preventDefault() is handled by React Hook Form, confirm that your login API request doesn’t trigger a full reload.

Run this test:

Open DevTools > Network tab.
Click Preserve log.
Submit the form.
If you see a full-page request (not just /auth/login), something is forcing a reload.

///==============
logs
LoginForm mounted — loginform
logError — loginform
LoginPage mounted — loginpage
authUser null — App
LoginPage unmounted — loginpage
LoginForm unmounted — loginform
GET http://localhost:5500/api/auth/check 401 (Unauthorized) — useauthstore
error in checkAuth AxiosError {message: 'Request failed with status code 401', name: 'AxiosError', code: 'ERR_BAD_REQUEST', config: {…}, request: XMLHttpRequest, …}  — useauthstore
LoginForm mounted — loginform
logError — loginform
LoginPage mounted — loginpage