export type TFullName = {
  firstName: string,
  lastName: string,
}

export type TAddress = {
  street: string,
  city: string,
  country: string,
}

export type TUser = {
  username: string,
  email: string,
  password: string,
  fullName: TFullName,
  bio: string,
  dob: string,
  profileImg: string,
  gender: 'male' | 'female' | 'other',
  contactNo: string,
  address: TAddress,
  isInstructor: boolean,
  isActive: boolean,
  createdAt: Date,
  updatedAt: Date,
}
