import { ASSETS } from '../../assets/path'
 
 
export const CATEGORIES = [
    {
        name: 'Mains',
        img: ASSETS.CATEGORIES.MAINS,
    },
    {
        name: 'Fruits',
        img: ASSETS.CATEGORIES.FRUITS,
    },
    {
        name: 'Vegetable & Salad',
        img: ASSETS.CATEGORIES.VEGITABLES,
    },
    {
        name: 'Dairy',
        img: ASSETS.CATEGORIES.DAIRY,
    },
    {
        name: 'Peanuts',
        img: ASSETS.CATEGORIES.SNACKS,
    },
]
export const ALLERGIES = [
    {
        name: 'None',
    },
    {
        name: 'Milk',
    },
    {
        name: 'Eggs',
    },
    {
        name: 'Tree nuts',
    },
    {
        name: 'Peanuts',
    },
    {
        name: 'Shelfish',
    },
    {
        name: 'Sesame',
    },
    {
        name: 'Soy',
    },
    {
        name: 'FishGluten',
    },
    {
        name: 'Mustard',
    },
]

export const USERS = [
    {
        id: 1,
        fname: 'John',
        lname: 'Abraham',
        img: 'https://cdn.pixabay.com/photo/2015/03/04/22/35/avatar-659652_960_720.png',
        email: 'john@gmail.com',
        contact: '+9230000000000',
        dob: '01-01-2000',
        children: 3,
        profiles: [1, 2, 3],
    },
]

export const PROFILES = [
    {
        id: 1,
        fname: 'Johny',
        lname: 'Jugnu',
        img: 'https://cdn.pixabay.com/photo/2015/03/04/22/35/avatar-659652_960_720.png',
        dob: '01-01-20',
        alergic: ['Mustard', 'Gluten'],
        categories: ['Mains', 'Milk'],
        parent_contact: '+9230000000000',
    },
]
export const dateDiff = (d: any) => {
    const currDate: any = new Date()
    const dob: any = new Date(d)
    const diff = Math.abs(currDate - dob)
    var date = diff / (1000 * 60 * 60 * 24 * 365)
    return date
}

export const article = [
    {
        title: ' Noteworthy technology acquisitions 2021',
        date: '',
        article:
            ' Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse  chronological order. Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse  chronological order. Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse  chronological order. Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse  chronological order. Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse  chronological order.',
        img: ASSETS.ARTICLE.ARTICLE,
    },
]

export const coupon = [
    {
        name: 'Black Friday',
        code: 'BLACKFRIDAY',
        amount: 50,
        product: ['All Products'],
        status: 'Active',
    },
    {
        name: 'Black Friday',
        code: 'BLACKFRIDAY',
        amount: 50,
        product: ['All Products'],
        status: 'Expire',
    },
]
