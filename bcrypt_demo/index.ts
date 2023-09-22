import bcrypt from 'bcrypt'

const HashPassword = async (password: string) => {
  const hash = await bcrypt.hash(password, 10);
  console.log(hash)
  return hash
}

const Login = async (password: any, hash: any) => {
  const data = await hash;
  const login = await bcrypt.compare(password, data);
  if (login) {
    console.log('Login successfully')
  } else {
    console.log('password incorrect')
  }
}


const password = HashPassword("#goblok123")
Login('#goblok123', "$2b$10$kLg6aK035sbYijhiNSCoK.T/kTddPWDj6YsAeq9JAqUb00Saxhl82")
const check = Login('#goblok123', password)
// const check = login('password', password)