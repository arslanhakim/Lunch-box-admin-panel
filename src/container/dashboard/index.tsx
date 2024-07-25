import { useState } from 'react'
import { Layout } from '../../components/layout/layout'
import { BsCurrencyDollar, BsBoxSeam, BsImageFill } from 'react-icons/bs'
import {
    MdOutlineSupervisorAccount,
    MdOutlineWarningAmber,
    MdOutlineSpeakerNotes,
} from 'react-icons/md'
import { FiBarChart } from 'react-icons/fi'
import { SiIfood } from 'react-icons/si'
import { FaTicketAlt, FaUser } from 'react-icons/fa'
import { ASSETS } from '../../assets/path'
import { NavLink } from 'react-router-dom'
import { END_POINTS } from '../../utils/endpoints'
import { API_HANDLER, showToast } from '../../utils/functions'
import { useSelector } from 'react-redux'

export const Dashboard = () => {
    const allCats = useSelector((state: any) => state?.CatReducer?.categories)
    const articles = useSelector(
        (state: any) => state?.ArticlesReducer?.articles
    )
    const allAllergies = useSelector(
        (state: any) => state?.AllergiesReducer?.allergies
    )
    const allUsers = useSelector(
        (state: any) => state?.CustomersReducer?.customers
    )
    const coupons = useSelector((state: any) => state?.CouponsReducer?.coupons)
    const recipebooks = useSelector(
        (state: any) => state?.RecipeBookReducer?.recipebook
    )
    const { avatar } = useSelector((state: any) => state?.AvatarReducer)
    const [allergies, setAllergies] = useState<any>([...allAllergies])
    const [usersList, setusersList] = useState<any>([...allUsers])
    const [articlesList, setarticlesList] = useState<any>([...articles])
    const [couponsList, setcouponsList] = useState<any>(
        coupons ? [...coupons] : []
    )
    const [recipeookList, setRecipeookList] = useState<any>([...recipebooks])

    const TABS = [
        {
            icon: <MdOutlineSupervisorAccount />,
            amount: `${usersList?.length || 0}`,
            percentage: `${(usersList?.length * 100) / 100} %`,
            title: 'Users',
            iconColor: '#03C9D7',
            iconBg: '#E5FAFB',
            pcColor: '#e03131',
            path: '/clients',
        },
        {
            icon: <BsBoxSeam />,
            amount: `${allCats?.length || 0}`,
            percentage: `${(allCats?.length * 100) / 100} %`,
            title: 'Categories',
            iconColor: 'rgb(255, 244, 229)',
            iconBg: 'rgb(254, 201, 15)',
            pcColor: '#92D36E',
            path: '/categories',
        },
        {
            icon: <MdOutlineWarningAmber />,
            amount: `${allergies?.length || 0}`,
            percentage: `${(allergies?.length * 100) / 100} %`,
            title: 'Allergies',
            iconColor: 'rgb(228, 106, 118)',
            iconBg: 'rgb(255, 244, 229)',
            pcColor: '#e03131',
            path: '/allergies',
        },
        {
            icon: <MdOutlineSpeakerNotes />,
            amount: `${articlesList?.length || 0}`,
            percentage: `${(articlesList?.length * 100) / 100} %`,
            title: 'Articles',
            iconColor: 'rgb(0, 194, 146)',
            iconBg: 'rgb(235, 250, 242)',
            pcColor: '#e03131',
            path: '/articles',
        },
        {
            icon: <FaTicketAlt />,
            percentage: `${(couponsList?.length * 100) / 100} %`,
            amount: `${couponsList?.length || 0}`,
            title: 'Coupons',
            iconColor: '#f08c00',
            iconBg: ' #ffec99',
            pcColor: '#ffd8a8',
            path: '/coupon',
        },
        {
            icon: <SiIfood />,
            amount: `${recipeookList?.length || 0}`,
            percentage: '0%',
            title: 'Recipes',
            iconColor: '#ae3ec9',
            iconBg: '#f3d9fa',
            path: '/recipe',
            pcColor: '#92D36E',
        },
        {
            icon: <BsImageFill />,
            amount: `${avatar?.length || 0}`,
            percentage: '0%',
            title: 'Avatars',
            iconColor: 'white',
            iconBg: '#6064c4',
            path: '/avatar',
            pcColor: '202C59',
        },
        {
            icon: <FiBarChart />,
            amount: 0,
            percentage: '0%',
            title: 'Sales',
            iconColor: 'rgb(228, 106, 118)',
            iconBg: 'rgb(255, 244, 229)',
            path: '#',
            pcColor: '#92D36E',
        },
    ]

    const content = (
        <div className="pl-4 md:pl-8 mt-10 duration-300">
            <div className="flex flex-wrap lg:flex-nowrap justify-center pt-8">
                <div className="flex flex-wrap justify-start gap-5 items-center duration-300">
                    {TABS.map((item) => (
                        <NavLink
                            to={item.path}
                            key={item.title}
                            className="bg-white h-44 cursor-pointer w-56 p-4 pt-9 rounded-2xl shadow-lg hover:scale-105 duration-300">
                            <button
                                type="button"
                                style={{
                                    color: item.iconColor,
                                    backgroundColor: item.iconBg,
                                }}
                                className="text-2xl opacity-0.9 rounded-full  p-4 hover:drop-shadow-xl">
                                {item.icon}
                            </button>
                            <p className="mt-3">
                                <span className="text-lg font-semibold">
                                    {item?.amount < 1
                                        ? 0
                                        : item?.amount < 10
                                        ? '0' + item?.amount
                                        : item?.amount}
                                </span>
                                {/* <span
                                    className={`text-sm text-${item.pcColor} ml-2`}>
                                    {item.percentage}
                                </span> */}
                            </p>
                            <p className="text-sm text-gray-400  mt-1">
                                {item.title}
                            </p>
                        </NavLink>
                    ))}
                </div>
            </div>
        </div>
    )
    return <Layout children={content} />
}
