import bcrypt from 'bcryptjs'

const users = [
  {
    name: 'Админ',
    email: 'admin@admin.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true,
  },
  {
    name: 'Юзер',
    email: 'user0@user.com',
    password: bcrypt.hashSync('123456', 10),
  },
  {
    name: 'Юзер',
    email: 'user1@user.com',
    password: bcrypt.hashSync('123456', 10),
  },
]

export default users
