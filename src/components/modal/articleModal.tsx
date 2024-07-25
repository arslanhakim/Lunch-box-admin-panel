import { ASSETS } from '../../assets/path'
import CloseModal from '../Button/closeModal'

const ArticleModal = ({ setArticleDetail, article }: any) => {
    return (
        <div className="fixed top-[10%] left-[20%] z-99 bg-primaryColor  rounded-lg border-white border-2 w-[73%] overflow-y-scroll max-h-[80%]">
            <CloseModal setModal={setArticleDetail} />

            <div className="flex">
                <div className="space-y-2 gap-2 Poppins-Regular text-xs sm:text-sm xl:text-base p-2 text-justify mx-4">
                    <div className="mt-2 text-3xl font-bold tracking-tight text-gray-normal dark:text-white justify-center items-center w-full text-center mb-4 ">
                        {article?.name}
                    </div>
                    <img
                        className="float-left   pl-2 md:pr-4  w-32 h-32 sm:w-24 sm:h-24 md:w-80 md:h-[24rem] lg:w-1/2
                        duration-1000 object-cover "
                        src={article?.file || ASSETS.ARTICLE.ARTICLE}
                        alt=""
                    />
                    {article?.description.replace(/<[^>]*>?/gm, '')}
                </div>
            </div>
        </div>
    )
}

export default ArticleModal
