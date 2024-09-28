
export class UserService {
    apiUrl = 'http://localhost:5035/api/Auth'
    constructor() {
    
    }
    async login(dto: LoginRequest) {
        try {
            const response = await fetch(`${this.apiUrl}/Login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dto)
            })
            if (response.ok) {
                localStorage.setItem('email', dto.email)
                window.location.href = '/OTP'
            } 
            return response
        } catch (error) {
            console.log(error)
        }
    }
    async register(dto : RegisterRequest){
        try{
            await fetch(`${this.apiUrl}/Register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dto)
            })
        } catch (error) {
            console.log(error)
        }
    }
    async confirmEmail(token: string | string[], email: string | string[]) : Promise<any> {
        try {
          const response = await fetch(`${this.apiUrl}/ConfirmEmail?token=${token}&email=${email}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            }
          })
        } catch (error) {
            return error
        }
      };
    isAuthenicated() {
        const token = localStorage.getItem('token')
        if(token){
            if(this.isExpired()){
                this.logout()
                return false
            }
            return true
        } else {
            return false
        }
    }
    logout(){
        localStorage.removeItem('token')
        localStorage.removeItem('email')
        window.location.href = '/Login'
    }
    getUserDetails(){
        const token = localStorage.getItem('token')
        if(token){
            const payload = token.split('.')[1]
            const data = JSON.parse(atob(payload))
            return data
        }
    }
    getName(){
        return this.getUserDetails()?.unique_name
    }
    getEmail(){
        return localStorage.getItem('email')
    }
    isExpired(){
        const token = localStorage.getItem('token')
        if(token){
            const payload = token.split('.')[1]
            const data = JSON.parse(atob(payload))
            const expiresOn = data.exp
            if(Date.now() >= expiresOn * 1000){
                return true
            } else {
                return false
            }
        }
    }
    async confirmOTP(token: string | string[], email: string | null) : Promise<Response> {
        const response = await fetch(`${this.apiUrl}/Confirm2FA?token=${token}&email=${email}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const res = await response.json()
        localStorage.setItem("token", res.token);
        return response
    }
}


