import { useState, useEffect, useLayoutEffect } from 'react'
import { Layout } from '../../../../components/layout/layout'
import { FaArrowRight, FaTrash } from 'react-icons/fa'
import ArticleModal from '../../../../components/modal/articleModal'
import { useDispatch, useSelector } from 'react-redux'
import { AddArtcile } from '../../../../components/modal/addArtcile'
import { EmptyPage } from '../../../../components/layout/emptyPage'
import swal from 'sweetalert'
import { Header } from '../../../../components/Header'
import { onDeleteArticle } from '../../../../redux/actions/articles.action'
import { Pagination } from '../../../../components/Pagination'

const Articles = () => {
    const dispatch = useDispatch<any>()
    const allArticles = useSelector(
        (state: any) => state?.ArticlesReducer?.articles
    )

    const [articleDetail, setArticleDetail] = useState(false)
    const [addArticle, setAddArticle] = useState(false)
    const [articlesList, setarticlesList] = useState<any>([...allArticles])
    const [articleView, setarticleView] = useState<any>('')
    const [editArticle, seteditArticle] = useState<any>()
    const [currentItemList, setCurrentItemList] = useState<any>([])

    const [size, setSize] = useState<any>()

    useLayoutEffect(() => {
        function updateSize() {
            setSize([window.innerWidth])
        }
        window.addEventListener('resize', updateSize)
        updateSize()
        return () => window.removeEventListener('resize', updateSize)
    }, [])

    const onAddArticles = () => {
        seteditArticle('')
        setAddArticle(!addArticle)
    }

    const onViewDetail = (item: any) => {
        setarticleView(item)
        setArticleDetail(!articleDetail)
    }
    const onEditArticle = (items: any) => {
        seteditArticle(items)
        setAddArticle(!addArticle)
    }

    useEffect(() => {
        setarticlesList([...allArticles])
    }, [allArticles])

    const onDeleteItem = (item: any) => {
        swal({
            title: `Delete this Article?`,
            text: `Are you sure want to delete ${item.name}?`,
            icon: 'warning',
            buttons: ['Cancel', ' Confirm'],
            dangerMode: true,
        }).then(async (willDelete: any) => {
            if (willDelete) {
                dispatch(onDeleteArticle(item.article_id))
            }
        })
    }

    const content = (
        <div className="  pl-4 md:pl-8 mr-6">
            <Header
                title="Articles"
                list={allArticles}
                onApplyFunction={() => onAddArticles()}
                updatedList={setarticlesList}
                searchBar={true}
            />

            {!articlesList && <EmptyPage />}

            <div className="grid lg:grid-cols-3 sm:grid-cols-2 gap-2 w-full mt-6">
                {currentItemList?.length > 0 &&
                    articlesList?.map((item: any, id: any) => (
                        <div key={id} className="w-full">
                            <div className="relative flex items-center justify-center flex-col max-h-96 bg-primaryColor border border-gray-light rounded-lg shadow-md w-full">
                                <img
                                    className="rounded-t-lg h-40 object-cover w-full"
                                    src={item.file}
                                    alt=""
                                />
                                {/* <div
                                    onClick={() => onEditArticle(item)}
                                    className="absolute flex justify-end mb-5 text-[#0d693e] bg-white p-2 rounded-full right-11 top-2 hover:bg-[#0d693e] hover:text-white">
                                    <FaPen
                                        size={15}
                                        className="cursor-pointer "
                                    />
                                </div> */}
                                <div
                                    onClick={() => onDeleteItem(item)}
                                    className="absolute  flex justify-end mb-5 text-[#0d693e] bg-white  p-[6px] rounded-full right-2 top-2 hover:bg-red-medium hover:text-white duration-500">
                                    <FaTrash
                                        size={18}
                                        className="cursor-pointer hover:text-white"
                                        onClick={() => onDeleteItem(item)}
                                    />
                                </div>

                                <div className="p-5 w-full">
                                    <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-normal dark:text-white">
                                        {size <= 900
                                            ? item?.name?.slice(0, 20)
                                            : item?.name}
                                        {size <= 900 &&
                                            item?.name?.length > 20 &&
                                            '...'}
                                    </h5>

                                    <p className="mb-3 font-normal   ">
                                        {item?.description
                                            // ?.replace(/<[^>]*>?/gm, '')
                                            ?.replace(/<\/?[^>]+(>|$)/g, '')
                                            ?.slice(0, 45)}
                                        {item?.description?.length > 50 &&
                                            '...'}
                                    </p>
                                    <span
                                        onClick={() => onViewDetail(item)}
                                        className="group ease-in-out inline-flex cursor-pointer items-center px-3 py-2 text-sm font-medium text-center text-white  rounded-lg   focus:ring-4 focus:outline-none focus:ring-blue-base bg-gray-normal hover:bg-blue-normal border duration-500">
                                        Read more
                                        <FaArrowRight
                                            className="w-4 h-4 ml-2 -mr-1 group-hover:rotate-[360deg] duration-500 "
                                            fill="currentColor"
                                        />
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
            </div>
            {articleDetail && (
                <ArticleModal
                    setArticleDetail={setArticleDetail}
                    article={articleView}
                />
            )}
            {addArticle && (
                <AddArtcile
                    modal={addArticle}
                    setModal={setAddArticle}
                    articlesList={articlesList}
                    editArticle={editArticle}
                />
            )}
            <Pagination
                list={articlesList}
                setCurrentItemList={setCurrentItemList}
                currentItemList={currentItemList}
            />
        </div>
    )
    return <Layout children={content} />
}

export default Articles
